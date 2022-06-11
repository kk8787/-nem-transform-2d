import { Matrix } from './matrix';
import { IVec, Vec } from './vec';
export interface ITransform {
    translate: IVec;
    rotate: number;
    scale: number;
    origin: IVec;
}
export declare class Transform implements ITransform {
    readonly origin: Vec;
    readonly translate: Vec;
    readonly rotate: number;
    readonly scale: number;
    constructor(params?: Partial<ITransform>);
    get rotateDeg(): number;
    static fromMatrix(mat: Matrix): Transform;
    translateTo(translate: IVec): Transform;
    translateBy(vec: Vec): Transform;
    rotateTo(rotate: number): Transform;
    rotateDegTo(deg: number): Transform;
    rotateDegBy(deg: number): Transform;
    rotateBy(rad: number): Transform;
    scaleTo(scale: number): Transform;
    scaleBy(s: number): Transform;
    matrix(): Matrix;
    clone(): Transform;
    cloneWith(params: Partial<ITransform>): Transform;
}
//# sourceMappingURL=transform.d.ts.map