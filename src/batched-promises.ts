async function batchedPromises<PromiseResolveType = any>(promises: Promise<PromiseResolveType>[], promiseBatchSize: number) {
  const responses: PromiseSettledResult<PromiseResolveType>[] = [];
  let batchedPromises: Promise<PromiseResolveType>[] = []
    for (let i = 0; i < promises.length; i++) {
      batchedPromises.push(promises[i]);
      if (i%promiseBatchSize === 0 || i === promises.length - 1) {
        responses.push(...await Promise.allSettled(batchedPromises))
        batchedPromises = [];
      }
    }
    return responses;
}
