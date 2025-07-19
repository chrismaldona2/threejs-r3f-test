import {
  EffectComposer,
  Glitch,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { Vector2 } from "three";

export default function PostProcessing() {
  const { enableVignette, vignetteBlending, enableGlitch } = useControls(
    "Postprocessing",
    {
      enableVignette: { label: "Vignette", value: true },
      vignetteBlending: {
        label: "Vignette Blending",
        value: BlendFunction.NORMAL,
        options: BlendFunction,
      },

      enableGlitch: { label: "Glitch", value: true },
    }
  );

  return (
    <EffectComposer>
      {enableVignette ? (
        <Vignette darkness={0.55} blendFunction={vignetteBlending} />
      ) : (
        <></>
      )}

      {enableGlitch ? (
        <Glitch delay={new Vector2(1, 5)} strength={new Vector2(0, 0.1)} />
      ) : (
        <></>
      )}

      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
