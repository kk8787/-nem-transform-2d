import { Matrix } from './matrix';
export function convertMat(mat) {
    return new Matrix([mat.a, mat.b, mat.c, mat.d, mat.e, mat.f]);
}
