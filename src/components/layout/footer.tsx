import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-200 bg-neutral-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold tracking-tighter text-neutral-900">
                            STORE
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-neutral-500">
                            Modern, minimalist ecommerce template powered by Next.js and Shopify.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">Shop</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/search" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/search/featured" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Featured
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/about" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-neutral-400">
                        &copy; {currentYear} Store Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-xs text-neutral-400">Powered by Shopify</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
