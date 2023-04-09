export default function sleep<T = any>(ms: number): Promise<T> {
    return new Promise(resolve => setTimeout(resolve, ms));
};