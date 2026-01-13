# Modern Shopify Storefront Template

A production-ready, high-performance ecommerce frontend built with Next.js 14+, Tailwind CSS, and Shopify Storefront API.

## Features

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Backend**: Shopify Storefront API (GraphQL)
- **Performance**: Server Components by default, optimized images, and minimalist bundle.
- **Design**: Clean, modern, and mobile-first responsive UI.

## Getting Started

### 1. Prerequisites

- A Shopify store.
- A Storefront Access Token (created in Shopify Admin > Apps and sales channels > Develop apps).

### 2. Environment Variables

Create a `.env.local` file in the root directory and add your Shopify credentials:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-access-token
```

### 3. Installation

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (Navbar, Footer, ProductCard, etc.).
- `src/lib/shopify`: Shopify API client, GraphQL queries, and types.
- `src/lib/utils.ts`: Utility functions (formatting, class merging).

## Customization

- **Design**: Modify `src/app/globals.css` and Tailwind config for global styles.
- **Queries**: Update `src/lib/shopify/index.ts` to add or modify GraphQL queries.
- **Components**: All components are located in `src/components`.

## License

MIT
```
