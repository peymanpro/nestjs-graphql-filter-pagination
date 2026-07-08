import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Product } from './product.entity';
import { ProductQueryInput } from './product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(query: ProductQueryInput) {
    const { pagination, filter, sort } = query;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter) {
      if (filter.category) where.category = filter.category;
      if (filter.brand) where.brand = filter.brand;
      if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
        where.price = Between(
          filter.minPrice || 0,
          filter.maxPrice || 9999999,
        );
      }
      if (filter.minRating) where.rating = Between(filter.minRating, 5);
      if (filter.search) where.name = Like(`%${filter.search}%`);
    }

    const [items, total] = await this.productRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        [sort?.field || 'createdAt']: sort?.order || 'DESC',
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async getCategories(): Promise<string[]> {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where('product.category IS NOT NULL')
      .getRawMany();
    return result.map(item => item.category);
  }

  async getBrands(): Promise<string[]> {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.brand', 'brand')
      .where('product.brand IS NOT NULL')
      .getRawMany();
    return result.map(item => item.brand);
  }

  async seedDatabase() {
    const count = await this.productRepository.count();
    if (count > 0) return;

    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
    const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony'];

    for (let i = 1; i <= 50; i++) {
      const product = this.productRepository.create({
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        price: Math.floor(Math.random() * 1000) + 10,
        category: categories[Math.floor(Math.random() * categories.length)],
        brand: brands[Math.floor(Math.random() * brands.length)],
        stock: Math.floor(Math.random() * 100),
        rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      });
      await this.productRepository.save(product);
    }
    console.log('50 products seeded!');
  }
}