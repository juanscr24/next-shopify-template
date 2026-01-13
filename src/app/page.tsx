
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getProducts } from '../lib/shopify';
import ProductCard from '../components/product/product-card';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">
            Modern Essentials
          </h1>
          <p className="mt-6 max-w-lg text-lg text-neutral-600">
            Curated collection of premium goods designed for the modern lifestyle.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/search"
              className="rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              Shop All
            </Link>
            <Link
              href="/search/featured"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 transition-transform hover:scale-105 active:scale-95"
            >
              Featured
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Featured Products</h2>
            <p className="mt-2 text-sm text-neutral-500">Our latest arrivals and best sellers.</p>
          </div>
          <Link
            href="/search"
            className="group flex items-center gap-1 text-sm font-semibold text-neutral-900 hover:underline underline-offset-4"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections Grid */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Shop by Collection</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Accessories', handle: 'accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop' },
              { title: 'Apparel', handle: 'apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop' },
              { title: 'Home', handle: 'home', image: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=1000&auto=format&fit=crop' }
            ].map((collection) => (
              <Link
                key={collection.handle}
                href={`/search/${collection.handle}`}
                className="group relative aspect-video overflow-hidden rounded-2xl bg-neutral-200"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{collection.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
