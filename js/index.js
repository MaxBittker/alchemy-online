import { Universe, Species } from "../crate/pkg";

import { startWebGL } from "./render";
import { fps } from "./fps";
import {} from "./paint";
import {} from "./app";
import {} from "./setup";

let n = 150;
let h = n / 2;
let d = n - 6;

const universe = Universe.new(n, n);
function drawBowl() {
  universe.paint(h, h, d + 2, Species.Glass);
  // universe.paint(h - 30, d - 3, 20, Species.Glass);
  // universe.paint(h + 30, d - 3, 20, Species.Glass);
  universe.paint(h, h, d - 2, Species.Empty);
}

drawBowl();

let ratio = 2;
let width = n;
let height = n;
const canvas = document.getElementById("sand-canvas");

canvas.height = n * ratio * Math.ceil(window.devicePixelRatio);
canvas.width = n * ratio * Math.ceil(window.devicePixelRatio);

const HUD = document.getElementById("HUD");
let canvasSize;
let resize = () => {
  let screen_width = window.innerWidth;
  let HUDheight = 50;
  let screen_height = window.innerHeight - HUDheight;

  let canvasStyle = "";
  let HUDStyle = "";

  if (screen_width - 150 > screen_height) {
    // if (screen_width - window.innerHeight < 400) {
    // landscape compressed
    canvasStyle = `height: ${window.innerHeight}px; margin:3px`;
    canvasSize = window.innerHeight;
    let hudWidth = screen_width - window.innerHeight - 12;

    HUDStyle = `width: ${hudWidth}px; margin: 2px;`;
    // } else {
    //   // landscape wide
    //   canvasStyle = `height: ${window.innerHeight}px`;
    //   canvasSize = window.innerHeight;
    //   let hudWidth = (screen_width - window.innerHeight) / 2 - 7;
    //   HUDStyle = `width: ${hudWidth}px; margin: 2px;`;
    // }
  } else {
    //portrait (mobile)
    canvasSize = screen_width;

    canvasStyle = `width: ${screen_width}px; `;
  }
  HUD.style = HUDStyle;
  canvas.style = canvasStyle;
};

resize();
window.addEventListener("deviceorientation", resize, true);
window.addEventListener("resize", resize);

let drawSand = startWebGL({ canvas, universe });

let t = parseInt(localStorage.getItem("time"), 10) || 0;
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
  localStorage.setItem("cell_data", null);
  universe.reset();
  drawBowl();
}
window.u = universe;
window.universe = universe;
window.Editor.setRule();

renderLoop();

window.UI.load();

export { canvas, width, height, ratio, universe, reset };
