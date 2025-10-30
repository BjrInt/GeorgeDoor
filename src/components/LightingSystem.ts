import * as THREE from 'three';

export class LightingSystem {
  private lights: THREE.Light[] = [];
  
  constructor() {
    this.createLights();
  }
  
  private createLights(): void {
    const mainLight = new THREE.DirectionalLight(0xffeaa7, 1.5);
    mainLight.position.set(0, 2, 8);
    mainLight.target.position.set(0, 0, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 4096; 
    mainLight.shadow.mapSize.height = 4096;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 20;
    mainLight.shadow.camera.left = -8;
    mainLight.shadow.camera.right = 8;
    mainLight.shadow.camera.top = 6;
    mainLight.shadow.camera.bottom = -6;
    mainLight.shadow.bias = -0.0001; // Reduce shadow acne
    
    this.lights.push(mainLight);
    
    const fillLight = new THREE.PointLight(0xffd93d, 0.8, 15);
    fillLight.position.set(0, 1, 6);
    fillLight.castShadow = true; // Enable shadows for point light too
    fillLight.shadow.mapSize.width = 1024;
    fillLight.shadow.mapSize.height = 1024;
    fillLight.shadow.camera.near = 0.1;
    fillLight.shadow.camera.far = 15;
    this.lights.push(fillLight);
    
    const ambientLight = new THREE.AmbientLight(0x6c5ce7, 0.3); // Reduced for better shadow contrast
    this.lights.push(ambientLight);
    
    const rimLight = new THREE.DirectionalLight(0xffeaa7, 0.3); 
    rimLight.position.set(-2, 1, 6);
    rimLight.target.position.set(0, 0, 4);
    rimLight.castShadow = true;
    rimLight.shadow.mapSize.width = 1024;
    rimLight.shadow.mapSize.height = 1024;
    rimLight.shadow.camera.near = 0.1;
    rimLight.shadow.camera.far = 10;
    rimLight.shadow.camera.left = -4;
    rimLight.shadow.camera.right = 4;
    rimLight.shadow.camera.top = 4;
    rimLight.shadow.camera.bottom = -4;
    this.lights.push(rimLight);
  }
  
  public addToScene(scene: THREE.Scene): void {
    this.lights.forEach(light => {
      scene.add(light);
      if (light instanceof THREE.DirectionalLight && light.target) {
        scene.add(light.target);
      }
    });
  }
  
  public getLights(): THREE.Light[] {
    return this.lights;
  }
}