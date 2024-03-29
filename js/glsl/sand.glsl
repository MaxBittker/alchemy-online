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


  vec2 textCoord = (guv * vec2(0.5, -0.5)) + vec2(0.5);

  vec4 data = texture2D(dataTexture, textCoord);
  vec4 last = texture2D(backBuffer, vec2(textCoord.x, 1.0 - textCoord.y));

  int type = int((data.r * 255.) + 0.1);
  float energy = data.g;
  float age = data.b;

  float hue = 0.0;
  float saturation =  0.35 + (energy*1.5) + (age *0.2) ;
  float lightness = 0.7 - energy * .08;
  float a = 1.0;
  float brightness = 0.0;
  float speed = 0.01;
  // if(type == 4 || type == 5){
  //   // speed = 0.05;
  // }
  vec2 grid =   floor(guv * (resolution / (dpi)));
  grid.x+=energy*255.;
  float noise = snoise3(vec3(grid, t * speed));


  if (type == 0) { // Air
    hue = 0.7;
    saturation = 0.0;
    
    a = 0.0;
    lightness = 0.8;
    if (isSnapshot) {
      // lightness = 0.9;
      a = 0.9;
    }
  } else if (type == 1) { // wall
    hue = 0.1;
    saturation *= 0.3;
    lightness *= 0.5 ;
    lightness += noise*0.3;
     if (isSnapshot) {
      lightness = 0.2;
    }
  } else if (type == 2) { // Sand
    hue = 0.1;
    lightness += 0.1;
  } else if (type == 3) { // plant
    hue = 0.4;
    saturation += 0.2;
    lightness-=0.7*energy;
  } else if (type == 4) { // water
    hue = 0.58;
    // saturation -= 0.05;
    lightness += 0.1;
    lightness -= noise * 0.1;
    // a = 0.9;
    // if (isSnapshot) {
    //   a = 1.0;
    // }
  } else if (type == 5) { // fire
    hue = 0.05 + (noise * -0.1);
    saturation += 0.2;

   lightness += 0.1 + energy * .6;

    //  * (noise + 0.5);
    if (isSnapshot) {
      hue += -0.1;
    }

  } else if (type == 6) { // purple
    hue = 0.8;
    lightness += 0.2;
    hue += energy * 0.2;
  }
  if (isSnapshot == false) {

    lightness *= (0.975 + snoise2(floor(grid)) * 0.15);
  }
  saturation = min(saturation, 1.0);
  lightness = min(lightness, 1.0);
  color = hsv2rgb(vec3(hue, saturation, lightness));

  gl_FragColor = vec4(color, a);
}