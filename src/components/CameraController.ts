import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface CameraAnimationConfig {
  radius: number;
  height: number;
  speed: number;
  verticalFrequency: number;
}

export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private animationConfig: CameraAnimationConfig;
  private animationTime: number = 0;
  
  constructor(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    animationConfig: CameraAnimationConfig
  ) {
    this.camera = camera;
    this.animationConfig = animationConfig;
    this.setupCamera();
    this.setupControls(renderer);
  }
  
  private setupCamera(): void {
    this.camera.position.set(0, 0, -3);
    this.camera.lookAt(0, 0, 5);
  }
  
  private setupControls(renderer: THREE.WebGLRenderer): void {
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 8;
    this.controls.maxPolarAngle = Math.PI / 10;
  }
  
  public update(): void {
    this.controls.update();
    this.animateCamera();
  }
  
  private animateCamera(): void {
    this.animationTime += this.animationConfig.speed;
    
    const cameraX = Math.sin(this.animationTime) * this.animationConfig.radius;
    const cameraZ = Math.cos(this.animationTime) * this.animationConfig.radius - 1;
    const cameraY = Math.sin(this.animationTime * this.animationConfig.verticalFrequency) * 0.5 + this.animationConfig.height;
    
    this.camera.position.set(cameraX, cameraY, cameraZ);
    this.camera.lookAt(0, 0, 5);
  }
  
  public handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
  
  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }
  
  public getControls(): OrbitControls {
    return this.controls;
  }
}