use std::cmp::max;

use super::utils::*;
// use js_sys::Array;
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
    Wild = 11,
    Empty = 0,
    Rule1 = 1,
    Rule2 = 2,
    Rule3 = 3,
    Rule4 = 4,
    Rule5 = 5,
    Rule6 = 6,
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum SymmetryMode {
    // None = 0,
    Horizontal = 0,
    // Vertical = 2,
    Quad = 1,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Rule {
    clauses: [Clause; 3],
}

#[wasm_bindgen]
impl Rule {
    #[wasm_bindgen(constructor)]
    pub fn new(c0: Clause, c1: Clause, c2: Clause) -> Rule {
        Rule {
            clauses: [c0, c1, c2],
        }
    }
    pub fn clause(&self, i: usize) -> Clause {
        self.clauses[i]
    }

    pub fn set_clause(&mut self, c: &Clause, i: usize) {
        self.clauses[i] = *c;
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Clause {
    pub probability: u8,
    pub symmetry: SymmetryMode,
    pub selector: Selector,
    pub effector: Effector,
}

#[wasm_bindgen]
impl Clause {
    #[wasm_bindgen(constructor)]
    pub fn new(
        probability: u8,
        symmetry: SymmetryMode,
        selector: Selector,
        effector: Effector,
    ) -> Clause {
        return Clause {
            probability,
            symmetry,
            selector,
            effector,
        };
    }
    pub fn new_null() -> Clause {
        Clause {
            probability: 0,
            symmetry: SymmetryMode::Quad,
            selector: Selector {
                grid: [
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                ],
            },
            effector: Effector {
                grid: [
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                    Species::Wild,
                ],
            },
        }
    }
    pub fn symmetry(&self) -> SymmetryMode {
        self.symmetry
    }
    pub fn probability(&self) -> u8 {
        self.probability
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Selector {
    grid: [Species; 9],
}

#[wasm_bindgen]
impl Selector {
    #[wasm_bindgen(constructor)]
    pub fn new(
        v1: Species,
        v2: Species,
        v3: Species,
        v4: Species,
        v5: Species,
        v6: Species,
        v7: Species,
        v8: Species,
        v9: Species,
    ) -> Selector {
        return Selector {
            grid: [v1, v2, v3, v4, v5, v6, v7, v8, v9],
        };
    }

    pub fn grid(&self) -> *const Species {
        self.grid.as_ptr()
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Effector {
    grid: [Species; 9],
}

#[wasm_bindgen]
impl Effector {
    #[wasm_bindgen(constructor)]
    pub fn new(
        v1: Species,
        v2: Species,
        v3: Species,
        v4: Species,
        v5: Species,
        v6: Species,
        v7: Species,
        v8: Species,
        v9: Species,
    ) -> Effector {
        return Effector {
            grid: [v1, v2, v3, v4, v5, v6, v7, v8, v9],
        };
    }
    pub fn grid(&self) -> *const Species {
        self.grid.as_ptr()
    }
}

impl Species {
    pub fn update(&self, cell: Cell, api: SandApi) -> usize {
        let rule_sets = api.universe.rule_sets;
        match self {
            Species::Wild => 99,
            Species::Empty => execute_rule(cell, api, rule_sets[0]),
            Species::Rule1 => execute_rule(cell, api, rule_sets[1]),
            Species::Rule2 => execute_rule(cell, api, rule_sets[2]),
            Species::Rule3 => execute_rule(cell, api, rule_sets[3]),
            Species::Rule4 => execute_rule(cell, api, rule_sets[4]),
            Species::Rule5 => execute_rule(cell, api, rule_sets[5]),
            Species::Rule6 => execute_rule(cell, api, rule_sets[6]),
        }
    }
}

pub fn check_cell(slot: Species, cell: Cell) -> bool {
    match slot {
        Species::Wild => true,
        _ => cell.species == slot,
    }
}
pub fn get_energy(cell: Cell) -> usize {
    match cell.species {
        // Species::Empty => 0,
        _ => cell.energy as usize,
    }
}
pub fn process_coord(coord: (i32, i32), rx: i32, ry: i32, r: usize) -> (i32, i32) {
    let (mut dx, mut dy) = rot_right(coord, r);
    dx *= rx;
    dy *= ry;
    return (dx, dy);
}
pub fn execute_clause_orientation(
    cell: Cell,
    mut api: SandApi,
    clause: Clause,
    rx: i32,
    ry: i32,
    r: usize,
) -> (bool, SandApi) {
    for x in 0..clause.selector.grid.len() {
        let (dx, dy) = process_coord(matrix_index(x), rx, ry, r);

        if (dx != 0 || dy != 0) && !check_cell(clause.selector.grid[x], api.get(dx, dy)) {
            return (false, api);
        }
    }
    let mut n_reagents = 0;
    let mut reaction_energy: usize = 0;
    let mut n_products = 0;
    for x in 0..clause.effector.grid.len() {
        let (dx, dy) = process_coord(matrix_index(x), rx, ry, r);
        let out_slot = clause.effector.grid[x];
        let target = api.get(dx, dy);
        match out_slot {
            Species::Wild => (),
            _ => {
                if target.species != Species::Empty {
                    n_reagents += 1;
                    reaction_energy += get_energy(target);
                }
                if out_slot != Species::Empty {
                    n_products += 1;
                }
            }
        }
    }

    let (out_e, mut rem) = div_rem_usize(reaction_energy, max(n_products, 1));

    if n_products > n_reagents
        && out_e < 1
        && !once_in_u(50 * max(n_products - n_reagents as usize, 1))
    {
        // failed due to insufficient energy
        // return (false, api);
    }

    for x in 0..clause.effector.grid.len() {
        let (dx, dy) = process_coord(matrix_index(x), rx, ry, r);
        let out_slot = clause.effector.grid[x];
        match out_slot {
            Species::Empty => api.set(dx, dy, EMPTY_CELL),
            Species::Wild => (),
            _ => {
                let mut nbr = api.get(dx, dy);
                if nbr.energy == 0 {
                    nbr.energy = cell.energy;
                }
                nbr.energy = ((nbr.energy as i32).saturating_add(rand_dir_2())) as u8;
                if nbr.energy > 35 {
                    nbr.energy = 35;
                }
                api.set(
                    dx,
                    dy,
                    Cell {
                        species: out_slot,
                        // (out_e + rem) as u8,
                        ..nbr
                    },
                );
                rem = 0;
            }
        }
    }

    return (true, api);
}

pub fn execute_clause(cell: Cell, api: SandApi, clause: Clause) -> (bool, SandApi) {
    // if clause.probability == 0 || rand_int(2i32.pow((clause.probability) as u32)) > 1 {
    if clause.probability == 0 {
        return (false, api);
    }
    match clause.symmetry {
        // SymmetryMode::None => {
        //     return execute_clause_orientation(cell, api, clause, 1, 1, 0);
        // }
        // SymmetryMode::Vertical => {
        //     let dy = rand_dir_2();
        //     let (success, api) = execute_clause_orientation(cell, api, clause, 1, dy, 0);

        //     if success {
        //         return (true, api);
        //     }
        //     return execute_clause_orientation(cell, api, clause, 1, dy * -1, 0);
        // }
        SymmetryMode::Horizontal => {
            let dx = rand_dir_2();
            let (success, api) = execute_clause_orientation(cell, api, clause, dx, 1, 0);

            if success {
                return (true, api);
            }
            return execute_clause_orientation(cell, api, clause, dx * -1, 1, 0);
        }
        SymmetryMode::Quad => {
            let mut r = rand_uint(4);
            let flip = rand_dir_2();
            let (success, api) = execute_clause_orientation(cell, api, clause, flip, 1, r);

            if success {
                return (success, api);
            }
            r = (r + 1) % 4;
            let (success, api) = execute_clause_orientation(cell, api, clause, flip, 1, r);

            if success {
                return (success, api);
            }
            r = (r + 1) % 4;

            let (success, api) = execute_clause_orientation(cell, api, clause, flip, 1, r);

            if success {
                return (success, api);
            }
            r = (r + 1) % 4;

            return execute_clause_orientation(cell, api, clause, flip, 1, r);
        }
    }
}

pub fn execute_rule(cell: Cell, i_api: SandApi, rule: Rule) -> usize {
    let mut api = i_api;
    // let r = 0;
    let r = rand_uint(rule.clauses.len());
    for c in 0..rule.clauses.len() {
        let actual_clause = (c + r) % rule.clauses.len();
        let clause = rule.clauses[actual_clause];

        let (success, o_api) = execute_clause(cell, api, clause);
        if success {
            return actual_clause;
        };
        api = o_api;
    }
    return 99;
}
