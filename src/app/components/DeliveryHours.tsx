// components/DeliveryHours.tsx
'use client';

import { memo, useRef } from 'react';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useGLTF } from '@react-three/drei';
import { BIZ } from '@/lib/site';
import type { JSX } from 'react';

const RikshaModel = memo(function RikshaModel(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/riksha.glb') as GLTF;
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.35;
    const roamWidth = 5.0;
    const roamDepth = 0.8;
    const x = Math.sin(t) * roamWidth;
    const z = Math.cos(t * 0.7) * roamDepth;

    const g = ref.current;
    if (!g) return;
    g.position.set(x, 0, z);
    g.rotation.y = -Math.cos(t) * 0.9;
    g.rotation.z = Math.sin(t * 2) * 0.03;
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <Float floatIntensity={0.6} rotationIntensity={0.3} speed={1.2}>
        <primitive object={scene} scale={0.85} />
      </Float>
    </group>
  );
});
useGLTF.preload('/riksha.glb');

export const DeliveryHours = memo(function DeliveryHours() {
  const rows: ReadonlyArray<Readonly<[string, string]>> = [
    ['Mon', '17:00 – 22:00'],
    ['Tue', '17:00 – 22:00'],
    ['Wed', '17:00 – 22:00'],
    ['Thu', '17:00 – 22:00'],
    ['Fri', '17:00 – 23:00'],
    ['Sat', '17:00 – 23:00'],
    ['Sun', '17:00 – 22:00'],
  ];

  const btnBase =
    'inline-flex items-center justify-center rounded-xl border-2 px-6 py-3 text-sm sm:text-base font-extrabold shadow-lg active:translate-y-[1px] transition-transform';
  const btnOutline = `${btnBase} border-[#7A1D1D] bg-white/95 text-[#7A1D1D]`;

  return (
    <section
      id="delivery-hours"
      className="relative mx-auto w-full max-w-none overflow-visible"
      style={{
        backgroundImage: 'url(/amb.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-labelledby="delivery-hours-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-12">
        <div className="relative mx-auto max-w-3xl rounded-[28px] ring-2 ring-[#7A1D1D]/60 shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-transparent">
          <div className="pt-6 pb-2 text-center">
            <h2
              id="delivery-hours-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
            >
              Delivery Hours
            </h2>
            <div className="mx-auto mt-2 inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-1 backdrop-blur-[1px]">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2C8.7 2 6 4.7 6 8c0 4.2 5.1 10.6 5.3 10.8.4.5 1.1.5 1.5 0 .2-.2 5.2-6.6 5.2-10.8 0-3.3-2.7-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5S13.4 10.5 12 10.5z" />
              </svg>
              <span className="text-[12px] sm:text-sm font-medium text-white">
                {BIZ.address}
              </span>
            </div>
          </div>

          <div className="relative z-10 mx-auto mb-6 w-full max-w-md rounded-2xl border-2 border-[#7A1D1D] backdrop-blur-sm p-4 shadow-2xl">
            <div className="divide-y divide-[#7A1D1D]/10">
              {rows.map(([d, h]) => (
                <div key={d} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-semibold text-[#7A1D1D]">{d}</span>
                  <span className="text-neutral-700">{h}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href={`${BIZ.orderUrl}/locations`}
                target="_blank"
                rel="noopener noreferrer"
                className={btnOutline}
              >
                All Locations
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FRONT overlay canvas */}
      <div
        className="
          pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[150%] sm:w-[170%] lg:w-[200%]
          h-[220px] sm:h-[280px] lg:h-[340px]
          z-30 overflow-visible
        "
        aria-hidden
      >
        <Canvas camera={{ position: [0, 1.4, 5], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 4, 2]} intensity={1} />
          <directionalLight position={[-3, 2, -2]} intensity={0.45} />
          <RikshaModel />
          <Environment preset="city" />
        </Canvas>
      </div>
    </section>
  );
});
