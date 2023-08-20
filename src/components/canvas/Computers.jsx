/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const sceneObject = useGLTF('./desktop_pc/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.75} groundColor="black" />
      <pointLight intensity={0.5} />
      <spotLight
        position={[20, 50, 100]}
        angle={0.12}
        penumbra={1}
        intensity={0.51}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={sceneObject.scene}
        scale={isMobile ? 0.15 : 0.35}
        position={isMobile ? [0, -25.7, -2] : [0, -30.8, -1.5]}
        rotation={[-0.06, -0.2, 0]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 220, 20], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
