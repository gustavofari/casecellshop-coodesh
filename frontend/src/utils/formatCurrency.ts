/**
 * 
 * @param value O valor numérico a ser formatado.
 * @returns 
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
