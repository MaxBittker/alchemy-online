import React from "react";
import { Link } from "react-router-dom";

import { memory } from "../../crate/pkg/sandtable_bg";
import { Species } from "../../crate/pkg/sandtable";

import { height, universe, width, reset } from "../index.js";
import { exportGif, pallette } from "../render.js";
import Menu from "./menu.js";
import { Editor } from "./editor";
import { ruleSymbols } from "./matrix";

window.species = Species;
let pallette_data = pallette();
window.pallette = pallette_data;
const OrganicButton = ({ onClick, className, style, children }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        ...style
      }}
    >
      {children}
    </button>
  );
};

const ElementButton = (name, selectedElement, setElement) => {
  let elementID = Species[name];

  let color = pallette_data[elementID];

  let selected = elementID == selectedElement;

  let background = "inherit";

  let text = name;
  if (ruleSymbols[elementID]) {
    text = ruleSymbols[elementID];
  }

  return (
    <button
      className={selected ? `selected ${name}` : name}
      key={name}
      onClick={() => {
        setElement(elementID);
      }}
      style={{
        background,
        backgroundColor: color,
        borderColor: color,
        filter: selected || `saturate(0.4) `
        // lineHeight: 0
      }}
    >
      {"  "}
      {text}
      {"  "}
    </button>
  );
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionMenuOpen: false,
      paused: false,
      ff: false,
      submitting: false,
      size: 1,
      dataURL: null,
      currentSubmission: null,
      selectedElement: Species.Rule2
    };
    window.UI = this;
  }

  componentDidUpdate(prevProps) {}
  togglePause() {
    window.paused = !this.state.paused;
    this.setState({ paused: !this.state.paused });
  }
  toggleFF() {
    window.ff = !this.state.ff;
    this.setState({ ff: !this.state.ff });
  }
  play() {
    window.paused = false;
    this.setState({ paused: false });
  }
  pause() {
    window.paused = true;
    this.setState({ paused: true });
  }

  setSize(event, size) {
    event.preventDefault();
    this.setState({
      size
    });
  }
  reset() {
    // if (window.confirm("Reset your ecosystem?")) {
    this.play();
    this.setState({ currentSubmission: null });

    reset();
    // }
  }

  closeMenu() {
    this.play();
    this.setState({ dataURL: null });
  }
  upload() {
    console.log("saving");
    // let dataURL = snapshot(universe);
    const cells = new Uint8Array(
      memory.buffer,
      universe.cells(),
      width * height * 4
    );

    // Create canvas
    let canvas = document.createElement("canvas"),
      context = canvas.getContext("2d"),
      imgData = context.createImageData(width, height);

    canvas.height = height;
    canvas.width = width;

    // fill imgData with data from cells
    for (var i = 0; i < width * height * 4; i++) {
      if (i % 4 == 3) {
        imgData.data[i] = 255;
      } else {
        imgData.data[i] = cells[i];
      }
    }
    // put data to context at (0, 0)
    context.putImageData(imgData, 0, 0);

    let cellData = canvas.toDataURL("image/png");
    let dataString = JSON.stringify(cellData);
    try {
      // localStorage.setItem("cell_data", dataString);
      // localStorage.setItem("time", window.t);
    } catch {
      console.log("store failed");
    }

    try {
    } catch {
      console.log("store failed");
    }
  }
  currentDateString() {
    let date = new Date();
    return `${date.getMonth()}-${date.getDate()}`;
  }

  load() {
    console.log("loading");
    return;
    var cellData = JSON.parse(localStorage.getItem("cell_data"));

    if (!cellData) {
      console.log("no save");
      window.setInterval(() => this.upload(), 1000 * 10);

      return;
    }

    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = cellData;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const cellsData = new Uint8Array(
        memory.buffer,
        universe.cells(),
        width * height * 4
      );

      // universe.reset();

      for (var i = 0; i < width * height * 4; i++) {
        cellsData[i] = imgData.data[i];
      }

      window.setInterval(() => this.upload(), 1000 * 10);
    };

    // universe.flush_undos();
    // universe.push_undo();
    // this.pause();
  }

  render() {
    let { ff, selectedElement, currentSubmission, paused } = this.state;
    let hash =
      currentSubmission && currentSubmission.id
        ? `#${currentSubmission.id}`
        : "";

    let activeSpecies = Object.keys(Species).filter(
      name => name.length > 2 && name != "Wild"
    );

    return (
      <div className="window fade ultima" id="HUD">
        {/* <div className="title-bar"> */}
        {/* <div className="title-bar-text">Tile Toy</div> */}
        {/* <div className="title-bar-controls">
            <button
              aria-label="Minimize"
              onClick={() => {
                document.body.classList.add("faded");
              }}
            ></button>
            <button aria-label="Maximize"></button>
            <button
              aria-label="Close"
              onClick={() => {
                document.body.classList.add("faded");
              }}
            ></button>
          </div>
        </div> */}
        <div className="window-body hud-body">
          <div id="hud-buttons">
            {/* <OrganicButton
              onClick={() => this.togglePause()}
              className={paused ? "selected" : ""}
            >
              {paused ? (
                <svg
                  className="bsvg"
                  height="20"
                  width="20"
                  id="d"
                  viewBox="-50 -50 400 400"
                >
                  <polygon id="play" points="0,0 , 300,150 0,300" />
                </svg>
              ) : (
                <svg
                  className="bsvg"
                  height="20"
                  width="20"
                  id="d"
                  viewBox="-50 -50 400 400"
                >
                  <polygon id="bar2" points="0,0 110,0 110,300 0,300" />
                  <polygon id="bar1" points="190,0 300,0 300,300 190,300" />
                </svg>
              )}
            </OrganicButton> */}
            {/* <OrganicButton
              onClick={() => this.toggleFF()}
              className={ff ? "selected" : ""}
              active={ff}
            >
              <svg
                className="bsvg"
                height="20"
                width="20"
                id="d"
                viewBox="-25 0 350 300"
              >
                <polygon id="play" points="0,50 , 150,150 0,250" />
                <polygon id="play" points="150,50, 300,150 150,250" />
              </svg>
            </OrganicButton> */}

            <OrganicButton onClick={() => this.reset()}>↻</OrganicButton>
            {/* <Link
              to={{
                pathname: "/info/",
                hash
              }}
            >
              <OrganicButton style={{ width: "calc(100% - 4px)" }}>
                Info
              </OrganicButton>
            </Link> */}

            {/* <OrganicButton
              onClick={() => {
                // reset();
                universe.pop_undo();
              }}
              style={{ fontSize: 18, lineHeight: 0 }}
            >
              ↜
            </OrganicButton> */}
            {/* 
            <OrganicButton
              onClick={() => {
                exportGif(universe, blob => {
                  this.pause();

                  this.setState({ dataURL: blob });
                });
              }}
            >
              📷
            </OrganicButton> */}

            {activeSpecies.map(n =>
              ElementButton(n, selectedElement, id =>
                this.setState({ selectedElement: id })
              )
            )}
            <img
              style={{ width: "100%" }}
              src="http://community.fortunecity.ws/tinpan/motorhead/13/images/barb_wire.gif"
            ></img>
            {selectedElement != Species.Empty && (
              <>
                <Editor
                  selectedElement={selectedElement}
                  clause_index={0}
                ></Editor>
                <Editor
                  selectedElement={selectedElement}
                  clause_index={1}
                ></Editor>
                <Editor
                  selectedElement={selectedElement}
                  clause_index={2}
                ></Editor>
              </>
            )}

            {this.state.dataURL && (
              <Menu close={() => this.closeMenu()}>
                <img src={this.state.dataURL} className="submissionImg" />
                <div style={{ display: "flex" }}></div>
              </Menu>
            )}
            <img
              style={{ width: "100%" }}
              src="http://community.fortunecity.ws/tinpan/motorhead/13/images/barb_wire.gif"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export { Index, ruleSymbols };
