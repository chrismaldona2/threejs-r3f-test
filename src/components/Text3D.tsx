import {
  Center,
  type Text3DProps as DreiText3DProps,
  Text3D as DreiText3D,
} from "@react-three/drei";
import type { Vector3 } from "@react-three/fiber";
import type { PropsWithChildren } from "react";

type Text3DProps = {
  color?: string;
  position?: Vector3;
} & Partial<DreiText3DProps>;

export default function Text3D({
  color,
  position,
  children,
  ...props
}: PropsWithChildren<Text3DProps>) {
  return (
    <Center position={position}>
      <DreiText3D
        castShadow
        receiveShadow
        size={1.5}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelSegments={5}
        bevelOffset={-0.02}
        bevelSize={0.05}
        bevelThickness={0.05}
        {...props}
        font="./fonts/helvetiker_bold.typeface.json"
      >
        {children}
        <meshStandardMaterial color={color} />
      </DreiText3D>
    </Center>
  );
}
