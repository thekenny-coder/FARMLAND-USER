export const CAMERA_STATES = {
  empire: {
    position: [18,20,18] as [number,number,number],
    target: [0,0,0] as [number,number,number],
    zoom: 42,
  },
  estate: {
    position: [11,14,11] as [number,number,number],
    target: [-2,0,2] as [number,number,number],
    zoom: 58,
  },
  farm: {
    position: [7,8,7] as [number,number,number],
    target: [-4,0,4] as [number,number,number],
    zoom: 78,
  },
} as const
