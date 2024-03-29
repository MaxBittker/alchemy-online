import React from "react";
import { Species, SymmetryMode } from "../../crate/pkg";
import classNames from "classnames";

// function keys(en) {
//   return Object.keys(en)
//     .filter(k => isNaN(parseFloat(k)))
//     .map(k => {
//       return { key: k, value: en[k] };
//     });
//   // .filter()
// }
let ruleSymbols = {
  [Species.Empty]: "🜂",
  [Species.Rule1]: "🝊",
  [Species.Rule2]: "☉",
  [Species.Rule3]: "☽",
  [Species.Rule4]: "🜛",
  [Species.Rule5]: "🜝",
  [Species.Rule6]: "🜏",
};

let SymmetryOptions = [
  // {
  //   key: SymmetryMode.None,
  //   symbol: "ⵔ",
  // },
  {
    key: SymmetryMode.Horizontal,
    symbol: "🜕",
  },
  // {
  //   key: SymmetryMode.Vertical,
  //   symbol: "🜔",
  // },
  {
    key: SymmetryMode.Quad,
    symbol: "🜨",
  },
];
let SlotOptions = [
  {
    key: Species.Empty,
    symbol: ruleSymbols[Species.Empty],
  },
  {
    key: Species.Wild,
    symbol: "*",
  },
  {
    key: Species.Rule1,
    symbol: ruleSymbols[Species.Rule1],
  },
  {
    key: Species.Rule2,
    symbol: ruleSymbols[Species.Rule2],
  },
  {
    key: Species.Rule3,
    symbol: ruleSymbols[Species.Rule3],
  },
  {
    key: Species.Rule4,
    symbol: ruleSymbols[Species.Rule4],
  },
  {
    key: Species.Rule5,
    symbol: ruleSymbols[Species.Rule5],
  },
  {
    key: Species.Rule6,
    symbol: ruleSymbols[Species.Rule6],
  },
];

function grid_index(x, y) {
  return y * 3 + x;
}
class Matrix extends React.Component {
  constructor(props) {
    super(props);
  }

  gridSquare(x, y, isSelector, isCenter) {
    let { grid, options, selectedElement } = this.props;
    let inactive = isSelector && isCenter;
    let myCell = grid[grid_index(x, y)];
    if (inactive) {
      myCell = selectedElement;
    }
    let { symbol } = options.find((m) => m.key == myCell);
    let incSlot = (i) => {
      if (inactive) return;

      let { grid, options } = this.props;
      let slotIndex = options.findIndex((e) => e.key == myCell);
      slotIndex = (slotIndex + options.length + i) % options.length;
      if (
        isCenter &&
        slotIndex == options.findIndex((e) => e.key === Species.Wild)
      ) {
        slotIndex = (slotIndex + options.length + i) % options.length;
      }
      let next = options[slotIndex];

      grid[grid_index(x, y)] = next.key;
      // (myCell + 1) % options.length;
      let { setGrid } = this.props;
      setGrid(grid);
    };
    let size = isCenter ? 50 : 50;
    let inset = isCenter ? 2 : 2;
    let isWild = symbol === "*";
    return (
      <div
        key={`${x}-${y}`}
        transform={`translate(${x * 51},${y * 51})`}
        onContextMenu={(e) => {
          e.preventDefault();
          incSlot(-1, inactive);
        }}
        onClick={() => incSlot(1)}
        onDrop={(e) => {
          if (inactive) return;

          var element = e.dataTransfer.getData("text");
          let elementID = parseInt(element, 10);
          if (!SlotOptions.find((m) => m.key == elementID)) {
            return;
          }

          grid[grid_index(x, y)] = elementID;
          let { setGrid } = this.props;
          setGrid(grid);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <button
          className="mat-box"
          draggable="true"
          style={{
            width: size - inset,
            height: size - inset,
            filter: "saturate(0.8)",
            color: isWild ? "#666" : "black",
            backgroundColor: isWild ? "#dddddd00" : window.pallette[myCell],
            borderColor: isWild ? "#aaaaaaaa" : window.pallette[myCell],
            backgroundImage: 'url("assets/paper.png")',
            backgroundSize: "100px 100px",
            borderWidth: 3,
            fontSize: "30px",
            borderStyle: " outset",
            lineHeight: 0,
            verticalAlign: "middle",
          }}
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", myCell);
          }}
        >
          {inactive || symbol == "?" ? ruleSymbols[selectedElement] : symbol}
        </button>
      </div>
    );
  }
  render() {
    // let { data } = this.state;
    let { isSelector, isDisabled } = this.props;
    return (
      <div
        className={classNames(
          { disabled: this.props.isDisabled },
          "matrix-grid"
        )}
      >
        {[
          this.gridSquare(0, 0, isSelector),
          this.gridSquare(0, 1, isSelector),
          this.gridSquare(0, 2, isSelector),

          this.gridSquare(1, 0, isSelector),
          this.gridSquare(1, 1, isSelector, true),
          this.gridSquare(1, 2, isSelector),

          this.gridSquare(2, 0, isSelector),
          this.gridSquare(2, 1, isSelector),
          this.gridSquare(2, 2, isSelector),
        ]}
      </div>
    );
  }
}

export { Matrix, ruleSymbols, SymmetryOptions, SlotOptions, grid_index };
