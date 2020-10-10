precision highp float;
uniform float t;
uniform float skyTime;

uniform float dpi;
uniform vec2 resolution;
uniform bool isSnapshot;
uniform sampler2D backBuffer;
uniform sampler2D dataTexture;

varying vec2 uv;
const float PI2 = 2. * 3.14159265358979323846;

// clang-format off
#pragma glslify: hsv2rgb = require('glsl-hsv2rgb')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: random = require(glsl-random)

// clang-format on

void main() {
  vec2 guv = uv;
  vec3 color;
  vec2 grid = floor(guv * (resolution / (dpi * 2.)));

  grid = floor(guv * (resolution / dpi));

  float noise = snoise3(vec3(grid, t * 0.05));
  vec2 noise_2d = vec2(floor(0.5 + noise),
                       floor(0.5 + snoise3(vec3(grid, (t + 20.) * 0.05))));

  vec2 textCoord = (guv * vec2(0.5, -0.5)) + vec2(0.5);
  vec2 sampleCoord = textCoord + (noise_2d / (resolution / 2.));

  vec4 data = texture2D(dataTexture, textCoord);

  int type = int((data.r * 255.) + 0.1);
  float energy = data.g;
  float age = data.b;

  float hue = 0.0;
  float saturation = 0.6;
  float lightness = 0.3 + energy * 0.5;
  float a = 1.0;
  float brightness = 0.0;

  if (type == 10) { // Air

    hue = 0.0;
    saturation = 0.1;
    lightness = 0.1;
    a = 0.0;
    if (isSnapshot) {
      saturation = 0.05;
      lightness = 1.01;
      a = 1.0;
    }

  } else if (type == 11) { // Glass
    hue = 0.1;
    saturation = 0.2;
    lightness = 1.0;
  } else if (type == 2) { // Sand
    hue = 0.1;
    saturation = 0.4 + (age * 0.3);
    lightness = 1.0 - energy * 0.5;

  } else if (type == 1) { // Water
    hue = 0.58;
    saturation = 0.6;
    lightness = 0.5 + energy * 0.25 + noise * 0.1;
    a = 0.4;
    if (isSnapshot) {
      a = 1.0;
    }
  } else if (type == 0) { // Plant
    hue = 0.4;
    saturation = 0.4;

  } else if (type == 6) { // Zoop
    hue = 0.9;
    lightness += 0.7;
  } else if (type == 7) { // Fish
    hue = 0.0;
    lightness += 0.4;
  } else if (type == 8) { // Bacteria
    hue = 0.66;
    saturation += 0.2;
    lightness += 0.2;
    a = 0.4;
    if (isSnapshot) {
      // lightness += 0.8;
      saturation -= 0.2;

      a = 1.0;
    }
  } else if (type == 9) { // ???
    hue = 0.6;
    saturation = 0.4;
    lightness = 0.7 + data.g * 0.5;
  } else if (type == 10) { // Waste
    hue = 0.9;
    lightness -= 0.2;
    saturation = 0.4;
    a = 0.8;
  } else if (type == 11) { // Grass
    hue = 0.4;
    saturation = 0.4;
  } else if (type == 12) { // Stone
    hue = -0.4 + (data.g * 0.5);
    saturation = 0.1;
  } else if (type == 13) { // Wood
    hue = (data.g * 0.1);
    saturation = 0.3;
    lightness = 0.3 + data.g * 0.3;
  } else if (type == 14) { // Egg
    hue = 0.9;
    saturation = age / 3.;
    lightness = 1.0;
    a = 0.8;
  } else if (type == 15) { // Tail
    hue += fract(age * 1.9 * 255. / 8.) * 0.2;
    lightness += 0.4;
    saturation -= (fract(age * 1.9 * 255. / 8.) - 0.1) * 0.7;

    // saturation += fract(age * 255.*6.);
  } else if (type == 16) { // bubble

    hue = 0.0;
    saturation = 0.1;
    lightness = 0.1;
    a = 0.0;
    if (isSnapshot) {
      saturation = 0.05;
      lightness = 1.01;
      a = 1.0;
    }
  } else if (type == 17) { // biofilm
    hue = 0.48;
    saturation = 0.6;
    lightness = 0.5 + energy * 0.25 + noise * 0.1;
    a = 0.4;
    if (isSnapshot) {
      a = 1.0;
    }
  } else if (type == 18) { // goldfish
    hue = 0.1;
    lightness += 0.3;
    saturation = 0.9;
  } else if (type == 19) { // goldfishtail
    hue = 0.1;
    hue += fract(age * 1.9 * 255. / 9.) * 0.1;
    lightness += 0.6;
    saturation = 0.9;
    saturation -= (fract(age * 1.9 * 255. / 7.) - 0.1) * 0.6;
  } else if (type == 20) { // plastic
    hue = 0.1;
    lightness += 0.5;
    saturation = 0.1;
  }
  lightness *= 0.85 + cos(skyTime * PI2) * 0.2;

  if (isSnapshot == false) {
    lightness *= (0.975 + snoise2(floor(guv * resolution / dpi)) * 0.025);
  }
  saturation = min(saturation, 1.0);
  lightness = min(lightness, 1.0);
  color = hsv2rgb(vec3(hue, saturation, lightness));

  gl_FragColor = vec4(color, a);
  // gl_FragColor = getColor(uv);
}