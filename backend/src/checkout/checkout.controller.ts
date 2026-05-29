import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import type { CheckoutResponseDto } from './dto/checkout-response.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get('products')
  getProducts(): ProductEntity[] {
    return this.checkoutService.getProducts();
  }

  @Post()
  async createCheckout(
    @Body() dto: CreateCheckoutDto,
  ): Promise<CheckoutResponseDto> {
    return this.checkoutService.processCheckout(dto);
  }
}
