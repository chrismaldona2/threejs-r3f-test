import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";
import type { WebGLRenderer, WebGLRenderTarget } from "three";

const fragmentShader = /* glsl */ `
  uniform float frequency;
  uniform float amplitude;
  uniform float offset;

  void mainUv(inout vec2 uv) {
    uv.y += sin((uv.x + offset) * frequency) * amplitude;
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
  }
`;

interface DrunkEffectProps {
  frequency?: number;
  amplitude?: number;
  blendFunction?: BlendFunction;
}

export default class DrunkEffect extends Effect {
  constructor({
    frequency = 2,
    amplitude = 0.1,
    blendFunction = BlendFunction.DARKEN,
  }: DrunkEffectProps) {
    super("DrunkEffect", fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ["frequency", new Uniform(frequency)],
        ["amplitude", new Uniform(amplitude)],
        ["offset", new Uniform(0)],
      ]),
    });
  }

  update(
    _renderer: WebGLRenderer,
    _inputBuffer: WebGLRenderTarget,
    deltaTime: number
  ) {
    const offset = this.uniforms.get("offset");
    if (offset) offset.value += deltaTime;
  }
}
