class Background {
    update() {

    }

    draw() {
        cls(0)
        rect(0, 0, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT, 13)
        rect(0, Constants.SCREEN_HEIGHT / 2 + 32, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT / 2, 12)
    }
}