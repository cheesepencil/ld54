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
    static readonly CAT_Y = 96-8
}

class Cat {
    x = 0
    y = CatConstants.CAT_Y
    w = 48
    right = true
    bodyFrameIndex = 0
    headFrame = CatConstants.HEAD_IDLE
    animSpeed = Util.secondsToFrames(0.125)
    ticks = 0

    update() {
        this.ticks += 1
        if (this.ticks == this.animSpeed) {
            this.ticks = 0
            this.bodyFrameIndex += 1
            if (this.bodyFrameIndex >= 4) this.bodyFrameIndex = 0
        }
    }

    draw() {
        // front
        const frontX = this.right
            ? this.x + this.w - CatConstants.FRONT_W * 8
            : this.x + 1
        Util.pal(14, 0)
        Util.pal(15, 0)
        for (let i = -1; i <= 1; i += 2) {
            spr(
                CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],
                frontX + i,
                this.y,
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
                this.y + i,
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
            this.y,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.FRONT_W,
            CatConstants.FRONT_H
        )

        // back
        const rearX = this.right
            ? this.x + 1
            : this.x + this.w - CatConstants.REAR_W * 8
        Util.pal(14, 0)
        Util.pal(15, 0)
        for (let i = -1; i <= 1; i += 2) {
            spr(
                CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],
                rearX + (Math.abs(i) * (this.right ? -1 : 1)),
                this.y,
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
                this.y + i,
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
            this.y,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.REAR_W,
            CatConstants.REAR_H
        )

        // belly glue
        if (this.w > 48) {
            rectb(
                this.right
                    ? this.x + CatConstants.REAR_W * 8
                    : this.x + CatConstants.FRONT_W * 8,
                this.y + 5 - 1,
                this.w - CatConstants.REAR_W * 8 - CatConstants.FRONT_W * 8 + 1,
                21,
                0
            )
            rect(
                this.right
                    ? this.x + CatConstants.REAR_W * 8
                    : this.x + CatConstants.FRONT_W * 8,
                this.y + 5,
                this.w - CatConstants.REAR_W * 8 - CatConstants.FRONT_W * 8 + 1,
                19,
                CatConstants.BODY_COLOR
            )
        }

        //tail
        Util.pal(14, 0)
        const tailX = this.right
            ? this.x + 1
            : this.x + this.w - CatConstants.TAIL_W * 8
        for (let i = -1; i <= 1; i += 2) {
            spr(
                CatConstants.TAIL_WALK_FRAMES[0],
                tailX + i,
                this.y - CatConstants.TAIL_H * 8,
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
                this.y - CatConstants.TAIL_H * 8 + i,
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
            this.y - CatConstants.TAIL_H * 8,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.TAIL_W,
            CatConstants.TAIL_H
        )

        // tail glue
        line(
            this.right ? tailX + 3 : tailX + 8,
            this.y,
            this.right ? tailX + 7 : tailX + 8 + 4,
            this.y,
            CatConstants.BODY_COLOR)

        // head
        const headX = this.right
            ? this.x + this.w - CatConstants.HEAD_W * 8 + 20 + 1
            : this.x - 20
        Util.pal(14, 0)
        Util.pal(15, 0)
        for (let i = -1; i <= 1; i += 2) {
            spr(
                this.headFrame,
                headX + i,
                this.y - 10,
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
                this.y - 10 + i,
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
            this.y - 10,
            0,
            undefined,
            this.right ? undefined : 1,
            undefined,
            CatConstants.HEAD_W,
            CatConstants.HEAD_H
        )
        if (debug) {
            line(this.x, this.y, this.x, this.y + 32, 6)
            line(this.x + this.w, this.y, this.x + this.w, this.y + 32, 6)
        }
    }
}