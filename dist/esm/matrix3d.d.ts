import { IVec } from './vec';
export declare type IMatrixArray = [number, number, number, number, number, number];
export interface IMatrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
}
export declare class Matrix implements IMatrix {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly e: number;
    readonly f: number;
    constructor(...array: IMatrixArray | []);
    static translation(vec: IVec): Matrix;
    static rotation(rad: number, origin?: IVec): Matrix;
    static rotationDeg(deg: number, origin?: IVec): Matrix;
    static scale(scale: IVec, origin?: IVec): Matrix;
    static skew(vec: IVec): Matrix;
    static skewDeg(vec: IVec): Matrix;
    static identity(): Matrix;
    static mul(m1: IMatrix, m2: IMatrix): Matrix;
    static compose(...matrices: Exclude<IMatrix[], [IMatrix]>): Matrix;
    inverse(): Matrix;
    point(pt: {
        x: number;
        y: number;
    }): IVec;
    points(pts: {
        x: number;
        y: number;
    }[]): {
        x: number;
        y: number;
    }[];
    translate(vec: IVec): Matrix;
    rotate(rad: number, origin?: IVec): Matrix;
    scale(scale: IVec, origin?: IVec): Matrix;
    skew(skew: IVec, origin?: IVec): Matrix;
    rotateDeg(deg: number, origin?: IVec): Matrix;
    transform(...mats: IMatrix[]): Matrix;
    smooth(precision?: number): Matrix;
    toArray(): IMatrixArray;
    clone(): Matrix;
    copy(): Matrix;
}
//# sourceMappingURL=matrix3d.d.ts.map