import { createCart } from '@/src/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const cart = await createCart();
        return NextResponse.json({ cart });
    } catch (error: any) {
        console.error('Error creating cart:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return NextResponse.json(
            { error: 'Failed to create cart', details: error.message || error },
            { status: 500 }
        );
    }
}
