import * as THREE from 'three';

export interface DoorFrameConfig {
  width: number;
  height: number;
  depth: number;
  thickness: number;
  position: THREE.Vector3;
}

export class DoorFrame {
  private group: THREE.Group;
  private config: DoorFrameConfig;
  
  constructor(config: DoorFrameConfig) {
    this.config = config;
    this.group = this.createFrame();
  }
  
  private createFrame(): THREE.Group {
    const frameGroup = new THREE.Group();
    const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    
    const topFrame = new THREE.Mesh(
      new THREE.BoxGeometry(this.config.width, this.config.thickness, this.config.depth),
      frameMaterial
    );
    topFrame.position.set(0, this.config.height / 2, 0);
    topFrame.castShadow = true;
    frameGroup.add(topFrame);
    
    const leftFrame = new THREE.Mesh(
      new THREE.BoxGeometry(this.config.thickness, this.config.height, this.config.depth),
      frameMaterial
    );
    leftFrame.position.set(-this.config.width / 2 + this.config.thickness / 2, 0, 0);
    leftFrame.castShadow = true;
    frameGroup.add(leftFrame);
    
    const rightFrame = new THREE.Mesh(
      new THREE.BoxGeometry(this.config.thickness, this.config.height, this.config.depth),
      frameMaterial
    );
    rightFrame.position.set(this.config.width / 2 - this.config.thickness / 2, 0, 0);
    rightFrame.castShadow = true;
    frameGroup.add(rightFrame);
    
    const bottomFrame = new THREE.Mesh(
      new THREE.BoxGeometry(this.config.width, this.config.thickness * 2, this.config.depth),
      frameMaterial
    );
    bottomFrame.position.set(0, -this.config.height / 2, 0);
    bottomFrame.castShadow = true;
    frameGroup.add(bottomFrame);
    
    frameGroup.position.copy(this.config.position);
    
    return frameGroup;
  }
  
  public getConfig(): DoorFrameConfig {
    return this.config;
  }
  
  public addToScene(scene: THREE.Scene): void {
    scene.add(this.group);
  }
}