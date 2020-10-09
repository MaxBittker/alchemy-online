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
    Rule1 = 3,
    Water = 4,
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
    pub symmetry: SymmetryMode,
    pub selector: Selector,
    pub effector: Effector,
}

#[wasm_bindgen]
impl Rule {
    #[wasm_bindgen(constructor)]
    pub fn new(symmetry: SymmetryMode, selector: Selector, effector: Effector) -> Rule {
        return Rule {
            symmetry,
            selector,
            effector,
        };
    }
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Slot {
    Empty = 0,
    Anything = 1,
    Full = 2,
    Glass = 3,
    Water = 4,
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
impl Selector {
    #[wasm_bindgen(constructor)]
    pub fn new(
        v1: Slot,
        v2: Slot,
        v3: Slot,
        v4: Slot,
        v5: Slot,
        v6: Slot,
        v7: Slot,
        v8: Slot,
        v9: Slot,
    ) -> Selector {
        return Selector {
            grid: [v1, v2, v3, v4, v5, v6, v7, v8, v9],
        };
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Effector {
    grid: [OutSlot; 9],
}

#[wasm_bindgen]
impl Effector {
    #[wasm_bindgen(constructor)]
    pub fn new(
        v1: OutSlot,
        v2: OutSlot,
        v3: OutSlot,
        v4: OutSlot,
        v5: OutSlot,
        v6: OutSlot,
        v7: OutSlot,
        v8: OutSlot,
        v9: OutSlot,
    ) -> Effector {
        return Effector {
            grid: [v1, v2, v3, v4, v5, v6, v7, v8, v9],
        };
    }
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
        let (dx, dy) = matrix_index(x);
        if (dx != 0 || dy != 0) && !check_cell(rule.selector.grid[x], api.get(dx, dy)) {
            // passes = false;
            return;
        }
    }
    for x in 0..rule.effector.grid.len() {
        let (dx, dy) = matrix_index(x);
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
                Slot::Empty,
                Slot::Empty,
                Slot::Empty,
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
        let rule = api.universe.active_rule;
        match self {
            Species::Empty => {}
            Species::Glass => {}

            Species::Rule1 => execute_rule(cell, api, rule),
            Species::Water => update_water(cell, api),
            Species::Sand => update_sand(cell, api),
        }
    }
}

pub fn update_sand(cell: Cell, mut api: SandApi) {
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
