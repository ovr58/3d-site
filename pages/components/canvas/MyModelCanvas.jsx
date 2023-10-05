/* eslint-disable react/no-unknown-property */
import TypeProps from 'prop-types';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const MyModel = ({ isMobile }) => {
  const sceneObject = useGLTF('./desktop_pc/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={1.25} groundColor="black" />
      <pointLight intensity={0.9} />

      <primitive
        object={sceneObject.scene}
        scale={isMobile ? 2.0 : 3.3}
        position={isMobile ? [0, -15.0, 0] : [0, -35.0, 0]}
        rotation={[0, 90, 0]}
      />
    </mesh>
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
      <OrbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={<CanvasLoader />}>
        <MyModel isMobile={isMobile} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

MyModel.propTypes = {
  isMobile: TypeProps.bool,
  hoverObject: TypeProps.func,
};

export default MyModelCanvas;
