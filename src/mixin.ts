import { IMatrix, Matrix } from './matrix'
import { Transform } from './transform'
import { Constructor, degToRad, radToDeg } from './utils'
import { IVec } from './vec'

export interface ITransform {
  translate: IVec
  rotate: number
  scale: IVec
  origin: IVec
  skew: IVec
}

export function TransformMixin<T extends Constructor>(constructor: T) {
  return class extends constructor implements ITransform {
    translate: IVec = { x: 0, y: 0 }
    rotate = 0
    scale: IVec = { x: 0, y: 0 }
    origin: IVec = { x: 0, y: 0 }
    skew: IVec = { x: 0, y: 0 }

    get rotateDeg(): number {
      return radToDeg(this.rotate)
    }
    static decompose(mat: IMatrix): Transform {
      const { a, b, c, d, e, f } = mat
      let scaleX: number, scaleY: number, rotation: number

      if (a !== 0 || c !== 0) {
        const hypotAc = Math.hypot(a, c)
        scaleX = hypotAc
        scaleY = (a * d - b * c) / hypotAc
        const acos = Math.acos(a / hypotAc)
        rotation = c > 0 ? -acos : acos
      } else if (b !== 0 || d !== 0) {
        const hypotBd = Math.hypot(b, d)
        scaleX = (a * d - b * c) / hypotBd
        scaleY = hypotBd
        const acos = Math.acos(b / hypotBd)
        rotation = Math.PI / 2 + (d > 0 ? -acos : acos)
      } else {
        scaleX = 0
        scaleY = 0
        rotation = 0
      }

      const tr = new Transform({
        translate: { x: e, y: f },
        rotate: rotation,
        scale: { x: scaleX, y: scaleY },
      })

      return tr
    }
    translateTo(translate: IVec): Transform {
      return this.cloneWith({ translate })
    }
    translateBy(vec: IVec): Transform {
      return this.cloneWith({
        translate: { x: this.translate.x + vec.x, y: this.translate.y + vec.y },
      })
    }
    rotateTo(rotate: number): Transform {
      return this.cloneWith({
        rotate,
      })
    }
    rotateDegTo(deg: number): Transform {
      return this.cloneWith({ rotate: degToRad(deg) })
    }
    rotateDegBy(deg: number): Transform {
      return this.cloneWith({ rotate: this.rotate + degToRad(deg) })
    }
    rotateBy(rad: number): Transform {
      return this.cloneWith({ rotate: this.rotate + rad })
    }
    scaleTo(scale: IVec): Transform {
      return this.cloneWith({ scale })
    }
    scaleBy(s: IVec): Transform {
      return this.cloneWith({
        scale: { x: this.scale.x * s.x, y: this.scale.y * s.y },
      })
    }
    matrix(): Matrix {
      const mat = new Matrix()
      const tr = Matrix.translation(this.translate)
      const rot = Matrix.rotation(this.rotate, this.origin)
      const sca = Matrix.scale(this.scale, this.origin)
      return mat.transform(tr, rot, sca)
    }
    clone(): Transform {
      return this.cloneWith({})
    }
    cloneWith(params: Partial<ITransform>) {
      const translate = params.translate
        ? { x: params.translate.x, y: params.translate.y }
        : this.translate
      const origin = params.origin
        ? { x: params.origin.x, y: params.origin.y }
        : this.origin
      const scale = params.scale
        ? { x: params.scale.x, y: params.scale.y }
        : this.scale
      const clone = new Transform({
        translate,
        rotate: params.rotate ?? this.rotate,
        scale,
        origin,
      })
      return clone
    }
  }
}
