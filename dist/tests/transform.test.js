"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("../matrix");
const transform_1 = require("../transform");
const vec_1 = require("../vec");
describe('mixin', () => {
    it('should match that the result of "translateTo, By"', () => {
        const transform = new transform_1.Transform({
            translate: new vec_1.Vec(1, 2),
            rotate: 5,
        });
        expect(transform.translateTo(new vec_1.Vec(3, 6))).toEqual(new transform_1.Transform({
            translate: new vec_1.Vec(3, 6),
            rotate: 5,
        }));
        expect(transform.translateBy(new vec_1.Vec(3, 6))).toEqual(new transform_1.Transform({
            translate: new vec_1.Vec(4, 8),
            rotate: 5,
        }));
    });
    it('rotateDeg', () => {
        const tr = new transform_1.Transform({
            rotate: 2 * Math.PI,
        });
        expect(tr.rotateDegBy(180)).toEqual(new transform_1.Transform({
            rotate: 3 * Math.PI,
        }));
    });
    it('mul', () => {
        const m1 = matrix_1.Matrix.identity();
        const m2 = matrix_1.Matrix.identity();
        expect(matrix_1.Matrix.mul(m1, m2)).toEqual(matrix_1.Matrix.identity());
    });
    it('decompose', () => {
        const tMat = matrix_1.Matrix.translation(new vec_1.Vec(10, 12));
        const rMat = matrix_1.Matrix.rotation(Math.PI / 2);
        const sMat = matrix_1.Matrix.scale(new vec_1.Vec(2, 3));
        const mat = matrix_1.Matrix.compose(tMat, sMat, rMat);
        const tr = transform_1.Transform.decompose(mat);
        expect(tr).toEqual(new transform_1.Transform({
            translate: { x: 10, y: 12 },
            rotate: Math.PI / 2,
            scale: { x: 2, y: 3 },
        }));
    });
});
