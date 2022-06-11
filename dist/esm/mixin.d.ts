import { IMatrix, Matrix } from './matrix';
import { Transform } from './transform';
import { Constructor } from './utils';
import { IVec } from './vec';
export interface ITransform {
    translate: IVec;
    rotate: number;
    scale: IVec;
    origin: IVec;
    skew: IVec;
}
export declare function TransformMixin<T extends Constructor>(constructor: T): {
    new (...args: any[]): {
        translate: IVec;
        rotate: number;
        scale: IVec;
        origin: IVec;
        skew: IVec;
        readonly rotateDeg: number;
        translateTo(translate: IVec): Transform;
        translateBy(vec: IVec): Transform;
        rotateTo(rotate: number): Transform;
        rotateDegTo(deg: number): Transform;
        rotateDegBy(deg: number): Transform;
        rotateBy(rad: number): Transform;
        scaleTo(scale: IVec): Transform;
        scaleBy(s: IVec): Transform;
        matrix(): Matrix;
        clone(): Transform;
        cloneWith(params: Partial<ITransform>): Transform;
    };
    decompose(mat: IMatrix): Transform;
} & T;
//# sourceMappingURL=mixin.d.ts.map