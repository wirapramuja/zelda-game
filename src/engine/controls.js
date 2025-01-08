import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Object3D } from 'three';

export default class Controls extends Object3D {
  constructor(camera, domElement) {
    super();
    this.controls = new OrbitControls(camera, domElement);
    this.controls.enableDamping = true; // Aktifkan damping
    this.controls.dampingFactor = 0.05; // Faktor damping
    this.controls.screenSpacePanning = false; 
    this.controls.minDistance = 1;
    this.controls.maxDistance = 100;
  }

  update() {
    // Perbarui damping
    this.controls.update();
  }
}
