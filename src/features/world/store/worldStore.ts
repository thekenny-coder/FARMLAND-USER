import create from 'zustand'

export type WorldTarget =
  | 'your-farm'
  | 'campaign-city'
  | 'pine-forest'
  | 'mountain-range'
  | 'riverside'
  | 'vault'
  | 'media-barn'

export type Farm = { id:string; name:string; worldPosition?: [number,number,number]; status?: string }
export type Campaign = { id:string; title:string; status:string; worldPosition?: [number,number,number]; visualTheme?:string; accentColor?:string }
export type Task = { id:string; farmId?:string; type?:string; status?:string; progress?:number }

export type FarmWorldState = {
  ownedFarms?: Farm[]
  activeCampaigns?: Campaign[]
  activeTasks?: Task[]
  submissions?: any[]
  readyRewards?: any[]
  balance?: number
}

type WorldState = {
  selected?: WorldTarget | null
  cameraState: 'empire'|'estate'|'farm'
  world?: FarmWorldState
  select: (t: WorldTarget)=>void
  setCameraState: (c:'empire'|'estate'|'farm')=>void
  setWorldState: (w: Partial<FarmWorldState>)=>void
}

export const useWorldStore = create<WorldState>((set)=>({
  selected: null,
  cameraState: 'empire',
  world: undefined,
  select: (t)=>set(()=>({selected:t})),
  setCameraState: (c)=>set(()=>({cameraState:c})),
  setWorldState: (w)=>set((s)=>({ world: { ...s.world, ...(w as any) } }))
}))
