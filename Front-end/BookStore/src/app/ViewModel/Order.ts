export interface Order {
    orderName: string;
    orderQuantity: number;
    orderPrice: number;
    applicationUserId: string;
    orderImage?: string;
}
