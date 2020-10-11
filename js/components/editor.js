import React from "react";
import { Clause, Selector, Effector } from "../../crate/pkg";
import { Matrix, SymmetryOptions, SlotOptions } from "./matrix";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElement: props.selectedElement,
      clause_index: props.clause_index,
      clause: Editor.getRule(props.selectedElement, props.clause_index)
    };
    window.Editor = this;
  }
  static getRule(selectedElement, clause_index) {
    console.log(selectedElement, clause_index);
    let clause = window.u.clause(selectedElement, clause_index);
    // let clause = rule.clause(clause_index);
    const selector = Array.from(
      new Uint8Array(memory.buffer, clause.selector.grid(), 9)
    );
    const effector = Array.from(
      new Uint8Array(memory.buffer, clause.effector.grid(), 9)
    );
    const symmetry = clause.symmetry();

    return {
      selector,
      effector,
      symmetry
    };
  }
  static getDerivedStateFromProps(props, state) {
    let { selectedElement, clause_index } = props;
    if (selectedElement != state.selectedElement && selectedElement < 6) {
      return {
        selectedElement,
        clause: Editor.getRule(selectedElement, clause_index)
      };
    }

    return null;
  }
  setRule() {
    let { clause } = this.state;
    let {
      selector: j_selector,
      effector: j_effector,
      symmetry: j_symmetry
    } = clause;

    let selector = new Selector(...j_selector);
    let effector = new Effector(...j_effector);
    let r_clause = new Clause(
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
        clause
      },
      this.setRule
    );
  }
  render() {
    let { selectedElement } = this.props;
    let { clause } = this.state;
    // console.log(clause);
    let { selector, effector, symmetry } = clause;

    return (
      <div className="MatrixMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-10 0 410 200"
          width="100%"
        >
          <circle
            cx={12}
            cy={94}
            r="16"
            className="mat-circle"
            style={{
              strokeWidth: 1,
              fill: "rgba(255,255,255,0.5)"
            }}
          ></circle>

          <text
            x="12"
            y="98"
            style={{ fontSize: "30px" }}
            onContextMenu={e => {
              e.preventDefault();
              this.incSymmetry(-1);
            }}
            onClick={() => this.incSymmetry(1)}
          >
            {SymmetryOptions[symmetry].symbol}
          </text>

          {symmetry > 0 && (
            <>
              <g transform="translate(20,0)">
                {selector && (
                  <Matrix
                    selectedElement={selectedElement}
                    options={SlotOptions}
                    grid={selector}
                    isSelector
                    setGrid={newGrid => {
                      let { clause } = this.state;
                      clause.selector = newGrid;
                      this.setState({ clause }, this.setRule);
                    }}
                  />
                )}
              </g>
              <g transform="translate(195,80)">
                <polygon
                  fill="white"
                  stroke="black"
                  points="15,0, 25,15 15,30, 15,20, 8,20, 8,10, 15,10 "
                />
              </g>
              <g transform="translate(210,0)">
                {effector && (
                  <Matrix
                    selectedElement={selectedElement}
                    options={SlotOptions}
                    grid={effector}
                    setGrid={newGrid => {
                      let { clause } = this.state;
                      clause.effector = newGrid;
                      this.setState({ clause }, this.setRule);
                    }}
                  />
                )}
              </g>
            </>
          )}
        </svg>
      </div>
    );
  }
}

export { Editor };
