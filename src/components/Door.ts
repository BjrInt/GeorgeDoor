import * as THREE from 'three';
import type { DoorFrameConfig } from './DoorFrame';

export interface DoorConfig {
  frameConfig: DoorFrameConfig;
  initialRotation: number;
  hingePosition: THREE.Vector3;
}

export class Door {
  private group: THREE.Group;
  private config: DoorConfig;
  private doorWidth: number;
  private doorHeight: number;
  
  constructor(config: DoorConfig) {
    this.config = config;
    this.doorWidth = config.frameConfig.width - config.frameConfig.thickness * 2;
    this.doorHeight = config.frameConfig.height - config.frameConfig.thickness;
    this.group = this.createDoor();
  }
  
  private createDoor(): THREE.Group {
    const doorGroup = new THREE.Group();
    const doorDepth = 0.2;
    
    const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(this.doorWidth, this.doorHeight, doorDepth),
      doorMaterial
    );
    door.position.x = -this.doorWidth / 2;
    door.castShadow = true;
    
    const handleMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.15),
      handleMaterial
    );
    handle.rotation.z = Math.PI / 2;
    handle.position.set(-this.doorWidth + 0.2, 0, doorDepth / 2 + 0.02);
    handle.castShadow = true;
    
    doorGroup.add(door);
    doorGroup.add(handle);
    
    doorGroup.position.copy(this.config.hingePosition);
    doorGroup.rotation.y = this.config.initialRotation;
    
    return doorGroup;
  }

  public setRotation(rotation: number): void {
    this.group.rotation.y = rotation;
  }
  
  public getRotation(): number {
    return this.group.rotation.y;
  }
  
  public addToScene(scene: THREE.Scene): void {
    scene.add(this.group);
  }
}