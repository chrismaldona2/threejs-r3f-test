import type { Ref } from "react";
import type { BlendFunction } from "postprocessing";

import DrunkEffect from "../effects/DrunkEffect";

interface DrunkProps {
  ref?: Ref<DrunkEffect>;
  frequency?: number;
  amplitude?: number;
  blendFunction?: BlendFunction;
}

export default function Drunk({
  ref,
  frequency,
  amplitude,
  blendFunction,
}: DrunkProps) {
  const effect = new DrunkEffect({ frequency, amplitude, blendFunction });

  return <primitive object={effect} ref={ref} />;
}
