import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Info from "./components/info";
import { ElementEditor } from "./components/ui";
import Menu from "./components/menu";
import { reset } from "./index.js";

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={UI} />
      <Route exact path="/info/" component={Info} />
    </Router>
  );
}

class PlaybackControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      ff: false,
    };
  }

  componentDidUpdate(prevProps) {}
  togglePause() {
    window.paused = !this.state.paused;
    this.setState({ paused: !this.state.paused });
  }
  // toggleFF() {
  //   window.ff = !this.state.ff;
  //   this.setState({ ff: !this.state.ff });
  // }
  play() {
    window.paused = false;
    this.setState({ paused: false });
  }
  pause() {
    window.paused = true;
    this.setState({ paused: true });
  }

  reset() {
    this.play();

    reset();
  }

  render() {
    let { ff, paused } = this.state;

    return (
      <div id="playback">
        <button onClick={() => this.reset()}> ⏻</button>

        <button
          onClick={() => {
            // reset();
            universe.pop_undo();
            // this.refresh();
            window.UI.refresh();
          }}
          style={{ fontSize: 18, lineHeight: 0 }}
        >
          ⤺
        </button>
        <button
          onClick={() => this.togglePause()}
          className={!paused ? "selected playbutton" : "playbutton"}
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
        </button>
      </div>
    );
  }
}

class UI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* <PlaybackControls></PlaybackControls> */}
        <ElementEditor></ElementEditor>
      </>
    );
  }
}

function startApp() {
  ReactDOM.render(<AppRouter />, document.getElementById("ui"));
}
export { startApp };
