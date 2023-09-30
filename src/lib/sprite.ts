class SpriteConfig implements Positionable {
    x: number = 0
    y: number = 0
    widthSprites: number = 1
    heightSprites: number = 1
    index: number = 0
    colorKey: number[] = [0]
    flipX: boolean = false
}

class Sprite {
    scene: Scene

    // dimensions
    x: number
    y: number
    widthSprites: number
    heightSprites: number
    w: number
    h: number

    // drawing
    flipX: boolean
    index: number
    colorKey: number | number[]

    constructor(scene: Scene, config: SpriteConfig) {
        this.scene = scene
        this.x = config.x || 0
        this.y = config.y || 0
        this.widthSprites = config.widthSprites || 1
        this.w = this.widthSprites * 8
        this.heightSprites = config.heightSprites || 1
        this.h = this.heightSprites * 8
        this.index = config.index
        this.colorKey = config.colorKey
        this.flipX = config.flipX
    }

    update = () => { }

    draw() {
        spr(
            this.index,
            this.x - this.scene.camera.x,
            this.y - this.scene.camera.y,
            this.colorKey,
            1, // scale
            this.flipX ? 1 : 0, // flip
            0, // rotate
            this.widthSprites,
            this.heightSprites)
    }
}