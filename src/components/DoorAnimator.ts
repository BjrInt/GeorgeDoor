import type { Door } from './Door';

export interface DoorAnimationConfig {
  minAngle: number;
  maxAngle: number;
  rotationSpeed: number;
  minChangeInterval: number;
  maxChangeInterval: number;
}

export class DoorAnimator {
  private door: Door;
  private config: DoorAnimationConfig;
  private targetRotation: number;
  private rotationChangeTime: number = 0;
  private nextRotationChange: number;
  
  constructor(door: Door, config: DoorAnimationConfig) {
    this.door = door;
    this.config = config;
    this.targetRotation = door.getRotation();
    this.nextRotationChange = config.minChangeInterval;
  }
  
  public update(): void {
    const currentTime = Date.now();
    
    // Check if it's time to change target rotation
    if (currentTime - this.rotationChangeTime > this.nextRotationChange) {
      this.generateNewTarget();
      this.rotationChangeTime = currentTime;
      this.nextRotationChange = this.config.minChangeInterval + 
        Math.random() * (this.config.maxChangeInterval - this.config.minChangeInterval);
    }
    
    // Smoothly interpolate current rotation towards target
    const currentRotation = this.door.getRotation();
    const rotationDiff = this.targetRotation - currentRotation;
    
    if (Math.abs(rotationDiff) > 0.001) {
      const newRotation = currentRotation + rotationDiff * this.config.rotationSpeed;
      this.door.setRotation(newRotation);
    }
  }
  
  private generateNewTarget(): void {
    this.targetRotation = this.config.minAngle + 
      Math.random() * (this.config.maxAngle - this.config.minAngle);
  }
  
  public setTargetRotation(rotation: number): void {
    this.targetRotation = Math.max(this.config.minAngle, 
      Math.min(this.config.maxAngle, rotation));
  }
}