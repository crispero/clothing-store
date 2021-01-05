export enum UserType {
  Admin = 2,
  User = 1,
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
