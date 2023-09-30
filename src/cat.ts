class CatConstants {
    static readonly FRONT_W = 2
    static readonly FRONT_H = 4
    static readonly FRONT_WALK_FRAMES = [266, 262, 266, 270]
    static readonly REAR_W = 4
    static readonly REAR_H = 4
    static readonly REAR_WALK_FRAMES = [328, 324, 328, 332]
    static readonly TAIL_W = 2
    static readonly TAIL_H = 4
    static readonly TAIL_WALK_FRAMES = [264]
    static readonly HEAD_W = 4
    static readonly HEAD_H = 4
    static readonly HEAD_IDLE = 388
    static readonly HEAD_SAD = 392
    static readonly HEAD_YAY = 396
    static readonly BODY_COLOR = 14
    static readonly CAT_Y = 96 - 8
}

class Cat {
    scene: Scene
    x = 0
    y = CatConstants.CAT_Y
    w = 48
    right = true
    bodyFrameIndex = 0
    headFrame = CatConstants.HEAD_IDLE
    animSpeed = Util.secondsToFrames(0.125)
    ticks = 0
    hide = false

    constructor(scene: Scene) {
        this.scene = scene
    }

    update() {
        this.ticks += 1
        if (this.ticks == this.animSpeed) {
            this.ticks = 0
            this.bodyFrameIndex += 1
            if (this.bodyFrameIndex >= 4) this.bodyFrameIndex = 0
        }
    }

    draw() {
        if (this.hide) return
        
        const camX = this.scene.camera.x
        const camY = this.scene.camera.y

        // front
        const frontX = (this.right
            ? this.x + this.w - CatConstants.FRONT_W * 8
            : this.x + 1) - camX
        const frontY = this.y - camY
        Util.pal(14, 0)
        Util.pal(15, 0)
        for (let i = -1; i <= 1; i += 2) {
            spr(
                CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],
                frontX + i,
                frontY,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.FRONT_W,
                CatConstants.FRONT_H
            )
            spr(
                CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],
                frontX,
                frontY + i,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.FRONT_W,
                CatConstants.FRONT_H
            )
        }
        Util.pal()
        spr(
            CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],
            frontX,
            frontY,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.FRONT_W,
            CatConstants.FRONT_H
        )

        // back
        const rearX = (this.right
            ? this.x + 1
            : this.x + this.w - CatConstants.REAR_W * 8) - camX
        const rearY = this.y - camY
        Util.pal(14, 0)
        Util.pal(15, 0)
        for (let i = -1; i <= 1; i += 2) {
            spr(
                CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],
                rearX + (Math.abs(i) * (this.right ? -1 : 1)),
                rearY,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.REAR_W,
                CatConstants.REAR_H
            )
            spr(
                CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],
                rearX,
                rearY + i,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.REAR_W,
                CatConstants.REAR_H
            )
        }
        Util.pal()
        spr(
            CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],
            rearX,
            rearY,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.REAR_W,
            CatConstants.REAR_H
        )

        // belly glue
        if (this.w > 48) {
            const glueX = (this.right
                ? this.x + CatConstants.REAR_W * 8
                : this.x + CatConstants.FRONT_W * 8) - camX
            const glueY = this.y + 5 - camY
            rectb(
                glueX,
                glueY - 1,
                this.w - CatConstants.REAR_W * 8 - CatConstants.FRONT_W * 8 + 1,
                21,
                0
            )
            rect(
                glueX,
                glueY,
                this.w - CatConstants.REAR_W * 8 - CatConstants.FRONT_W * 8 + 1,
                19,
                CatConstants.BODY_COLOR
            )
        }

        //tail
        Util.pal(14, 0)
        const tailX = (this.right
            ? this.x + 1
            : this.x + this.w - CatConstants.TAIL_W * 8) - camX
        const tailY = this.y - CatConstants.TAIL_H * 8 - camY
        for (let i = -1; i <= 1; i += 2) {
            spr(
                CatConstants.TAIL_WALK_FRAMES[0],
                tailX + i,
                tailY,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.TAIL_W,
                CatConstants.TAIL_H
            )
            spr(
                CatConstants.TAIL_WALK_FRAMES[0],
                tailX,
                tailY + i,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.TAIL_W,
                CatConstants.TAIL_H
            )
        }
        Util.pal()
        spr(
            CatConstants.TAIL_WALK_FRAMES[0],
            tailX,
            tailY,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.TAIL_W,
            CatConstants.TAIL_H
        )

        // tail glue
        line(
            (this.right ? tailX + 3 : tailX + 9),
            this.y - camY,
            (this.right ? tailX + 7 : tailX + 8 + 4),
            this.y - camY,
            CatConstants.BODY_COLOR)

        // head
        const headX = (this.right
            ? this.x + this.w - CatConstants.HEAD_W * 8 + 20 + 1
            : this.x - 20) - camX
        const headY = this.y - 10 - camY
        Util.pal(14, 0)
        Util.pal(15, 0)
        for (let i = -1; i <= 1; i += 2) {
            spr(
                this.headFrame,
                headX + i,
                headY,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.HEAD_W,
                CatConstants.HEAD_H
            )
            spr(
                this.headFrame,
                headX,
                headY + i,
                0,
                undefined,
                this.right ? undefined : 1,
                undefined,
                CatConstants.HEAD_W,
                CatConstants.HEAD_H
            )
        }
        Util.pal()
        spr(
            this.headFrame,
            headX,
            headY,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.HEAD_W,
            CatConstants.HEAD_H
        )
        if (debug) {
            line(this.x - camX, this.y - camY, this.x - camX, this.y + 32 - camY, 6)
            line(this.x + this.w - camX, this.y - camY, this.x + this.w - camX, this.y + 32 - camY, 6)
        }
    }
}