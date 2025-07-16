import { PivotControls, type PivotControlsProps } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { Ref } from "react";
import type { Mesh } from "three";

type BoxProps = {
  ref?: Ref<Mesh>;
  pivotOptions?: PivotControlsProps;
} & ThreeElements["mesh"];

export default function Box({ ref, pivotOptions, ...props }: BoxProps) {
  return (
    <PivotControls
      anchor={[0, 0, 0]}
      depthTest={false}
      scale={1.25}
      {...pivotOptions}
    >
      <mesh scale={2} castShadow receiveShadow ref={ref} {...props}>
        <boxGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>
    </PivotControls>
  );
}
