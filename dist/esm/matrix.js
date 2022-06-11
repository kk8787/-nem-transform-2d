import { applyToPoint, compose, decomposeTSR, fromTriangles, identity, inverse, isAffineMatrix, rotate, scale, smoothMatrix, toCSS, toString, toSVG, translate, } from 'transformation-matrix';
import { Transform } from './transform';
import { convertMat } from './utilsPrivate';
export class Matrix {
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
        const mat = identity();
        return new Matrix([mat.a, mat.b, mat.c, mat.d, mat.e, mat.f]);
    }
    decompose() {
        const transform = decomposeTSR(this);
        const rot = transform.rotation.angle;
        const scale = (transform.scale.sx + transform.scale.sy) / 2;
        const tr = new Transform({
            translate: { x: transform.translate.tx, y: transform.translate.ty },
            rotate: rot,
            scale: scale,
        });
        return tr;
    }
    inverse() {
        return convertMat(inverse(this));
    }
    isAffineMatrix() {
        return isAffineMatrix(this);
    }
    point(pt) {
        return applyToPoint(this, pt);
    }
    points(pts) {
        return pts.map((pt) => this.point(pt));
    }
    translate(x, y) {
        const trmat = translate(x, y);
        return convertMat(compose(this, trmat));
    }
    scale(sx, sy = sx, x = 0, y = 0) {
        const scmat = scale(sx, sy, x, y);
        return convertMat(compose(this, scmat));
    }
    rotate(rad, x = 0, y = 0) {
        const rotmat = rotate(rad, x, y);
        return convertMat(compose(this, rotmat));
    }
    rotateDeg(deg, x = 0, y = 0) {
        const rad = (deg * Math.PI) / 180;
        return this.rotate(rad, x, y);
    }
    transform(...mats) {
        return convertMat(compose(this, ...mats));
    }
    smooth(precision = 10000000000) {
        return convertMat(smoothMatrix(this, precision));
    }
    toSVG() {
        return toSVG(this);
    }
    toCSS() {
        return toCSS(this);
    }
    toString() {
        return toString(this);
    }
    fromTriangles(t1, t2) {
        return convertMat(fromTriangles(t1, t2));
    }
    clone() {
        return new Matrix([this.a, this.b, this.c, this.d, this.e, this.f]);
    }
    copy() {
        return this.clone();
    }
}
