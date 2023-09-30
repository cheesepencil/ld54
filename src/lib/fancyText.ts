class FancyText {
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
        const w = this.printMe()
        clip()

        const backgroundRect = {
            x: this.x - this.marginX,
            y: this.y - this.marginY,
            w: w + this.marginX * 2,
            h: this.baseHeight * this.scale + this.marginY * 2
        }
        if (this.backgroundColor != undefined) {
            rect(backgroundRect.x,
                backgroundRect.y,
                backgroundRect.w,
                backgroundRect.h,
                this.backgroundColor)
            if (this.bubbleSize > 0) {
                for (let i = 1; i <= this.bubbleSize; i += 1) {
                    rect(backgroundRect.x - i,
                        backgroundRect.y + i,
                        backgroundRect.w + i * 2,
                        backgroundRect.h - i * 2,
                        this.backgroundColor)
                }
            }
        }
        this.printMe()
    }

    printMe() {
        return print(
            this.text,
            this.x,
            this.y,
            this.textColor,
            this.fixedWidth,
            this.scale,
            this.smallFont)
    }
}