import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CheckoutResponseDto } from './dto/checkout-response.dto';
import { productsMock } from './data/products.mock';
import type { ProductEntity } from './entities/product.entity';

@Injectable()
export class CheckoutService {
  getProducts(): ProductEntity[] {
    return productsMock;
  }

  async processCheckout(dto: CreateCheckoutDto): Promise<CheckoutResponseDto> {
    const product = productsMock.find((p) => p.id === dto.productId);

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    if (product.stock < dto.quantity) {
      throw new BadRequestException(
        `Estoque insuficiente. Restam apenas ${product.stock} unidade(s).`,
      );
    }

    // O ERP confirma a operação antes de qualquer alteração de estoque.
    await this.simulateErpConfirmation();

    product.stock -= dto.quantity;

    return {
      message: 'Compra realizada com sucesso!',
      product: product.name,
      quantityBought: dto.quantity,
      remainingStock: product.stock,
    };
  }

  // Simula a latência e instabilidade de um ERP monolítico legado.
  private simulateErpConfirmation(): Promise<void> {
    const delay =
      parseInt(process.env.ERP_DELAY_MS ?? '0', 10) ||
      Math.floor(Math.random() * 2000) + 1000;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isErpDown = Math.random() < 0.1;
        if (isErpDown) {
          reject(
            new ServiceUnavailableException(
              'Erro de comunicação com o ERP central. Tente novamente.',
            ),
          );
        } else {
          resolve();
        }
      }, delay);
    });
  }
}
