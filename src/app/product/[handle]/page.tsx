
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '@/src/components/product/product-card';
import AddToCartButton from '@/src/components/product/add-to-cart-button';
import { formatPrice } from '@/src/lib/utils';
import { getProduct, getProducts } from '@/src/lib/shopify';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getProducts(); // In a real app, you'd fetch related products

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                {/* Image Gallery */}
                <div className="flex flex-col-reverse">
                    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                        <div className="grid grid-cols-4 gap-6">
                            {(product.images as any[]).slice(0, 4).map((image, index) => (
                                <div
                                    key={index}
                                    className="relative h-24 cursor-pointer overflow-hidden rounded-md bg-neutral-100 hover:opacity-75"
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.altText || product.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative w-full max-h-[600px] aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                        {product.featuredImage && (
                            <Image
                                src={product.featuredImage.url}
                                alt={product.featuredImage.altText || product.title}
                                fill
                                className="object-contain p-4"
                                priority
                            />
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{product.title}</h1>
                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-neutral-900">
                                {formatPrice(
                                    product.priceRange.minVariantPrice.amount,
                                    product.priceRange.minVariantPrice.currencyCode
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>
                        <div
                            className="space-y-6 text-base text-neutral-700"
                            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                        />
                    </div>

                    <div className="mt-10">
                        {/* Variant Selector (Simplified for now) */}
                        {product.options.map((option) => (
                            <div key={option.id} className="mt-6">
                                <h3 className="text-sm font-medium text-neutral-900">{option.name}</h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {option.values.map((value) => (
                                        <button
                                            key={value}
                                            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="mt-10">
                            <AddToCartButton
                                variants={product.variants as any}
                                availableForSale={product.availableForSale}
                            />
                        </div>
                    </div>

                    {/* Features */}
                    <section className="mt-10 border-t border-neutral-200 pt-10">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <Truck className="h-5 w-5 text-neutral-400" />
                                <span className="text-sm text-neutral-600">Free shipping on orders over $100</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <RotateCcw className="h-5 w-5 text-neutral-400" />
                                <span className="text-sm text-neutral-600">30-day easy returns</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-neutral-400" />
                                <span className="text-sm text-neutral-600">Secure checkout guaranteed</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Related Products */}
            <section className="mt-24">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">You might also like</h2>
                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    {relatedProducts.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}
