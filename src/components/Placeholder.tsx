import type { ThreeElements } from "@react-three/fiber";

type PlaceholderProps = {
  color?: string;
  wireframe?: boolean;
} & ThreeElements["mesh"];

export default function Placeholder({
  color,
  wireframe = true,
  ...props
}: PlaceholderProps) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}
