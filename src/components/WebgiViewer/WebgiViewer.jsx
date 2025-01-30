import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
  mobileAndTabletCheck
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAimation } from "../../lib/scroll-animation";
gsap.registerPlugin(ScrollTrigger);
const WebgiViewer = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [viewerRef, setViewerRef] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [targetRef, setTargetRef] = useState(null);
  const [positionRef, setpositionRef] = useState(null);
  const [previewMood, setPreviewMood] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  useImperativeHandle(ref, () => ({
    triggerPreview() {
      setPreviewMood(true);
      props.contentRef.current.style.opacity = 0;
      canvasContainerRef.current.style.pointerEvents = "all";
      gsap.to(positionRef, {
        x: 13.04,
        y: -2.01,
        z: 2.29,
        duration: 2,
        onUpdate: () => {
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        },
      });
      gsap.to(targetRef, {
        x: 0.11,
        y: 0.0,
        z: 0.0,
        duration: 2,
      });
      viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true });
    },
  }));
  const memorizeScrollFunction = useCallback((position, target,isMobile ,onUpdate) => {
    if (position && target && isMobile && onUpdate) {
      scrollAimation(position, target, isMobile, onUpdate);
    }
  }, []);
  const setupViewer = useCallback(async () => {
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });
    setViewerRef(viewer);
    const ISMobileOrTablet=mobileAndTabletCheck();
    setIsMobile(ISMobileOrTablet)
    // Add plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
    setCameraRef(camera);
    setTargetRef(target);
    setpositionRef(position);
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
    if(ISMobileOrTablet){
      position.set(-16.7,1.17,11.7)
      target.set(0,1.37,0)
      props.contentRef.current.className="mobile-or-tablet"
    }
    window.scrollTo(0, 0);
    let needUpdate = true;
    const onUpdate = () => {
      needUpdate = true;
      viewer.setDirty();
    };
    viewer.addEventListener("preFrame", () => {
      if (needUpdate) {
        camera.positionTargetUpdated(true);
        needUpdate = false;
      }
    });
    memorizeScrollFunction(position, target,ISMobileOrTablet, onUpdate);
  }, []);
  const handleExit = useCallback(() => {
    props.contentRef.current.style.opacity = 1;
    canvasContainerRef.current.style.pointerEvents = "none";
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
    setPreviewMood(false);
    gsap
      .to(positionRef, {
        x: !isMobile ? 1.56 : 9.36,
        y: !isMobile ? 5.0 : 10.95,
        z: !isMobile ? 0.01 : 0.09,
        scrollTrigger: {
          trigger: ".display-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
        onUpdate: () => {
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        },
      });
      gsap.to(targetRef, {
        x: !isMobile ? -0.55 : -1.62,
        y: !isMobile ? 0.32 : 0.02,
        z: !isMobile ? 0.0 : -0.06,
        scrollTrigger: {
          trigger: ".display-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
      });
  },[canvasContainerRef,positionRef,targetRef,viewerRef,cameraRef]);
  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <div ref={canvasContainerRef} id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef}></canvas>
      {previewMood && (
        <button className="button" onClick={handleExit}>
          Exit
        </button>
      )}
    </div>
  );
});
export default WebgiViewer;
