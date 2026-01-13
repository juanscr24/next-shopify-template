export default function ProductSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-square rounded-2xl bg-neutral-100" />
            <div className="mt-4 flex justify-between">
                <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-neutral-100" />
                    <div className="h-4 w-20 rounded bg-neutral-100" />
                </div>
                <div className="h-4 w-16 rounded bg-neutral-100" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}
