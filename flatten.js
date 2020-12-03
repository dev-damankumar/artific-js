const flatten = (obj, prefix = '', res = {}) => {
            var level=0
            var f= Object.entries(obj).reduce((r, [key, val]) => {

                const k = `${prefix}${key}`

                if (typeof val === 'object') {
                    flatten(val, `${k}.`, r)
                } else {
                    res[k] = val
                }
                level++
                
                return r
            }, res)
           return {f,level}
        }
