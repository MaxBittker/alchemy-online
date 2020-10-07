import React from "react";

import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className="welcome-scrim">
      <div className="Info window">
        <div className="title-bar">
          <div className="title-bar-text">Information</div>
          <div className="title-bar-controls">
            <Link to="/">
              <button aria-label="Minimize"></button>
            </Link>
            <button aria-label="Maximize"></button>
            <Link to="/">
              <button aria-label="Close"> </button>
            </Link>
          </div>
        </div>
        <div className="window-body ">
          {/* <li>A sealed ecosystem simulation </li> */}
        </div>
      </div>
    </div>
  );
};

export default Info;
