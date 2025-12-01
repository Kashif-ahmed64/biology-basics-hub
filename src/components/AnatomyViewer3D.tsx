import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

interface AnatomyViewer3DProps {
  activeLayer: 'skin' | 'muscles' | 'skeleton' | 'organs';
}

const HumanModel = ({ activeLayer }: AnatomyViewer3DProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Skin/Flesh Layer
  const SkinLayer = () => (
    <group visible={activeLayer === 'skin'}>
      {/* Head */}
      <Sphere args={[0.6, 32, 32]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="#f4c2a3" />
      </Sphere>
      
      {/* Torso */}
      <Box args={[1.2, 1.8, 0.7]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#f4c2a3" />
      </Box>
      
      {/* Arms */}
      <Cylinder args={[0.15, 0.15, 1.5, 16]} position={[-0.8, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#f4c2a3" />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 1.5, 16]} position={[0.8, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#f4c2a3" />
      </Cylinder>
      
      {/* Legs */}
      <Cylinder args={[0.2, 0.18, 2.2, 16]} position={[-0.3, -0.5, 0]}>
        <meshStandardMaterial color="#f4c2a3" />
      </Cylinder>
      <Cylinder args={[0.2, 0.18, 2.2, 16]} position={[0.3, -0.5, 0]}>
        <meshStandardMaterial color="#f4c2a3" />
      </Cylinder>
    </group>
  );

  // Muscle Layer
  const MuscleLayer = () => (
    <group visible={activeLayer === 'muscles'}>
      {/* Head muscles */}
      <Sphere args={[0.58, 32, 32]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="#c1414a" />
      </Sphere>
      
      {/* Torso muscles */}
      <Box args={[1.15, 1.75, 0.68]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#c1414a" />
      </Box>
      
      {/* Arm muscles */}
      <Cylinder args={[0.14, 0.12, 1.5, 16]} position={[-0.8, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#c1414a" />
      </Cylinder>
      <Cylinder args={[0.14, 0.12, 1.5, 16]} position={[0.8, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#c1414a" />
      </Cylinder>
      
      {/* Leg muscles */}
      <Cylinder args={[0.19, 0.16, 2.2, 16]} position={[-0.3, -0.5, 0]}>
        <meshStandardMaterial color="#c1414a" />
      </Cylinder>
      <Cylinder args={[0.19, 0.16, 2.2, 16]} position={[0.3, -0.5, 0]}>
        <meshStandardMaterial color="#c1414a" />
      </Cylinder>
    </group>
  );

  // Skeleton Layer
  const SkeletonLayer = () => (
    <group visible={activeLayer === 'skeleton'}>
      {/* Skull */}
      <Sphere args={[0.55, 32, 32]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="#e8dcc7" />
      </Sphere>
      
      {/* Ribcage */}
      <Box args={[0.9, 1.4, 0.5]} position={[0, 2.0, 0]}>
        <meshStandardMaterial color="#e8dcc7" wireframe />
      </Box>
      
      {/* Spine */}
      <Cylinder args={[0.08, 0.08, 2.5, 16]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#e8dcc7" />
      </Cylinder>
      
      {/* Arm bones */}
      <Cylinder args={[0.06, 0.06, 1.4, 16]} position={[-0.8, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#e8dcc7" />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 1.4, 16]} position={[0.8, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#e8dcc7" />
      </Cylinder>
      
      {/* Leg bones */}
      <Cylinder args={[0.08, 0.08, 2.1, 16]} position={[-0.3, -0.5, 0]}>
        <meshStandardMaterial color="#e8dcc7" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 2.1, 16]} position={[0.3, -0.5, 0]}>
        <meshStandardMaterial color="#e8dcc7" />
      </Cylinder>
    </group>
  );

  // Organs Layer
  const OrgansLayer = () => (
    <group visible={activeLayer === 'organs'}>
      {/* Brain */}
      <Sphere args={[0.45, 32, 32]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="#e8a0bf" />
      </Sphere>
      
      {/* Heart */}
      <Sphere args={[0.25, 32, 32]} position={[-0.15, 2.2, 0.2]}>
        <meshStandardMaterial color="#d62839" />
      </Sphere>
      
      {/* Lungs */}
      <Box args={[0.3, 0.6, 0.4]} position={[-0.35, 2.0, 0]}>
        <meshStandardMaterial color="#ff6b9d" />
      </Box>
      <Box args={[0.3, 0.6, 0.4]} position={[0.35, 2.0, 0]}>
        <meshStandardMaterial color="#ff6b9d" />
      </Box>
      
      {/* Stomach */}
      <Sphere args={[0.25, 32, 32]} position={[0, 1.3, 0.1]}>
        <meshStandardMaterial color="#c97064" />
      </Sphere>
      
      {/* Liver */}
      <Box args={[0.5, 0.3, 0.3]} position={[0.25, 1.5, 0.1]}>
        <meshStandardMaterial color="#8b4513" />
      </Box>
      
      {/* Intestines */}
      <Cylinder args={[0.15, 0.15, 0.8, 16]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#e89a7e" />
      </Cylinder>
    </group>
  );

  return (
    <group ref={groupRef}>
      <SkinLayer />
      <MuscleLayer />
      <SkeletonLayer />
      <OrgansLayer />
    </group>
  );
};

const AnatomyViewer3D = ({ activeLayer }: AnatomyViewer3DProps) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.4} />
          <pointLight position={[0, 5, 5]} intensity={0.3} />
          
          <HumanModel activeLayer={activeLayer} />
          
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={4}
            maxDistance={15}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AnatomyViewer3D;
