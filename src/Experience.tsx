import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import World from "./components/World";
import Environment from "./components/Environment";
import PostProcessing from "./components/PostProcessing";

export default function Experience() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 60, position: [100, 100, 100], far: 200 }}
      shadows="soft"
    >
      <OrbitControls
        maxZoom={125}
        minZoom={40}
        maxPolarAngle={Math.PI / 2.05}
        minAzimuthAngle={-0.5 * Math.PI}
        maxAzimuthAngle={0.5 * Math.PI}
        makeDefault
      />
      <Perf position="top-left" deepAnalyze />
      <PostProcessing />
      <Environment />
      <World />
    </Canvas>
  );
}
