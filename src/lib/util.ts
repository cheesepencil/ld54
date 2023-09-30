class Util {
    static secondsToFrames = function (seconds: number): number {
        return Math.floor(seconds * 60)
    }

    static lerp = function (a: number, b: number, t: number): number {
        return a + (b - a) * t
    }

    static invlerp = function (a: number, b: number, v: number): number {
        if (b - a === 0) return 0
        return (v - a) / (b - a)
    }

    // Simulates PICO-8's sin(), which takes "turns" as input instead of rads
    // and measures the angle in a clockwise direction
    static picoSin(turns: number): number {
        const rads = turns * (Math.PI * 2)
        const result = -Math.sin(rads)

        return result
    }

    // Simulates PICO-8's cos(), which takes "turns" as input instead of rads
    static picoCos(turns: number): number {
        const rads = turns * (Math.PI * 2)
        const result = Math.cos(rads)

        return result
    }

    static clamp(n: number, min: number, max: number): number {
        return Math.min(Math.max(n, min), max)
    }

    static round(n: number) {
        return Math.floor(n + 0.5)
    }
}