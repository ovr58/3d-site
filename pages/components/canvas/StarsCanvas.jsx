import TypeProps from 'prop-types';

import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass } from 'three-stdlib';

import temp from './starscoordinats';

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass });

function Swarm({ count, dummy = new THREE.Object3D() }) {
  const mesh = useRef();
  const light = useRef();

  const particles = temp;

  useFrame((state) => {
    light.current.position.set(
      -state.viewport.width / 5,
      -state.viewport.height / 5,
      0
    );
    particles.forEach((particle, i) => {
      let { t, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx = particle.mx * 0.01;
      particle.my = particle.my * 0.01;
      dummy.position.set(
        (particle.mx / 10) * a + xFactor,
        (particle.mx / 10) * b + yFactor,
        (particle.my / 10) * b + zFactor
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.rotation.x += 0.0005;
    mesh.current.rotation.y += 0.001;
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <mesh scale={[6, 6, 6]}>
        <Sphere emissive="yellow" />
      </mesh>
      <pointLight
        ref={light}
        distance={40}
        intensity={8}
        color="white"
      ></pointLight>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.05, 0]} />
        <meshStandardMaterial color="#FFF" roughness={0.5} />
      </instancedMesh>
    </>
  );
}
Swarm.propTypes = {
  count: TypeProps.number,
  dummy: TypeProps.object,
};

const Sphere = ({ size = 1, color = 'white', emissive, ...props }) => (
  <mesh {...props}>
    <sphereGeometry args={[size, 64, 64]} />
    <meshPhysicalMaterial
      roughness={0}
      color={color}
      emissive={emissive || color}
      envMapIntensity={0.2}
    />
  </mesh>
);

Sphere.propTypes = {
  size: TypeProps.number,
  color: TypeProps.string,
  emissive: TypeProps.string,
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        linear
        flat
        legacy
        dpr={1}
        camera={{ fov: 100, position: [0, 0, 30] }}
      >
        <ambientLight intensity={0.01} />
        <pointLight distance={60} intensity={4} color="lightblue" />
        <spotLight
          intensity={1.5}
          position={[0, 0, 2000]}
          penumbra={1}
          color="white"
        />
        <mesh>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial
            color="#000000"
            roughness={0.5}
            depthTest={false}
          />
        </mesh>
        <Swarm count={20000} />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
