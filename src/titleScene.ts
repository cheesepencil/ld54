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
            delayFrames: Util.secondsToFrames(1),
            easing: Easing.easeOutOvershoot
        }))
        this.tweens.push(new PositionTween({
            target: title2,
            startX: Constants.SCREEN_WIDTH + 24,
            endX: 32,
            durationFrames: Util.secondsToFrames(1),
            delayFrames: Util.secondsToFrames(1.5),
            easing: Easing.easeInQuart
        }))
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
            12)
    }
}