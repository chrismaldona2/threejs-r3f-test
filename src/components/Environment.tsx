import { Sky } from "@react-three/drei";
import { useControls } from "leva";

export default function Environment() {
  const { sunPosition, inclination, azimuth, distance } = useControls("Sky", {
    sunPosition: { value: [-4, 9, 8], label: "Sun Position" },
    inclination: { value: 0, label: "Inclination", min: 0, max: 6 },
    azimuth: { value: 0.25, label: "Azimuth", min: 0, max: 2 },
    distance: { value: 450000, label: "Distance", step: 25000 },
  });

  return (
    <>
      <Sky
        sunPosition={sunPosition}
        inclination={inclination}
        azimuth={azimuth}
        distance={distance}
      />
      <directionalLight
        position={sunPosition}
        intensity={1}
        castShadow
        shadow-camera-far={25}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[2048, 2048]}
      />
      <ambientLight intensity={1.25} />
    </>
  );
}
