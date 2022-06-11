export function degToRad(deg: number) {
  return (deg * Math.PI) / 180
}

export function radToDeg(rad: number) {
  return (rad * 180) / Math.PI
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = object> = new (...args: any[]) => T
