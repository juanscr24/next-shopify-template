import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/src/lib/utils';


// Mock cart data for the template
const mockCart = {
    lines: [
        {
            id: '1',
            quantity: 1,
            cost: { totalAmount: { amount: '45.00', currencyCode: 'USD' } },
            merchandise: {
                id: 'm1',
                title: 'Small / Black',
                product: {
                    title: 'Premium Cotton Tee',
                    handle: 'premium-cotton-tee',
                    featuredImage: {
                        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
                        altText: 'Premium Cotton Tee'
                    }
                }
            }
        }
    ],
    cost: {
        subtotalAmount: { amount: '45.00', currencyCode: 'USD' },
        totalAmount: { amount: '45.00', currencyCode: 'USD' }
    }
};

export default function CartPage() {
    const isEmpty = false; // Toggle this to see empty state

    if (isEmpty) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-neutral-100 p-6">
                        <ShoppingBag className="h-12 w-12 text-neutral-400" />
                    </div>
                    <h1 className="mt-6 text-2xl font-bold text-neutral-900">Your cart is empty</h1>
                    <p className="mt-2 text-neutral-500">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        href="/search"
                        className="mt-8 rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-105"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Shopping Cart</h1>

            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
                <section className="lg:col-span-7">
                    <ul className="divide-y divide-neutral-200 border-b border-t border-neutral-200">
                        {mockCart.lines.map((line) => (
                            <li key={line.id} className="flex py-6 sm:py-10">
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100 sm:h-32 sm:w-32">
                                    <Image
                                        src={line.merchandise.product.featuredImage.url}
                                        alt={line.merchandise.product.featuredImage.altText}
                                        width={128}
                                        height={128}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                        <div>
                                            <div className="flex justify-between">
                                                <h3 className="text-sm">
                                                    <Link
                                                        href={`/product/${line.merchandise.product.handle}`}
                                                        className="font-medium text-neutral-700 hover:text-neutral-800"
                                                    >
                                                        {line.merchandise.product.title}
                                                    </Link>
                                                </h3>
                                            </div>
                                            <p className="mt-1 text-sm text-neutral-500">{line.merchandise.title}</p>
                                            <p className="mt-1 text-sm font-medium text-neutral-900">
                                                {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                                            </p>
                                        </div>

                                        <div className="mt-4 sm:mt-0 sm:pr-9">
                                            <div className="flex items-center gap-3 rounded-full border border-neutral-200 px-3 py-1 w-fit">
                                                <button className="text-neutral-500 hover:text-neutral-900">
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{line.quantity}</span>
                                                <button className="text-neutral-500 hover:text-neutral-900">
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="absolute right-0 top-0">
                                                <button
                                                    type="button"
                                                    className="-m-2 inline-flex p-2 text-neutral-400 hover:text-neutral-500"
                                                >
                                                    <span className="sr-only">Remove</span>
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Order Summary */}
                <section className="mt-16 rounded-2xl bg-neutral-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                    <h2 className="text-lg font-medium text-neutral-900">Order summary</h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-neutral-600">Subtotal</p>
                            <p className="text-sm font-medium text-neutral-900">
                                {formatPrice(mockCart.cost.subtotalAmount.amount, mockCart.cost.subtotalAmount.currencyCode)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                            <p className="text-sm text-neutral-600">Shipping</p>
                            <p className="text-sm font-medium text-neutral-900">Calculated at checkout</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                            <p className="text-base font-medium text-neutral-900">Order total</p>
                            <p className="text-base font-medium text-neutral-900">
                                {formatPrice(mockCart.cost.totalAmount.amount, mockCart.cost.totalAmount.currencyCode)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-base font-medium text-white hover:bg-neutral-800 transition-colors"
                        >
                            Checkout
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-neutral-500">
                            or{' '}
                            <Link href="/search" className="font-medium text-neutral-900 hover:underline">
                                Continue Shopping
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
