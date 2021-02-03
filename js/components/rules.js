import {
  Clause,
  Selector,
  Effector,
  SymmetryMode,
  Species,
} from "../../crate/pkg";
import { memory } from "../../crate/pkg/sandtable_bg";

import { SymmetryOptions } from "./matrix";
import { probabilityMap } from "./editor";
import { grid_index } from "./matrix";

function resetClause(element, clause_index) {
  let selector = new Selector(
    Species.Wild,
    Species.Wild,
    Species.Wild,

    Species.Wild,
    element,
    Species.Wild,

    Species.Wild,
    Species.Wild,
    Species.Wild
  );
  let effector = new Effector(
    Species.Wild,
    Species.Wild,
    Species.Wild,

    Species.Wild,
    element,
    Species.Wild,

    Species.Wild,
    Species.Wild,
    Species.Wild
  );
  let r_clause = new Clause(
    probabilityMap[1].p,
    SymmetryOptions[0].key,
    selector,
    effector
  );
  universe.set_clause(r_clause, element, clause_index);
}

function swapClauses(element, c1, c2) {
  let clause = window.u.clause(element, c1);

  const selector = Array.from(
    new Uint8Array(memory.buffer, clause.selector.grid(), 9)
  ).slice(0);
  const effector = Array.from(
    new Uint8Array(memory.buffer, clause.effector.grid(), 9)
  ).slice(0);
  let symmetry = clause.symmetry();
  let probability = clause.probability();

  let new_s = new Selector(...selector);
  let new_e = new Effector(...effector);
  let r_clause = new Clause(probability, symmetry, new_s, new_e);

  let clause2 = window.u.clause(element, c2);

  window.u.set_clause(clause2, element, c1);

  window.u.set_clause(r_clause, element, c2);
}

function mutate(element, clause_index) {
  let clause = window.u.clause(element, clause_index);

  const selector = Array.from(
    new Uint8Array(memory.buffer, clause.selector.grid(), 9)
  ).slice(0);
  const effector = Array.from(
    new Uint8Array(memory.buffer, clause.effector.grid(), 9)
  ).slice(0);
  let symmetry = clause.symmetry();
  let probability = clause.probability();

  let values = [
    element,
    element,
    element,
    element,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    element,
    element,
    element,
    element,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Empty,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    Species.Wild,
    1,
    2,
    3,
    4,
    5,
    6,
  ];

  let x = Math.floor(Math.random() * 3);
  let y = Math.floor(Math.random() * 3);
  while (x == 1 && y == 1) {
    x = Math.floor(Math.random() * 3);
    y = Math.floor(Math.random() * 3);
  }

  selector[grid_index(x, y)] =
    values[Math.floor(Math.random() * values.length)];

  x = Math.floor(Math.random() * 3);
  y = Math.floor(Math.random() * 3);

  effector[grid_index(x, y)] =
    values[Math.floor(Math.random() * values.length)];

  if (Math.random() > 0.9) {
    symmetry =
      symmetry == SymmetryMode.Quad
        ? SymmetryMode.Horizontal
        : SymmetryMode.Quad;
  }

  let new_s = new Selector(...selector);
  let new_e = new Effector(...effector);
  console.log(probability, symmetry);
  let r_clause = new Clause(probability, symmetry, new_s, new_e);
  window.u.set_clause(r_clause, element, clause_index);
}

export { resetClause, mutate, swapClauses };
