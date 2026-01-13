export interface ShopifyErrorLike {
    status: number;
    message: string;
    cause?: Error;
}

export const isObject = (object: unknown): object is Record<string, unknown> => {
    return typeof object === 'object' && object !== null && !Array.isArray(object);
};

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
    if (!isObject(error)) return false;

    if (error instanceof Error) return true;

    return 'status' in error && 'message' in error;
};
