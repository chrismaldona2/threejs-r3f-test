import { useEffect, useMemo, useRef } from "react";
import type { BufferGeometry } from "three";
import type { ThreeElements } from "@react-three/fiber";

type RandomTrianglesProps = {
  amount?: number;
  color?: string;
} & ThreeElements["mesh"];

export default function RandomTriangles({
  amount = 10,
  color = "mediumslateblue",
  ...props
}: RandomTrianglesProps) {
  const geometry = useRef<BufferGeometry>(null);

  const positions = useMemo(() => {
    const verticesCount = amount * 3; // if we want 10 triangles. to form a triangle we need 3 vertices.
    const positions = new Float32Array(verticesCount * 3); // te position of each vertex is composed by 3 values (x, y, z).

    // ↓ generates random position values
    for (let i = 0; i <= verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, [amount]);

  useEffect(() => {
    geometry.current?.computeVertexNormals();
  }, []);

  return (
    <mesh receiveShadow castShadow {...props}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <meshStandardMaterial color={color} side={2} />
    </mesh>
  );
}
