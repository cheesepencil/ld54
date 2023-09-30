class BoxConstants {
    static readonly MIN_BOX_WIDTH = 36
    static readonly BOX_SPRITES = [492]
    static readonly BOX_SPRITE_WIDTH = 4
    static readonly BOX_SPRITE_HEIGHT = 2
    static readonly BOX_FILL_COLOR = 3
    static readonly BOX_BORDER_COLOR = 2
}

class Box {
    scene: Scene
    right: boolean = false
    y: number = 96
    w: number = 128
    x: number = Constants.SCREEN_WIDTH / 2 - this.w / 2

    constructor(scene: Scene) {
        this.scene = scene
    }

    update() { }

    draw() {
        rect(
            this.x - this.scene.camera.x,
            this.y - this.scene.camera.y,
            this.w,
            BoxConstants.BOX_SPRITE_HEIGHT * 8,
            BoxConstants.BOX_FILL_COLOR)
        rectb(
            this.x - this.scene.camera.x,
            this.y - this.scene.camera.y,
            this.w,
            BoxConstants.BOX_SPRITE_HEIGHT * 8,
            BoxConstants.BOX_BORDER_COLOR)
        rectb(
            this.x + 1 - this.scene.camera.x,
            this.y - this.scene.camera.y,
            this.w - 2,
            BoxConstants.BOX_SPRITE_HEIGHT * 8,
            BoxConstants.BOX_BORDER_COLOR)
        spr(
            BoxConstants.BOX_SPRITES[0],
            this.x + (this.right ? this.w - BoxConstants.BOX_SPRITE_WIDTH * 8 : 0) - this.scene.camera.x,
            this.y - this.scene.camera.y,
            0,
            undefined,
            undefined,
            undefined,
            BoxConstants.BOX_SPRITE_WIDTH,
            BoxConstants.BOX_SPRITE_HEIGHT)
    }
}