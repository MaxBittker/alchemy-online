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

let SlotOptions = [
  {
    key: Slot.Anything,
    symbol: "*"
  },
  {
    key: Slot.Empty,
    symbol: "∅"
  }
];

let OutSlotOptions = [
  {
    key: OutSlot.Nop,
    symbol: " "
  },
  {
    key: OutSlot.Empty,
    symbol: "∅"
  },
  {
    key: OutSlot.Me,
    symbol: "i"
  }
];

function grid_index(x, y) {
  return y * 3 + x;
}
class Matrix extends React.Component {
  constructor(props) {
    super(props);
  }

  gridSquare(x, y) {
    let { grid } = this.props;

    let myCell = grid[grid_index(x, y)];
    return (
      <g
        key={`${x}-${y}`}
        transform={`translate(${x * 55 + 15},${y * 55 + 15})`}
        onClick={() => {
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
            // fill: `hsl(${myCell * 40},50%,50%)`,

            strokeWidth: 1,
            stroke: "rgb(0, 0, 0)"
          }}
        />
        <text x={20} y={35} style={{ fontSize: "30px" }}>
          {this.props.options[myCell].symbol}
        </text>
        {/* <circle
          cx={x * 55 + 15 + 25}
          cy={y * 55 + 15 + 25}
          r="20"
          className="mat-circle"
          style={{
            strokeWidth: 1,
            stroke: "rgb(0, 0, 0)"
          }}
        ></circle> */}
      </g>
    );
  }
  render() {
    // let { data } = this.state;

    return (
      <g>
        {[
          this.gridSquare(0, 0),
          this.gridSquare(0, 1),
          this.gridSquare(0, 2),

          this.gridSquare(1, 0),
          this.gridSquare(1, 1),
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
        effector: [0, 0, 0, 0, 1, 0, 0, 2, 0]
      }
    };
  }
  setRule() {
    let { rule } = this.state;
    let { selector: j_selector, effector: j_effector } = rule;

    let selector = new Selector(...j_selector.map(v => SlotOptions[v].key));
    let effector = new Effector(...j_effector.map(v => OutSlotOptions[v].key));

    let r_rule = new Rule(SymmetryMode.j_effector, selector, effector);

    window.u.set_rule(r_rule);
  }
  render() {
    let { rule } = this.state;
    let { selector, effector } = rule;

    return (
      <div className="MatrixMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 200"
          width="100%"
          //   height="200"
        >
          <g>
            <Matrix
              options={SlotOptions}
              grid={selector}
              setGrid={newGrid => {
                let { rule } = this.state;
                rule.selector = newGrid;
                this.setState({ rule }, this.setRule);
              }}
            />
          </g>
          <g transform="translate(185,80)">
            <polygon
              fill="white"
              stroke="black"
              points="15,0, 30,15 15,30, 15,20, 0,20, 0,10, 15,10 "
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
