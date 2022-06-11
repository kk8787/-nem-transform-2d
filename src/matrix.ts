import { degToRad } from './utils'
import { IVec } from './vec'

export type IMatrixArray = [number, number, number, number, number, number]

export interface IMatrix {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

export class Matrix implements IMatrix {
  readonly a: number
  readonly b: number
  readonly c: number
  readonly d: number
  readonly e: number
  readonly f: number
  constructor(...array: IMatrixArray | []) {
    if (array.length === 6) {
      this.a = array[0] as number
      this.b = array[1] as number
      this.c = array[2] as number
      this.d = array[3] as number
      this.e = array[4] as number
      this.f = array[5] as number
    } else {
      this.a = 1
      this.b = 0
      this.c = 0
      this.d = 1
      this.e = 0
      this.f = 0
    }
  }

  static translation(vec: IVec) {
    return new Matrix(1, 0, 0, 1, vec.x, vec.y)
  }

  static rotation(rad: number, origin: IVec = { x: 0, y: 0 }) {
    const co = Math.cos(rad)
    const si = Math.sin(rad)

    return this.compose(
      this.translation(origin),
      new Matrix(co, si, -si, co, 0, 0),
      this.translation({ x: -origin.x, y: -origin.y }),
    )
  }

  static rotationDeg(deg: number, origin: IVec = { x: 0, y: 0 }) {
    return this.rotation(degToRad(deg), origin)
  }

  static scale(scale: IVec, origin: IVec = { x: 0, y: 0 }) {
    return this.compose(
      this.translation(origin),
      new Matrix(scale.x, 0, 0, scale.y, 0, 0),
      this.translation({ x: -origin.x, y: -origin.y }),
    )
  }

  static skew(vec: IVec) {
    return new Matrix(1, Math.tan(vec.x), 0, Math.tan(vec.y), 1, 0)
  }

  static skewDeg(vec: IVec) {
    return this.skew({
      x: degToRad(vec.x),
      y: degToRad(vec.y),
    })
  }

  static identity(): Matrix {
    return new Matrix(1, 0, 0, 1, 0, 0)
  }

  static mul(m1: IMatrix, m2: IMatrix): Matrix {
    return new Matrix(
      m1.a * m2.a + m1.c * m2.b,
      m1.b * m2.a + m1.d * m2.b,
      m1.a * m2.c + m1.c * m2.d,
      m1.b * m2.c + m1.d * m2.d,
      m1.a * m2.e + m1.c * m2.f + m1.e,
      m1.b * m2.e + m1.d * m2.f + m1.f,
    )
  }

  static compose(...matrices: Exclude<IMatrix[], [IMatrix]>): Matrix {
    if (matrices.length === 0) {
      throw new Error('0')
    } else if (matrices.length === 1) {
      throw new Error('1')
    }

    let current = matrices[0]
    for (let i = 1, len = matrices.length; i < len; i++) {
      current = this.mul(current, matrices[i])
    }

    // length > 1, type of current must be Matrix
    return current as Matrix
  }

  inverse(): Matrix {
    const det = this.a * this.d - this.b * this.c

    return new Matrix(
      this.d / det,
      this.b / -det,
      this.c / -det,
      this.a / det,
      (this.d * this.e - this.c * this.f) / -det,
      (this.b * this.e - this.a * this.f) / det,
    )
  }

  point(pt: { x: number; y: number }): IVec {
    return {
      x: this.a * pt.x + this.c * pt.y + this.e,
      y: this.b * pt.x + this.d * pt.y + this.f,
    }
  }

  points(pts: { x: number; y: number }[]): { x: number; y: number }[] {
    return pts.map((pt) => this.point(pt))
  }

  translate(vec: IVec): Matrix {
    const trmat = Matrix.translation(vec)
    return Matrix.mul(this, trmat)
  }

  rotate(rad: number, origin: IVec = { x: 0, y: 0 }): Matrix {
    const r = Matrix.rotation(rad, origin)
    return Matrix.mul(this, r)
  }

  scale(scale: IVec, origin: IVec = { x: 0, y: 0 }): Matrix {
    const s = Matrix.scale(scale, origin)
    return Matrix.mul(this, s)
  }

  skew(skew: IVec, origin: IVec = { x: 0, y: 0 }): Matrix {
    const s = Matrix.scale(skew, origin)
    return Matrix.mul(this, s)
  }

  rotateDeg(deg: number, origin: IVec = { x: 0, y: 0 }): Matrix {
    const rad = (deg * Math.PI) / 180
    return this.rotate(rad, origin)
  }

  transform(...mats: IMatrix[]) {
    return Matrix.compose(this, ...mats)
  }

  smooth(precision = 10000000000): Matrix {
    return new Matrix(
      Math.round(this.a * precision) / precision,
      Math.round(this.b * precision) / precision,
      Math.round(this.c * precision) / precision,
      Math.round(this.d * precision) / precision,
      Math.round(this.e * precision) / precision,
      Math.round(this.f * precision) / precision,
    )
  }

  toArray(): IMatrixArray {
    return [this.a, this.b, this.c, this.d, this.e, this.f]
  }

  clone() {
    return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f)
  }

  copy() {
    return this.clone()
  }
}
