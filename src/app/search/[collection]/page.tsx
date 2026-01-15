import ProductCard from '@/src/components/product/product-card';
import { getCollection, getCollectionProducts } from '@/src/lib/shopify';

export default async function CollectionPage({
    params,
    searchParams
}: {
    params: Promise<{ collection: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { collection: collectionHandle } = await params;
    const collection = await getCollection(collectionHandle);

    // If collection is 'all' or not found, we might want to show all products
    // For this template, we'll just fetch products for the collection
    const products = await getCollectionProducts({ collection: collectionHandle });

    if (!collection && collectionHandle !== 'all') {
        // If it's not 'all' and not found, 404
        // But for a template, let's be more forgiving or handle 'all'
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        {collection?.title || 'All Products'}
                    </h1>
                    {collection?.description && (
                        <p className="mt-4 max-w-2xl text-base text-neutral-500">
                            {collection.description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center">
                            <p className="text-lg text-neutral-500">No products found in this collection.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
