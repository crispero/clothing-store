export enum UserType {
  Admin = 1,
  User,
}

export interface IUserType {
  title: string;
  userType: UserType;
}

export const USER_TYPE_LIST: IUserType[] = [
  {
    title: "Пользователь",
    userType: UserType.User,
  },
  {
    title: "Администратор",
    userType: UserType.Admin,
  }
]
