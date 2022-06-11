import { ITransform, TransformMixin } from './mixin'

export class Transform extends TransformMixin(Object) {
  constructor(params?: Partial<ITransform>) {
    super()
    this.translate = params?.translate
      ? { x: params.translate.x, y: params.translate.y }
      : { x: 0, y: 0 }
    this.origin = params?.origin
      ? { x: params.origin.x, y: params.origin.y }
      : { x: 0, y: 0 }
    this.rotate = params?.rotate ?? 0
    this.scale = params?.scale ?? { x: 1, y: 1 }
    this.skew = params?.skew ?? {
      x: 0,
      y: 0,
    }
    Object.freeze(this.translate)
    Object.freeze(this.origin)
    Object.freeze(this.scale)
    Object.freeze(this.skew)
    Object.freeze(this)
  }
}
