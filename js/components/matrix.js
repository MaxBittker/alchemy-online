import React from "react";
import {
  Species,
  Rule,
  SymmetryMode,
  Selector,
  Effector
} from "../../crate/pkg";

console.log(SymmetryMode);
console.log(Species);

// function keys(en) {
//   return Object.keys(en)
//     .filter(k => isNaN(parseFloat(k)))
//     .map(k => {
//       return { key: k, value: en[k] };
//     });
//   // .filter()
// }
let ruleSymbols = {
  [Species.Empty]: "×",
  [Species.Rule1]: "🜊",
  [Species.Rule2]: "☉",
  [Species.Rule3]: "☽",
  [Species.Rule4]: "🝆"
};

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
    key: Species.Empty,
    symbol: "×"
  },
  {
    key: Species.Wild,
    symbol: " "
  },
  {
    key: Species.Rule1,
    symbol: ruleSymbols[Species.Rule1]
  },
  {
    key: Species.Rule2,
    symbol: ruleSymbols[Species.Rule2]
  },
  {
    key: Species.Rule3,
    symbol: ruleSymbols[Species.Rule3]
  },
  {
    key: Species.Rule4,
    symbol: ruleSymbols[Species.Rule4]
  }
];

// let OutSlotOptions = [
//   {
//     key: OutSlot.Empty,
//     symbol: "×"
//   },
//   {
//     key: OutSlot.Nop,
//     symbol: " "
//   },
//   {
//     key: OutSlot.Me,
//     symbol: "?"
//   }
// ];

function grid_index(x, y) {
  return y * 3 + x;
}
class Matrix extends React.Component {
  constructor(props) {
    super(props);
  }

  gridSquare(x, y, isCenter) {
    let { grid, options, selectedElement } = this.props;

    let myCell = grid[grid_index(x, y)];

    // console.log(options, myCell);
    let { symbol } = options.find(m => m.key == myCell);
    // console.log(symbol);
    let incSlot = i => {
      if (isCenter) return;

      let { grid, options } = this.props;
      let slotIndex = options.findIndex(e => e.key == myCell);
      slotIndex = (slotIndex + options.length + i) % options.length;
      let next = options[slotIndex];

      grid[grid_index(x, y)] = next.key;
      // (myCell + 1) % options.length;
      let { setGrid } = this.props;
      setGrid(grid);
    };
    return (
      <g
        key={`${x}-${y}`}
        transform={`translate(${x * 55 + 15},${y * 55 + 15})`}
        className={isCenter ? "disabled" : ""}
        onContextMenu={e => {
          e.preventDefault();
          incSlot(-1, isCenter);
        }}
        onClick={() => incSlot(1, isCenter)}
      >
        <rect
          x={0}
          y={0}
          width="50"
          height="50"
          className="mat-box"
          style={{
            fill: symbol == " " ? "#c0c0c0" : window.pallette[myCell],
            strokeWidth: 1
          }}
        />
        <text x={25} y={30} style={{ fontSize: "30px" }}>
          {isCenter || symbol == "?" ? ruleSymbols[selectedElement] : symbol}
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
      selectedElement: props.selectedElement,
      rule: Editor.getRule(props.selectedElement)
    };
    window.Editor = this;
  }
  static getRule(selectedElement) {
    let rule = window.u.rule(selectedElement);

    const selector = Array.from(
      new Uint8Array(memory.buffer, rule.selector.grid(), 9)
    );
    const effector = Array.from(
      new Uint8Array(memory.buffer, rule.effector.grid(), 9)
    );
    const symmetry = rule.symmetry();

    return {
      selector,
      effector,
      symmetry
    };
  }
  static getDerivedStateFromProps(props, state) {
    let { selectedElement } = props;
    if (selectedElement != state.selectedElement && selectedElement < 4) {
      return {
        selectedElement,
        rule: Editor.getRule(selectedElement)
      };
    }

    return null;
  }
  setRule() {
    let { rule } = this.state;
    let {
      selector: j_selector,
      effector: j_effector,
      symmetry: j_symmetry
    } = rule;
    // console.log(j_selector);
    let selector = new Selector(...j_selector);
    // let selector = new Selector(...j_selector.map(v => SlotOptions[v].key));
    let effector = new Effector(...j_effector);
    // let effector = new Effector(...j_effector.map(v => OutSlotOptions[v].key));
    let r_rule = new Rule(SymmetryOptions[j_symmetry].key, selector, effector);
    window.u.set_rule(r_rule, this.props.selectedElement);
  }

  incSymmetry(i) {
    let { rule } = this.state;
    let { symmetry } = rule;

    rule.symmetry =
      (SymmetryOptions.length + symmetry + i) % SymmetryOptions.length;

    this.setState(
      {
        rule
      },
      this.setRule
    );
  }
  render() {
    let { selectedElement } = this.props;
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
              fill: "rgba(255,255,255,0.9)"
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
          <g transform="translate(20,0)">
            {selector && (
              <Matrix
                selectedElement={selectedElement}
                options={SlotOptions}
                grid={selector}
                isSelector
                setGrid={newGrid => {
                  let { rule } = this.state;
                  rule.selector = newGrid;
                  this.setState({ rule }, this.setRule);
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
                  let { rule } = this.state;
                  rule.effector = newGrid;
                  this.setState({ rule }, this.setRule);
                }}
              />
            )}
          </g>
        </svg>
      </div>
    );
  }
}

export { Editor, ruleSymbols };
