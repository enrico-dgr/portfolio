uniform sampler2D globeTexture;

varying vec2 vertexUV;
varying vec3 vNormal;

float test(float x) {
  float b = -0.7;
  float k = pow(1.0 - b, 3.0);

  if(x < 0.0) {
    return 0.0;
  } else {
    return (x * k) / (x * k - x + 1.0);
  }
}

void main() {
  vec2 newUv = vertexUV;

  vec4 color = texture2D(globeTexture, newUv);

  vec3 normalizedLight = normalize(vec3(80, 10, 100));

  float lightShading = dot(vNormal, normalizedLight);
  // float lightShading = clamp(dot(vNormal, normalizedLight), 0.0, 1.0);
  // float lightShading = clamp(test(dot(vNormal, normalizedLight)), 0.0, 1.0);
  // float lightShading = test(dot(vNormal, normalizedLight));

  gl_FragColor = color * lightShading;
}

  // float deltaHidden = 0.1;
  // 
  // if(newUv.y < 0.5 - deltaHidden) {
  //   if(newUv.y - deltaHidden < 0.0) {
  //     newUv.y = 0.0;
  //   } else {
  //     newUv.y -= deltaHidden;
  //   }
  // } else if(newUv.y > 0.5 + deltaHidden) {
  //   if(newUv.y + deltaHidden > 1.0) {
  //     newUv.y = 1.0;
  //   } else {
  //     newUv.y += deltaHidden;
  //   }
  // }