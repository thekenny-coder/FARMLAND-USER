import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, Html, OrbitControls } from '@react-three/drei'
import CameraDirector from './cameras/CameraDirector'
import WorldScene from './WorldScene'
import MapHUD from './hud/MapHUD'

export default function RewardFarmCanvas(){
  return (
    <div style={{width:480, height:'100vh', position:'relative'}}>
      <Canvas shadows dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}>
        <OrthographicCamera makeDefault position={[18,20,18]} zoom={42} near={0.1} far={200} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <CameraDirector />
        <Suspense fallback={null}>
          <WorldScene />
        </Suspense>
      </Canvas>
      {/* screen-space HTML HUD */}
      <div className="hud">
        <div className="pill">Farmer Joe — Level 24</div>
        <div className="pill">GEM: 12,450 · Energy: 18/20</div>
      </div>
      <MapHUD />
    </div>
  )
}
