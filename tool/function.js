import { ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d-compat';


function createColliderGeo(geo, rigidBody, physic) {
    const vertices = new Float32Array(geo.attributes.position.array)
    const indices = new Float32Array(geo.index.array)
    const colliderDesc = ColliderDesc.trimesh(vertices, indices)
    return physic.createCollider(colliderDesc, rigidBody)
}

function createColliderBall(radius, rigidBody, physic) {
    const colliderDesc = ColliderDesc.ball(radius)
    return physic.createCollider(colliderDesc, rigidBody)
}

export function createRigidBodyFixed(mesh, physic) {
    const rigidBodyDesc = RigidBodyDesc.fixed();
    const rigidBody = physic.createRigidBody(rigidBodyDesc);
    createColliderGeo(mesh.geometry, rigidBody, physic)
}

export function createRigidBodyEntity(position, physic) {
        const rigidBodyDesc = RigidBodyDesc.dynamic();
        rigidBodyDesc.setTranslation(...position)
        const rigidBody = physic.createRigidBody(rigidBodyDesc);
        const collider = createColliderBall(0.25, rigidBody, physic)

        return {rigidBody, collider}

}

export function floor(float, max = 0.2) {
    return Math.abs(float) < max ? 0 : float
}

export function browse(object, callback) {
    if(object.isMesh) callback(object)
    const children = object.children
    for(let i=0; i<children.length; i++ ) {
        browse(children[i], callback)
    }
}

export function angle(x, z) {
    return Math.atan2(-z, x) + Math.PI / 2
}

export function range (angle1, angle2) {
    let angle = ((angle1 - angle2 + Math.PI) % (Math.PI * 2)) - Math.PI
    angle < - Math.PI ? angle + Math.PI * 2 : angle
    return angle
}

export function findByName(name, list) {
  console.log('Searching for name:', name);
  console.log('List:', list);
  return list.find(a => name === a.name);
}

const reg = /\[(.*?)\]/;
export function getSrc(src) {
  const match = src.match(reg);
  if (match !== null) {
    const range = match[1].split('-');
    const iBegin = parseInt(range[0], 10);
    const iEnd = parseInt(range[1], 10);
    const size = iEnd - iBegin + 1;
    const source = src.split('[')[0];
    const ext = src.split(']')[1];
    return new Array(size)
      .fill(null)
      .map((e, i) => source + (i + iBegin) + ext);
  }
  return [src];
}
