import { Suspense, useRef, useState } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { type Mesh } from "three";
import { Html } from "@react-three/drei";
import Floor from "./Floor";
import Sphere from "./Sphere";
import Box from "./Box";
import Peashooter from "./Peashooter";
import Placeholder from "./Placeholder";
import Text3D from "./Text3D";
import RandomDonuts from "./RandomDonuts";

export default function World(props: ThreeElements["group"]) {
  const [spanHidden, setSpanHidden] = useState(false);
  const box = useRef<Mesh>(null);

  return (
    <group {...props}>
      <Floor position-y={-1} scale={20} receiveShadow />

      <Sphere receiveShadow castShadow>
        <Html
          as="span"
          wrapperClass="text-nowrap text-neutral-800 origin-center"
          position={[0, 1.85, 0]}
          distanceFactor={0.04}
          occlude
          onOcclude={setSpanHidden}
          style={{
            transition: "all 0.3s",
            opacity: spanHidden ? 0 : 1,
            transform: `translate(-50%,-50%) scale(${spanHidden ? 0.5 : 1})`,
          }}
        >
          A sphere 🤯
        </Html>
      </Sphere>

      <Box ref={box} position={[-3, 0, 3]} receiveShadow castShadow />

      <Suspense
        fallback={
          <Placeholder
            color="#4e860e"
            scale={[2, 4, 2]}
            position={[3, 1.05, -3]}
            rotation-y={0.5}
          />
        }
      >
        <Peashooter
          position={[3, -1.06, -3]}
          scale={2.5}
          rotation-y={0.5}
          castShadow
          receiveShadow
        />
      </Suspense>

      <Suspense
        fallback={
          <Placeholder
            color="royalblue"
            scale={[7, 2, 1]}
            position={[0, 0.1, -8]}
          />
        }
      >
        <Text3D color="royalblue" position={[0, 0, -8]}>
          Three.js
        </Text3D>
      </Suspense>

      <RandomDonuts />
    </group>
  );
}
