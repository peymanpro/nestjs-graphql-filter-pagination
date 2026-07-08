import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductQueryInput } from './product.input';
import { PaginatedProductsResponse } from './product.response';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => PaginatedProductsResponse)
  async products(
    @Args('query', { type: () => ProductQueryInput, defaultValue: {} })
    query: ProductQueryInput,
  ) {
    return this.productService.findAll(query);
  }

  @Query(() => [String])
  async categories() {
    return this.productService.getCategories();
  }

  @Query(() => [String])
  async brands() {
    return this.productService.getBrands();
  }
}