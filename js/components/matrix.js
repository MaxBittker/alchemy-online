import React from "react";

let types = ["empty", "anything", "same"];

class Matrix extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ]
    };
  }
  gridSquare(x, y) {
    let { data } = this.state;

    let myCell = data[x][y];
    return (
      <g key={`${x}-${y}`}>
        <rect
          onClick={() => {
            data[x][y] = (data[x][y] + 1) % 10;
            this.setState({ data });
          }}
          x={x * 55 + 15}
          y={y * 55 + 15}
          width="50"
          height="50"
          className="mat-box"
          style={{
            fill: `hsl(${myCell * 40},50%,50%)`,

            strokeWidth: 1,
            stroke: "rgb(0, 0, 0)"
          }}
        />
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
    let { data } = this.state;

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
      data: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ]
    };
  }
  gridSquare(x, y) {
    let { data } = this.state;

    let myCell = data[x][y];
    return (
      <g>
        <rect
          onClick={() => {
            data[x][y] = (data[x][y] + 1) % 10;
            this.setState({ data });
          }}
          x={x * 55 + 15}
          y={y * 55 + 15}
          width="50"
          height="50"
          className="mat-box"
          style={{
            fill: `hsl(${myCell * 40},50%,50%)`,

            strokeWidth: 1,
            stroke: "rgb(0, 0, 0)"
          }}
        />
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
    let { data } = this.state;

    return (
      <div className="MatrixMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 200"
          width="100%"
          //   height="200"
        >
          <g>
            <Matrix />
          </g>
          <g transform="translate(185,80)">
            <polygon
              fill="white"
              stroke="black"
              points="15,0, 30,15 15,30, 15,20, 0,20, 0,10, 15,10 "
            />
          </g>
          <g transform="translate(210,0)">
            <Matrix />
          </g>
        </svg>
      </div>
    );
  }
}

export { Editor };
