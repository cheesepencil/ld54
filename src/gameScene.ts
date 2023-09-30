/// <reference path="./lib/scene.ts" />
/// <reference path="./lib/util.ts" />
/// <reference path="./cat.ts" />
/// <reference path="./box.ts" />

class GameScene extends Scene {
    actors: { draw: () => void, update: () => void }[] = []
    tweens: PositionTween[] = []
    score: number = 0
    boxNumber: number = 1
    box: Box = new Box(this)
    cat: Cat = new Cat(this)
    ready: boolean = false
    catFrontActive: boolean = false
    catBackActive: boolean = false

    init = () => {
        this.actors.push(new Background())
        this.box.y += 16
        this.cat.y -= 16

        this.camera.x = -Constants.SCREEN_WIDTH
        this.panIn()

        this.newStage()
    }

    update = () => {
        for (const tween of this.tweens) {
            tween.TIC()
        }
        for (const actor of this.actors) {
            actor.update()
        }
        this.cat.update()
        this.box.update()

        if (this.ready) {
            // left arrow
            if (btnp(2)) {
                if (this.cat.right) {
                    this.catBackActive = false
                }
                else {
                    this.catFrontActive = false
                }
            }

            // right arrow
            if (btnp(3)) {
                if (this.cat.right) {
                    this.catFrontActive = false
                }
                else {
                    this.catBackActive = false
                }
            }

            // full stop
            if (btnp(4)) {
                this.catBackActive = false
                this.catFrontActive = false
            }

            const speed = 1
            const catSpeed = speed * (this.cat.right ? 1 : -1)

            if (this.catFrontActive && this.catBackActive) {
                this.cat.x += catSpeed
            }
            else if (!this.catFrontActive && !this.catBackActive) {
                trace("ready to score this fit")
            }
            else {
                // either front or back is inactive
                // if front is inactive, width shrinks
                // if back is inactive, width grows
                if (this.catFrontActive) {
                    this.cat.w += Math.abs(catSpeed)
                    if (!this.cat.right) {
                        this.cat.x -= Math.abs(catSpeed)
                    }
                }
                else {
                    this.cat.w -= Math.abs(catSpeed)
                    if (this.cat.right){
                        this.cat.x += Math.abs(catSpeed)
                    }
                }
            }


        }
    }

    draw = () => {
        for (const actor of this.actors) {
            actor.draw()
        }
        this.cat.draw()
        this.box.draw()
    }

    panIn() {
        const cameraTween = new PositionTween({
            target: this.camera,
            startX: -Constants.SCREEN_WIDTH,
            endX: 0,
            durationFrames: Util.secondsToFrames(0.5),
            easing: Easing.easeOutQuad,
            callback: () => {
                this.deleteTween(cameraTween)
                this.cat.hide = false
                this.ready = true
                this.catFrontActive = true
                this.catBackActive = true
            }
        })
        this.tweens.push(cameraTween)
    }

    newStage() {
        this.cat.hide = true
        this.cat.w = Util.getRandomIntBetween(36, 101)
        this.cat.right = Util.getRandomInt(2) > 0
        this.cat.x = this.cat.right ? 0 - this.cat.w : Constants.SCREEN_WIDTH
        this.box.w = Util.getRandomIntBetween(48, 151)
        this.box.right = Util.getRandomInt(2) > 0
        this.box.x = Constants.SCREEN_WIDTH / 2 - this.box.w / 2
    }

    deleteActor(actor: Actor) {
        this.actors = this.actors.splice(this.actors.indexOf(actor), 1)
    }

    deleteTween(tween: PositionTween) {
        this.tweens = this.tweens.splice(this.tweens.indexOf(tween), 1)
    }
}