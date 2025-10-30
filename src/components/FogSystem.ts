import * as THREE from 'three';

export interface FogConfig {
  nearDistance: number;
  farDistance: number;
  colorRotationSpeed: number;
  saturation: number;
  lightness: number;
}

export class FogSystem {
  private fog: THREE.Fog;
  private config: FogConfig;
  
  constructor(config: FogConfig) {
    this.config = config;
    this.fog = new THREE.Fog(0x888888, config.nearDistance, config.farDistance);
  }
  
  public getFog(): THREE.Fog {
    return this.fog;
  }
  
  public updateColor(time: number): void {
    const hue = (time * this.config.colorRotationSpeed) % 1;
    const fogColor = new THREE.Color().setHSL(hue, this.config.saturation, this.config.lightness);
    this.fog.color = fogColor;
  }
  
  public addToScene(scene: THREE.Scene): void {
    scene.fog = this.fog;
  }
}