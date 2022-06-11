"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radToDeg = exports.degToRad = void 0;
function degToRad(deg) {
    return (deg * Math.PI) / 180;
}
exports.degToRad = degToRad;
function radToDeg(rad) {
    return (rad * 180) / Math.PI;
}
exports.radToDeg = radToDeg;
