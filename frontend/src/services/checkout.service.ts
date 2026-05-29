import { API_ROUTES } from '../constants/api.constants';
import type { Product, CheckoutResponse } from '../types/checkout.types';

export async function fetchProductsService(): Promise<Product[]> {
  const response = await fetch(API_ROUTES.PRODUCTS);
  
  if (!response.ok) {
    throw new Error('Falha ao carregar a vitrine de produtos.');
  }
  
  return response.json() as Promise<Product[]>;
}

export async function processCheckoutService(productId: string, quantity: number): Promise<CheckoutResponse> {
  const response = await fetch(API_ROUTES.CHECKOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await response.json() as CheckoutResponse | { message: string };

  if (!response.ok) {
    const errorMessage = 'message' in data ? data.message : 'Erro desconhecido ao processar checkout.';
    throw new Error(errorMessage);
  }

  return data as CheckoutResponse;
}
