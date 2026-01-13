import ProductCard from "@/src/components/product/product-card";
import { getProducts } from "@/src/lib/shopify";

export default async function SearchPage() {
    const products = await getProducts();

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">All Products</h1>
                    <p className="mt-4 max-w-2xl text-base text-neutral-500">
                        Browse our entire collection of premium goods.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
