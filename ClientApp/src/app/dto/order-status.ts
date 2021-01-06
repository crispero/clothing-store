export enum OrderStatus {
  InProcessing,
  InTransit,
  Delivered,
}

export interface IOrderStatus {
  status: OrderStatus;
  title: string;
}

export const ORDER_STATUS_TYPE_LIST: IOrderStatus[] = [
  {
    status: OrderStatus.InProcessing,
    title: "В обработке",
  },
  {
    status: OrderStatus.InTransit,
    title: "В пути",
  },
  {
    status: OrderStatus.Delivered,
    title: "Доставлено",
  }
]
