import { addToCart } from '@/src/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { cartId, lines } = await request.json();

        if (!cartId || !lines) {
            return NextResponse.json(
                { error: 'Missing cartId or lines' },
                { status: 400 }
            );
        }

        const cart = await addToCart(cartId, lines);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json(
            { error: 'Failed to add to cart' },
            { status: 500 }
        );
    }
}
