import { removeFromCart } from '@/src/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { cartId, lineIds } = await request.json();

        if (!cartId || !lineIds) {
            return NextResponse.json(
                { error: 'Missing cartId or lineIds' },
                { status: 400 }
            );
        }

        const cart = await removeFromCart(cartId, lineIds);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        return NextResponse.json(
            { error: 'Failed to remove from cart' },
            { status: 500 }
        );
    }
}
