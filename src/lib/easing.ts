// from the easing function cheatsheet by valeradhd

class Easing {
    static linear(t: number): number {
        return t
    }

    // quadratics
    static easeInQuad(t: number): number {
        return t * t
    }

    static easeOutQuad(t: number): number {
        t -= 1
        return 1 - t * t
    }

    static easeInOutQuad(t: number): number {
        if (t < .5)
            return t * t * 2
        else {
            t -= 1
            return 1 - t * t * 2
        }
    }

    static easeOutInQuad(t: number): number {
        if (t < .5) {
            t -= .5
            return .5 - t * t * 2
        }
        else {
            t -= .5
            return .5 + t * t * 2
        }
    }

    // quartics
    static easeInQuart(t: number): number {
        return t * t * t * t
    }

    static easeOutQuart(t: number): number {
        t -= 1
        return 1 - t * t * t * t
    }

    static easeInOutQuart(t: number): number {
        if (t < .5) return 8 * t * t * t * t
        else {
            t -= 1
            return (1 - 8 * t * t * t * t)
        }
    }

    static easeOutInQuart(t: number): number {
        if (t < .5) {
            t -= .5
            return .5 - 8 * t * t * t * t
        }
        else {
            t -= .5
            return .5 + 8 * t * t * t * t
        }
    }

    // overshoots
    static easeInOvershoot(t: number): number {
        return 2.7 * t * t * t - 1.7 * t * t
    }

    static easeOutOvershoot(t: number): number {
        t -= 1
        return 1 + 2.7 * t * t * t + 1.7 * t * t
    }

    static easeInOutOvershoot(t: number): number {
        if (t < .5) return (2.7 * 8 * t * t * t - 1.7 * 4 * t * t) / 2
        else {
            t -= 1
            return 1 + (2.7 * 8 * t * t * t + 1.7 * 4 * t * t) / 2
        }
    }

    static easeOutInOvershoot(t: number): number {
        if (t < .5) {
            t -= .5
            return (2.7 * 8 * t * t * t + 1.7 * 4 * t * t) / 2 + .5
        }
        else {
            t -= .5
            return (2.7 * 8 * t * t * t - 1.7 * 4 * t * t) / 2 + .5
        }
    }

    // elastics
    static easeInElastic(t: number): number {
        if (t == 0) return 0
        return 2 ** (10 * t - 10) * Util.picoCos(2 * t - 2)
    }

    static easeOutElastic(t: number): number {
        if (t == 1) return 1
        return 1 - 2 ** (-10 * t) * Util.picoCos(2 * t)
    }

    static easeInOutElastic(t: number): number {
        if (t < .5) return 2 ** (10 * 2 * t - 10) * Util.picoCos(2 * 2 * t - 2) / 2
        else {
            t -= .5
            return 1 - 2 ** (-10 * 2 * t) * Util.picoCos(2 * 2 * t) / 2
        }
    }

    static easeOutInElastic(t: number): number {
        if (t < .5) return .5 - 2 ** (-10 * 2 * t) * Util.picoCos(2 * 2 * t) / 2
        else {
            t -= .5
            return 2 ** (10 * 2 * t - 10) * Util.picoCos(2 * 2 * t - 2) / 2 + .5
        }
    }

    // bouncing
    static easeInBounce(t: number): number {
        t = 1 - t
        const n1 = 7.5625
        const d1 = 2.75

        if (t < 1 / d1) {
            return 1 - n1 * t * t;
        }
        else if (t < 2 / d1) {
            t -= 1.5 / d1
            return 1 - n1 * t * t - .75;
        }
        else if (t < 2.5 / d1) {
            t -= 2.25 / d1
            return 1 - n1 * t * t - .9375;
        }
        else {
            t -= 2.625 / d1
            return 1 - n1 * t * t - .984375;
        }
    }

    static easeOutBounce(t: number): number {
        const n1 = 7.5625
        const d1 = 2.75

        if (t < 1 / d1) return n1 * t * t
        else if (t < 2 / d1) {
            t -= 1.5 / d1
            return n1 * t * t + .75;
        }
        else if (t < 2.5 / d1) {
            t -= 2.25 / d1
            return n1 * t * t + .9375;
        }
        else {
            t -= 2.625 / d1
            return n1 * t * t + .984375;
        }
    }
}