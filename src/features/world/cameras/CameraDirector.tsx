import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { CAMERA_STATES } from './cameraStates'
import { useWorldStore } from '../store/worldStore'
import * as THREE from 'three'

export default function CameraDirector(){
  const { camera } = useThree()
  const targetRef = useRef(new THREE.Vector3())
  const lerp = 0.08
  const camKey = useWorldStore(s => s.cameraState)

  useFrame(()=>{
    const state = CAMERA_STATES[camKey]
    if(!state) return
    // position
    camera.position.lerp(new THREE.Vector3(...state.position), lerp)
    // zoom
    camera.zoom += (state.zoom - camera.zoom) * lerp
    camera.updateProjectionMatrix()
    // look at target
    targetRef.current.lerp(new THREE.Vector3(...state.target), lerp)
    camera.lookAt(targetRef.current)
  })

  return null
}
