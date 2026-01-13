export type Maybe<T> = T | null;

export type Connection<T> = {
    edges: Array<Edge<T>>;
};

export type Edge<T> = {
    node: T;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type Product = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: {
        maxVariantPrice: Money;
        minVariantPrice: Money;
    };
    variants: Connection<ProductVariant> | ProductVariant[];
    featuredImage: Image;
    images: Connection<Image> | Image[];
    seo: SEO;
    tags: string[];
    updatedAt: string;
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: Money;
};

export type SEO = {
    title: string;
    description: string;
};

export type Collection = {
    handle: string;
    title: string;
    description: string;
    seo: SEO;
    updatedAt: string;
    path: string;
};

export type Cart = {
    id: string;
    checkoutUrl: string;
    cost: {
        subtotalAmount: Money;
        totalAmount: Money;
        totalTaxAmount: Money;
    };
    lines: Connection<CartItem> | CartItem[];
    totalQuantity: number;
};

export type CartItem = {
    id: string;
    quantity: number;
    cost: {
        totalAmount: Money;
    };
    merchandise: {
        id: string;
        title: string;
        selectedOptions: {
            name: string;
            value: string;
        }[];
        product: Product;
    };
};

export type ShopifyProductOperation = {
    data: {
        product: Product;
    };
    variables: {
        handle: string;
    };
};

export type ShopifyProductsOperation = {
    data: {
        products: Connection<Product>;
    };
    variables: {
        query?: string;
        reverse?: boolean;
        sortKey?: string;
    };
};

export type ShopifyCollectionOperation = {
    data: {
        collection: Collection;
    };
    variables: {
        handle: string;
    };
};

export type ShopifyCollectionProductsOperation = {
    data: {
        collection: {
            products: Connection<Product>;
        };
    };
    variables: {
        handle: string;
        reverse?: boolean;
        sortKey?: string;
    };
};

export type ShopifyCollectionsOperation = {
    data: {
        collections: Connection<Collection>;
    };
};

export type ShopifyCartOperation = {
    data: {
        cart: Cart;
    };
    variables: {
        cartId: string;
    };
};

export type ShopifyCreateCartOperation = {
    data: {
        cartCreate: {
            cart: Cart;
        };
    };
    variables: {
        lineItems?: {
            merchandiseId: string;
            quantity: number;
        }[];
    };
};

export type ShopifyAddToCartOperation = {
    data: {
        cartLinesAdd: {
            cart: Cart;
        };
    };
    variables: {
        cartId: string;
        lines: {
            merchandiseId: string;
            quantity: number;
        }[];
    };
};

export type ShopifyRemoveFromCartOperation = {
    data: {
        cartLinesRemove: {
            cart: Cart;
        };
    };
    variables: {
        cartId: string;
        lineIds: string[];
    };
};

export type ShopifyUpdateCartOperation = {
    data: {
        cartLinesUpdate: {
            cart: Cart;
        };
    };
    variables: {
        cartId: string;
        lines: {
            id: string;
            merchandiseId: string;
            quantity: number;
        }[];
    };
};
