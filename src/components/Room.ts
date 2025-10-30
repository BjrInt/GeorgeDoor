import * as THREE from 'three';

export class Room {
  private group: THREE.Group;
  
  constructor() {
    this.group = this.createRoom();
  }
  
  private createRoom(): THREE.Group {
    const roomGroup = new THREE.Group();
    const roomSize = { width: 5, height: 6, depth: 10 };
    
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x888888,
      side: THREE.FrontSide
    });
    
    
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(roomSize.width, roomSize.depth),
      material
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -roomSize.height / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);
    
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(roomSize.width, roomSize.depth),
      material
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomSize.height / 2;
    ceiling.receiveShadow = true;
    roomGroup.add(ceiling);
    
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(roomSize.width, roomSize.height),
      material
    );
    backWall.position.z = -roomSize.depth / 2;
    backWall.receiveShadow = true;
    roomGroup.add(backWall);
    
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(roomSize.depth, roomSize.height),
      material
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -roomSize.width / 2;
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);
    
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(roomSize.depth, roomSize.height),
      material
    );
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = roomSize.width / 2;
    rightWall.receiveShadow = true;
    roomGroup.add(rightWall);
    
    const frontWallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x999999,
      side: THREE.FrontSide
    });
    
    const frontWallLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(2.25, roomSize.height), 
      frontWallMaterial
    );
    frontWallLeft.position.set(-3.875, 0, roomSize.depth / 2 - 0.01);
    frontWallLeft.receiveShadow = true;
    roomGroup.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
      new THREE.PlaneGeometry(2.25, roomSize.height),
      frontWallMaterial
    );
    frontWallRight.position.set(3.875, 0, roomSize.depth / 2 - 0.01);
    frontWallRight.receiveShadow = true;
    roomGroup.add(frontWallRight);
    
    return roomGroup;
  }
  
  public addToScene(scene: THREE.Scene): void {
    scene.add(this.group);
  }
}