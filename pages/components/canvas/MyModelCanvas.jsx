/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Selection,
  Select,
  EffectComposer,
  Outline,
} from '@react-three/postprocessing';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const MyModel = ({ isMobile }) => {
  const ref = useRef();
  const [isHovered, setisHovered] = useState(true);
  const sceneObject = useGLTF('./desktop_pc/scene.gltf');

  return (
    <Select enabled={true}>
      {isHovered ? (
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      ) : (
        ''
      )}
      <mesh
        ref={ref}
        onPointerOver={() => setisHovered(true)}
        onPointerOut={() => setisHovered(false)}
      >
        <hemisphereLight intensity={0.45} groundColor="black" />
        <pointLight intensity={0.1} />
        <spotLight
          position={[20, 50, 100]}
          angle={0.12}
          penumbra={1}
          intensity={0.4}
          castShadow
          shadow-mapSize={1024}
        />
        <primitive
          object={sceneObject.scene}
          scale={isMobile ? 2.0 : 3.35}
          position={isMobile ? [0, -15.0, 0] : [0, -35.0, 0]}
          rotation={[0, 0, 0]}
        />
      </mesh>
    </Select>
  );
};

const MyModelCanvas = () => {
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
        <Selection>
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor="white"
              edgeStrength={100}
              width={1000}
            />
          </EffectComposer>
          <MyModel isMobile={isMobile} />
        </Selection>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default MyModelCanvas;
