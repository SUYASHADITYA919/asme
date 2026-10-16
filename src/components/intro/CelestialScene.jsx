
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import "./Intro.css";

function Gear({ position, size = 1, speed = 0.2 }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
    ref.current.rotation.x += delta * speed * 0.25;
    ref.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.65 + position[0]) * 0.2;
  });

  return (
    <group ref={ref} position={position} scale={size}>
      <mesh>
        <torusGeometry args={[0.78, 0.12, 10, 16]} />
        <meshStandardMaterial
          color="#9bb5c9"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.91,
              Math.sin(angle) * 0.91,
              0,
            ]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.28, 0.23, 0.2]} />
            <meshStandardMaterial
              color="#526e84"
              metalness={0.95}
              roughness={0.25}
            />
          </mesh>
        );
      })}

      <mesh>
        <torusGeometry args={[0.34, 0.025, 8, 40]} />
        <meshBasicMaterial color="#52dfff" />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color="#d9f8ff"
          metalness={0.8}
          roughness={0.15}
          emissive="#218bb8"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

function Satellite({ position, size = 1 }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.17;
    ref.current.rotation.z += delta * 0.06;
    ref.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
  });

  return (
    <Float speed={0.8} floatIntensity={0.22} rotationIntensity={0.15}>
      <group ref={ref} position={position} scale={size}>
        <mesh>
          <boxGeometry args={[0.42, 0.42, 0.48]} />
          <meshStandardMaterial
            color="#c0d0df"
            metalness={1}
            roughness={0.22}
          />
        </mesh>

        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.55, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.62, 0.05, 0.3]} />
              <meshStandardMaterial
                color="#145079"
                metalness={0.7}
                roughness={0.3}
                emissive="#087bb0"
                emissiveIntensity={0.8}
              />
            </mesh>

            {[-0.18, 0, 0.18].map((x) => (
              <mesh key={x} position={[x, 0.03, 0]}>
                <boxGeometry args={[0.015, 0.012, 0.3]} />
                <meshBasicMaterial color="#65e5ff" />
              </mesh>
            ))}
          </group>
        ))}

        <mesh position={[0, 0.31, 0]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color="#a7f2ff" />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitalRing({ position, radius, rotation, speed = 0.1 }) {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, 0.018, 8, 100]} />
        <meshStandardMaterial
          color="#94a9bb"
          metalness={1}
          roughness={0.22}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[radius * 1.025, 0.009, 6, 100]} />
        <meshBasicMaterial
          color="#3dcfff"
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#b4f4ff" />
      </mesh>
    </group>
  );
}

function FloatingPart({ position, size = 1, speed = 0.2 }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 0.8;
    ref.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.16;
  });

  return (
    <Float speed={0.7} floatIntensity={0.15}>
      <mesh ref={ref} position={position} scale={size}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#8ba8c0"
          metalness={0.95}
          roughness={0.22}
          wireframe
          emissive="#17658e"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function Universe({ phase }) {
  const world = useRef(null);

  useFrame((state, delta) => {
    const target = phase === "intro" ? 22 : 15;

    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      target,
      phase === "zooming" ? 1.6 : 1.1,
      delta
    );

    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.16;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.12;
    state.camera.lookAt(0, 0, 0);

    if (world.current) {
      world.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.025;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#b5e5ff", "#101626", 1.3]} />

      <directionalLight position={[5, 8, 8]} intensity={2.8} />
      <pointLight position={[-7, 4, 5]} intensity={45} color="#29bfff" />
      <pointLight position={[8, -4, 2]} intensity={32} color="#657dff" />
      <pointLight position={[0, 7, -5]} intensity={18} color="#53e5ff" />

      <Stars
        radius={90}
        depth={65}
        count={2200}
        factor={2.4}
        saturation={0.35}
        fade
        speed={0.3}
      />

      <Sparkles
        count={260}
        scale={[34, 21, 30]}
        size={2.4}
        speed={0.3}
        opacity={0.85}
        color="#82dcff"
      />

      <group ref={world}>
        {/* Larger foreground mechanical objects */}
        <Gear position={[-9, 4, -1]} size={1.2} speed={0.18} />
        <Gear position={[9, -3.5, -2]} size={1.05} speed={-0.15} />
        <Gear position={[-6.5, -5, -3]} size={0.8} speed={-0.2} />
        <Gear position={[5.5, 5, -5]} size={0.7} speed={0.22} />
        <Gear position={[1, 7, -8]} size={0.65} speed={-0.13} />
        <Gear position={[-12, -1, -7]} size={0.75} speed={0.17} />

        {/* Satellites across the screen */}
        <Satellite position={[-5, 1, -3]} size={0.85} />
        <Satellite position={[6, 2, -4]} size={0.8} />
        <Satellite position={[1, -6, -5]} size={0.7} />
        <Satellite position={[-10, 5, -8]} size={0.8} />
        <Satellite position={[11, 5, -9]} size={0.7} />

        {/* Orbital rings */}
        <OrbitalRing
          position={[-7, 2, -4]}
          radius={1.8}
          rotation={[0.8, 0.4, 0]}
          speed={0.12}
        />
        <OrbitalRing
          position={[7, -1, -6]}
          radius={2.1}
          rotation={[1.1, 0.5, 0.4]}
          speed={-0.09}
        />
        <OrbitalRing
          position={[0, 6, -10]}
          radius={2.6}
          rotation={[0.8, 0.2, 0.5]}
          speed={0.07}
        />
        <OrbitalRing
          position={[-11, -4, -9]}
          radius={1.3}
          rotation={[0.5, 0.9, 0.2]}
          speed={-0.1}
        />

        {/* Smaller floating engineering components */}
        <FloatingPart position={[-2, 5, -2]} size={0.8} speed={0.22} />
        <FloatingPart position={[3, -4, -3]} size={0.7} speed={-0.18} />
        <FloatingPart position={[11, 0, -5]} size={0.9} speed={0.2} />
        <FloatingPart position={[-9, -6, -5]} size={0.65} speed={-0.2} />
        <FloatingPart position={[0, 1, -11]} size={0.8} speed={0.15} />
      </group>
    </>
  );
}

export default function CelestialScene({ phase = "intro" }) {
  return (
    <div className="celestial-scene">
      <Canvas
        camera={{ position: [0, 0, 22], fov: 55, near: 0.1, far: 150 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Universe phase={phase} />
      </Canvas>
    </div>
  );
}
