extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;
mod execute;
mod rules;
pub mod utils;
use execute::Clause;
use execute::Rule;
use execute::Species;
use std::collections::VecDeque;
use wasm_bindgen::prelude::*;
// use web_sys::console;

#[wasm_bindgen]
#[repr(C)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Cell {
    species: Species,
    energy: u8,
    age: u8,
    clock: u8,
}

impl Cell {
    // pub fn new(species: Species) -> Cell {
    //     Cell {
    //         species: species,
    //         energy: 10 + (js_sys::Math::random() * 8.) as u8,
    //         age: 0,
    //         clock: 0,
    //     }
    // }

    pub fn update(&self, api: SandApi) -> usize {
        return self.species.update(*self, api);
    }
}

static EMPTY_CELL: Cell = Cell {
    species: Species::Empty,
    energy: 0,
    age: 0,
    clock: 0,
};

#[wasm_bindgen]
pub struct Universe {
    width: i32,
    height: i32,
    cells: Vec<Cell>,
    undo_stack: VecDeque<Vec<Cell>>,
    generation: u8,
    rule_sets: [execute::Rule; 7],
    heatmap: [usize; 7 * 3],
    time: u8,
}

pub struct SandApi<'a> {
    x: i32,
    y: i32,
    universe: &'a mut Universe,
}

impl<'a> SandApi<'a> {
    pub fn get(&mut self, dx: i32, dy: i32) -> Cell {
        if dx > 2 || dx < -2 || dy > 2 || dy < -2 {
            panic!("oob get");
        }
        let nx = self.x + dx;
        let ny = self.y + dy;
        if nx < 0 || nx > self.universe.width - 1 || ny < 0 || ny > self.universe.height - 1 {
            return Cell {
                species: Species::Empty,
                energy: 0,
                age: 0,
                clock: self.universe.generation,
            };
        }
        self.universe.get_cell(nx, ny)
    }
    pub fn set(&mut self, dx: i32, dy: i32, v: Cell) {
        if dx > 2 || dx < -2 || dy > 2 || dy < -2 {
            panic!("oob set");
        }
        let nx = self.x + dx;
        let ny = self.y + dy;

        if nx < 0 || nx > self.universe.width - 1 || ny < 0 || ny > self.universe.height - 1 {
            return;
        }
        let i = self.universe.get_index(nx, ny);
        // v.clock += 1;
        self.universe.cells[i] = v;
        self.universe.cells[i].clock = self.universe.generation;
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn reset(&mut self) {
        for x in 0..self.width {
            for y in 0..self.height {
                let idx = self.get_index(x, y);
                self.cells[idx] = EMPTY_CELL;
            }
        }
    }

    pub fn tick(&mut self) {
        // let mut next = self.cells.clone();
        // let dx = self.winds[(self.width * self.height / 2) as usize].dx;
        // let js: JsValue = (dx).into();
        // console::log_2(&"dx: ".into(), &js);
        for i in 0..self.heatmap.len() {
            self.heatmap[i] = 0;
        }
        self.generation = self.generation.wrapping_add(1) % 2;
        for x in 0..self.width {
            let scanx = if self.generation % 2 == 0 {
                self.width - (1 + x)
            } else {
                x
            };

            for y in 0..self.height {
                // let idx = self.get_index(scanx, self.height - (1 + y));
                let cell = self.get_cell(scanx, y);

                let result = Universe::update_cell(
                    cell,
                    SandApi {
                        universe: self,
                        x: scanx,
                        y,
                    },
                );
                if result < 99 {
                    self.heatmap[cell.species as usize * 3 + result] += 1;
                }
            }
        }
        // self.time = self.time.wrapping_add(1);
    }

    pub fn heatmap(&self, i: usize) -> usize {
        self.heatmap[i]
    }

    pub fn rule(&self, i: usize) -> Rule {
        self.rule_sets[i]
    }
    pub fn clause(&mut self, ri: usize, ci: usize) -> Clause {
        self.rule_sets[ri].clause(ci)
    }
    pub fn set_rule(&mut self, rule: &Rule, i: usize) {
        self.rule_sets[i] = *rule;
    }

    pub fn set_clause(&mut self, clause: &Clause, ri: usize, ci: usize) {
        self.rule_sets[ri].set_clause(clause, ci);
    }

    pub fn width(&self) -> i32 {
        self.width
    }

    pub fn height(&self) -> i32 {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn paint(&mut self, x: i32, y: i32, size: i32, species: Species) {
        let size = size;
        let radius: f64 = (size as f64) / 2.0;

        let floor = (radius + 1.0) as i32;
        let ciel = (radius + 1.5) as i32;

        for dx in -floor..ciel {
            for dy in -floor..ciel {
                if (((dx * dx) + (dy * dy)) as f64) > (radius * radius) {
                    continue;
                };
                let px = x + dx;
                let py = y + dy;

                let i = self.get_index(px, py);

                if px < 0 || px > self.width - 1 || py < 0 || py > self.height - 1 {
                    continue;
                }
                if self.get_cell(px, py).species == Species::Empty || species == Species::Empty {
                    let mut energy = 16 + (js_sys::Math::random() * 16.) as u8;

                    if species == Species::Empty {
                        energy = 1;
                    }
                    self.cells[i] = Cell {
                        species: species,
                        energy: energy,
                        age: 0,
                        clock: self.generation,
                    };
                }
            }
        }
    }

    pub fn push_undo(&mut self) {
        self.undo_stack.push_front(self.cells.clone());
        self.undo_stack.truncate(50);
    }

    pub fn pop_undo(&mut self) {
        let old_state = self.undo_stack.pop_front();
        match old_state {
            Some(state) => self.cells = state,
            None => (),
        };
    }

    pub fn flush_undos(&mut self) {
        self.undo_stack.clear();
    }
    pub fn set_time(&mut self, t: u8) {
        self.time = t;
    }
    pub fn inc_time(&mut self) {
        self.time = self.time.wrapping_add(1);
    }

    pub fn new(width: i32, height: i32) -> Universe {
        let cells = (0..width * height).map(|_| EMPTY_CELL).collect();

        Universe {
            width,
            height,
            cells,
            time: 0,
            undo_stack: VecDeque::with_capacity(50),
            generation: 0,
            heatmap: [0; 3 * 7],
            rule_sets: rules::build_rule(),
        }
    }
}

//private methods
impl Universe {
    fn get_index(&self, x: i32, y: i32) -> usize {
        (x + (y * self.width)) as usize
    }
    fn get_max_index(&self) -> usize {
        let m_w = (self.width - 1) as usize;
        let m_h = self.height - 1;
        return (m_w + (m_h * self.width) as usize) as usize;
    }

    fn get_cell(&self, x: i32, y: i32) -> Cell {
        let i = self.get_index(x, y);
        return self.cells[i];
    }

    fn update_cell(cell: Cell, api: SandApi) -> usize {
        if cell.clock == api.universe.generation {
            return 99;
        }

        return cell.update(api);
    }
}
