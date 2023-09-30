interface PlatformConfig {
    x: number
    y: number
    w: number
    h: number
}

class Platform {
    x: number
    y: number
    w: number
    h: number
    dx: number = 0
    dy: number = 0
    scene: Scene

    update = () => { }
    draw = () => { }

    constructor(scene: Scene, config: PlatformConfig) {
        this.x = config.x
        this.y = config.y
        this.w = config.w
        this.h = config.h
        this.scene = scene
    }

    collideFloor(player: PlatformerSprite): boolean {
        if (player.dy < 0) return false

        const offset = player.w / 3
        let landed = false
        for (let i = -offset; i <= offset; i += 2) {
            const testPoint = new Vector(
                player.x + player.w / 2 + i,
                player.y + player.h
            )
            const collides = Collision.intersectsPointBox(testPoint, this)
            if (collides) {
                player.dy = 0
                player.y = Math.floor(this.y - player.h + this.dy)
                
                player.x = player.x + this.dx
                
                player.grounded = true
                player.airTime = 0
                landed = true
                break
            }
        }

        return landed
    }
}