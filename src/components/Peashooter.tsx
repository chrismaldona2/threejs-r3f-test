import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { Mesh, MeshStandardMaterial } from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

type PeashooterGLTFResult = GLTF & {
  nodes: {
    peashooter: Mesh;
  };
  materials: {
    peashooter: MeshStandardMaterial;
  };
};

export default function Peashooter(props: ThreeElements["mesh"]) {
  const { nodes, materials } = useGLTF(
    "./models/peashooter.glb"
  ) as unknown as PeashooterGLTFResult;

  return (
    <mesh
      name="peashooter"
      geometry={nodes.peashooter.geometry}
      material={materials.peashooter}
      {...props}
    />
  );
}

useGLTF.preload("./models/peashooter.glb");
