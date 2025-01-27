import React, { useCallback, useEffect, useRef } from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAimation } from "../../lib/scroll-animation";
gsap.registerPlugin(ScrollTrigger)
export default function WebgiViewer() {
  const canvasRef = useRef(null);
 const memorizeScrollFunction=useCallback((position,target,onUpdate)=>{
  if(position && target && onUpdate){
    scrollAimation(position && target && onUpdate)
  }
 },[])
  const setupViewer = useCallback(async () => {
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    // Add plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    // Configure TonemapPlugin

    // Refresh the renderer
    viewer.renderer.refreshPipeline();

    // Load the GLB file from the public folder
    await manager.addFromPath("/scene-black.glb");
    (await viewer.addPlugin(TonemapPlugin)).config.clipBackground = true;
    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
    window.scrollTo(0, 0);
    let needUpdate = true;
    const onUpdate=()=>{
      needUpdate=true
      viewer.setDirty()
    }
    viewer.addEventListener("preFrame", () => {
      if (needUpdate) {
        camera.positionTargetUpdated(true);
        needUpdate=false
      }
    });
    memorizeScrollFunction(position,target,onUpdate)
  }, []);

  useEffect(() => {
    setupViewer();
  }, [setupViewer]);

  return (
    <div id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef}></canvas>
    </div>
  );
}
