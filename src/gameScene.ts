/// <reference path="./lib/scene.ts" />
/// <reference path="./lib/util.ts" />
/// <reference path="./lib/fancyText.ts" />
/// <reference path="./cat.ts" />
/// <reference path="./box.ts" />

class GameScene extends Scene {
    actors: { draw: () => void, update: () => void }[] = []
    tweens: PositionTween[] = []
    score: number = 0
    boxNumber: number = 0
    box: Box = new Box(this)
    cat: Cat = new Cat(this)
    ready: boolean = false
    catFrontActive: boolean = false
    catBackActive: boolean = false
    stageText: FancyText = new FancyText()
    stageText2: FancyText = new FancyText()

    init = () => {
        this.actors.push(new Background())
        this.box.y += 16
        this.cat.y -= 16

        this.camera.x = -Constants.SCREEN_WIDTH

        const scoreText = new FancyText()
        // scoreText.scene = this
        scoreText.x = 6
        scoreText.y = 6
        scoreText.text = `Score: ${this.score}`
        scoreText.backgroundColor = 12
        scoreText.textColor = 15
        scoreText.bubbleSize = 2
        scoreText.marginX = 2
        scoreText.marginY = 2
        this.actors.push(scoreText)

        this.stageText = new FancyText()
        this.stageText.scene = this
        this.stageText.text = `Box #${this.boxNumber}`
        this.stageText.x = Constants.SCREEN_WIDTH / 2 - 48
        this.stageText.y = Constants.SCREEN_HEIGHT / 2 - 32
        this.stageText.textColor = 0
        this.stageText.scale = 2

        this.stageText2 = new FancyText()
        this.stageText2.scene = this
        this.stageText2.text = `${this.box.w}cm`
        this.stageText2.x = Constants.SCREEN_WIDTH / 2 - 48
        this.stageText2.y = Constants.SCREEN_HEIGHT / 2 - 32 + 12
        this.stageText2.textColor = 0

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
        this.stageText.text = `Box #${this.boxNumber}`
        this.stageText2.text = `${this.box.w}cm`

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

            else if (this.catFrontActive || this.catBackActive) {
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
                    if (this.cat.right) {
                        this.cat.x += Math.abs(catSpeed)
                    }
                }
            }

            // was the cat neglected?
            if (this.cat.w < 36) {
                this.cat.w = 36
                this.catBackActive = false
                this.catFrontActive = false
            }
            if (this.cat.right && this.cat.x + this.cat.w > Constants.SCREEN_WIDTH) {
                this.catBackActive = false
                this.catFrontActive = false
            }
            if (!this.cat.right && this.cat.x < 0) {
                this.catBackActive = false
                this.catFrontActive = false
            }

            // time to check the fit
            if (!this.catFrontActive && !this.catBackActive) {
                this.ready = false
                this.panOut()
            }
        }
    }

    draw = () => {
        for (const actor of this.actors) {
            actor.draw()
        }
        this.cat.draw()
        this.box.draw()

        this.stageText.draw()
        this.stageText2.draw()
    }

    panIn() {
        const cameraTween = new PositionTween({
            target: this.camera,
            startX: -Constants.SCREEN_WIDTH - 32,
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

    panOut() {
        const cameraTween = new PositionTween({
            target: this.camera,
            startX: 0,
            endX: Constants.SCREEN_WIDTH + 32,
            durationFrames: Util.secondsToFrames(0.5),
            easing: Easing.easeOutQuad,
            callback: () => {
                this.deleteTween(cameraTween)
                this.cat.hide = false
                this.ready = true
                this.catFrontActive = true
                this.catBackActive = true
                this.newStage()
                this.panIn()
            }
        })
        this.tweens.push(cameraTween)
    }

    newStage() {
        this.boxNumber += 1
        this.cat.hide = true
        this.cat.w = Util.getRandomIntBetween(36, 101)
        this.cat.right = Util.getRandomInt(2) > 0
        this.cat.x = this.cat.right ? 0 - this.cat.w - 64: Constants.SCREEN_WIDTH + 64
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