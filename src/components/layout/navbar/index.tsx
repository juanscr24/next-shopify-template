import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { getCollections } from '@/src/lib/shopify';

export default async function Navbar() {
    const collections = await getCollections();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter text-neutral-900">
                        STORE
                    </Link>
                    <div className="hidden md:flex md:gap-6">
                        {collections.slice(0, 3).map((collection) => (
                            <Link
                                key={collection.handle}
                                href={`/search/${collection.handle}`}
                                className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                            >
                                {collection.title}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900">
                        <Search className="h-5 w-5" />
                    </button>
                    <Link
                        href="/cart"
                        className="group relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-medium text-white transition-transform group-hover:scale-110">
                            0
                        </span>
                    </Link>
                    <button className="md:hidden rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
