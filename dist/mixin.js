"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformMixin = void 0;
const matrix_1 = require("./matrix");
const transform_1 = require("./transform");
const utils_1 = require("./utils");
function TransformMixin(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.translate = { x: 0, y: 0 };
            this.rotate = 0;
            this.scale = { x: 0, y: 0 };
            this.origin = { x: 0, y: 0 };
            this.skew = { x: 0, y: 0 };
        }
        get rotateDeg() {
            return (0, utils_1.radToDeg)(this.rotate);
        }
        static decompose(mat) {
            const { a, b, c, d, e, f } = mat;
            let scaleX, scaleY, rotation;
            if (a !== 0 || c !== 0) {
                const hypotAc = Math.hypot(a, c);
                scaleX = hypotAc;
                scaleY = (a * d - b * c) / hypotAc;
                const acos = Math.acos(a / hypotAc);
                rotation = c > 0 ? -acos : acos;
            }
            else if (b !== 0 || d !== 0) {
                const hypotBd = Math.hypot(b, d);
                scaleX = (a * d - b * c) / hypotBd;
                scaleY = hypotBd;
                const acos = Math.acos(b / hypotBd);
                rotation = Math.PI / 2 + (d > 0 ? -acos : acos);
            }
            else {
                scaleX = 0;
                scaleY = 0;
                rotation = 0;
            }
            const tr = new transform_1.Transform({
                translate: { x: e, y: f },
                rotate: rotation,
                scale: { x: scaleX, y: scaleY },
            });
            return tr;
        }
        translateTo(translate) {
            return this.cloneWith({ translate });
        }
        translateBy(vec) {
            return this.cloneWith({
                translate: { x: this.translate.x + vec.x, y: this.translate.y + vec.y },
            });
        }
        rotateTo(rotate) {
            return this.cloneWith({
                rotate,
            });
        }
        rotateDegTo(deg) {
            return this.cloneWith({ rotate: (0, utils_1.degToRad)(deg) });
        }
        rotateDegBy(deg) {
            return this.cloneWith({ rotate: this.rotate + (0, utils_1.degToRad)(deg) });
        }
        rotateBy(rad) {
            return this.cloneWith({ rotate: this.rotate + rad });
        }
        scaleTo(scale) {
            return this.cloneWith({ scale });
        }
        scaleBy(s) {
            return this.cloneWith({
                scale: { x: this.scale.x * s.x, y: this.scale.y * s.y },
            });
        }
        matrix() {
            const mat = new matrix_1.Matrix();
            const tr = matrix_1.Matrix.translation(this.translate);
            const rot = matrix_1.Matrix.rotation(this.rotate, this.origin);
            const sca = matrix_1.Matrix.scale(this.scale, this.origin);
            return mat.transform(tr, rot, sca);
        }
        clone() {
            return this.cloneWith({});
        }
        cloneWith(params) {
            var _a;
            const translate = params.translate
                ? { x: params.translate.x, y: params.translate.y }
                : this.translate;
            const origin = params.origin
                ? { x: params.origin.x, y: params.origin.y }
                : this.origin;
            const scale = params.scale
                ? { x: params.scale.x, y: params.scale.y }
                : this.scale;
            const clone = new transform_1.Transform({
                translate,
                rotate: (_a = params.rotate) !== null && _a !== void 0 ? _a : this.rotate,
                scale,
                origin,
            });
            return clone;
        }
    };
}
exports.TransformMixin = TransformMixin;
