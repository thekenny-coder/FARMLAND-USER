import React from 'react'
import { MeshProps } from '@react-three/fiber'
import { useWorldStore } from '../store/worldStore'

export default function MapTarget({id, position}: {id:string; position:[number,number,number]}){
  const select = useWorldStore(s=>s.select)

  return (
    <mesh position={position} onPointerDown={(e)=>{e.stopPropagation(); select(id as any);}}>
      <cylinderGeometry args={[1.4,1.4,0.15,24]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}
