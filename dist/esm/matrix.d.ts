import { Transform } from './transform';
import { IVec } from './vec';
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
    constructor(array?: [number, number, number, number, number, number]);
    static identity(): Matrix;
    decompose(): Transform;
    inverse(): Matrix;
    isAffineMatrix(): boolean;
    point(pt: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    points(pts: {
        x: number;
        y: number;
    }[]): {
        x: number;
        y: number;
    }[];
    translate(x: number, y: number): Matrix;
    scale(sx: number, sy?: number, x?: number, y?: number): Matrix;
    rotate(rad: number, x?: number, y?: number): Matrix;
    rotateDeg(deg: number, x?: number, y?: number): Matrix;
    transform(...mats: IMatrix[]): Matrix;
    smooth(precision?: number): Matrix;
    toSVG(): string;
    toCSS(): string;
    toString(): string;
    fromTriangles(t1: [IVec, IVec, IVec], t2: [IVec, IVec, IVec]): Matrix;
    clone(): Matrix;
    copy(): Matrix;
}
//# sourceMappingURL=matrix.d.ts.map