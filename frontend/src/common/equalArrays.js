import diffArrays from "./diffArrays";

export default function equal(target, external) {
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