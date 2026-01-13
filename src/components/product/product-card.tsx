import { Product } from '@/src/lib/shopify/types';
import { formatPrice } from '@/src/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
    const { amount, currencyCode } = product.priceRange.minVariantPrice;

    return (
        <Link href={`/product/${product.handle}`} className="group block">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                {product.featuredImage && (
                    <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                )}
                {!product.availableForSale && (
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-900 backdrop-blur-md">
                        Sold Out
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-medium text-neutral-900 group-hover:underline decoration-neutral-300 underline-offset-4">
                        {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">{product.tags[0]}</p>
                </div>
                <p className="text-sm font-semibold text-neutral-900">
                    {formatPrice(amount, currencyCode)}
                </p>
            </div>
        </Link>
    );
}
