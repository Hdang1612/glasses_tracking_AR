import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ZapparFaceTracking({ modelUrl }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    // Lấy kích thước phần tử cha của canvas
    const parent = canvas.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height, false);

    // Scene và Camera Zappar
    const scene = new THREE.Scene();
    const camera = new ZapparThree.Camera();
    scene.add(camera);

    // Set context WebGL cho Zappar
    ZapparThree.glContextSet(renderer.getContext());

    // Background camera texture
    scene.background = camera.backgroundTexture;

    // LoadingManager Zappar (để quản lý việc load model)
    const manager = new ZapparThree.LoadingManager();

    // FaceTracker và FaceAnchorGroup
    const faceTracker = new ZapparThree.FaceTrackerLoader(manager).load();
    const faceTrackerGroup = new ZapparThree.FaceAnchorGroup(
      camera,
      faceTracker
    );
    scene.add(faceTrackerGroup);

    // Ẩn faceAnchorGroup lúc đầu
    faceTrackerGroup.visible = false;

    // HeadMask
    const mask = new ZapparThree.HeadMaskMeshLoader().load();
    faceTrackerGroup.add(mask);

    // Load GLTF Model nếu có
    if (modelUrl) {
      const loader = new GLTFLoader(manager);
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(0, 0.15, 0.8);
          model.scale.set(0.25, 0.23, 0.23);
          model.rotation.set(0, -Math.PI / 2, -Math.PI / 50);
          faceTrackerGroup.add(model);
        },
        undefined,
        (error) => console.error("❌ Failed to load GLTF model:", error)
      );
    }

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 5, 0);
    directionalLight.lookAt(0, 0, 0);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Xử lý permission request với UI Zappar
    ZapparThree.permissionRequestUI().then((granted) => {
      if (granted) camera.start(true);
      else ZapparThree.permissionDeniedUI();
    });

    // Hiện/ẩn faceTrackerGroup dựa trên trạng thái face visible
    faceTracker.onVisible.bind(() => {
      faceTrackerGroup.visible = true;
    });
    faceTracker.onNotVisible.bind(() => {
      faceTrackerGroup.visible = false;
    });

    // Render loop
    function render() {
      camera.updateFrame(renderer);
      mask.updateFromFaceAnchorGroup(faceTrackerGroup);
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();

    // Cleanup
    return () => {
      camera.stop();
      renderer.dispose();
    };
  }, [modelUrl]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}
