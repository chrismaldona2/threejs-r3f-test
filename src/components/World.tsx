import { useEffect, useRef, useState } from "react";
import type { ThreeElements } from "@react-three/fiber";
import {
  DirectionalLight,
  DirectionalLightHelper,
  type Mesh,
  type Object3D,
} from "three";
import {
  AccumulativeShadows,
  Html,
  RandomizedLight,
  useHelper,
} from "@react-three/drei";
import RandomTriangles from "./RandomTriangles";
import Floor from "./Floor";
import Sphere from "./Sphere";
import Box from "./Box";
import { useControls } from "leva";

export default function World(props: ThreeElements["group"]) {
  const [spanHidden, setSpanHidden] = useState(false);
  const box = useRef<Mesh>(null);

  const dirLight = useRef<DirectionalLight>(null!);
  const dirLightHelper = useHelper(dirLight, DirectionalLightHelper, 2);
  const { showDirLightHelper } = useControls("Lights", {
    showDirLightHelper: { value: false, label: "Directional Light Helper" },
  });

  useEffect(() => {
    if (dirLightHelper.current)
      dirLightHelper.current.visible = showDirLightHelper;
  }, [dirLightHelper, showDirLightHelper]);

  return (
    <group {...props}>
      <Floor position-y={-1} scale={20} />

      {/* ↓ Covers the entire floor */}
      <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={20}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={30}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[-4, 7, 8]}
          bias={0.001}
        />
      </AccumulativeShadows>

      <Sphere>
        <Html
          as="span"
          wrapperClass="text-nowrap text-neutral-800 origin-center"
          position={[0, 1.85, 0]}
          distanceFactor={0.04}
          occlude={[box as React.RefObject<Object3D>]}
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
      <Box ref={box} position={[-3, 0, 3]} />
      <RandomTriangles amount={10} position={[0, 2, -6]} />

      <ambientLight intensity={1.25} />
      <directionalLight
        ref={dirLight}
        position={[-4, 7, 8]}
        intensity={1}
        castShadow
        shadow-camera-far={25}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[2048, 2048]}
      />
    </group>
  );
}
