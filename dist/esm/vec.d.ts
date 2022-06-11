export interface IVec {
    x: number;
    y: number;
}
export declare class Vec implements IVec {
    readonly x: number;
    readonly y: number;
    constructor(x?: number, y?: number);
    static unit(): Vec;
    clone(): Vec;
    add(vec: IVec): Vec;
    sub(vec: IVec): Vec;
    mul(s: number): Vec;
    div(d: number): Vec;
    dot(vec: IVec): number;
    cross(vec: IVec): number;
}
//# sourceMappingURL=vec.d.ts.map