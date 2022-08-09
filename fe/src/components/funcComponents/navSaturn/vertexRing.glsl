varying vec2 vertexUV;
varying vec3 pos;

void main() {
  vertexUV = uv;
  pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}