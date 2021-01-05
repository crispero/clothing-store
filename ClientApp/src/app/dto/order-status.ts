export enum OrderStatus {
  InTransit,
  Delivered,
}

export interface IOrderStatus {
  status: OrderStatus;
  title: string;
}

export const ORDER_STATUS_TYPE_LIST: IOrderStatus[] = [
  {
    status: OrderStatus.InTransit,
    title: "В пути",
  },
  {
    status: OrderStatus.Delivered,
    title: "Доставлено",
  }
]
