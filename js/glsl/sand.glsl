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
  float lightness = 0.35 + energy * 0.4;
  float a = 1.0;
  float brightness = 0.0;

  if (type == 10) { // Air
    hue = 0.0;
    saturation = 0.1;
    lightness = 1.0;
    a = 0.0;
    if (isSnapshot) {
      a = 1.0;
    }
  } else if (type == 0) { // Glass
    hue = 0.1;
    saturation = 0.1;
    lightness = 0.7;
  } else if (type == 1) { // Sand
    hue = 0.1;
    saturation = 0.6 + (age * 0.3);
    lightness = 1.0 - energy * 0.2;
  } else if (type == 2) { // plant
    hue = 0.4;
    saturation = 0.4;
  } else if (type == 3) { // water
    hue = 0.78;
    saturation = 0.6;
    lightness = 0.8 + energy * 0.25 + noise * 0.1;
    a = 0.8;
    if (isSnapshot) {
      a = 1.0;
    }
  } else if (type == 4) { // Zoop
    hue = 0.8 + (noise * -0.2);
    hue += data.g * 0.4;

    saturation = 0.7;
    lightness += 0.6;
    // * (noise + 0.5);
    if (isSnapshot) {
      hue += -0.1;
    }

  } else if (type == 5) { // Fish
    hue = 0.4;
    lightness += 0.2;
    hue += data.g * 0.2;
  }
  if (isSnapshot == false) {
    lightness *= (0.975 + snoise2(floor(guv * resolution / dpi)) * 0.025);
  }
  saturation = min(saturation, 1.0);
  lightness = min(lightness, 1.0);
  color = hsv2rgb(vec3(hue, saturation, lightness));

  gl_FragColor = vec4(color, a);
}