import { Object3D } from 'three';
import { createRigidBodyFixed } from '../tool/function';
import Area from '../engine/area';

export default class World extends Object3D {
  areas = [];
  constructor(visuals, colliders, areas, physic) {
    super();
    this.initPhysic(colliders, physic);
    this.initVisual(visuals);
    this.initAreas(areas);
  }

  initPhysic(meshes, physic) {
    for (const mesh of meshes) {
      createRigidBodyFixed(mesh, physic);
    }
  }

  initVisual(meshes) {
    for (const mesh of meshes) {
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      this.add(mesh);
    }
  }

  initAreas(areas) {
    for (let area of areas) {
      this.areas.push(new Area(area));
    }
  }
}
