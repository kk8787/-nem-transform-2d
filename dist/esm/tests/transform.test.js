import { Matrix } from '../matrix';
import { Transform } from '../transform';
import { Vec } from '../vec';
describe('mixin', () => {
    it('should match that the result of "translateTo, By"', () => {
        const transform = new Transform({
            translate: new Vec(1, 2),
            rotate: 5,
        });
        expect(transform.translateTo(new Vec(3, 6))).toEqual(new Transform({
            translate: new Vec(3, 6),
            rotate: 5,
        }));
        expect(transform.translateBy(new Vec(3, 6))).toEqual(new Transform({
            translate: new Vec(4, 8),
            rotate: 5,
        }));
    });
    it('rotateDeg', () => {
        const tr = new Transform({
            rotate: 2 * Math.PI,
        });
        expect(tr.rotateDegBy(180)).toEqual(new Transform({
            rotate: 3 * Math.PI,
        }));
    });
    it('mul', () => {
        const m1 = Matrix.identity();
        const m2 = Matrix.identity();
        expect(Matrix.mul(m1, m2)).toEqual(Matrix.identity());
    });
    it('decompose', () => {
        const tMat = Matrix.translation(new Vec(10, 12));
        const rMat = Matrix.rotation(Math.PI / 2);
        const sMat = Matrix.scale(new Vec(2, 3));
        const mat = Matrix.compose(tMat, sMat, rMat);
        const tr = Transform.decompose(mat);
        expect(tr).toEqual(new Transform({
            translate: { x: 10, y: 12 },
            rotate: Math.PI / 2,
            scale: { x: 2, y: 3 },
        }));
    });
});
