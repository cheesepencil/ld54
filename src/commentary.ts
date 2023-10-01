class Commentary implements Actor {
    actors: Actor[] = []
    tweens: PositionTween[] = []
    commentaryText: FancyText

    constructor(scene: GameScene, comment: string, textColor: number, callback: () => void) {
        this.commentaryText = new FancyText()
        this.commentaryText.text = comment
        this.commentaryText.x = 16
        this.commentaryText.y = Constants.SCREEN_HEIGHT + 8
        this.commentaryText.textColor = textColor
        this.commentaryText.fixedWidth = true
        this.actors.push(this.commentaryText)

        const tween = new PositionTween({
            target: this.commentaryText,
            startY: Constants.SCREEN_HEIGHT + 8,
            endY: -32,
            durationFrames: Util.secondsToFrames(2),
            callback: () => {
                callback()
            }
        })
        this.tweens.push(tween)
    }

    draw = () => {
        this.actors.forEach(a => a.draw())
    };

    update = () => {
        this.tweens.forEach(t => t.TIC())
    };

    setText(text: string) {
        this.commentaryText.text = text
    }

    setColor(color: number) {
        this.commentaryText.textColor = color
    }
}