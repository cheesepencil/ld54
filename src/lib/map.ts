/// <reference path="./constants.ts" />

interface MapConfig {
    x?: number
    y?: number
    w?: number
    h?: number
    colorkey?: number[]
}

class Map {
    x: number
    y: number
    w: number
    h: number

    constructor(config: MapConfig) {
        this.x = config.x ?? 0
        this.y = config.y ?? 0
        this.w = config.w ?? Constants.MAP_WIDTH_DEFAULT
        this.h = config.h ?? Constants.MAP_HEIGHT_DEFAULT
    }
}