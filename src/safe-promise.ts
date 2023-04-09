export type SafePromise<Result, E> = [E] | [null, Result];

export default async function safePromise<Result, E = Error>(
  promise: Promise<Result> | Result
): Promise<SafePromise<Result, E>> {
  try {
    const result: Result = await promise;
    return [null, result];
  } catch (error) {
    return [error as E];
  }
}
