import { ITransform } from './mixin';
declare const Transform_base: {
    new (...args: any[]): {
        translate: import("./vec").IVec;
        rotate: number;
        scale: import("./vec").IVec;
        origin: import("./vec").IVec;
        skew: import("./vec").IVec;
        readonly rotateDeg: number;
        translateTo(translate: import("./vec").IVec): Transform;
        translateBy(vec: import("./vec").IVec): Transform;
        rotateTo(rotate: number): Transform;
        rotateDegTo(deg: number): Transform;
        rotateDegBy(deg: number): Transform;
        rotateBy(rad: number): Transform;
        scaleTo(scale: import("./vec").IVec): Transform;
        scaleBy(s: import("./vec").IVec): Transform;
        matrix(): import("./matrix").Matrix;
        clone(): Transform;
        cloneWith(params: Partial<ITransform>): Transform;
    };
    decompose(mat: import("./matrix").IMatrix): Transform;
} & ObjectConstructor;
export declare class Transform extends Transform_base {
    constructor(params?: Partial<ITransform>);
}
export {};
//# sourceMappingURL=transform.d.ts.map