import React from "react";
import { Species, SymmetryMode } from "../../crate/pkg";

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
    key: SymmetryMode.Disabled,
    symbol: "×"
  },
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

    let { symbol } = options.find(m => m.key == myCell);
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

export { Matrix, ruleSymbols, SymmetryOptions, SlotOptions };
