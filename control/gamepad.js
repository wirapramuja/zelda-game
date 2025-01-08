import { floor, angle } from "../tool/function";

const ATTACK = 0;
const JUMP = 1;
const LOCK = 7;
const X = 0;
const Z = 1;

export default class Gamepad {
  constructor() {
    this.keyboardState = {
      x: 0,
      z: 0,
      attack: false,
      jump: false,
      lock: false
    };

    this.keyMap = {
      KeyW: 'z',
      KeyS: 'z',
      KeyA: 'x',
      KeyD: 'x',
      Enter: 'attack',
      Space: 'jump',
      ShiftLeft: 'lock'
    }; 

    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  get gamepad() {
    return navigator.getGamepads()[0];
  }

  get x() {
    if (this.gamepad) {
      return floor(this.gamepad.axes[X])
    }
    return this.keyboardState.x;
  }

  get z() {
    if (this.gamepad) {
      return floor(this.gamepad.axes[Z])
    }
    return this.keyboardState.z;
  }

  get attack() {
     if (this.gamepad) {
            return this.gamepad.buttons[ATTACK]?.pressed;
        }
        return this.keyboardState.attack;
  }

  get jump() {
    if (this.gamepad) {
            return this.gamepad.buttons[JUMP]?.pressed;
        }
        return this.keyboardState.jump;
  }

  get lock() {
     if (this.gamepad) {
            return this.gamepad.buttons[LOCK]?.pressed;
        }
        return this.keyboardState.lock;
  }

  handleKeyDown(event) {
        const action = this.keyMap[event.code];
        if (!action) return;

        if (action === "x") {
            this.keyboardState.x = event.code === "KeyD" ? 1 : -1;
        } else if (action === "z") {
            this.keyboardState.z = event.code === "KeyW" ? -1 : 1;
        } else {
            this.keyboardState[action] = true;
        }
    }

    handleKeyUp(event) {
        const action = this.keyMap[event.code];
        if (!action) return;

        if (action === "x") {
            this.keyboardState.x = 0;
        } else if (action === "z") {
            this.keyboardState.z = 0;
        } else {
            this.keyboardState[action] = false;
        }
    }

    get angle() {
      return angle(this.x, this.z)
    }

    get moving() {
      return Math.abs(this.x) || Math.abs(this.z)
    }
}
