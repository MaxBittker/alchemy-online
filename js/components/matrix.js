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
  [Species.Rule6]: "🜏"
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
  },
  {
    key: Species.Rule5,
    symbol: ruleSymbols[Species.Rule5]
  },
  {
    key: Species.Rule6,
    symbol: ruleSymbols[Species.Rule6]
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
    if (isCenter) {
      myCell = selectedElement;
    }
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
    let size = isCenter ? "42" : 46;
    let inset = isCenter ? 4 : 2;
    return (
      <g
        // filter="url(#filter1)"
        key={`${x}-${y}`}
        transform={`translate(${x * 55 + 15},${y * 55 + 15})`}
        className={isCenter ? "disabled" : ""}
        onContextMenu={e => {
          e.preventDefault();
          incSlot(-1, isCenter);
        }}
        onClick={() => incSlot(1, isCenter)}
        onDrop={e => {
          if (isCenter) return;

          var element = e.dataTransfer.getData("text");
          grid[grid_index(x, y)] = parseInt(element, 10);
          let { setGrid } = this.props;
          setGrid(grid);
        }}
        onDragOver={e => e.preventDefault()}
      >
        <rect
          x={inset}
          y={inset}
          width={size}
          height={size}
          className="mat-box"
          style={{
            fill: symbol == " " ? "#b0b0b055" : window.pallette[myCell],
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
        <filter id="filter1">
          <feFlood floodColor="#444" result="COLOR-red" />

          <feMorphology
            operator="dilate"
            radius="2"
            in="SourceAlpha"
            result="STROKE_10"
          />

          <feConvolveMatrix
            order="8,8"
            divisor="1"
            kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1"
            in="STROKE_10"
            result="BEVEL_20"
          />

          <feOffset dx="0.5" dy="0.5" in="BEVEL_0" result="BEVEL_25" />
          <feComposite
            operator="out"
            in="BEVEL_25"
            in2="STROKE_10"
            result="BEVEL_30"
          />
          <feComposite
            in="COLOR-red"
            in2="BEVEL_30"
            operator="in"
            result="BEVEL_40"
          />
          <feMerge result="BEVEL_50">
            <feMergeNode in="BEVEL_40" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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
