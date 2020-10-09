import React from "react";
// import { Rule } from "../../../crate/pkg/species";
import {
  Universe,
  Species,
  Rule,
  SymmetryMode,
  Selector,
  Effector,
  Slot,
  OutSlot
} from "../../crate/pkg";
// console.log(Species);
console.log(SymmetryMode);
console.log(Slot);
console.log(OutSlot);

function keys(en) {
  return Object.keys(en)
    .filter(k => isNaN(parseFloat(k)))
    .map(k => {
      return { key: k, value: en[k] };
    });
  // .filter()
}
let SymmetryOptions = [
  {
    key: SymmetryMode.None,
    symbol: "ⵔ"
  },
  {
    key: SymmetryMode.Horizontal,
    symbol: "🜕"
  },
  {
    key: SymmetryMode.Vertical,
    symbol: "🜔"
  },
  {
    key: SymmetryMode.Quad,
    symbol: "🜨"
  }
];
let SlotOptions = [
  {
    key: Slot.Anything,
    symbol: " "
  },
  {
    key: Slot.Empty,
    symbol: "×"
  }
];

let OutSlotOptions = [
  {
    key: OutSlot.Nop,
    symbol: " "
  },
  {
    key: OutSlot.Empty,
    symbol: "×"
  },
  {
    key: OutSlot.Me,
    symbol: "☉"
  }
];

function grid_index(x, y) {
  return y * 3 + x;
}
class Matrix extends React.Component {
  constructor(props) {
    super(props);
  }

  gridSquare(x, y, isCenter) {
    let { grid, options } = this.props;

    let myCell = grid[grid_index(x, y)];

    let { symbol } = options[myCell];
    return (
      <g
        key={`${x}-${y}`}
        transform={`translate(${x * 55 + 15},${y * 55 + 15})`}
        className={isCenter ? "disabled" : ""}
        onClick={() => {
          if (isCenter) {
            return;
          }
          grid[grid_index(x, y)] = (myCell + 1) % this.props.options.length;
          let { setGrid } = this.props;
          setGrid(grid);
        }}
      >
        <rect
          x={0}
          y={0}
          width="50"
          height="50"
          className="mat-box"
          style={{
            fill: symbol == " " ? "#c0c0c0" : "",
            strokeWidth: 1
          }}
        />
        <text x={25} y={30} style={{ fontSize: "30px" }}>
          {isCenter ? "☉" : symbol}
        </text>
      </g>
    );
  }
  render() {
    // let { data } = this.state;
    let { isSelector } = this.props;
    return (
      <g>
        {[
          this.gridSquare(0, 0),
          this.gridSquare(0, 1),
          this.gridSquare(0, 2),

          this.gridSquare(1, 0),
          this.gridSquare(1, 1, isSelector),
          this.gridSquare(1, 2),

          this.gridSquare(2, 0),
          this.gridSquare(2, 1),
          this.gridSquare(2, 2)
        ]}
      </g>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rule: {
        selector: [0, 0, 0, 0, 0, 0, 0, 1, 0],
        effector: [0, 0, 0, 0, 1, 0, 0, 2, 0],
        symmetry: 0
      }
    };
    window.Editor = this;
  }
  setRule() {
    let { rule } = this.state;
    let {
      selector: j_selector,
      effector: j_effector,
      symmetry: j_symmetry
    } = rule;

    let selector = new Selector(...j_selector.map(v => SlotOptions[v].key));
    let effector = new Effector(...j_effector.map(v => OutSlotOptions[v].key));

    let r_rule = new Rule(SymmetryOptions[j_symmetry].key, selector, effector);

    window.u.set_rule(r_rule);
  }
  render() {
    let { rule } = this.state;
    let { selector, effector, symmetry } = rule;

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
              fill: "white"
            }}
          ></circle>

          <text
            x="12"
            y="98"
            style={{ fontSize: "30px" }}
            onClick={() => {
              let { rule } = this.state;
              rule.symmetry = (symmetry + 1) % SymmetryOptions.length;
              this.setState({
                rule
              });
            }}
          >
            {SymmetryOptions[symmetry].symbol}
          </text>
          <g transform="translate(20,0)">
            <Matrix
              options={SlotOptions}
              grid={selector}
              isSelector
              setGrid={newGrid => {
                let { rule } = this.state;
                rule.selector = newGrid;
                this.setState({ rule }, this.setRule);
              }}
            />
          </g>
          <g transform="translate(195,80)">
            <polygon
              fill="white"
              stroke="black"
              points="15,0, 25,15 15,30, 15,20, 8,20, 8,10, 15,10 "
            />
          </g>
          <g transform="translate(210,0)">
            <Matrix
              options={OutSlotOptions}
              grid={effector}
              setGrid={newGrid => {
                let { rule } = this.state;
                rule.effector = newGrid;
                this.setState({ rule }, this.setRule);
              }}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export { Editor };
