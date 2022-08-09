varying vec2 vertexUV;
varying vec3 vNormal;

void main() {
  vertexUV = uv;
  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}