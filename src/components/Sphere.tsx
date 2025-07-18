import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef, type PropsWithChildren } from "react";
import type { Mesh } from "three";

type SphereProps = {
  animated?: boolean;
  color?: string;
  subdivisions?: number;
} & ThreeElements["mesh"];

export default function Sphere({
  animated = true,
  color = "orangered",
  subdivisions = 24,
  children,
  ...props
}: PropsWithChildren<SphereProps>) {
  const sphere = useRef<Mesh>(null);

  /* ↓ bounce animation */
  useFrame((state) => {
    if (!animated || !sphere.current) return;

    const { elapsedTime } = state.clock;
    sphere.current.position.y = Math.abs(Math.sin(elapsedTime * 1.25) * 1.75);
  });

  return (
    <mesh ref={sphere} {...props}>
      <sphereGeometry args={[1, subdivisions, subdivisions]} />
      <meshStandardMaterial color={color} />
      {children}
    </mesh>
  );
}
