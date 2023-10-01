/// <reference path="./lib/fancyText.ts" />

class GameOver implements Actor {
    actors: Actor[] = []
    scene: GameScene

    constructor(scene: GameScene, why: string) {
        this.scene = scene
        if (this.scene.score > highScore) {
            highScore = this.scene.score
            pmem(0, highScore)
        }

        const gameOverText = new FancyText()
        gameOverText.text = "GAME OVER"
        gameOverText.x = 16
        gameOverText.y = 32
        gameOverText.marginY = 4
        gameOverText.marginX = 4
        gameOverText.bubbleSize = 3
        gameOverText.backgroundColor = 14
        gameOverText.textColor = 12
        gameOverText.scale = 4
        gameOverText.scene = scene
        this.actors.push(gameOverText)

        const whyText = new FancyText()
        whyText.text = why
        whyText.x = 16
        whyText.y = 62
        whyText.marginY = 2
        whyText.marginX = 2
        whyText.bubbleSize = 2
        whyText.backgroundColor = 14
        whyText.textColor = 12
        whyText.scale = 2
        whyText.smallFont = true
        whyText.scene = scene
        this.actors.push(whyText)

        const cta = new FancyText()
        cta.text = "press Z to retry"
        cta.x = Constants.SCREEN_WIDTH - 72
        cta.y = 86
        cta.marginX = 2
        cta.marginY = 2
        cta.bubbleSize = 2
        cta.backgroundColor = 12
        cta.textColor = 2
        cta.smallFont = true
        cta.scene = scene
        this.actors.push(cta)
    }

    draw = () => {
        const x = 18
        const y = 80
        for (const actor of this.actors) { actor.draw() }
        print(`your score: ${this.scene.score}`,
            x - this.scene.camera.x,
            y - this.scene.camera.y,
            15)
        print(`high score: ${highScore}`,
            x - this.scene.camera.x,
            y + 9 - this.scene.camera.y,
            15)
    };

    update = () => {
        for (const actor of this.actors) { actor.update() }
        if (btnp(4)) {
            this.scene.panOut(0.125, () => { activeScene = new TitleScene() }, true)
        }
    };
}