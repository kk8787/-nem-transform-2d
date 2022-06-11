"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vec = void 0;
class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static unit() {
        return new Vec(1, 1);
    }
    clone() {
        return new Vec(this.x, this.y);
    }
    add(vec) {
        return new Vec(this.x + vec.x, this.y + vec.y);
    }
    sub(vec) {
        return new Vec(this.x - vec.x, this.y - vec.y);
    }
    mul(s) {
        return new Vec(this.x * s, this.y * s);
    }
    div(d) {
        return new Vec(this.x / d, this.y / d);
    }
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    cross(vec) {
        return this.x * vec.y - this.y * vec.x;
    }
}
exports.Vec = Vec;
