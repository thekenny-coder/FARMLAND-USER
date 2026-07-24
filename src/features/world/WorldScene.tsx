import React from 'react'
import { useThree } from '@react-three/fiber'
import MapTarget from './interaction/MapTarget'

export default function WorldScene(){
  const { viewport } = useThree()

  return (
    <group>
      {/* background plane / terrain */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.5,0]} receiveShadow>
        <planeGeometry args={[60,60]} />
        <meshStandardMaterial color="#8CB34A" />
      </mesh>

      {/* mountains */}
      <mesh position={[-8,2,-6]} rotation={[0,0,0]}>
        <coneGeometry args={[6,6,4]} />
        <meshStandardMaterial color="#496F63" />
      </mesh>

      {/* river */}
      <mesh position={[6,0,-2]} rotation={[0,0.6,0]}> 
        <boxGeometry args={[12,0.1,3]} />
        <meshStandardMaterial color="#176B9B" />
      </mesh>

      {/* farm estate (foreground center-left) */}
      <group position={[-6,0.1,6]}>
        <mesh position={[0,0,0]}>
          <boxGeometry args={[3,1.2,3]} />
          <meshStandardMaterial color="#A73825" />
        </mesh>
      </group>

      {/* campaign city (right midground) */}
      <group position={[10,0.1,-2]}>
        <mesh position={[0,0,0]}>
          <boxGeometry args={[2.2,4,2.2]} />
          <meshStandardMaterial color="#2D6FE0" />
        </mesh>
      </group>

      {/* Map targets (invisible hit areas) */}
      <MapTarget id="your-farm" position={[-6,0.2,6]} />
      <MapTarget id="campaign-city" position={[10,0.2,-2]} />
      <MapTarget id="pine-forest" position={[-12,0.2,-2]} />
      <MapTarget id="mountain-range" position={[-8,0.2,-6]} />
      <MapTarget id="riverside" position={[6,0.2,-2]} />
      <MapTarget id="vault" position={[0,0.2,0]} />
      <MapTarget id="media-barn" position={[-4,0.2,4]} />
    </group>
  )
}
