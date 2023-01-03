const flatten=(obj, prefix='', res={}) => {
    let level=0;
    const f=Object.entries(obj).reduce((r, [key, val]) => {
        const k=`${prefix}${key}`
        if (typeof val==='object') {
            flatten(val, `${k}.`, r)
        } else {
            res[k]=val
        }
        level++
        return r
    }, res);
    return {f, level}
}
console.log(flatten([1,2,[3,4,[5,6]]],'@',[5]))