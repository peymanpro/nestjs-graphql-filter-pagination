import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional, Min, Max } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @Min(1)
  page: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = 10;
}

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  @IsOptional()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  brand?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0)
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0)
  maxPrice?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0)
  @Max(5)
  minRating?: number;

  @Field({ nullable: true })
  @IsOptional()
  search?: string;
}

@InputType()
export class SortInput {
  @Field({ defaultValue: 'createdAt' })
  @IsOptional()
  field: string = 'createdAt';

  @Field({ defaultValue: 'DESC' })
  @IsOptional()
  order: 'ASC' | 'DESC' = 'DESC';
}

@InputType()
export class ProductQueryInput {
  @Field(() => PaginationInput, { 
    defaultValue: { page: 1, limit: 10 } 
  })
  @IsOptional()
  pagination?: PaginationInput;

  @Field(() => FilterInput, { 
    defaultValue: {} 
  })
  @IsOptional()
  filter?: FilterInput;

  @Field(() => SortInput, { 
    defaultValue: { field: 'createdAt', order: 'DESC' } 
  })
  @IsOptional()
  sort?: SortInput;
}