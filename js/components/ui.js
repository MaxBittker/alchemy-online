import React from "react";
import { Link } from "react-router-dom";

import { memory } from "../../crate/pkg/sandtable_bg";
import { Species } from "../../crate/pkg/sandtable";

import { height, universe, width, reset } from "../index.js";
import { exportGif, pallette } from "../render.js";
import Menu from "./menu.js";
import { Matrix, Editor } from "./matrix";

window.species = Species;

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

  let selected = elementID == selectedElement;

  let background = "inherit";

  let text = name;
  if (name == "Air") {
    text = "Clear";
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

        filter: selected || `saturate(0.4) `
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
    let tutorialProgress = localStorage.getItem("tutorialProgress") || 0;
    // tutorialProgress = 0;
    // console.log(tutorialDone);
    this.state = {
      submissionMenuOpen: false,
      paused: false,
      ff: false,
      submitting: false,
      size: 1,
      dataURL: null,
      currentSubmission: null,
      selectedElement: Species.Sand
    };
    window.UI = this;
    // this.load();
    // if (!tutorialDone) {
    window.setTimeout(() => {
      // localStorage.setItem("tutorialDone", true);
      // this.setState({ tutorial: false });
    }, 1000 * 10);
    // }
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
    if (window.confirm("Reset your ecosystem?")) {
      this.play();
      this.setState({ currentSubmission: null });

      reset();
    }
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
      localStorage.setItem("cell_data", dataString);
      localStorage.setItem("time", window.t);
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

    window.setInterval(() => this.findTchotchke(), 1000 * 60 * 5);

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
    let { ff, selectedElement, currentSubmission } = this.state;
    let hash =
      currentSubmission && currentSubmission.id
        ? `#${currentSubmission.id}`
        : "";

    let activeSpecies = Object.keys(Species).filter(name => name.length > 2);

    return (
      <div className="window fade" id="HUD">
        <div className="title-bar">
          <div className="title-bar-text">Tile Toy</div>
          <div className="title-bar-controls">
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
        </div>
        <div className="window-body hud-body">
          <div id="hud-buttons">
            <OrganicButton
              onClick={() => this.toggleFF()}
              className={ff ? "selected" : ""}
              active={ff}
            >
              <svg height="20" width="20" id="d" viewBox="0 0 300 300">
                <polygon id="play" points="0,50 , 150,150 0,250" />
                <polygon id="play" points="150,50, 300,150 150,250" />
              </svg>
            </OrganicButton>

            <OrganicButton onClick={() => this.reset()}>Reset</OrganicButton>
            <Link
              to={{
                pathname: "/info/",
                hash
              }}
            >
              <OrganicButton style={{ width: "calc(100% - 4px)" }}>
                Info
              </OrganicButton>
            </Link>

            <OrganicButton
              onClick={() => {
                // reset();
                universe.pop_undo();
              }}
              style={{ fontSize: 18 }}
            >
              ↜
            </OrganicButton>
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
            <Editor></Editor>

            {this.state.dataURL && (
              <Menu close={() => this.closeMenu()}>
                <img src={this.state.dataURL} className="submissionImg" />
                <div style={{ display: "flex" }}></div>
              </Menu>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export { Index };
