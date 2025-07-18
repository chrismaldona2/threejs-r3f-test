import { useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import {
  Group,
  MeshMatcapMaterial,
  SRGBColorSpace,
  TorusGeometry,
} from "three";

type RandomDonutsProps = { amount?: number };

const geometry = new TorusGeometry();
const material = new MeshMatcapMaterial();

const RandomDonuts = memo(function ({ amount = 20 }: RandomDonutsProps) {
  const group = useRef<Group>(null);
  const [matcapTexture] = useMatcapTexture("487FC9_A8E7F8_88CCF2_70AFDE", 256);

  useEffect(() => {
    matcapTexture.colorSpace = SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.children.forEach(
      (donut) => (donut.rotation.y += delta * 0.2)
    );
  });

  const donuts = useMemo(() => {
    return [...Array(amount)].map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() + 1) * 3,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
    }));
  }, [amount]);

  return (
    <group ref={group}>
      {donuts.map(({ position, rotation }, idx) => (
        <mesh
          key={idx}
          geometry={geometry}
          material={material}
          position={position}
          rotation={rotation}
        />
      ))}
    </group>
  );
});

export default RandomDonuts;
