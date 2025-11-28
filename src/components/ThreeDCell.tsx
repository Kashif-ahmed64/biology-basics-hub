import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Suspense } from 'react';

const AnimatedCell = () => {
  return (
    <Sphere args={[1, 100, 100]} scale={2}>
      <MeshDistortMaterial
        color="#2dd4bf"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.8}
      />
    </Sphere>
  );
};

const ThreeDCell = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <AnimatedCell />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        <p>Interactive 3D Cell Model - Drag to rotate, scroll to zoom</p>
      </div>
    </div>
  );
};

export default ThreeDCell;
