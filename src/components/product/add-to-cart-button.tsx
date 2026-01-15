'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

type Variant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: {
        amount: string;
        currencyCode: string;
    };
};

type AddToCartButtonProps = {
    variants: Variant[];
    availableForSale: boolean;
};

export default function AddToCartButton({ variants, availableForSale }: AddToCartButtonProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState('');

    const handleAddToCart = async () => {
        if (!availableForSale) return;

        setIsAdding(true);
        setMessage('');

        try {
            // Get the first available variant
            const variant = variants.find(v => v.availableForSale) || variants[0];

            if (!variant) {
                setMessage('No variant available');
                return;
            }

            // Get or create cart
            let cartId: string | null = localStorage.getItem('shopify_cart_id');

            if (!cartId) {
                // Create new cart
                const createResponse = await fetch('/api/cart/create', {
                    method: 'POST',
                });

                if (!createResponse.ok) {
                    const errorData = await createResponse.json();
                    console.error('Create cart error:', errorData);
                    throw new Error(errorData.details || 'Failed to create cart');
                }

                const { cart } = await createResponse.json();
                cartId = cart.id;
                if (cartId) {
                    localStorage.setItem('shopify_cart_id', cartId);
                }
            }

            // Add item to cart
            const addResponse = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId,
                    lines: [
                        {
                            merchandiseId: variant.id,
                            quantity: 1,
                        },
                    ],
                }),
            });

            if (!addResponse.ok) {
                throw new Error('Failed to add to cart');
            }

            setMessage('✓ Added to cart!');
            
            // Trigger a custom event to update cart count
            window.dispatchEvent(new CustomEvent('cart-updated'));

            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setMessage('Failed to add to cart');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleAddToCart}
                disabled={!availableForSale || isAdding}
                className="flex flex-1 w-full items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-base font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
            >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isAdding ? 'Adding...' : availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </button>
            {message && (
                <p className={`mt-2 text-sm text-center ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
