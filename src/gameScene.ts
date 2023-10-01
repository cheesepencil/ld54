/// <reference path="./lib/scene.ts" />
/// <reference path="./lib/util.ts" />
/// <reference path="./lib/fancyText.ts" />
/// <reference path="./cat.ts" />
/// <reference path="./box.ts" />
/// <reference path="./background.ts" />

class GameScene extends Scene {
    actors: { draw: () => void, update: () => void }[] = []
    tweens: PositionTween[] = []
    score: number = 0
    boxNumber: number = 0
    box: Box = new Box(this)
    cat: Cat = new Cat(this)
    ready: boolean = false
    success: boolean = false
    catFrontActive: boolean = false
    catBackActive: boolean = false
    stageText: FancyText = new FancyText()
    stageText2: FancyText = new FancyText()
    scoreText: FancyText = new FancyText()
    background: Background = new Background()
    speed: number = 0.75

    init = () => {
        this.box.y += 16
        this.cat.y = CatConstants.CAT_Y - 16

        this.camera.x = -Constants.SCREEN_WIDTH

        this.scoreText = new FancyText()
        this.scoreText.x = 6
        this.scoreText.y = 6
        this.scoreText.text = `Score: ${this.score}`
        this.scoreText.backgroundColor = 12
        this.scoreText.textColor = 15
        this.scoreText.bubbleSize = 2
        this.scoreText.marginX = 2
        this.scoreText.marginY = 2
        this.scoreText.scene = this
        this.actors.push(this.scoreText)

        this.stageText = new FancyText()
        this.stageText.scene = this
        this.stageText.text = `Box #${this.boxNumber}`
        this.stageText.x = Constants.SCREEN_WIDTH / 2 - 48
        this.stageText.y = Constants.SCREEN_HEIGHT / 2 - 32
        this.stageText.textColor = 0
        this.stageText.scale = 2
        this.actors.push(this.stageText)

        this.stageText2 = new FancyText()
        this.stageText2.scene = this
        this.stageText2.text = `${this.box.w}cm`
        this.stageText2.x = Constants.SCREEN_WIDTH / 2 - 48
        this.stageText2.y = Constants.SCREEN_HEIGHT / 2 - 32 + 12
        this.stageText2.textColor = 0
        this.actors.push(this.stageText2)

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
        this.scoreText.text = `Score: ${this.score}`

        if (this.ready) {
            // left arrow
            if (btnp(2)) {
                if (this.cat.right) {
                    sfx(6)
                    this.catBackActive = false
                }
                else {
                    sfx(7)
                    this.catFrontActive = false
                }
            }

            // right arrow
            if (btnp(3)) {
                if (this.cat.right) {
                    sfx(7)
                    this.catFrontActive = false
                }
                else {
                    sfx(6)
                    this.catBackActive = false
                }
            }

            // full stop
            if (btnp(4)) {
                sfx(6)
                this.catBackActive = false
                this.catFrontActive = false
            }

            if (btn(5) && debug) this.speed = 0.05

            const catSpeed = this.speed * (this.cat.right ? 1 : -1)

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
                this.testFit()
            }
        }
    }

    draw = () => {
        this.background.draw()
        this.box.draw()
        this.cat.draw()
        for (const actor of this.actors) {
            actor.draw()
        }
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
                this.cat.silent = false
                this.cat.hide = false
                this.ready = true
                this.catFrontActive = true
                this.catBackActive = true
            }
        })
        this.tweens.push(cameraTween)
    }

    panOut(delay?: number, callback?: () => void, reverse: boolean = false) {
        const cameraTween = new PositionTween({
            target: this.camera,
            startX: 0,
            endX: reverse ? -Constants.SCREEN_WIDTH - 32 : Constants.SCREEN_WIDTH + 32,
            durationFrames: Util.secondsToFrames(0.5),
            delayFrames: Util.secondsToFrames(delay ?? 0),
            easing: Easing.easeOutQuad,
            callback: callback ?? (() => {
                this.deleteTween(cameraTween)
                this.cat.hide = false
                this.ready = true
                this.catFrontActive = true
                this.catBackActive = true
                this.newStage()
                this.panIn()
            })
        })
        this.tweens.push(cameraTween)
    }

    newStage() {
        this.speed += 0.1
        this.boxNumber += 1
        this.cat.animSpeed = Util.secondsToFrames(Util.clamp(0.130 - (this.boxNumber * 0.005), 0, 1))
        this.cat.hide = true
        this.cat.w = Util.getRandomIntBetween(36, 201)
        this.cat.right = Util.getRandomInt(2) > 0
        this.cat.x = this.cat.right ? 0 - this.cat.w - 64 : Constants.SCREEN_WIDTH + 64
        this.cat.y = CatConstants.CAT_Y - 16
        this.cat.headFrame = CatConstants.HEAD_IDLE
        this.cat.clip = false
        this.box.w = Util.getRandomIntBetween(48, 151)
        this.box.right = Util.getRandomInt(2) > 0
        this.box.x = Math.floor(Constants.SCREEN_WIDTH / 2 - this.box.w / 2)
        this.success = false
    }

    testFit() {
        if (debug) {
            trace(`cat.x: ${this.cat.x.toFixed(3)}, cat.w: ${this.cat.w}`)
            trace(`box.x: ${this.box.x.toFixed(3)}, box.w: ${this.box.w}`)
        }

        this.cat.silent = true

        // does that cat fit in the box?
        const catX = this.cat.x
        const catW = Math.floor(this.cat.w)
        const boxX = this.box.x
        const boxW = this.box.w
        this.success =
            catX >= boxX
            && Math.floor(catX) + catW <= boxX + boxW

        if (this.success) {
            sfx(1)
            this.cat.clip = true
            const catBounceTween = new PositionTween({
                target: this.cat,
                durationFrames: Util.secondsToFrames(0.5),
                startY: this.cat.y,
                endY: this.box.y - 8,
                callback: () => {
                    sfx(2)
                    this.cat.headFrame = CatConstants.HEAD_YAY
                    this.deleteTween(catBounceTween)
                    this.panOut(0.25)
                }
            })
            this.tweens.push(catBounceTween)

            let boxScore = Math.floor((this.cat.w / this.box.w) * 100)
            const commentary = new Commentary(this, "", 6, () => { this.deleteActor(commentary) })
            if (boxScore >= 98) {
                boxScore *= 3
                commentary.setText(`+${boxScore} PERFECT! 3x point bonus`)
            }
            else if (boxScore >= 80) {
                boxScore *= 2
                commentary.setText(`+${boxScore} Great! 2x point bonus`)
                commentary.setColor(5)
            }
            else if (boxScore > 50) {
                commentary.setText(`+${boxScore} OK!`)
                commentary.setColor(3)
            }
            else {
                commentary.setText(`+${boxScore} Do better!`)
                commentary.setColor(2)
            }
            this.actors.push(commentary)
            this.score += boxScore
        }
        else {
            sfx(5)
            const catLoserTween2 = new PositionTween({
                target: this.cat,
                durationFrames: Util.secondsToFrames(0.5),
                startY: this.box.y - 100,
                endY: Constants.SCREEN_HEIGHT + 64,
                easing: Easing.easeInQuad,
                callback: () => {
                    this.deleteTween(catLoserTween2)
                    this.actors.push(new GameOver(this, "you sitted, but did not fitted"))
                }
            })
            const catLoserTween1 = new PositionTween({
                target: this.cat,
                durationFrames: Util.secondsToFrames(0.5),
                startY: this.box.y - 32,
                endY: this.box.y - 100,
                easing: Easing.easeInOvershoot,
                callback: () => {
                    this.deleteTween(catLoserTween1)
                    this.tweens.push(catLoserTween2)
                }
            })
            const catBounceTween = new PositionTween({
                target: this.cat,
                durationFrames: Util.secondsToFrames(0.5),
                startY: this.cat.y,
                endY: this.box.y - 32,
                easing: Easing.easeOutBounce,
                callback: () => {
                    sfx(3)
                    this.cat.headFrame = CatConstants.HEAD_SAD
                    this.deleteTween(catBounceTween)
                    this.tweens.push(catLoserTween1)
                }
            })
            this.tweens.push(catBounceTween)
        }
    }

    deleteActor(actor: Actor) {
        const index = this.actors.indexOf(actor)
        this.actors = this.actors.filter(a => a !== actor)
    }

    deleteTween(tween: PositionTween) {
        this.tweens = this.tweens.filter(t => t !== tween)
    }
}