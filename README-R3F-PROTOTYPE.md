# Reward Farm — R3F Prototype

This commit adds a minimal TypeScript + Vite scaffold and a React Three Fiber prototype for the Reward Farm world scene.

What I added

- Vite + React + TypeScript scaffold (package.json, tsconfig)
- R3F Canvas with an orthographic camera and CameraDirector
- A simple WorldScene with terrain, river, mountains, farm and city proxies
- MapTarget mesh hit areas for required world targets
- A small Zustand store that holds selected target and cameraState
- HTML HUD buttons to switch camera states and show selection

How to run

1. npm install
2. npm run dev

Next steps

- Replace placeholder geometry with GLB assets in /public/world/
- Add instanced meshes for trees/crops and worker instances
- Implement CampaignHeadquarters and state-driven visual transitions
- Add performance budget toggles for mobile

