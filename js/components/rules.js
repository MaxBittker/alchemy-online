import {
  Clause,
  Selector,
  Effector,
  SymmetryMode,
  Species,
  Universe,
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
  window.u.push_undo();
}

function getHistogram(universe) {
  let cell_pointer = universe.cells();
  let cells = new Uint8Array(
    memory.buffer,
    cell_pointer,
    universe.width() * universe.height() * 4
  );

  let elementHist = {};
  for (let i = 0; i < cells.length; i += 4) {
    elementHist[cells[i]] = (elementHist[cells[i]] || 0) + 1;
  }
  return elementHist;
}

function mutate_clause(elementHist, element, clause_index) {
  let clause = window.u.clause(element, clause_index);

  let values = [1, 2, 3, 4, 5, 6];

  let elementsPresent = Object.keys(elementHist);
  elementsPresent.forEach((ele) => {
    let n = 10 + Math.pow(elementHist[ele], 0.5);
    for (var i = 0; i < n; i++) {
      values.push(parseInt(ele, 10));
      values.push(Species.Wild);
    }
  });

  let effectorValues = values.slice(0);
  // console.log(effectorValues.length);
  let m = values.length;
  for (var i = 0; i < m * (0.4 + clause_index / 3); i++) {
    values.push(Species.Wild);
    // values.push(Species.Wild);
  }
  // console.log(elementHist);
  // console.log(values);
  const selector = Array.from(
    new Uint8Array(memory.buffer, clause.selector.grid(), 9)
  ).slice(0);
  const effector = Array.from(
    new Uint8Array(memory.buffer, clause.effector.grid(), 9)
  ).slice(0);

  let symmetry = clause.symmetry();
  let probability = clause.probability();

  selector.forEach((v) => {
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
    effectorValues.push(v);
  });
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

  if (selector[grid_index(x, y)] === Species.Wild) {
    x = Math.floor(Math.random() * 3);
    y = Math.floor(Math.random() * 3);
  }
  if (selector[grid_index(x, y)] === Species.Wild) {
    x = Math.floor(Math.random() * 3);
    y = Math.floor(Math.random() * 3);
  }
  // values = [values, ..]
  effector[grid_index(x, y)] =
    effectorValues[Math.floor(Math.random() * effectorValues.length)];

  effector.forEach((v, i) => {
    if (i == 4) {
      if (effector[i] == Species.Wild || Math.random() < 0.05) {
        effector[i] = element;
      }
      return;
    }
    if (selector[i] === Species.Wild && Math.random() < 0.1) {
      effector[i] = Species.Wild;
    } else {
      // if (effector[i] === Species.Wild) {
      // effector[i] = selector[i];
      // }
    }
  });
  if (Math.random() > 0.9) {
    symmetry =
      symmetry == SymmetryMode.Quad
        ? SymmetryMode.Horizontal
        : SymmetryMode.Quad;
  }

  if (Math.random() > 0.2 + probability * 0.7) {
    probability = probability == 1 ? 0 : 1;
  }
  let new_s = new Selector(...selector);
  let new_e = new Effector(...effector);

  let new_clause = new Clause(probability, symmetry, new_s, new_e);
  return new_clause;
}
function mutate(element) {
  let alternate_universe = window.test_universe;
  window.u.copy_into(alternate_universe);
  // let alternate_universe = Universe.clone_from(window.u);

  const elementHist = getHistogram(window.u);

  const new_clauses = [
    mutate_clause(elementHist, element, 0),
    mutate_clause(elementHist, element, 1),
    mutate_clause(elementHist, element, 2),
  ];
  alternate_universe.set_clause(new_clauses[0], element, 0);
  alternate_universe.set_clause(new_clauses[1], element, 1);
  alternate_universe.set_clause(new_clauses[2], element, 2);

  for (var t = 0; t < 8; t++) {
    alternate_universe.tick();
  }

  // let triggered = alternate_universe.heatmap(element * 3 + clause_index);
  // console.log(triggered);

  let elementHist_a = getHistogram(alternate_universe);

  // console.log(triggered);
  // console.log(elementHist_a);
  // if (triggered == 0) {
  //   console.log("not triggered");
  //   return 0;
  // }
  if (!elementHist_a[element]) {
    console.log("extinct!");
    return 0;
  }
  if (elementHist_a[element] / (elementHist[element] + 1) < 0.1) {
    console.log("decimated!");
    return 0;
  }

  if (
    !alternate_universe.heatmap(element * 3 + 0) &&
    !alternate_universe.heatmap(element * 3 + 1) &&
    !alternate_universe.heatmap(element * 3 + 2)
  ) {
    console.log("none trigger");
    return 0;
  }

  for (var t = 0; t < 10; t++) {
    alternate_universe.tick();
  }
  let elementHist_late = getHistogram(alternate_universe);

  let availableSpace =
    alternate_universe.width() * alternate_universe.height() * 0.95;
  // console.log(availableSpace, elementHist_late[element]);
  if (
    elementHist_late[element] / (elementHist[element] + 1) > 5 &&
    availableSpace / elementHist_late[element] > 0.5
  ) {
    console.log(
      "overgrown!",
      elementHist_late[element] / (elementHist[element] + 1)
    );
    return 0;
  }

  for (let c = 0; c < 3; c++) {
    alternate_universe.heatmap(element * 3 + c) &&
      window.u.set_clause(new_clauses[c], element, c);
  }

  return 1;
}

export { resetClause, mutate, swapClauses };
