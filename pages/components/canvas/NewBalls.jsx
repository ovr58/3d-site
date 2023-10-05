import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { Decal, Html, useTexture } from '@react-three/drei';
import {
  Selection,
  Select,
  EffectComposer,
  Outline,
} from '@react-three/postprocessing';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, vec3 } from '@react-three/rapier';
import { useContext, useMemo, useRef, useState, useEffect } from 'react';

import { SiteLang } from '../../LangContext';
import { localize } from '../../utils/Translation';

CameraControls.install({ THREE });
const rfs = THREE.MathUtils.randFloatSpread;

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 3.2) : pos.set(0, 0, 20);
    zoom ? look.set(focus.x, focus.y, focus.z - 3.2) : look.set(0, 0, 19);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );

    return controls.update(delta);
  });
}

function Sticker({ url }) {
  const [decal] = useTexture([url]);
  return (
    <Decal position={[0, 0, 1]} rotation={[Math.PI, 0, 6.25]} scale={1.47}>
      <meshPhysicalMaterial
        map={decal}
        transparent
        polygonOffset
        polygonOffsetFactor={-10}
        map-flipY={false}
        map-anisotropy={16}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 10]}
        roughness={1}
        clearcoat={0.5}
        metalness={0.75}
        toneMapped={false}
      />
    </Decal>
  );
}

function Content({ zoomToView }) {
  const { lang } = useContext(SiteLang);

  const [hovered, setHover] = useState(-1);

  const technologies = useMemo(() => localize(lang, 'technologies'), [lang]);

  const ref = useRef([]);

  const techballs = useMemo(() => {
    return new Array(13).fill().map(() => {
      return new THREE.Vector3(rfs(20), rfs(10), rfs(10));
    });
  }, []);

  useFrame(() => {
    for (let i = 0; i < 13; i++) {
      if (ref.current[i]) {
        const position = vec3(ref.current[i].translation());
        if (position.length() > 1) {
          let impX = (-1 * position.x) / Math.abs(position.x);
          let impY = (-1 * position.y) / Math.abs(position.y);
          let impZ = (-1 * position.z) / Math.abs(position.z);
          ref.current[i].applyImpulse(
            { x: 2 * impX, y: 2 * impY, z: 2 * impZ },
            true
          );
        }
        if (position.x !== 0 && position.y !== 0 && position.z !== 0) {
          ref.current[i].applyImpulse(
            {
              x: Math.random() * (position.x / Math.abs(position.x)),
              y: Math.random() * (position.y / Math.abs(position.y)),
              z: Math.random() * (position.z / Math.abs(position.z)),
            },
            true
          );
        }
        if (position.x === 0 && position.y === 0 && position.z === 0) {
          ref.current[i].setLinearDamping(1);
        }
      }
    }
  });

  return (
    <group>
      {technologies.map((technology, index) => (
        <Select
          enabled={hovered === index ? true : false}
          key={technology.name}
        >
          <RigidBody
            ref={(el) => (ref.current[index] = el)}
            colliders="ball"
            restitution={0.01}
            onCollisionExit={() => setHover(index)}
          >
            <mesh
              position={techballs[index]}
              onPointerOver={() => setHover(index)}
              onPointerOut={() => setHover(-1)}
              onClick={(e) => zoomToView(e.eventObject.position, index)}
            >
              <icosahedronGeometry args={[1, 1]} />
              <Sticker
                url={technology.icon}
                onPointerOver={() => setHover(index)}
                onPointerOut={() => setHover(-1)}
              />
              {hovered === index ? (
                <Html distanceFactor={10}>
                  <div className=" w-auto  rounded-lg bg-tertiary p-6 shadow-black dark:bg-neutral-900">
                    <h5 className="mb-2 text-3xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      {technologies[index].name}
                    </h5>
                  </div>
                </Html>
              ) : (
                ''
              )}
            </mesh>
          </RigidBody>
        </Select>
      ))}
    </group>
  );
}

export default function NewBalls({ toggle, selectItem }) {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  useEffect(() => {
    toggle >= 0 ? setZoom(true) : setZoom(false);
  }, [toggle]);

  return (
    <Canvas linear camera={{ position: [0, 0, 15] }}>
      <pointLight color="indianred" />
      <pointLight position={[20, 20, -30]} color="white" intensity={2} />
      <pointLight position={[-20, -20, 20]} color="white" intensity={2} />
      <Selection>
        <Physics colliders={false} gravity={[0, 0, 0]}>
          <EffectComposer multisampling={3} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor="indianred"
              edgeStrength={50}
              width={300}
            />
          </EffectComposer>
          <Content
            zoomToView={(focusRef, pressedRef) => (
              setFocus(focusRef), selectItem(pressedRef)
            )}
          />
          <Controls zoom={zoom} focus={focus} />
        </Physics>
      </Selection>
    </Canvas>
  );
}
