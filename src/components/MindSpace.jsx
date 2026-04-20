import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, OrbitControls, Environment, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingBar = ({ text, position }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        position={position}
        fontSize={0.2}
        color="#ff0000"
        font="https://fonts.gstatic.com/s/notosanssinhala/v22/S6u8w4BM-o_a1J_ZisS_4yVrI9nN_Z0.woff"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        textAlign="center"
      >
        {text}
      </Text>
    </Float>
  );
};

const MindParticles = () => {
  const points = useRef();
  
  useFrame((state) => {
    points.current.rotation.y += 0.001;
    points.current.rotation.x += 0.0005;
  });

  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ff0000" transparent opacity={0.5} />
    </points>
  );
};

const MindSpace = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff0000" />
        
        <Suspense fallback={null}>
          <MindParticles />
          
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[10, 32, 32]} />
            <MeshDistortMaterial
              color="#111"
              speed={2}
              distort={0.4}
              radius={1}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Floating Lyrics/Themes */}
          <FloatingBar text="WESTNAHIRA" position={[-2, 1, -2]} />
          <FloatingBar text="මතකයි අද වැනි දවසක" position={[2, -1, -3]} />
          <FloatingBar text="REBELLION" position={[0, 2, -4]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MindSpace;
