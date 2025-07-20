import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode, ToneMappingMode } from "postprocessing";
import { Vector2 } from "three";
import { folder, useControls } from "leva";
import Drunk from "./Drunk";

export default function PostProcessing() {
  const {
    enableVignette,
    vignetteBlending,
    enableGlitch,
    glitchBlending,
    glitchMode,
    enableNoise,
    premultiplyNoise,
    noiseBlending,
    enableBloom,
    enableMipmap,
    bloomIntensity,
    bloomLuminanceThreshold,
    enableDOF,
    DOFFocusDistance,
    DOFFocalLength,
    DOFBokehScale,
    enableDrunk,
    drunkFrequency,
    drunkAmplitude,
    drunkBlending,
  } = useControls("Postprocessing", {
    Vignette: folder({
      enableVignette: { label: "Enabled", value: false },
      vignetteBlending: {
        label: "Blending",
        value: BlendFunction.NORMAL,
        options: BlendFunction,
      },
    }),
    Glitch: folder({
      enableGlitch: { label: "Enabled", value: false },
      glitchBlending: {
        label: "Blending",
        value: BlendFunction.NORMAL,
        options: BlendFunction,
      },
      glitchMode: {
        label: "Mode",
        value: GlitchMode.SPORADIC,
        options: GlitchMode,
      },
    }),
    Noise: folder({
      enableNoise: { label: "Enabled", value: false },
      premultiplyNoise: { label: "Premultiply", value: true },
      noiseBlending: {
        label: "Blending",
        value: BlendFunction.SOFT_LIGHT,
        options: BlendFunction,
      },
    }),
    Bloom: folder({
      enableBloom: { label: "Enabled", value: false },
      enableMipmap: { label: "Mipmap Blur", value: false },
      bloomIntensity: { label: "Intensity", value: 1 },
      bloomLuminanceThreshold: { label: "Luminance Threshold", value: 0.3 },
    }),
    "Depth Of Field": folder({
      enableDOF: { label: "Enabled", value: false },
      DOFFocusDistance: { label: "Focus Distance", value: 0.025 },
      DOFFocalLength: { label: "Focal Length", value: 0.025 },
      DOFBokehScale: { label: "Bokeh Scale", value: 6 },
    }),
    "Custom Drunk Effect": folder({
      enableDrunk: { label: "Enabled", value: false },
      drunkBlending: {
        label: "Blending",
        value: BlendFunction.DARKEN,
        options: BlendFunction,
      },
      drunkAmplitude: { label: "Amplitude", value: 0.1 },
      drunkFrequency: { label: "Frequency", value: 2 },
    }),
  });

  return (
    <EffectComposer>
      {enableVignette ? (
        <Vignette darkness={0.55} blendFunction={vignetteBlending} />
      ) : (
        <></>
      )}

      {enableGlitch ? (
        <Glitch
          blendFunction={glitchBlending as BlendFunction}
          mode={glitchMode as GlitchMode}
          delay={new Vector2(1, 5)}
          strength={new Vector2(0, 0.1)}
        />
      ) : (
        <></>
      )}

      {enableNoise ? (
        <Noise premultiply={premultiplyNoise} blendFunction={noiseBlending} />
      ) : (
        <></>
      )}

      {enableBloom ? (
        <Bloom
          mipmapBlur={enableMipmap}
          intensity={bloomIntensity}
          luminanceThreshold={bloomLuminanceThreshold}
        />
      ) : (
        <></>
      )}

      {enableDOF ? (
        <DepthOfField
          focusDistance={DOFFocusDistance}
          focalLength={DOFFocalLength}
          bokehScale={DOFBokehScale}
        />
      ) : (
        <></>
      )}

      {enableDrunk ? (
        <Drunk
          frequency={drunkFrequency}
          amplitude={drunkAmplitude}
          blendFunction={drunkBlending as BlendFunction}
        />
      ) : (
        <></>
      )}

      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
