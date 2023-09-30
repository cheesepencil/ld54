/// <reference path="./constants.ts" />
/// <reference path="./box.ts" />

const DEFAULT_CAMERA_BOUNDS: Box = {
    v1: new Vector(0, 0),
    v2: new Vector(0, 0)
}

interface CameraConfig {
    x?: number
    y?: number
    offsetX?: number
    offsetY?: number
    bounds?: Box
    target?: Positionable
    lerpX?: number
    lerpY?: number
}

class Camera {
    x: number = 0
    y: number = 0
    offsetX: number = -Constants.SCREEN_WIDTH / 2
    offsetY: number = -Constants.SCREEN_HEIGHT / 2
    bounds: Box = DEFAULT_CAMERA_BOUNDS

    target?: Positionable
    lerpX: number = 0.5
    lerpY: number = 0.5

    configure(config?: CameraConfig) {
        this.x = config?.x ?? 0
        this.y = config?.y ?? 0
        this.bounds = config?.bounds ?? DEFAULT_CAMERA_BOUNDS
        this.target = config?.target
        this.lerpX = config?.lerpX ?? 0.5
        this.lerpY = config?.lerpY ?? 0.5
        this.offsetX = config?.offsetX ?? -Constants.SCREEN_WIDTH / 2
        this.offsetY = config?.offsetY ?? -Constants.SCREEN_HEIGHT / 2
    }

    update() {
        if (!this.target) return

        const lerpedX = Util.lerp(this.x - this.offsetX, this.target.x, this.lerpX)
        this.setX(Math.floor(lerpedX + this.offsetX))

        const lerpedY = Util.lerp(this.y - this.offsetY, this.target.y, this.lerpY)
        this.setY(Math.floor(lerpedY + this.offsetY))
    }

    centerOn(target: Positionable) {
        this.setX(target.x + this.offsetX)
        this.setY(target.y + this.offsetY)
    }

    setX(x: number) {
        this.x = Util.clamp(x, this.bounds.v1.x, this.bounds.v2.x)
    }

    setY(y: number) {
        this.y = Util.clamp(y, this.bounds.v1.y, this.bounds.v2.y)
    }
}