export interface IVec {
    x: number;
    y: number;
}
export declare class Vec implements IVec {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static unit(): Vec;
    clone(): Vec;
    add(vec: IVec): Vec;
    sub(vec: IVec): Vec;
    mul(s: number): Vec;
    div(d: number): Vec;
    dot(vec: IVec): number;
    cross(vec: IVec): number;
    eq(vec: IVec): boolean;
    abs(): number;
    absSquare(): number;
    projection(vec: Vec): Vec;
    unit(): Vec;
    centerPoint(target: Vec): Vec;
    rev(): Vec;
    angle(vec: Vec): number | null;
    normal(): Vec;
    isLeft(vec: Vec): boolean;
    rotate(deg: number, origin?: Vec): Vec;
    static vecToVecRotation(vec: Vec): {
        len: number;
        rotate: number;
    };
}
//# sourceMappingURL=vec.d.ts.map