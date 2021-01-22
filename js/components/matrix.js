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
  [Species.Rule4]: "🝆",
  [Species.Rule5]: "🜁",
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
    symbol: "×",
  },
  {
    key: Species.Wild,
    symbol: " ",
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

  gridSquare(x, y, isCenter) {
    let { grid, options, selectedElement } = this.props;

    let myCell = grid[grid_index(x, y)];
    if (isCenter) {
      myCell = selectedElement;
    }
    let { symbol } = options.find((m) => m.key == myCell);
    let incSlot = (i) => {
      if (isCenter) return;

      let { grid, options } = this.props;
      let slotIndex = options.findIndex((e) => e.key == myCell);
      slotIndex = (slotIndex + options.length + i) % options.length;
      let next = options[slotIndex];

      grid[grid_index(x, y)] = next.key;
      // (myCell + 1) % options.length;
      let { setGrid } = this.props;
      setGrid(grid);
    };
    let size = isCenter ? 44 : 46;
    let inset = isCenter ? 4 : 2;
    return (
      <g
        key={`${x}-${y}`}
        transform={`translate(${x * 55 + 15},${y * 55 + 15})`}
        className={isCenter ? "disabled" : ""}
        onContextMenu={(e) => {
          e.preventDefault();
          incSlot(-1, isCenter);
        }}
        onClick={() => incSlot(1, isCenter)}
        onDrop={(e) => {
          if (isCenter) return;

          var element = e.dataTransfer.getData("text");
          grid[grid_index(x, y)] = parseInt(element, 10);
          let { setGrid } = this.props;
          setGrid(grid);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <foreignObject x={inset} y={inset} width={size} height={size}>
          <button
            className="mat-box"
            draggable="true"
            style={{
              width: size,
              height: size,
              filter: "saturate(0.8)",
              backgroundColor:
                symbol == " " ? "#b0b0b055" : window.pallette[myCell],
              borderColor:
                symbol == " " ? "#b0b0b055" : window.pallette[myCell],
              borderWidth: 3,
              fontSize: "30px",
            }}
            onDragStart={(e) => {
              let target = e.target;
              target.style.width = "30px";
              target.style.height = "30px";
              target.style.fontSize = "18px";

              setTimeout(function () {
                target.style.width = size + "px";
                target.style.height = size + "px";
                target.style.fontSize = "30px";
              }, 1);
              e.dataTransfer.setData("text/plain", myCell);
            }}
          >
            {isCenter || symbol == "?" ? ruleSymbols[selectedElement] : symbol}
          </button>
        </foreignObject>
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
          this.gridSquare(2, 2),
        ]}
      </g>
    );
  }
}

export { Matrix, ruleSymbols, SymmetryOptions, SlotOptions };
