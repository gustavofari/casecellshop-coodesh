export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}
 
export interface CheckoutResponse {
  message: string;
  product: string;
  quantityBought: number;
  remainingStock: number;
}
 
export type FeedbackState =
  | {
      type: 'success';
      title: string;
      productName: string;
      quantity: number;
      remainingStock: number;
      message?: string;
    }
  | {
      type: 'error';
      title: string;
      message: string;
    };
