export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const API_ROUTES = {
  PRODUCTS: `${API_BASE_URL}/checkout/products`,
  CHECKOUT: `${API_BASE_URL}/checkout`,
} as const;
