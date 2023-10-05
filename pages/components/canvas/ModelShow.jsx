import * as THREE from 'three';

import { Suspense, useMemo } from 'react';

import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import CanvasLoader from '../Loader';

const rfs = THREE.MathUtils.randFloatSpread;

const ModelShow = () => {
  const { nodes, materials } = useGLTF('./Furniture.glb');

  const modelCoords = useMemo(() => {
    return new Array(13).fill().map(() => {
      return new THREE.Vector3(rfs(20), rfs(10), rfs(10));
    });
  }, []);

  return (
    <Canvas linear camera={{ position: [0, 0, 20] }}>
      <pointLight color="indianred" />
      <pointLight position={[20, 20, -30]} color="white" intensity={2} />
      <pointLight position={[-20, -20, 20]} color="white" intensity={2} />
      <Suspense fallback={<CanvasLoader />}>
        <group dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.bathroom_item_001.geometry}
            material={materials[i].Material}
            position={modelCoords[i]}
          />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default ModelShow;

useGLTF.preload('./Furniture.glb');
