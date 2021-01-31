import React from "react";
// import classNames from "classnames";
import { Clause, Selector, Effector } from "../../crate/pkg";
import { Matrix, SymmetryOptions, SlotOptions } from "./matrix";
let probabilityMap = [
  { p: 0, symbol: "\xa0×\xa0" },
  { p: 1, symbol: "\xa0\xa0\xa0" },
  // { p: 2, symbol: "⚁" },
  // { p: 3, symbol: "⚂" },
  // { p: 4, symbol: "⚃" },
  // { p: 5, symbol: "⚄" },
  // { p: 6, symbol: "⚅" },
];
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElement: props.selectedElement,
      clause_index: props.clause_index,
      clause: Editor.getRule(props.selectedElement, props.clause_index),
    };
    window.Editor = this;
  }

  static getRule(selectedElement, clause_index) {
    try {
      let clause = window.u.clause(selectedElement, clause_index);
      const selector = Array.from(
        new Uint8Array(memory.buffer, clause.selector.grid(), 9)
      ).slice(0);
      const effector = Array.from(
        new Uint8Array(memory.buffer, clause.effector.grid(), 9)
      ).slice(0);

      const symmetry = clause.symmetry();
      const probability = clause.probability();
      return {
        selector,
        effector,
        symmetry,
        probability: probabilityMap.find((v) => v.p == probability),
      };
    } catch (e) {
      console.error(e);
      return;
    }
  }
  static getDerivedStateFromProps(props, state) {
    let { selectedElement, clause_index } = props;
    if (selectedElement != state.selectedElement && selectedElement <= 6) {
      return {
        selectedElement,
        clause: Editor.getRule(selectedElement, clause_index),
      };
    }

    return null;
  }
  setRule() {
    let { clause } = this.state;
    let {
      selector: j_selector,
      effector: j_effector,
      symmetry: j_symmetry,
      probability,
    } = clause;

    let selector = new Selector(...j_selector);
    let effector = new Effector(...j_effector);
    let r_clause = new Clause(
      probability.p,
      SymmetryOptions[j_symmetry].key,
      selector,
      effector
    );
    window.u.set_clause(
      r_clause,
      this.props.selectedElement,
      this.props.clause_index
    );
  }

  incSymmetry(i) {
    let { clause } = this.state;
    let { symmetry } = clause;

    clause.symmetry =
      (SymmetryOptions.length + symmetry + i) % SymmetryOptions.length;

    this.setState(
      {
        clause,
      },
      this.setRule
    );
  }

  incProbability(i) {
    let { clause } = this.state;
    let { probability } = clause;

    let pIndex = probabilityMap.indexOf(probability);
    pIndex = (probabilityMap.length + pIndex + i) % probabilityMap.length;
    console.log(probabilityMap[pIndex]);
    clause.probability = probabilityMap[pIndex];

    this.setState(
      {
        clause,
      },
      this.setRule
    );
  }

  render() {
    let { selectedElement } = this.props;
    let { clause } = this.state;
    // console.log(clause);
    let { selector, effector, symmetry, probability } = clause;
    return (
      <div className="MatrixMenu">
        <div className="TileGrid">
          <div
            className="center"
            style={{
              fontSize: "30px",
              opacity: probability.p == 0 ? 0.2 : 1.0,
              gridColumn: 2,
              gridRow: 1,
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              this.incSymmetry(-1);
            }}
            onClick={() => this.incSymmetry(1)}
          >
            {SymmetryOptions[symmetry].symbol}
          </div>
          <img
            // className="center"
            src="assets/gold_arrow.png"
            height="23px"
            width="23px"
            style={{
              opacity: probability.p == "×" ? "0.7" : "1.0",
              gridColumn: 2,
              gridRow: 2,
              margin: "auto",
            }}
          />
          <div
            className="center"
            style={{
              fontSize: "45px",
              color: "#d03f41",
              gridColumn: 2,
              gridRow: 2,
              overflow: "hidden",
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              this.incProbability(-1);
            }}
            onClick={() => this.incProbability(1)}
          >
            {probability.symbol}
          </div>

          {selector && (
            <Matrix
              selectedElement={selectedElement}
              options={SlotOptions}
              grid={selector}
              isSelector
              isDisabled={probability.p == 0}
              setGrid={(newGrid) => {
                let { clause } = this.state;
                clause.selector = newGrid;
                this.setState({ clause }, this.setRule);
              }}
            />
          )}

          {effector && (
            <Matrix
              selectedElement={selectedElement}
              options={SlotOptions}
              grid={effector}
              isDisabled={probability.p == 0}
              setGrid={(newGrid) => {
                let { clause } = this.state;
                clause.effector = newGrid;
                this.setState({ clause }, this.setRule);
              }}
            />
          )}
          {/* </g> */}
        </div>
      </div>
    );
  }
}

export { Editor, probabilityMap };
