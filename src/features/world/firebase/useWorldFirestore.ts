import { useEffect } from 'react'
import { doc, onSnapshot, updateDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { initFirebase, onAuthReady, getDb } from '../../firebase/firebaseClient'
import { useWorldStore } from '../store/worldStore'

export function useWorldFirestore(){
  const setWorldState = useWorldStore.getState().setWorldState

  useEffect(()=>{
    const { db } = initFirebase()
    let unsub: (()=>void) | undefined
    const offAuth = onAuthReady(async (uid)=>{
      if(!uid) return
      const ref = doc(db, 'farmWorldStates', uid)
      // ensure doc exists (optional)
      // setDoc(ref, { initializedAt: serverTimestamp() }, { merge: true }).catch(()=>{})
      unsub = onSnapshot(ref, (snap)=>{
        if(!snap.exists()) return
        const data = snap.data()
        setWorldState(data as any)
      }, (err)=>{
        console.error('world snapshot error', err)
      })
    })

    return ()=>{ if(unsub) unsub(); if(offAuth) offAuth(); }
  }, [setWorldState])
}

export async function updateTaskStatus(taskId:string, updates:Record<string,any>){
  const { db } = initFirebase()
  const auth = await new Promise<string|null>((res)=>{
    onAuthReady((uid)=>res(uid))
  })
  if(!auth) throw new Error('not authenticated')
  const ref = doc(db, 'farmWorldStates', auth)
  const payload = { lastUpdated: serverTimestamp() }
  try{
    await updateDoc(ref, { [`activeTasksMap.${taskId}`]: updates, ...payload })
  }catch(e){
    // if doc missing, create
    await setDoc(ref, { activeTasksMap: { [taskId]: updates }, ...payload }, { merge:true })
  }
}
