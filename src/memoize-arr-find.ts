export default function memoizeArrFind<CacheValueType = any, ObjValType = any>(arr: Record<string, ObjValType>[], existingCache = {} as Record<string, CacheValueType>) {
	const cache = existingCache;
	return function find(objKey: string, objValue: any) {
		if ((objValue as string) in cache) {
			console.log(`key ${objValue} cache return`);
			return cache[objValue];
		}

		const item = arr.find(item => item[objKey] === objValue) as CacheValueType
		if (!item) {
			console.log(`key ${objValue} 404`);
			return null;
		}

		cache[objValue as string] = item;

		console.log(`key ${objValue} cached`);
		return item;
	}
}
