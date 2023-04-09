export default function ceilOffTo2Decimals(number: number): number {
    return Math.ceil(number * 100) / 100;
}