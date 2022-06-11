"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMat = void 0;
const matrix_1 = require("./matrix");
function convertMat(mat) {
    return new matrix_1.Matrix([mat.a, mat.b, mat.c, mat.d, mat.e, mat.f]);
}
exports.convertMat = convertMat;
