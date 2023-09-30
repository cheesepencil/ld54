class Collision {
    static intersectsPointBox(
        point: Vector,
        box: { x: number, y: number, w: number, h: number }
    ): boolean {

        let intersects = false

        if (Math.floor(point.x) >= Math.floor(box.x)
            && Math.floor(point.x) < Math.floor(box.x + box.w)
            && Math.floor(point.y) >= Math.floor(box.y)
            && Math.floor(point.y) < Math.floor(box.y + box.h)
        ) {
            intersects = true
        }

        return intersects
    }

    static intersectsBoxBox(
        box1: { x: number, y: number, w: number, h: number },
        box2: { x: number, y: number, w: number, h: number }
    ): boolean {
        const xd = box1.x - box2.x
        const xs = box1.w * 0.5 + box2.w * 0.5
        if (Math.abs(xd) >= xs) return false

        const yd = box1.y - box2.y
        const ys = box1.h * 0.5 + box2.y * 0.5
        if (Math.abs(yd) > - ys) return false

        return true
    }

    static collideSideMap(sprite: PlatformerSprite, flag: number): boolean {
        if (!sprite.scene.map) return false

        const offset = sprite.h / 3

        for (let i = -offset; i <= offset; i += 2) {
            let spriteX = sprite.x
            let tileX = spriteX / 8 + sprite.scene.map.x
            let spriteY = sprite.y + (sprite.h / 2) + i
            let tileY = spriteY / 8 + sprite.scene.map.y
            let tile = mget(tileX, tileY)
            if (fget(tile, flag)) {
                sprite.dx = 0
                sprite.x = Math.floor(sprite.x / 8) * 8 + 8
                return true
            }
            spriteX = sprite.x + sprite.w
            tileX = spriteX / 8 + sprite.scene.map.x
            spriteY = sprite.y + (sprite.h / 2) + i
            tileY = spriteY / 8 + sprite.scene.map.y
            tile = mget(tileX, tileY)
            if (fget(tile, flag)) {
                sprite.dx = 0
                sprite.x = Math.floor(spriteX / 8) * 8 - sprite.w
                return true
            }
        }

        return false
    }

    static collideFloorMap(sprite: PlatformerSprite, flag: number): boolean {
        if (!sprite.scene.map) return false
        if (sprite.dy < 0) return false

        const offset = sprite.w / 3
        let landed = false
        for (let i = -offset; i <= offset; i += 2) {
            let tileX = (sprite.x + sprite.w / 2 + i) / 8 + sprite.scene.map.x
            let tileY = (sprite.y + (sprite.h)) / 8 + sprite.scene.map.y
            let tile = mget(tileX, tileY)
            if (fget(tile, flag)) {
                sprite.dy = 0
                sprite.y = (Math.floor((sprite.y + (sprite.h)) / 8) * 8) - (sprite.h)
                sprite.grounded = true
                sprite.airTime = 0
                landed = true
            }
        }

        return landed
    }

    static collideRoofMap(sprite: PlatformerSprite, flag: number) {
        if (!sprite.scene.map) return false
        const offset = sprite.w / 3

        for (let i = -offset; i <= offset; i += 2) {
            const spriteX = sprite.x + (sprite.w / 2) + i
            const tileX = spriteX / 8 + sprite.scene.map.x
            const spriteY = sprite.y
            const tileY = spriteY / 8 + sprite.scene.map.y
            const tile = mget(tileX, tileY)
            if (fget(tile, flag)) {
                sprite.dy = 0
                sprite.y = Math.floor(sprite.y / 8) * 8 + 8
                sprite.jumpHoldTime = 0
            }
        }
    }
}