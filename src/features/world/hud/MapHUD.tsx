import React from 'react'
import { useWorldStore } from './store/worldStore'

export default function MapHUD(){
  const selected = useWorldStore(s=>s.selected)
  const setCameraState = useWorldStore(s=>s.setCameraState)

  return (
    <div style={{position:'absolute',right:12,top:12,zIndex:50,color:'#fff'}}>
      <div style={{marginBottom:8}}>
        <button onClick={()=>setCameraState('empire')}>Empire</button>
        <button onClick={()=>setCameraState('estate')}>Estate</button>
        <button onClick={()=>setCameraState('farm')}>Farm</button>
      </div>
      <div style={{background:'rgba(255,255,255,0.04)',padding:10,borderRadius:10}}>
        Selected: {selected ?? 'none'}
      </div>
    </div>
  )
}
