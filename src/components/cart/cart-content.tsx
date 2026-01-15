'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/src/lib/utils';

type CartLine = {
    id: string;
    quantity: number;
    cost: {
        totalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    merchandise: {
        id: string;
        title: string;
        product: {
            id: string;
            title: string;
            handle: string;
            featuredImage: {
                url: string;
                altText: string;
            };
        };
    };
};

type Cart = {
    id: string;
    checkoutUrl: string;
    lines: CartLine[];
    cost: {
        subtotalAmount: {
            amount: string;
            currencyCode: string;
        };
        totalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    totalQuantity: number;
};

export default function CartContent() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    const loadCart = async () => {
        const cartId = localStorage.getItem('shopify_cart_id');
        
        if (!cartId) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/cart?cartId=${cartId}`);
            if (response.ok) {
                const { cart } = await response.json();
                setCart(cart);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();

        // Listen for cart updates
        const handleCartUpdate = () => loadCart();
        window.addEventListener('cart-updated', handleCartUpdate);
        
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const updateQuantity = async (lineId: string, quantity: number) => {
        if (!cart || quantity < 0) return;

        setUpdating(lineId);

        try {
            if (quantity === 0) {
                // Remove item
                await removeItem(lineId);
                return;
            }

            const response = await fetch('/api/cart/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartId: cart.id,
                    lines: [{
                        id: lineId,
                        quantity
                    }]
                })
            });

            if (response.ok) {
                await loadCart();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setUpdating(null);
        }
    };

    const removeItem = async (lineId: string) => {
        if (!cart) return;

        setUpdating(lineId);

        try {
            const response = await fetch('/api/cart/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartId: cart.id,
                    lineIds: [lineId]
                })
            });

            if (response.ok) {
                await loadCart();
            }
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setUpdating(null);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <div className="text-neutral-600">Loading cart...</div>
                </div>
            </div>
        );
    }

    if (!cart || cart.lines.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-neutral-100 p-6">
                        <ShoppingBag className="h-12 w-12 text-neutral-400" />
                    </div>
                    <h1 className="mt-6 text-2xl font-bold text-neutral-900">Your cart is empty</h1>
                    <p className="mt-2 text-neutral-500">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        href="/"
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
                        {cart.lines.map((line) => (
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
                                                <button 
                                                    onClick={() => updateQuantity(line.id, line.quantity - 1)}
                                                    disabled={updating === line.id}
                                                    className="text-neutral-500 hover:text-neutral-900 disabled:opacity-50"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{line.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(line.id, line.quantity + 1)}
                                                    disabled={updating === line.id}
                                                    className="text-neutral-500 hover:text-neutral-900 disabled:opacity-50"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="absolute right-0 top-0">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(line.id)}
                                                    disabled={updating === line.id}
                                                    className="-m-2 inline-flex p-2 text-neutral-400 hover:text-neutral-500 disabled:opacity-50"
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
                                {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                            <p className="text-sm text-neutral-600">Shipping</p>
                            <p className="text-sm font-medium text-neutral-900">Calculated at checkout</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                            <p className="text-base font-medium text-neutral-900">Order total</p>
                            <p className="text-base font-medium text-neutral-900">
                                {formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <a
                            href={cart.checkoutUrl}
                            className="flex w-full items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-base font-medium text-white hover:bg-neutral-800 transition-colors"
                        >
                            Proceed to Checkout
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                            Continue Shopping
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
