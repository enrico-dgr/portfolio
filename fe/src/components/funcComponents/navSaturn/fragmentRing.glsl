uniform sampler2D globeTexture;
uniform vec2 u_resolution;

varying vec2 vertexUV;
varying vec3 pos;

void main() {
  float radius = length(pos.xy);
  float radiusMin = 5.5;
  float radiusMax = 9.5;
  float radiusDelta = radiusMax - radiusMin;
  float normalizedRadius = 0.0;

  if(radius >= radiusMax || radius <= radiusMin) {
    gl_FragColor = vec4(0, 0, 0, 1);
  } else {
    normalizedRadius = (radius - radiusMin) / radiusDelta;
    gl_FragColor = texture2D(globeTexture, vec2(normalizedRadius, 0));
  }

}