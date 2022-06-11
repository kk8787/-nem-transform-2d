"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
const transformation_matrix_1 = require("transformation-matrix");
const transform_1 = require("./transform");
const utilsPrivate_1 = require("./utilsPrivate");
class Matrix {
    constructor(array) {
        if (array) {
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
    static identity() {
        const mat = (0, transformation_matrix_1.identity)();
        return new Matrix([mat.a, mat.b, mat.c, mat.d, mat.e, mat.f]);
    }
    decompose() {
        const transform = (0, transformation_matrix_1.decomposeTSR)(this);
        const rot = transform.rotation.angle;
        const scale = (transform.scale.sx + transform.scale.sy) / 2;
        const tr = new transform_1.Transform({
            translate: { x: transform.translate.tx, y: transform.translate.ty },
            rotate: rot,
            scale: scale,
        });
        return tr;
    }
    inverse() {
        return (0, utilsPrivate_1.convertMat)((0, transformation_matrix_1.inverse)(this));
    }
    isAffineMatrix() {
        return (0, transformation_matrix_1.isAffineMatrix)(this);
    }
    point(pt) {
        return (0, transformation_matrix_1.applyToPoint)(this, pt);
    }
    points(pts) {
        return pts.map((pt) => this.point(pt));
    }
    translate(x, y) {
        const trmat = (0, transformation_matrix_1.translate)(x, y);
        return (0, utilsPrivate_1.convertMat)((0, transformation_matrix_1.compose)(this, trmat));
    }
    scale(sx, sy = sx, x = 0, y = 0) {
        const scmat = (0, transformation_matrix_1.scale)(sx, sy, x, y);
        return (0, utilsPrivate_1.convertMat)((0, transformation_matrix_1.compose)(this, scmat));
    }
    rotate(rad, x = 0, y = 0) {
        const rotmat = (0, transformation_matrix_1.rotate)(rad, x, y);
        return (0, utilsPrivate_1.convertMat)((0, transformation_matrix_1.compose)(this, rotmat));
    }
    rotateDeg(deg, x = 0, y = 0) {
        const rad = (deg * Math.PI) / 180;
        return this.rotate(rad, x, y);
    }
    transform(...mats) {
        return (0, utilsPrivate_1.convertMat)((0, transformation_matrix_1.compose)(this, ...mats));
    }
    smooth(precision = 10000000000) {
        return (0, utilsPrivate_1.convertMat)((0, transformation_matrix_1.smoothMatrix)(this, precision));
    }
    toSVG() {
        return (0, transformation_matrix_1.toSVG)(this);
    }
    toCSS() {
        return (0, transformation_matrix_1.toCSS)(this);
    }
    toString() {
        return (0, transformation_matrix_1.toString)(this);
    }
    fromTriangles(t1, t2) {
        return (0, utilsPrivate_1.convertMat)((0, transformation_matrix_1.fromTriangles)(t1, t2));
    }
    clone() {
        return new Matrix([this.a, this.b, this.c, this.d, this.e, this.f]);
    }
    copy() {
        return this.clone();
    }
}
exports.Matrix = Matrix;
