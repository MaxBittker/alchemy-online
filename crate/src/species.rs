use super::utils::*;
use Cell;
use SandApi;
use EMPTY_CELL;
// use std::cmp;
// use std::mem;
use wasm_bindgen::prelude::*;
// use web_sys::console;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Species {
    Empty = 0,

    Glass = 1,
    Sand = 2,
    Stone = 12,
    Wood = 13,
    Rule1 = 6,

    Water = 3,
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum SymmetryMode {
    None = 0,
    Vertical = 1,
    Horizontal = 2,
    Quad = 3,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Rule {
    symmetry: SymmetryMode,
    selector: Selector,
    effector: Effector,
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Slot {
    Empty = 0,
    Anything = 1,
    Full = 2,

    Stone = 4,
    Wood = 5,
    Water = 6,
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum OutSlot {
    Empty = 0,
    Nop = 1,
    Me = 2,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Selector {
    grid: [Slot; 9],
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Effector {
    grid: [OutSlot; 9],
}

pub fn check_cell(slot: Slot, cell: Cell) -> bool {
    match slot {
        Slot::Empty => cell.species == Species::Empty,
        Slot::Anything => true,
        Slot::Full => cell.species != Species::Empty,
        _ => true, //TODO: OTHER RULES
    }
}

pub fn execute_rule(cell: Cell, mut api: SandApi, rule: Rule) {
    // let mut passes = true;
    for x in 0..rule.selector.grid.len() {
        let (dx, dy) = matrixIndex(x);
        if !check_cell(rule.selector.grid[x], api.get(dx, dy)) {
            // passes = false;
            return;
        }
    }
    for x in 0..rule.effector.grid.len() {
        let (dx, dy) = matrixIndex(x);
        let outSlot = rule.effector.grid[x];
        match outSlot {
            OutSlot::Empty => api.set(dx, dy, EMPTY_CELL),
            OutSlot::Nop => (),
            OutSlot::Me => api.set(dx, dy, cell),
            // _ => (), //TODO: OTHER RULES
        }
    }
}

pub fn build_rule() -> Rule {
    return Rule {
        symmetry: SymmetryMode::None,
        selector: Selector {
            grid: [
                Slot::Anything,
                Slot::Anything,
                Slot::Anything,
                Slot::Anything,
                Slot::Anything,
                Slot::Anything,
                Slot::Anything,
                Slot::Empty,
                Slot::Anything,
            ],
        },
        effector: Effector {
            grid: [
                OutSlot::Nop,
                OutSlot::Nop,
                OutSlot::Nop,
                OutSlot::Nop,
                OutSlot::Empty,
                OutSlot::Nop,
                OutSlot::Nop,
                OutSlot::Me,
                OutSlot::Nop,
            ],
        },
    };
}
impl Species {
    pub fn update(&self, cell: Cell, api: SandApi) {
        let rule = build_rule();
        match self {
            Species::Empty => {}
            Species::Glass => {}

            Species::Rule1 => execute_rule(cell, api, rule),
            Species::Water => update_water(cell, api),
            Species::Sand => update_sand(cell, api),
            Species::Stone => update_stone(cell, api),
            Species::Wood => {}
        }
    }
}

pub fn update_sand(cell: Cell, mut api: SandApi) {
    let mut age = cell.age;
    if cell.age == 0 {
        age = rand_int(255) as u8;
    }

    let (dx, dy) = rand_vec_8();

    let down = api.get(0, 1);
    let dnbr = api.get(dx, 1);
    if down.species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
        return;
    } else if dnbr.species == Species::Water {
        api.set(0, 0, dnbr);
        api.set(dx, 1, cell);
        return;
    } else if dnbr.species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx, 1, cell);
        return;
    }
    let energy = cell.energy;

    let nbr = api.get(dx, dy);

    if rand_int(257 - cell.energy as i32) == 1 && nbr.species == Species::Sand {
        //diffuse nutrients

        let shared_energy = (energy / 2) + (nbr.energy / 2);

        let new_energy = (energy / 2).saturating_add(shared_energy / 2) as u8;
        let new_nbr_energy = (nbr.energy / 2).saturating_add(shared_energy / 2) as u8;

        let conservation = (nbr.energy + energy) - (new_nbr_energy + new_energy);

        api.set(
            dx,
            dy,
            Cell {
                energy: new_nbr_energy.saturating_add(conservation),
                ..nbr
            },
        );
        api.set(
            0,
            0,
            Cell {
                energy: new_energy,
                age,
                ..cell
            },
        );
    }
}
pub fn update_water(cell: Cell, mut api: SandApi) {
    let dx = rand_dir_2();
    let below = api.get(0, 1);
    let dx1 = api.get(dx, 1);
    let dx1r = api.get(-dx, 1);
    let dx0 = api.get(dx, 0);
    let dx0r = api.get(-dx, 0);
    if below.species == Species::Empty {
        api.set(0, 0, below);
        api.set(0, 1, cell);
    } else if dx0.species == Species::Empty {
        api.set(0, 0, dx0);
        api.set(dx, 0, cell);
    } else if dx0r.species == Species::Empty {
        api.set(-dx, 0, cell);
        // if api.get(dx * -2, 0).species == Species::Water
        //     && dx0.species == Species::Water
        //     && api.get(0, -1).species == Species::Empty
        //     && rand_int(5) == 1
        // {
        //     api.set(0, 0, Cell::new(Species::Water));
        // } else {
        api.set(0, 0, dx0r);
    // }
    } else if dx1.species == Species::Empty {
        api.set(0, 0, dx1);
        api.set(dx, 1, cell);
    } else if dx1r.species == Species::Empty {
        api.set(0, 0, dx1r);
        api.set(-dx, 1, cell);
    } else if api.get(dx * 2, 0).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx * 2, 0, cell);
    } else if api.get(dx * -2, 0).species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(dx * -2, 0, cell);
    }
}
pub fn update_stone(cell: Cell, mut api: SandApi) {
    if api.get(-1, -1).species == Species::Stone && api.get(1, -1).species == Species::Stone {
        return;
    }

    let nbr = api.get(0, 1);
    let nbr_species = nbr.species;
    if nbr_species == Species::Empty {
        api.set(0, 0, EMPTY_CELL);
        api.set(0, 1, cell);
    } else if nbr_species == Species::Water {
        api.set(0, 0, nbr);
        api.set(0, 1, cell);
    } else {
        api.set(0, 0, cell);
    }
}
