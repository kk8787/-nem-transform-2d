"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
const utils_1 = require("./utils");
class Matrix {
    constructor(...array) {
        if (array.length === 6) {
            this.a = array[0];
            this.b = array[1];
            this.c = array[2];
            this.d = array[3];
            this.e = array[4];
            this.f = array[5];
        }
        else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }
    static translation(vec) {
        return new Matrix(1, 0, 0, 1, vec.x, vec.y);
    }
    static rotation(rad, origin = { x: 0, y: 0 }) {
        const co = Math.cos(rad);
        const si = Math.sin(rad);
        return this.compose(this.translation(origin), new Matrix(co, si, -si, co, 0, 0), this.translation({ x: -origin.x, y: -origin.y }));
    }
    static rotationDeg(deg, origin = { x: 0, y: 0 }) {
        return this.rotation((0, utils_1.degToRad)(deg), origin);
    }
    static scale(scale, origin = { x: 0, y: 0 }) {
        return this.compose(this.translation(origin), new Matrix(scale.x, 0, 0, scale.y, 0, 0), this.translation({ x: -origin.x, y: -origin.y }));
    }
    static skew(vec) {
        return new Matrix(1, Math.tan(vec.x), 0, Math.tan(vec.y), 1, 0);
    }
    static skewDeg(vec) {
        return this.skew({
            x: (0, utils_1.degToRad)(vec.x),
            y: (0, utils_1.degToRad)(vec.y),
        });
    }
    static identity() {
        return new Matrix(1, 0, 0, 1, 0, 0);
    }
    static mul(m1, m2) {
        return new Matrix(m1.a * m2.a + m1.c * m2.b, m1.b * m2.a + m1.d * m2.b, m1.a * m2.c + m1.c * m2.d, m1.b * m2.c + m1.d * m2.d, m1.a * m2.e + m1.c * m2.f + m1.e, m1.b * m2.e + m1.d * m2.f + m1.f);
    }
    static compose(...matrices) {
        if (matrices.length === 0) {
            throw new Error('0');
        }
        else if (matrices.length === 1) {
            throw new Error('1');
        }
        let current = matrices[0];
        for (let i = 1, len = matrices.length; i < len; i++) {
            current = this.mul(current, matrices[i]);
        }
        // length > 1, type of current must be Matrix
        return current;
    }
    inverse() {
        const det = this.a * this.d - this.b * this.c;
        return new Matrix(this.d / det, this.b / -det, this.c / -det, this.a / det, (this.d * this.e - this.c * this.f) / -det, (this.b * this.e - this.a * this.f) / det);
    }
    point(pt) {
        return {
            x: this.a * pt.x + this.c * pt.y + this.e,
            y: this.b * pt.x + this.d * pt.y + this.f,
        };
    }
    points(pts) {
        return pts.map((pt) => this.point(pt));
    }
    translate(vec) {
        const trmat = Matrix.translation(vec);
        return Matrix.mul(this, trmat);
    }
    rotate(rad, origin = { x: 0, y: 0 }) {
        const r = Matrix.rotation(rad, origin);
        return Matrix.mul(this, r);
    }
    scale(scale, origin = { x: 0, y: 0 }) {
        const s = Matrix.scale(scale, origin);
        return Matrix.mul(this, s);
    }
    skew(skew, origin = { x: 0, y: 0 }) {
        const s = Matrix.scale(skew, origin);
        return Matrix.mul(this, s);
    }
    rotateDeg(deg, origin = { x: 0, y: 0 }) {
        const rad = (deg * Math.PI) / 180;
        return this.rotate(rad, origin);
    }
    transform(...mats) {
        return Matrix.compose(this, ...mats);
    }
    smooth(precision = 10000000000) {
        return new Matrix(Math.round(this.a * precision) / precision, Math.round(this.b * precision) / precision, Math.round(this.c * precision) / precision, Math.round(this.d * precision) / precision, Math.round(this.e * precision) / precision, Math.round(this.f * precision) / precision);
    }
    toArray() {
        return [this.a, this.b, this.c, this.d, this.e, this.f];
    }
    clone() {
        return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
    }
    copy() {
        return this.clone();
    }
}
exports.Matrix = Matrix;
