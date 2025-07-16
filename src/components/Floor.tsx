import type { ThreeElements } from "@react-three/fiber";
import { useControls } from "leva";

type FloorProps = ThreeElements["mesh"];

export default function Floor(props: FloorProps) {
  const { color } = useControls("Floor", {
    color: { label: "Color", value: "greenyellow" },
  });

  return (
    <mesh rotation-x={-Math.PI / 2} {...props}>
      <planeGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
