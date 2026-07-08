
## Live Demo

### GraphQL Endpoint

```text
https://nestjs-graphql-filter-pagination-production.up.railway.app/graphql
```

Open the endpoint in your browser to explore the API using Apollo Sandbox.


#  NestJS GraphQL Filtering & Pagination API

[![NestJS](https://img.shields.io/badge/NestJS-10.x-red)](https://nestjs.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16.x-pink)](https://graphql.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3.x-orange)](https://typeorm.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Features

-Advanced Filtering** - Filter by category, brand, price range, rating, and search
-Pagination** - Server-side pagination with metadata (total, page, totalPages, hasNext/hasPrev)
-Dynamic Sorting** - Sort by any field (price, name, rating, date) in ASC/DESC order
-Full-Text Search** - Search products by name
-Auto Seed Data** - 50 sample products automatically inserted on first run
-Type Safety** - Full TypeScript support with GraphQL code generation
-Production Ready** - Uses TypeORM with SQL.js (no compilation needed)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **NestJS** | Backend framework |
| **GraphQL** | API layer (Apollo Server) |
| **TypeORM** | ORM with SQL.js database |
| **TypeScript** | Type safety |
| **class-validator** | Input validation |

## Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nestjs-graphql-filter-pagination
cd nestjs-graphql-filter-pagination

# Install dependencies
npm install

# Start the development server
npm run start:dev

Open GraphQL Playground: 

Basic Pagination:
 Usage Examples:
 query {
  products {
    items {
      id
      name
      price
      category
    }
    total
    page
    totalPages
    hasNext
    hasPrev
  }
}

 Filter by Category and Price Range:
 query {
  products(query: {
    pagination: { page: 1, limit: 10 }
    filter: {
      category: "Electronics"
      minPrice: 100
      maxPrice: 500
    }
    sort: { field: "price", order: "ASC" }
  }) {
    items {
      name
      price
      category
      brand
      rating
    }
    total
    totalPages
  }
}

Search Products:
query {
  products(query: {
    filter: {
      search: "iPhone"
    }
  }) {
    items {
      name
      price
      description
    }
  }
}

Get Available Categories & Brands:
query {
  categories
  brands
}

Sort by Rating (Highest First):
query {
  products(query: {
    sort: { field: "rating", order: "DESC" }
    pagination: { page: 1, limit: 10 }
  }) {
    items {
      name
      rating
      price
    }
  }
}

Complex Query (Filter + Sort + Pagination):
query {
  products(query: {
    pagination: { page: 1, limit: 20 }
    filter: {
      brand: "Apple"
      minPrice: 500
      maxPrice: 1500
      minRating: 4
    }
    sort: { field: "price", order: "DESC" }
  }) {
    items {
      name
      price
      brand
      rating
    }
    total
    totalPages
    hasNext
  }
}

API Response Structure:

{
  items: Product[];      // Array of products for current page
  total: number;         // Total number of products matching filters
  page: number;          // Current page number
  limit: number;         // Items per page
  totalPages: number;    // Total number of pages
  hasNext: boolean;      // Whether next page exists
  hasPrev: boolean;      // Whether previous page exists
}


 Input Parameters:
 
Parameter	Type	Description	Default
pagination.page	Int	Page number	1
pagination.limit	Int	Items per page (max 100)	10
filter.category	String	Filter by category	-
filter.brand	String	Filter by brand	-
filter.minPrice	Float	Minimum price	-
filter.maxPrice	Float	Maximum price	-
filter.minRating	Int	Minimum rating (0-5)	-
filter.search	String	Search in product name	-
sort.field	String	Field to sort by	createdAt
sort.order	String	ASC or DESC	DESC


