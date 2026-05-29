import { IsInt, IsString, Min } from 'class-validator';
 
export class CreateCheckoutDto {
  @IsString({ message: 'O ID do produto deve ser uma string.' })
  productId!: string;
 
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'A quantidade mínima para compra é 1.' })
  quantity!: number;
}
 