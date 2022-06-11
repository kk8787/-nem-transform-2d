"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
const transformation_matrix_1 = require("transformation-matrix");
const matrix_1 = require("./matrix");
const utils_1 = require("./utils");
const vec_1 = require("./vec");
class Transform {
    constructor(params) {
        var _a, _b;
        this.translate = (params === null || params === void 0 ? void 0 : params.translate)
            ? new vec_1.Vec(params.translate.x, params.translate.y)
            : new vec_1.Vec();
        this.origin = (params === null || params === void 0 ? void 0 : params.origin)
            ? new vec_1.Vec(params.origin.x, params.origin.y)
            : new vec_1.Vec();
        this.rotate = (_a = params === null || params === void 0 ? void 0 : params.rotate) !== null && _a !== void 0 ? _a : 0;
        this.scale = (_b = params === null || params === void 0 ? void 0 : params.scale) !== null && _b !== void 0 ? _b : 1;
    }
    get rotateDeg() {
        return (0, utils_1.radToDeg)(this.rotate);
    }
    static fromMatrix(mat) {
        return mat.decompose();
    }
    translateTo(translate) {
        const tr = this.cloneWith({ translate });
        return tr;
    }
    translateBy(vec) {
        const tr = this.cloneWith({ translate: this.translate.add(vec) });
        return tr;
    }
    rotateTo(rotate) {
        const tr = this.cloneWith({
            rotate,
        });
        return tr;
    }
    rotateDegTo(deg) {
        const tr = this.cloneWith({ rotate: (0, utils_1.degToRad)(deg) });
        return tr;
    }
    rotateDegBy(deg) {
        const tr = this.cloneWith({ rotate: this.rotate + (0, utils_1.degToRad)(deg) });
        return tr;
    }
    rotateBy(rad) {
        const tr = this.cloneWith({ rotate: this.rotate + rad });
        return tr;
    }
    scaleTo(scale) {
        const tr = this.cloneWith({ scale });
        return tr;
    }
    scaleBy(s) {
        const tr = this.cloneWith({ scale: this.scale * s });
        return tr;
    }
    matrix() {
        const mat = new matrix_1.Matrix();
        const tr = (0, transformation_matrix_1.translate)(this.translate.x, this.translate.y);
        const rot = (0, transformation_matrix_1.rotate)(this.rotate, this.origin.x, this.origin.y);
        const sca = (0, transformation_matrix_1.scale)(this.scale, this.scale, this.origin.x, this.origin.y);
        return mat.transform(tr, rot, sca);
    }
    clone() {
        return this.cloneWith({});
    }
    cloneWith(params) {
        var _a, _b;
        const translate = params.translate
            ? { x: params.translate.x, y: params.translate.y }
            : this.translate;
        const origin = params.origin
            ? { x: params.origin.x, y: params.origin.y }
            : this.origin;
        const clone = new Transform({
            translate,
            rotate: (_a = params.rotate) !== null && _a !== void 0 ? _a : this.rotate,
            scale: (_b = params.scale) !== null && _b !== void 0 ? _b : this.scale,
            origin,
        });
        return clone;
    }
}
exports.Transform = Transform;
