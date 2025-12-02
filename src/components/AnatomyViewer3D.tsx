import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

interface AnatomyViewer3DProps {
  activeLayer: 'skin' | 'muscles' | 'skeleton' | 'organs';
}

// Realistic human body model using procedural generation with organic shapes
const RealisticHumanModel = ({ activeLayer }: AnatomyViewer3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Color palettes for realistic appearance
  const skinColor = new THREE.Color('#e8beac');
  const skinColorDark = new THREE.Color('#c4a08a');
  const muscleColor = new THREE.Color('#8b2332');
  const muscleColorLight = new THREE.Color('#b84c5b');
  const boneColor = new THREE.Color('#f5f5dc');
  const boneColorDark = new THREE.Color('#d4c4a8');

  // Skin/Flesh Layer - Realistic human form
  const SkinLayer = () => (
    <group visible={activeLayer === 'skin'}>
      {/* Head - more realistic oval shape */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <sphereGeometry args={[0.12, 64, 64]} />
        <meshPhysicalMaterial 
          color={skinColor}
          roughness={0.6}
          metalness={0}
          clearcoat={0.1}
          clearcoatRoughness={0.4}
        />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1.48, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.12, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Torso - chest area */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.2, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Abdomen */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.15, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Hip area */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Left Arm - Upper */}
      <mesh position={[-0.2, 1.3, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.04, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Left Arm - Lower */}
      <mesh position={[-0.28, 1.08, 0]} rotation={[0, 0, 0.1]} castShadow>
        <capsuleGeometry args={[0.035, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Left Hand */}
      <mesh position={[-0.32, 0.88, 0]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Right Arm - Upper */}
      <mesh position={[0.2, 1.3, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.04, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Right Arm - Lower */}
      <mesh position={[0.28, 1.08, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.035, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Right Hand */}
      <mesh position={[0.32, 0.88, 0]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Left Leg - Thigh */}
      <mesh position={[-0.07, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.22, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Left Leg - Calf */}
      <mesh position={[-0.07, 0.25, 0]} castShadow>
        <capsuleGeometry args={[0.045, 0.22, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Left Foot */}
      <mesh position={[-0.07, 0.05, 0.02]} castShadow>
        <boxGeometry args={[0.05, 0.03, 0.1]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Right Leg - Thigh */}
      <mesh position={[0.07, 0.55, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.22, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Right Leg - Calf */}
      <mesh position={[0.07, 0.25, 0]} castShadow>
        <capsuleGeometry args={[0.045, 0.22, 16, 32]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
      
      {/* Right Foot */}
      <mesh position={[0.07, 0.05, 0.02]} castShadow>
        <boxGeometry args={[0.05, 0.03, 0.1]} />
        <meshPhysicalMaterial color={skinColor} roughness={0.6} />
      </mesh>
    </group>
  );

  // Muscle Layer - Detailed muscular system
  const MuscleLayer = () => (
    <group visible={activeLayer === 'muscles'}>
      {/* Head muscles */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <sphereGeometry args={[0.115, 64, 64]} />
        <meshPhysicalMaterial 
          color={muscleColor}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Neck muscles - Sternocleidomastoid */}
      <mesh position={[0, 1.48, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.045, 0.12, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>
      
      {/* Pectoralis Major - Chest */}
      <mesh position={[-0.05, 1.28, 0.04]} castShadow>
        <sphereGeometry args={[0.06, 32, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      <mesh position={[0.05, 1.28, 0.04]} castShadow>
        <sphereGeometry args={[0.06, 32, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      
      {/* Rectus Abdominis - Abs */}
      <mesh position={[0, 1.05, 0.03]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.04]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>
      
      {/* External Obliques */}
      <mesh position={[-0.08, 1.0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.06]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      <mesh position={[0.08, 1.0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.06]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      
      {/* Latissimus Dorsi - Back */}
      <mesh position={[0, 1.15, -0.05]} castShadow>
        <boxGeometry args={[0.18, 0.25, 0.03]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>

      {/* Deltoids - Shoulders */}
      <mesh position={[-0.15, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.045, 32, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      <mesh position={[0.15, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.045, 32, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>

      {/* Biceps */}
      <mesh position={[-0.22, 1.22, 0.02]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.03, 0.1, 16, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      <mesh position={[0.22, 1.22, 0.02]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.03, 0.1, 16, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>

      {/* Triceps */}
      <mesh position={[-0.22, 1.22, -0.02]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.025, 0.1, 16, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>
      <mesh position={[0.22, 1.22, -0.02]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.025, 0.1, 16, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>

      {/* Forearms */}
      <mesh position={[-0.28, 1.05, 0]} rotation={[0, 0, 0.1]} castShadow>
        <capsuleGeometry args={[0.025, 0.15, 16, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>
      <mesh position={[0.28, 1.05, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.025, 0.15, 16, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>

      {/* Gluteus Maximus */}
      <mesh position={[-0.05, 0.72, -0.03]} castShadow>
        <sphereGeometry args={[0.055, 32, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>
      <mesh position={[0.05, 0.72, -0.03]} castShadow>
        <sphereGeometry args={[0.055, 32, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>

      {/* Quadriceps */}
      <mesh position={[-0.07, 0.55, 0.02]} castShadow>
        <capsuleGeometry args={[0.045, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      <mesh position={[0.07, 0.55, 0.02]} castShadow>
        <capsuleGeometry args={[0.045, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>

      {/* Hamstrings */}
      <mesh position={[-0.07, 0.55, -0.02]} castShadow>
        <capsuleGeometry args={[0.04, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>
      <mesh position={[0.07, 0.55, -0.02]} castShadow>
        <capsuleGeometry args={[0.04, 0.18, 16, 32]} />
        <meshPhysicalMaterial color={muscleColor} roughness={0.4} />
      </mesh>

      {/* Calves - Gastrocnemius */}
      <mesh position={[-0.07, 0.28, -0.015]} castShadow>
        <capsuleGeometry args={[0.035, 0.12, 16, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
      <mesh position={[0.07, 0.28, -0.015]} castShadow>
        <capsuleGeometry args={[0.035, 0.12, 16, 32]} />
        <meshPhysicalMaterial color={muscleColorLight} roughness={0.4} />
      </mesh>
    </group>
  );

  // Skeleton Layer - Detailed bone structure
  const SkeletonLayer = () => (
    <group visible={activeLayer === 'skeleton'}>
      {/* Skull */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshPhysicalMaterial 
          color={boneColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Jaw */}
      <mesh position={[0, 1.58, 0.04]} castShadow>
        <boxGeometry args={[0.08, 0.03, 0.05]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
      
      {/* Cervical Spine (Neck) */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <mesh key={`cervical-${i}`} position={[0, 1.52 - i * 0.015, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.012, 16]} />
          <meshPhysicalMaterial color={boneColor} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Clavicles (Collarbones) */}
      <mesh position={[-0.08, 1.38, 0.02]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[0.08, 1.38, 0.02]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      
      {/* Scapulae (Shoulder blades) */}
      <mesh position={[-0.1, 1.28, -0.04]} rotation={[0.2, 0, 0.1]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.01]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
      <mesh position={[0.1, 1.28, -0.04]} rotation={[0.2, 0, -0.1]} castShadow>
        <boxGeometry args={[0.06, 0.1, 0.01]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
      
      {/* Ribcage */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <group key={`rib-${i}`}>
          <mesh position={[-0.05, 1.32 - i * 0.025, 0.02]} rotation={[0, 0, -0.5]} castShadow>
            <torusGeometry args={[0.06 - i * 0.002, 0.005, 8, 16, Math.PI * 0.8]} />
            <meshPhysicalMaterial color={boneColor} roughness={0.3} />
          </mesh>
          <mesh position={[0.05, 1.32 - i * 0.025, 0.02]} rotation={[0, Math.PI, 0.5]} castShadow>
            <torusGeometry args={[0.06 - i * 0.002, 0.005, 8, 16, Math.PI * 0.8]} />
            <meshPhysicalMaterial color={boneColor} roughness={0.3} />
          </mesh>
        </group>
      ))}
      
      {/* Sternum (Breastbone) */}
      <mesh position={[0, 1.2, 0.05]} castShadow>
        <boxGeometry args={[0.025, 0.15, 0.01]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      
      {/* Thoracic & Lumbar Spine */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
        <mesh key={`spine-${i}`} position={[0, 1.38 - i * 0.025, -0.02]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 16]} />
          <meshPhysicalMaterial color={boneColor} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Pelvis */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <torusGeometry args={[0.08, 0.025, 8, 32, Math.PI]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
      <mesh position={[-0.06, 0.75, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[0.06, 0.75, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.06, 0.08, 0.03]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      
      {/* Sacrum */}
      <mesh position={[0, 0.72, -0.02]} castShadow>
        <coneGeometry args={[0.03, 0.08, 16]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>

      {/* Humerus (Upper arm bones) */}
      <mesh position={[-0.2, 1.25, 0]} rotation={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.2, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[0.2, 1.25, 0]} rotation={[0, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.2, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>

      {/* Radius & Ulna (Forearm bones) */}
      <mesh position={[-0.27, 1.05, 0.01]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.008, 0.01, 0.18, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[-0.27, 1.05, -0.01]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.008, 0.01, 0.18, 16]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
      <mesh position={[0.27, 1.05, 0.01]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.008, 0.01, 0.18, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[0.27, 1.05, -0.01]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.008, 0.01, 0.18, 16]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>

      {/* Femur (Thigh bones) */}
      <mesh position={[-0.07, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.022, 0.28, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[0.07, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.022, 0.28, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      
      {/* Patella (Kneecaps) */}
      <mesh position={[-0.07, 0.4, 0.025]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
      <mesh position={[0.07, 0.4, 0.025]} castShadow>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>

      {/* Tibia & Fibula (Lower leg bones) */}
      <mesh position={[-0.07, 0.22, 0.01]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.28, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[-0.085, 0.22, -0.01]} castShadow>
        <cylinderGeometry args={[0.006, 0.008, 0.26, 16]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
      <mesh position={[0.07, 0.22, 0.01]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.28, 16]} />
        <meshPhysicalMaterial color={boneColor} roughness={0.3} />
      </mesh>
      <mesh position={[0.085, 0.22, -0.01]} castShadow>
        <cylinderGeometry args={[0.006, 0.008, 0.26, 16]} />
        <meshPhysicalMaterial color={boneColorDark} roughness={0.3} />
      </mesh>
    </group>
  );

  // Organs Layer - Detailed internal organs
  const OrgansLayer = () => (
    <group visible={activeLayer === 'organs'}>
      {/* Brain */}
      <mesh position={[0, 1.68, 0]} castShadow>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshPhysicalMaterial 
          color="#e8a0bf"
          roughness={0.5}
          metalness={0}
        />
      </mesh>
      
      {/* Brain folds texture */}
      <mesh position={[0, 1.68, 0]} castShadow>
        <sphereGeometry args={[0.081, 16, 16]} />
        <meshPhysicalMaterial 
          color="#d890af"
          roughness={0.8}
          wireframe
        />
      </mesh>
      
      {/* Trachea (Windpipe) */}
      <mesh position={[0, 1.45, 0.02]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.1, 16]} />
        <meshPhysicalMaterial color="#f0e0d0" roughness={0.5} />
      </mesh>
      
      {/* Heart */}
      <group position={[-0.02, 1.22, 0.03]}>
        <mesh castShadow>
          <sphereGeometry args={[0.04, 32, 32]} />
          <meshPhysicalMaterial 
            color="#a51c30"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        {/* Atria */}
        <mesh position={[-0.02, 0.03, 0]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshPhysicalMaterial color="#8b1525" roughness={0.4} />
        </mesh>
        <mesh position={[0.02, 0.03, 0]} castShadow>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshPhysicalMaterial color="#8b1525" roughness={0.4} />
        </mesh>
        {/* Aorta */}
        <mesh position={[0, 0.05, 0]} rotation={[0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.012, 0.05, 16]} />
          <meshPhysicalMaterial color="#c41e3a" roughness={0.4} />
        </mesh>
      </group>
      
      {/* Lungs */}
      <mesh position={[-0.06, 1.2, 0]} castShadow>
        <capsuleGeometry args={[0.04, 0.08, 16, 32]} />
        <meshPhysicalMaterial 
          color="#ffb6c1"
          roughness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0.06, 1.2, 0]} castShadow>
        <capsuleGeometry args={[0.045, 0.09, 16, 32]} />
        <meshPhysicalMaterial 
          color="#ffb6c1"
          roughness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Diaphragm */}
      <mesh position={[0, 1.08, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <circleGeometry args={[0.1, 32]} />
        <meshPhysicalMaterial 
          color="#d4a0a0"
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Liver */}
      <mesh position={[0.04, 1.02, 0.02]} castShadow>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshPhysicalMaterial color="#8b4513" roughness={0.4} />
      </mesh>
      
      {/* Stomach */}
      <mesh position={[-0.03, 0.98, 0.02]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.03, 0.05, 16, 32]} />
        <meshPhysicalMaterial color="#daa06d" roughness={0.5} />
      </mesh>
      
      {/* Spleen */}
      <mesh position={[-0.08, 1.0, -0.01]} castShadow>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshPhysicalMaterial color="#722f37" roughness={0.4} />
      </mesh>
      
      {/* Pancreas */}
      <mesh position={[0, 0.95, 0]} rotation={[0, 0, 0.1]} castShadow>
        <capsuleGeometry args={[0.012, 0.08, 8, 16]} />
        <meshPhysicalMaterial color="#f5deb3" roughness={0.5} />
      </mesh>
      
      {/* Kidneys */}
      <mesh position={[-0.06, 0.92, -0.02]} castShadow>
        <capsuleGeometry args={[0.018, 0.03, 16, 32]} />
        <meshPhysicalMaterial color="#8b0000" roughness={0.4} />
      </mesh>
      <mesh position={[0.06, 0.92, -0.02]} castShadow>
        <capsuleGeometry args={[0.018, 0.03, 16, 32]} />
        <meshPhysicalMaterial color="#8b0000" roughness={0.4} />
      </mesh>
      
      {/* Small Intestine */}
      <mesh position={[0, 0.85, 0.01]} castShadow>
        <torusGeometry args={[0.04, 0.015, 16, 32]} />
        <meshPhysicalMaterial color="#deb887" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.82, 0.01]} rotation={[0, 0.5, 0]} castShadow>
        <torusGeometry args={[0.035, 0.012, 16, 32]} />
        <meshPhysicalMaterial color="#deb887" roughness={0.5} />
      </mesh>
      
      {/* Large Intestine / Colon */}
      <mesh position={[0.06, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 16]} />
        <meshPhysicalMaterial color="#cd853f" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 16]} />
        <meshPhysicalMaterial color="#cd853f" roughness={0.5} />
      </mesh>
      <mesh position={[-0.06, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 16]} />
        <meshPhysicalMaterial color="#cd853f" roughness={0.5} />
      </mesh>
      
      {/* Bladder */}
      <mesh position={[0, 0.75, 0.03]} castShadow>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshPhysicalMaterial color="#f0e68c" roughness={0.5} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef} position={[0, -0.9, 0]} scale={3}>
      <SkinLayer />
      <MuscleLayer />
      <SkeletonLayer />
      <OrgansLayer />
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshStandardMaterial color="#666" wireframe />
  </mesh>
);

const AnatomyViewer3D = ({ activeLayer }: AnatomyViewer3DProps) => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-border/20">
      <Canvas 
        camera={{ position: [0, 0.5, 2.5], fov: 45 }}
        shadows
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting setup for realistic rendering */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          <pointLight position={[0, 3, 0]} intensity={0.3} color="#fff5f0" />
          <spotLight
            position={[0, 5, 2]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          
          {/* Environment for realistic reflections */}
          <Environment preset="studio" />
          
          <RealisticHumanModel activeLayer={activeLayer} />
          
          {/* Ground shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={4}
          />
          
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={1.5}
            maxDistance={6}
            maxPolarAngle={Math.PI / 1.3}
            minPolarAngle={Math.PI / 6}
            autoRotate={false}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AnatomyViewer3D;
