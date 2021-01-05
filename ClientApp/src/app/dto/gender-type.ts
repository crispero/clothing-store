export enum GenderType {
  Man = 1,
  Woman
}

export interface IGenderType {
  genderType: GenderType;
  title: string;
}

export const GENDER_TYPE_LIST: IGenderType[] = [
  {
    genderType: GenderType.Man,
    title: "Мужской",
  },
  {
    genderType: GenderType.Woman,
    title: "Женский",
  }
]
