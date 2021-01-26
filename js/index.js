import { Universe } from "../crate/pkg";

import { startWebGL } from "./render";
import { fps } from "./fps";
import {} from "./paint";
import {} from "./setup";
import { boot } from "./boot";
import { startApp } from "./app";

let ratio = 8;
let width = 100;
// window.innerWidth / ratio;
let height = 100;
// window.innerHeight / ratio;
//todo scale ratio according to size;

let n = Math.min(width, height);
let h = n / 2;
let d = n - 6;

console.log(width, height);
const universe = Universe.new(width, height);

window.u = universe;
window.universe = universe;

startApp();
boot(width, height);

const canvas = document.getElementById("sand-canvas");

canvas.width = width * ratio * Math.ceil(window.devicePixelRatio);
canvas.height = height * ratio * Math.ceil(window.devicePixelRatio);

const HUD = document.getElementById("HUD");
// let canvasSize;
let resize = () => {
  let screen_width = window.innerWidth;
  let HUDheight = 34;
  let screen_height = window.innerHeight - HUDheight;

  let canvasStyle = "";
  let HUDStyle = "";
  let border = 40 * 2;

  // if (screen_width - 150 > screen_height) {
  // if (screen_width - window.innerHeight < 400) {
  // landscape compressed

  let hudWidth = 361;

  canvasStyle = `height: ${Math.min(
    window.innerHeight - border - HUDheight,
    // Infinity
    window.innerWidth - (hudWidth + border + 40)
  )}px; margin:10px; margin-right: ${hudWidth + 40}px; margin-left:auto;`;
  // canvasSize = window.innerHeight - border;

  HUDStyle = `width: ${hudWidth}px; margin: 10px;`;

  if (screen_width < 600) {
    HUDStyle = `margin: 40px 10px; margin-top:${
      screen_width + 10
    }px; margin-bottom: ${HUDheight}px ;padding-bottom: 40px`;
    canvasStyle = `width:${screen_width - border}; height: ${
      screen_width - border
    }px; top: 10px; margin:auto; margin-top:10px ; `;
  }

  HUD.style = HUDStyle;
  canvas.style = canvasStyle;
};

resize();
window.addEventListener("deviceorientation", resize, true);
window.addEventListener("resize", resize);

let drawSand = startWebGL({ canvas, universe });

let t = 0;
const renderLoop = () => {
  const now = performance.now();

  let max_tick_per_frame = window.ff ? 100 : 1;
  for (var i = 0; i < max_tick_per_frame; i++) {
    if (!window.paused) {
      fps.render(); // new
      universe.tick();
    }
    let elapsed_time = performance.now() - now;
    if (elapsed_time > 16) {
      break;
    }
  }
  window.t = t;
  drawSand.draw();
  requestAnimationFrame(renderLoop);
};

function reset() {
  console.log("reseting");
  // localStorage.setItem("cell_data", null);
  // universe.reset();
  boot(width, height);
}

// window.Editor.setRule();

renderLoop();

window.UI.load();

export { canvas, width, height, ratio, universe, reset };
