import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule implements OnModuleInit {
  constructor(private productService: ProductService) {}
  
  async onModuleInit() {
    await this.productService.seedDatabase();
  }
}