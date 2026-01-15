import { getCart } from '@/src/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const cartId = searchParams.get('cartId');

        if (!cartId) {
            return NextResponse.json(
                { error: 'Missing cartId' },
                { status: 400 }
            );
        }

        const cart = await getCart(cartId);
        
        if (!cart) {
            return NextResponse.json(
                { error: 'Cart not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error getting cart:', error);
        return NextResponse.json(
            { error: 'Failed to get cart' },
            { status: 500 }
        );
    }
}
