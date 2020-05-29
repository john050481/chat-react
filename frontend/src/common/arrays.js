/*
let arr1 = [1,2,3,4]
let arr2 = [1,3]
console.log(diff(arr1, arr2)) // В "arr1" ОТСУТСТВУЮТ [ 2, 4 ]

arr1 = [4,3,2,1]
arr2 = [3,1]
console.log(diff(arr1, arr2)) // [ 2, 4 ]

arr1 = [1,3,2,4]
arr2 = [3,1]
console.log(diff(arr1, arr2)) // [ 2, 4 ]

arr1 = [2,1,4,3]
arr2 = [1,3,6]
console.log(diff(arr1, arr2)) // [ 2, 4 ]
console.log(diff(arr2, arr1)) // [ 6 ]

arr1 = [2,1,4,3,5]
arr2 = [1,3,6,9]
console.log(diff(arr1, arr2)) // [ 2, 4, 5 ]
console.log(diff(arr2, arr1)) // [ 6, 9 ]
*/
export function diffArrays(target, external) {
    return target.filter( i => external.indexOf(i) < 0 );
};

export function equalArrays(target, external) {
    if (!Array.isArray(target) || !Array.isArray(external))
        return false

    if (target.length !== external.length)
        return false

    const diff1 = diffArrays(target, external);
    if (diff1.length)
        return false

    const diff2 = diffArrays(external, target);
    if (diff2.length)
        return false

    return true
}