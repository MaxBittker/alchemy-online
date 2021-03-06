import { Species } from "../crate/pkg";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function boot(width, height) {
  for (let r = 0; r <= width * 1.7; r += 72) {
    for (let s = 6; s >= 1; s -= 1) {
      let rr = r - s * 12;
      universe.paint(width / 2, height / 2, rr + 5, Species.Empty);
      universe.paint(width / 2, height / 2, rr, s);
      await sleep(16);
    }
  }

  for (let r = 0; r <= width - 2; r += 16) {
    universe.paint(width / 2, height / 2, r - 5, Species.Empty);
    await sleep(8);
  }

  for (let a = 0; a <= 180; a += 7) {
    let x = (width / 2 + 10) * Math.cos(a * (Math.PI / 180));
    let y = (height / 2 + 10) * Math.sin(a * (Math.PI / 180));
    universe.paint(width / 2 + x, height / 2 + y, 21, Species.Empty);
    universe.paint(width / 2 - x, height / 2 - y, 21, Species.Empty);
    await sleep(8);
  }
}
function drawBowl() {
  universe.paint(h, h, d + 2, Species.Rule1);
  universe.paint(h, h, d - 2, Species.Empty);
}

export { sleep, boot };
