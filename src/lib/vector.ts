class Vector {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    getLength = (): number => Math.sqrt(this.x ** 2 + this.y ** 2)

    getNormal(): Vector {
        const length = this.getLength()
        return new Vector(this.x / length, this.y / length)
    }
}