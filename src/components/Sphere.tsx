import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef, type PropsWithChildren } from "react";
import type { Mesh } from "three";

export default function Sphere({
  children,
  ...props
}: PropsWithChildren & ThreeElements["mesh"]) {
  const sphere = useRef<Mesh>(null);

  useFrame((state) => {
    if (!sphere.current) return;
    sphere.current.position.y = Math.abs(
      Math.sin(state.clock.elapsedTime * 1.25) * 1.75
    );
  });

  return (
    <mesh ref={sphere} receiveShadow castShadow {...props}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="orangered" />
      {children}
    </mesh>
  );
}
