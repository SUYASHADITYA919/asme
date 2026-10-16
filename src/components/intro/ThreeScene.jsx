
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

const variants = [
  { geometry: "torus", color: "#dce4ed", metalness: 1, roughness: 0.12 },
  { geometry: "icosahedron", color: "#8ca6b8", metalness: 0.85, roughness: 0.22 },
  { geometry: "torusKnot", color: "#f3f3f3", metalness: 1, roughness: 0.08 },
  { geometry: "octahedron", color: "#9ca3af", metalness: 0.9, roughness: 0.18 },
  { geometry: "sphere", color: "#b9c7d5", metalness: 1, roughness: 0.1 },
];

function AnimatedObject({ index }) {
  const mesh = useRef(null);
  const material = useRef(null);

  const settings = variants[index % variants.length];

  useFrame((state, delta) => {
    if (!mesh.current) return;

    mesh.current.rotation.x += delta * 0.22;
    mesh.current.rotation.y += delta * 0.35;
    mesh.current.rotation.z += delta * 0.12;

    const targetScale =
      1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.07;

    mesh.current.scale.setScalar(targetScale);

    if (material.current) {
      material.current.color.lerp(
        new THREE.Color(settings.color),
        Math.min(delta * 3, 1)
      );
    }
  });

  const geometry = useMemo(() => {
    switch (settings.geometry) {
      case "torus":
        return <torusGeometry args={[1.05, 0.38, 32, 100]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.9, 0.27, 180, 24, 2, 3]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1.2, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.25, 2]} />;
      default:
        return <sphereGeometry args={[1.15, 64, 64]} />;
    }
  }, [settings.geometry]);

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
      <mesh ref={mesh}>
        {geometry}
        <meshStandardMaterial
          ref={material}
          color={settings.color}
          metalness={settings.metalness}
          roughness={settings.roughness}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeScene({ index = 0 }) {
  return (
    <div className="three-scene">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 5]} intensity={3} />
        <pointLight position={[-4, -2, 2]} intensity={15} color="#8bbcff" />
        <pointLight position={[3, 0, -3]} intensity={12} color="#ffffff" />

        <AnimatedObject index={index} />

        <Sparkles
          count={35}
          scale={5}
          size={1.4}
          speed={0.25}
          opacity={0.55}
          color="#b7d9ff"
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
