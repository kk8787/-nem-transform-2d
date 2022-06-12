# 2d transformation

## example

1. simply using Transform Class.

```
class A {
  transform = new Transform()
}

const a = new A()

a.translate
a.rotate

```

2. using TransformMixin Function.

```
class A {
  a1: number
  a2: number
}

// Assigning transform properties to a class.
const B = TransformMixin(A)

const b = new B() // as A & Transform

b.translate
b.rotate


```

## Transform Class

### properties

transform
rotate
scale
skew
origin
rotateDeg (getter)

### methods

#### static

decomposeTSR // to decompose a Matrix into a Transform. (\* in the order of transform, scale, rotate)

etc...

## Matrix class

### static

- methods to create a Transform Matrix.
  translation
  rotation
  rotationDeg
  scale
  skew
  skewDeg
  identity

- multiply
  mul
  compose

### instance methods

point // to apply the matrix to a point.
points // to apply the matrix to points.
smooth // rounding number
etc...
