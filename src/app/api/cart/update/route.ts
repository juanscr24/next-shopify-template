import { updateCart } from '@/src/lib/shopify';
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

        const cart = await updateCart(cartId, lines);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        return NextResponse.json(
            { error: 'Failed to update cart' },
            { status: 500 }
        );
    }
}
