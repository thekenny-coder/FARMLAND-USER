import create from 'zustand'

export type WorldTarget =
  | 'your-farm'
  | 'campaign-city'
  | 'pine-forest'
  | 'mountain-range'
  | 'riverside'
  | 'vault'
  | 'media-barn'

type WorldState = {
  selected?: WorldTarget | null
  cameraState: 'empire'|'estate'|'farm'
  select: (t: WorldTarget)=>void
  setCameraState: (c:'empire'|'estate'|'farm')=>void
}

export const useWorldStore = create<WorldState>((set)=>({
  selected: null,
  cameraState: 'empire',
  select: (t)=>set(()=>({selected:t})),
  setCameraState: (c)=>set(()=>({cameraState:c})),
}))
