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
    Empty = 10,
    Wild = 11,
    Rule1 = 0,
    Rule2 = 1,
    Rule3 = 2,
    Rule4 = 3,
    Rule5 = 4,
    Rule6 = 5,
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
            symmetry: SymmetryMode::Horizontal,
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

pub fn build_rule() -> [Rule; 6] {
    return [
        Rule {
            clauses: [Clause::new_null(), Clause::new_null(), Clause::new_null()],
        },
        Rule {
            clauses: [
                Clause {
                    probability: 1,
                    symmetry: SymmetryMode::Horizontal,
                    selector: Selector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule2,
                            Species::Wild,
                        ],
                    },
                },
                Clause {
                    probability: 1,

                    symmetry: SymmetryMode::Horizontal,
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
                            Species::Empty,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule2,
                        ],
                    },
                },
                Clause {
                    probability: 2,

                    symmetry: SymmetryMode::Horizontal,
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
                            Species::Rule4,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule4,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule2,
                        ],
                    },
                },
            ],
        },
        Rule {
            clauses: [
                Clause {
                    probability: 5,
                    symmetry: SymmetryMode::Horizontal,
                    selector: Selector {
                        grid: [
                            Species::Empty,
                            Species::Empty,
                            Species::Empty,
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
                            Species::Rule3,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule3,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                        ],
                    },
                },
                Clause {
                    probability: 1,
                    symmetry: SymmetryMode::Quad,
                    selector: Selector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Empty,
                            Species::Empty,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule3,
                            Species::Wild,
                        ],
                    },
                },
                Clause {
                    probability: 1,
                    symmetry: SymmetryMode::Horizontal,
                    selector: Selector {
                        grid: [
                            Species::Rule4,
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
                            Species::Rule3,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule3,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                        ],
                    },
                },
            ],
        },
        Rule {
            clauses: [
                Clause {
                    probability: 1,
                    symmetry: SymmetryMode::Horizontal,
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
                            Species::Empty,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule4,
                        ],
                    },
                },
                Clause {
                    probability: 1,
                    symmetry: SymmetryMode::Horizontal,
                    selector: Selector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
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
                            Species::Empty,
                            Species::Rule4,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                        ],
                    },
                },
                Clause::new_null(),
            ],
        },
        Rule {
            clauses: [
                Clause {
                    probability: 5,
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
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                        ],
                    },
                },
                Clause {
                    probability: 1,
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
                            Species::Rule3,
                            Species::Wild,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule5,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule5,
                            Species::Wild,
                        ],
                    },
                },
                Clause {
                    probability: 2,
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
                            Species::Empty,
                            Species::Wild,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule5,
                            Species::Wild,
                        ],
                    },
                },
            ],
        },
        Rule {
            clauses: [
                Clause {
                    probability: 1,
                    symmetry: SymmetryMode::Quad,
                    selector: Selector {
                        grid: [
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                            Species::Empty,
                            Species::Wild,
                        ],
                    },
                    effector: Effector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule6,
                            Species::Rule6,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                        ],
                    },
                },
                Clause {
                    probability: 4,
                    symmetry: SymmetryMode::Quad,
                    selector: Selector {
                        grid: [
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                            Species::Rule6,
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
                            Species::Empty,
                            Species::Rule6,
                            Species::Wild,
                            Species::Wild,
                            Species::Wild,
                        ],
                    },
                },
                Clause::new_null(),
            ],
        },
    ];
}

impl Species {
    pub fn update(&self, cell: Cell, api: SandApi) {
        let rule_sets = api.universe.rule_sets;
        match self {
            Species::Empty => {}
            Species::Wild => {}
            Species::Rule1 => execute_rule(cell, api, rule_sets[0]),
            Species::Rule2 => execute_rule(cell, api, rule_sets[1]),
            Species::Rule3 => execute_rule(cell, api, rule_sets[2]),
            Species::Rule4 => execute_rule(cell, api, rule_sets[3]),
            Species::Rule5 => execute_rule(cell, api, rule_sets[4]),
            Species::Rule6 => execute_rule(cell, api, rule_sets[5]),
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
        Species::Empty => 0,
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
    // let mut starting_energy = 0;

    // for x in 0..clause.selector.grid.len() {
    //     let (dx, dy) = process_coord(matrix_index(x), rx, ry, r);
    //     starting_energy += get_energy(api.get(dx, dy));
    // }

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

    if n_products > n_reagents && out_e < 1 {
        // failed due to insufficient energy
        return (false, api);
    }

    for x in 0..clause.effector.grid.len() {
        let (dx, dy) = process_coord(matrix_index(x), rx, ry, r);
        let out_slot = clause.effector.grid[x];

        match out_slot {
            Species::Empty => api.set(dx, dy, EMPTY_CELL),
            Species::Wild => (),
            _ => {
                api.set(
                    dx,
                    dy,
                    Cell {
                        species: out_slot,
                        energy: (out_e + rem) as u8,
                        ..cell
                    },
                );
                rem = 0;
            }
        }
    }

    return (true, api);
}

pub fn execute_clause(cell: Cell, api: SandApi, clause: Clause) -> (bool, SandApi) {
    if clause.probability == 0 || rand_int(2i32.pow((clause.probability) as u32)) > 1 {
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
            let (success, api) = execute_clause_orientation(cell, api, clause, 1, 1, r);

            if success {
                return (success, api);
            }
            r = (r + 1) % 4;
            let (success, api) = execute_clause_orientation(cell, api, clause, 1, 1, r);

            if success {
                return (success, api);
            }
            r = (r + 1) % 4;

            let (success, api) = execute_clause_orientation(cell, api, clause, 1, 1, r);

            if success {
                return (success, api);
            }
            r = (r + 1) % 4;

            return execute_clause_orientation(cell, api, clause, 1, 1, r);
        }
    }
}

pub fn execute_rule(cell: Cell, i_api: SandApi, rule: Rule) {
    let mut api = i_api;
    let r = rand_uint(rule.clauses.len());

    for c in 0..rule.clauses.len() {
        let clause = rule.clauses[(c + r) % rule.clauses.len()];

        let (success, o_api) = execute_clause(cell, api, clause);
        if success {
            break;
        };
        api = o_api;
    }
}
