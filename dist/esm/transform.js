import { rotate, translate, scale as sc } from 'transformation-matrix';
import { Matrix } from './matrix';
import { degToRad, radToDeg } from './utils';
import { Vec } from './vec';
export class Transform {
    constructor(params) {
        var _a, _b;
        this.translate = (params === null || params === void 0 ? void 0 : params.translate)
            ? new Vec(params.translate.x, params.translate.y)
            : new Vec();
        this.origin = (params === null || params === void 0 ? void 0 : params.origin)
            ? new Vec(params.origin.x, params.origin.y)
            : new Vec();
        this.rotate = (_a = params === null || params === void 0 ? void 0 : params.rotate) !== null && _a !== void 0 ? _a : 0;
        this.scale = (_b = params === null || params === void 0 ? void 0 : params.scale) !== null && _b !== void 0 ? _b : 1;
    }
    get rotateDeg() {
        return radToDeg(this.rotate);
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
        const tr = this.cloneWith({ rotate: degToRad(deg) });
        return tr;
    }
    rotateDegBy(deg) {
        const tr = this.cloneWith({ rotate: this.rotate + degToRad(deg) });
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
        const mat = new Matrix();
        const tr = translate(this.translate.x, this.translate.y);
        const rot = rotate(this.rotate, this.origin.x, this.origin.y);
        const sca = sc(this.scale, this.scale, this.origin.x, this.origin.y);
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
