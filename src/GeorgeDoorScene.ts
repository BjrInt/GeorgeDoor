import * as THREE from 'three';
import { Room } from './components/Room';
import { DoorFrame, type DoorFrameConfig } from './components/DoorFrame';
import { Door, type DoorConfig } from './components/Door';
import { LightingSystem } from './components/LightingSystem';
import { FogSystem, type FogConfig } from './components/FogSystem';
import { CameraController, type CameraAnimationConfig } from './components/CameraController';
import { DoorAnimator, type DoorAnimationConfig } from './components/DoorAnimator';

export class GeorgeDoorScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cameraController!: CameraController;
  private doorAnimator!: DoorAnimator;
  private fogSystem!: FogSystem;
  
  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = this.createRenderer(container);
    
    this.setupScene();
    this.setupEventListeners();
    this.startAnimation();
  }
  
  private createRenderer(container: HTMLElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    return renderer;
  }
  
  private setupScene(): void {
    this.scene.background = new THREE.Color(0xffffff);
    
    const room = new Room();
    room.addToScene(this.scene);
    
    const frameConfig: DoorFrameConfig = {
      width: 5,
      height: 6,
      depth: 0.2,
      thickness: 0.25,
      position: new THREE.Vector3(0, 0, 4.9)
    };
    const doorFrame = new DoorFrame(frameConfig);
    doorFrame.addToScene(this.scene);
    
    const doorConfig: DoorConfig = {
      frameConfig,
      initialRotation: -Math.PI / 4,
      hingePosition: new THREE.Vector3(frameConfig.width / 2 - frameConfig.thickness, 0, 4.9)
    };
    const door = new Door(doorConfig);
    door.addToScene(this.scene);
    
    const doorAnimationConfig: DoorAnimationConfig = {
      minAngle: -Math.PI * 0.45,
      maxAngle: Math.PI * 0.45,
      rotationSpeed: 0.02,
      minChangeInterval: 2000,
      maxChangeInterval: 6000
    };
    this.doorAnimator = new DoorAnimator(door, doorAnimationConfig);
    
    const lightingSystem = new LightingSystem();
    lightingSystem.addToScene(this.scene);
    
    const fogConfig: FogConfig = {
      nearDistance: 2,
      farDistance: 15,
      colorRotationSpeed: 0.1,
      saturation: 0.6,
      lightness: 0.4
    };
    this.fogSystem = new FogSystem(fogConfig);
    this.fogSystem.addToScene(this.scene);
    
    const cameraAnimationConfig: CameraAnimationConfig = {
      radius: 1.5,
      height: 0,
      speed: 0.002,
      verticalFrequency: 0.7
    };
    this.cameraController = new CameraController(this.camera, this.renderer, cameraAnimationConfig);
  }
  
  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.cameraController.handleResize();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  
  private startAnimation(): void {
    this.renderer.setAnimationLoop(() => this.animate());
  }
  
  private animate(): void {
    const time = Date.now() * 0.001;

    this.cameraController.update();
    this.doorAnimator.update();
    this.fogSystem.updateColor(time);
    
    this.renderer.render(this.scene, this.camera);
  }
  
  public getScene(): THREE.Scene {
    return this.scene;
  }
  
  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }
  
  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }
}