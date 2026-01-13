import { ProductGridSkeleton } from "../components/loading-skeleton";


export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-16">
                <div className="h-[60vh] w-full animate-pulse rounded-3xl bg-neutral-100" />
                <div>
                    <div className="h-8 w-48 animate-pulse rounded bg-neutral-100" />
                    <div className="mt-10">
                        <ProductGridSkeleton />
                    </div>
                </div>
            </div>
        </div>
    );
}
