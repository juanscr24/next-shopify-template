import { isShopifyError } from '../type-guards';
import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '../constants';
import {
    Product,
    Connection,
    ShopifyProductsOperation,
    ShopifyProductOperation,
    Collection,
    ShopifyCollectionsOperation,
    ShopifyCollectionOperation,
    ShopifyCollectionProductsOperation,
    Cart,
    ShopifyCreateCartOperation,
    ShopifyAddToCartOperation,
    ShopifyRemoveFromCartOperation,
    ShopifyUpdateCartOperation,
    ShopifyCartOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? (process.env.SHOPIFY_STORE_DOMAIN.startsWith('http')
        ? process.env.SHOPIFY_STORE_DOMAIN
        : `https://${process.env.SHOPIFY_STORE_DOMAIN}`)
    : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
    cache = 'force-cache',
    query,
    tags,
    variables
}: {
    cache?: RequestCache;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key!,
                ...((tags) && { 'X-Shopify-Cache-Tags': tags.join(',') })
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
            ...(tags && { next: { tags } })
        });

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body
        };
    } catch (e) {
        if (isShopifyError(e)) {
            throw {
                cause: e.cause?.toString() || 'unknown',
                status: e.status || 500,
                message: e.message,
                query
            };
        }

        throw {
            error: e,
            query
        };
    }
}

export async function getProducts({
    query,
    reverse,
    sortKey
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
} = {}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductsOperation>({
        query: getProductsQuery,
        variables: {
            query,
            reverse,
            sortKey
        }
    });

    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getProduct(handle: string): Promise<Product | undefined> {
    const res = await shopifyFetch<ShopifyProductOperation>({
        query: getProductQuery,
        variables: {
            handle
        }
    });

    return reshapeProduct(res.body.data.product);
}

export async function getCollections(): Promise<Collection[]> {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
        query: getCollectionsQuery,
        cache: 'force-cache'
    });

    return removeEdgesAndNodes(res.body.data.collections);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
    const res = await shopifyFetch<ShopifyCollectionOperation>({
        query: getCollectionQuery,
        variables: {
            handle
        }
    });

    return res.body.data.collection;
}

export async function getCollectionProducts({
    collection,
    reverse,
    sortKey
}: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
        query: getCollectionProductsQuery,
        variables: {
            handle: collection,
            reverse,
            sortKey
        }
    });

    if (!res.body.data.collection) {
        console.log(`No collection found for \`${collection}\``);
        return [];
    }

    return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

// Cart Operations
export async function createCart(): Promise<Cart> {
    const res = await shopifyFetch<ShopifyCreateCartOperation>({
        query: createCartMutation,
        cache: 'no-store'
    });

    return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyAddToCartOperation>({
        query: addToCartMutation,
        variables: {
            cartId,
            lines
        },
        cache: 'no-store'
    });

    return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
        query: removeFromCartMutation,
        variables: {
            cartId,
            lineIds
        },
        cache: 'no-store'
    });

    return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyUpdateCartOperation>({
        query: updateCartMutation,
        variables: {
            cartId,
            lines
        },
        cache: 'no-store'
    });

    return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
    const res = await shopifyFetch<ShopifyCartOperation>({
        query: getCartQuery,
        variables: { cartId },
        cache: 'no-store'
    });

    if (!res.body.data.cart) {
        return undefined;
    }

    return reshapeCart(res.body.data.cart);
}

// Helper functions to clean up Shopify's nested structure
export const removeEdgesAndNodes = (connection: Connection<any> | any[]) => {
    if (Array.isArray(connection)) {
        return connection;
    }
    return connection.edges.map((edge) => edge.node);
};

const reshapeCart = (cart: Cart): Cart => {
    if (!cart.cost?.totalTaxAmount) {
        cart.cost.totalTaxAmount = {
            amount: '0.0',
            currencyCode: 'USD'
        };
    }

    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines)
    };
};

const reshapeProduct = (product: Product) => {
    if (!product) return undefined;

    const { images, variants, ...rest } = product;

    return {
        ...rest,
        images: removeEdgesAndNodes(images),
        variants: removeEdgesAndNodes(variants)
    };
};

const reshapeProducts = (products: Product[]) => {
    const reshapedProducts = [];

    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product);

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }

    return reshapedProducts;
};

// GraphQL Queries
const getCollectionsQuery = `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          handle
          title
          description
          seo {
            title
            description
          }
          updatedAt
        }
      }
    }
  }
`;

const getCollectionQuery = `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      handle
      title
      description
      seo {
        title
        description
      }
      updatedAt
    }
  }
`;

const getCollectionProductsQuery = `
  query getCollectionProducts($handle: String!, $reverse: Boolean, $sortKey: String) {
    collection(handle: $handle) {
      products(first: 100, reverse: $reverse, sortKey: $sortKey) {
        edges {
          node {
            id
            handle
            availableForSale
            title
            description
            descriptionHtml
            options {
              id
              name
              values
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
            images(first: 20) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            seo {
              title
              description
            }
            tags
            updatedAt
          }
        }
      }
    }
  }
`;

const getProductsQuery = `
  query getProducts($query: String, $reverse: Boolean, $sortKey: String) {
    products(first: 100, query: $query, reverse: $reverse, sortKey: $sortKey) {
      edges {
        node {
          id
          handle
          availableForSale
          title
          description
          descriptionHtml
          options {
            id
            name
            values
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                availableForSale
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 20) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          seo {
            title
            description
          }
          tags
          updatedAt
        }
      }
    }
  }
`;

const getProductQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      availableForSale
      title
      description
      descriptionHtml
      options {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 20) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      seo {
        title
        description
      }
      tags
      updatedAt
    }
  }
`;

const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  handle
                  title
                  featuredImage {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
      totalQuantity
    }
  }
`;

const createCartMutation = `
  mutation createCart($lineItems: [CartLineInput]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    handle
                    title
                    featuredImage {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
      }
    }
  }
`;

const addToCartMutation = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    handle
                    title
                    featuredImage {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
      }
    }
  }
`;

const removeFromCartMutation = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    handle
                    title
                    featuredImage {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
      }
    }
  }
`;

const updateCartMutation = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    handle
                    title
                    featuredImage {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
      }
    }
  }
`;
