/// <reference path="./scene.ts" />

class FancyText {
    scene?: Scene
    text = "Some fancy text!"
    x = 0
    y = 0
    scale = 1
    fixedWidth = false
    smallFont = false
    textColor = 0
    backgroundColor?: number = 12
    bubbleSize = 0
    marginX = 0
    marginY = 0
    baseHeight = 6

    update = () => { }

    draw = () => {
        clip(0, 0, 0, 0)
        const w = this.printMe(0,0)
        clip()

        const camOffsetX = this.scene?.camera?.x ?? 0
        const camOffsetY = this.scene?.camera?.y ?? 0
        const backgroundRect = {
            x: this.x - this.marginX,
            y: this.y - this.marginY,
            w: w + this.marginX * 2,
            h: this.baseHeight * this.scale + this.marginY * 2
        }
        if (this.backgroundColor != undefined && this.bubbleSize > 0) {
            rect(backgroundRect.x - camOffsetX,
                backgroundRect.y - camOffsetY,
                backgroundRect.w,
                backgroundRect.h,
                this.backgroundColor)
            if (this.bubbleSize > 0) {
                for (let i = 1; i <= this.bubbleSize; i += 1) {
                    rect(backgroundRect.x - i - camOffsetX,
                        backgroundRect.y + i - camOffsetY,
                        backgroundRect.w + i * 2,
                        backgroundRect.h - i * 2,
                        this.backgroundColor)
                }
            }
        }
        this.printMe(camOffsetX, camOffsetY)
    }

    printMe(camOffsetX: number, camOffsetY: number) {
        return print(
            this.text,
            this.x - camOffsetX,
            this.y - camOffsetY,
            this.textColor,
            this.fixedWidth,
            this.scale,
            this.smallFont)
    }
}