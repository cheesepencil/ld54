/// <reference path="./lib/scene.ts" />

class TitleScene extends Scene {
    agents: { draw: () => void, update: () => void }[] = []
    tweens: PositionTween[] = []

    init = () => {
        this.agents.push(new Background())

        const title = new FancyText()
        title.text = "if i fits"
        title.x = Constants.SCREEN_WIDTH + 16
        title.y = 8
        title.marginY = 2
        title.marginX = 2
        title.bubbleSize = 2
        title.backgroundColor = 14
        title.textColor = 12
        title.scale = 3
        title.smallFont = true
        this.agents.push(title)

        const title2 = new FancyText()
        title2.text = "I SITS!"
        title2.x = Constants.SCREEN_WIDTH + 24
        title2.y = 32
        title2.marginY = 4
        title2.marginX = 4
        title2.bubbleSize = 3
        title2.backgroundColor = 14
        title2.textColor = 12
        title2.scale = 4
        this.agents.push(title2)

        this.tweens.push(new PositionTween({
            target: title,
            startX: title.x,
            endX: 16,
            durationFrames: Util.secondsToFrames(1),
            delayFrames: Util.secondsToFrames(0),
            easing: Easing.easeOutOvershoot
        }))
        this.tweens.push(new PositionTween({
            target: title2,
            startX: Constants.SCREEN_WIDTH + 24,
            endX: 32,
            durationFrames: Util.secondsToFrames(1),
            delayFrames: Util.secondsToFrames(0.5),
            easing: Easing.easeInQuart
        }))

        const box = new Box()
        box.x = Constants.SCREEN_WIDTH / 2 - 64 - 24
        box.w = 90
        this.agents.push(box)

        const cat = new Cat()
        cat.x = Constants.SCREEN_WIDTH - 64
        cat.right = false
        this.agents.push(cat)

        const instructions = new Instructions()
        instructions.x = -200
        this.tweens.push(new PositionTween({
            target: instructions,
            startX: instructions.x,
            endX: 6,
            durationFrames: Util.secondsToFrames(2),
            delayFrames: Util.secondsToFrames(3)
        }))
        this.agents.push(instructions)

        const callToAction = new CallToAction()
        this.agents.push(callToAction)
    }

    update = () => {
        for (const tween of this.tweens) {
            tween.TIC()
        }
        for (const agent of this.agents) {
            agent.update()
        }
    }

    draw = () => {
        for (const agent of this.agents) {
            agent.draw()
        }
        print("a game for ludum dare #54 by @cheesepencil",
            4,
            Constants.SCREEN_HEIGHT - 8,
            14)
    }
}

class Instructions {
    x = 6
    y = 66

    update() { }

    draw() {
        print("left: halt left side of cat",
            this.x,
            this.y,
            12)
        print("right: halt right side of cat",
            this.x,
            this.y + 9,
            12)
        print("Z: halt the whole cat",
            this.x,
            this.y + 18,
            12)
    }
}

class CallToAction {
    ticks = 0
    x = 50
    y = 96 + 5
    show = false
    fancyText = new FancyText()
    init = false

    constructor() {
        this.fancyText.text = "press Z to start"
        this.fancyText.x = this.x
        this.fancyText.y = this.y
        this.fancyText.marginX = 2
        this.fancyText.marginY = 2
        this.fancyText.bubbleSize = 2
        this.fancyText.backgroundColor = 12
        this.fancyText.textColor = 2
        this.fancyText.smallFont = true
    }

    update() {
        this.ticks += 1
        if (this.ticks > Util.secondsToFrames(2)){
            this.ticks = 0
            this.init = true
        }

        if (this.init) {
            if (this.ticks > Util.secondsToFrames(0.5)) {
                this.ticks = 0
                this.show = !this.show
            }

            if (btnp(4)) {
                activeScene = new Scene()
            }
        }
    }

    draw() {
        if (this.show) this.fancyText.draw()
    }
}