export enum ClothesSize {
  XS = 1,
  S,
  M,
  L,
  XL,
  XLL
}

export interface IClothesSize {
  size: ClothesSize,
  title: string;
}

export const CLOTHES_SIZE_LIST: IClothesSize[] = [
  {
    size: ClothesSize.XS,
    title: "XS",
  },
  {
    size: ClothesSize.S,
    title: "S",
  },
  {
    size: ClothesSize.M,
    title: "M",
  },
  {
    size: ClothesSize.L,
    title: "L",
  },
  {
    size: ClothesSize.XL,
    title: "XL",
  },
  {
    size: ClothesSize.XLL,
    title: "XLL",
  },
]
