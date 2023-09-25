import memoizeArrFind from './memoize-arr-find';

const memoizedArrFind = memoizeArrFind([{id: 3}, {id: 4}, { id: 7 }]);
const item1 =  memoizedArrFind('id', 3);
const item2 =  memoizedArrFind('id', 3);
const item3 =  memoizedArrFind('id', 3);
const item4 =  memoizedArrFind('id', 9);
const item5 =  memoizedArrFind('id', 7);
const item6 =  memoizedArrFind('id', 3);
