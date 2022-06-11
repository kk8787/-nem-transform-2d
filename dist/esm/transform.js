import { TransformMixin } from './mixin';
export class Transform extends TransformMixin(Object) {
    constructor(params) {
        var _a, _b, _c;
        super();
        this.translate = (params === null || params === void 0 ? void 0 : params.translate)
            ? { x: params.translate.x, y: params.translate.y }
            : { x: 0, y: 0 };
        this.origin = (params === null || params === void 0 ? void 0 : params.origin)
            ? { x: params.origin.x, y: params.origin.y }
            : { x: 0, y: 0 };
        this.rotate = (_a = params === null || params === void 0 ? void 0 : params.rotate) !== null && _a !== void 0 ? _a : 0;
        this.scale = (_b = params === null || params === void 0 ? void 0 : params.scale) !== null && _b !== void 0 ? _b : { x: 1, y: 1 };
        this.skew = (_c = params === null || params === void 0 ? void 0 : params.skew) !== null && _c !== void 0 ? _c : {
            x: 0,
            y: 0,
        };
        Object.freeze(this.translate);
        Object.freeze(this.origin);
        Object.freeze(this.scale);
        Object.freeze(this.skew);
        Object.freeze(this);
    }
}
