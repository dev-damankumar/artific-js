var DOM = {
    isElement: function (obj) {
        try {
            return obj instanceof HTMLElement;
        } catch (e) {
            return (typeof obj === "object") && (obj.nodeType === 1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument === "object");
        }
    },
    getHTML: function (str) {
        var div = document.createElement("div");
        div.innerHTML = str;
        return div.firstChild
    },
	importAttributes:function (el) {
		var div=document.createElement("div");
		var html=""
		div.append(el.cloneNode(true))
		html=div.innerHTML
		html=html.split(/^\<\w*\s|\w\>/gm)[1]
		return html
	},
    getString: function (node) {
        var div = document.createElement("div");
        div.appendChild(node)
        return div.innerHTML
    },
    getStyle: function (el, prop) {
        var element = el;
        if (element === undefined || element.length <= 0) {
            return console.error("No HTML Element Found")
        }
        var arr = new Map();
        if (element.length == undefined) {
            getProp(element)
        } else {
            [].slice.call(element).forEach(v => {
                getProp(v)
            })
        }

        function getProp(el) {
            var style = window.getComputedStyle(el, null).getPropertyValue(prop);
            if (element.length == undefined) {
                console.log(el)
                arr = style
            } else {
                arr.set(el, style)
            }
        }

        return arr
    },
    setAttributes: function (el, obj) {
        let element = el;
        if (element === undefined || element.length <= 0) {
            return console.error("No HTML Element Found")
        }
        console.log(element)
        if (element.length == undefined) {
            setAttr(element)
        } else {
            [].slice.call(element).forEach(v => {
                setAttr(v)
            })
        }

        function setAttr(el) {
            var attributes = obj
            for (let attrKeys of Object.keys(attributes)) {
                if (attrKeys == "class") {
                    classArr = attributes[attrKeys].trim().split(" ")
                    for (var i = 0; i < classArr.length; i++) {
                        if (classArr[i] !== "") {
                            el.classList.add(classArr[i].trim())
                        }
                    }
                } else {
                    el.setAttribute(`${attrKeys}`, `${attributes[attrKeys]}`)
                }
            }
        }
    },
    createElement: function (name, el, mergeAt = "beforeend", innerhtml = "", attributes = "") {
        let source = el;
        if (source === undefined || source.length <= 0) {
            return console.error("No HTML Element Found")
        }
        let crateElm = (sourceEl) => {
            var element = document.createElement(name);
            if (attributes !== "") {
                if (typeof (attributes) === "object") {
                    this.setAttributes(element, attributes)
                }
            }

            if (typeof innerhtml === "string") {
                element.innerHTML = innerhtml
            } else if (this.isElement(innerhtml)) {
                element.appendChild(innerhtml)
            }

            if (mergeAt === "beforeend" || mergeAt === null) {
                sourceEl.insertAdjacentElement("beforeend", element)
            } else if (mergeAt === "afterend") {
                sourceEl.insertAdjacentElement("afterend", element)
            } else if (mergeAt === "afterbegin") {
                sourceEl.insertAdjacentElement("afterbegin", element)
            } else if (mergeAt === "beforebegin") {
                sourceEl.insertAdjacentElement("beforebegin", element)
            } else {
                console.error("Invalid mergeAt Value You must enter 'beforeend' | 'afterend' | 'afterbegin' | 'beforebegin'")
            }
        }
        if (source.length == undefined) {
            crateElm(source)
        } else {
            [].slice.call(source).forEach(v => {
                crateElm(v)
            })
        }
    },
    hasStyle: function (el, prop) {
        var element = el
        if (element === undefined || element.length <= 0) {
            return console.error("No HTML Element Found")
        }

        var arr = new Map();
        if (element.length == undefined) {
            getProp(element)
        } else {
            [].slice.call(element).forEach(v => {
                getProp(v)
            })
        }

        function getProp(el) {
            var style = el.style
            if (style) {
                if (element.length == undefined) {
                    if (style[prop] === "") {
                        arr = false
                    } else {
                        arr = true
                    }
                } else {
                    console.log(style[prop])
                    if (style[prop] === "") {
                        arr.set(el, false)
                    } else {
                        arr.set(el, true)
                    }
                }
            }
        }

        return arr

    },
    importStyle: function (el, asArray = false) {
        var element = el
        if (element === undefined || element.length <= 0) {
            return console.error("No HTML Element Found")
        }
        var array;
        if (asArray === true) {
            array = []
        } else {
            array = new Map()
        }

        var obj = {};
        var o = {};
        if (element.length == undefined) {
            getStyle(element)
        } else {
            [].slice.call(element).forEach(v => {
                getStyle(v)
            })
        }

        function getStyle(el) {
            var style = el.getAttribute("style")
            if (style) {
                var rule = style.split(";")
                obj = {}
                rule.forEach(v => {
                    let arr = v.trim().split(":");
                    obj[arr[0].trim()] = arr[1].trim()
                })

                if (element.length == undefined) {
                    console.log("in")
                    obj = obj;
                } else {
                    if (asArray === true) {
                        array.push(obj)
                    } else {
                        array.set(el, obj)
                    }
                }
            }
        }

        if (array.length <= 0 || array.size <= 0) {

            return obj
        } else {
            return array
        }
    },
    importClass: function (el, asArray = false) {
        var element = el;
        if (element === undefined || element.length <= 0) {
            return console.error("No HTML Element Found")
        }
        var array;
        if (asArray === true) {
            array = []
        } else {
            array = new Map()
        }
        if (element.length == undefined) {
            getStyle(element)
        } else {
            [].slice.call(element).forEach(v => {
                getStyle(v)
            })
        }

        function getStyle(el) {
            var classes = el.getAttribute("class")
            console.log(classes)
            if (classes) {
                var rule = classes.split(" ")
                if (element.length == undefined) {
                    array = rule;
                } else {
                    if (asArray === true) {

                        array.push(rule)
                    } else {
                        array.set(el, rule)
                    }
                }
            }

        }

        return array
    },
    error: function (message, subMessage = null) {
        let style = this.createElement("style", document.querySelector("head"), "beforeend", `
            .DOM-success-div{background:#dfd;padding:15px 20px;position:fixed;top:15px;right:15px;opacity:1;color:green;z-index:9999999;max-width:250px;min-width:100px;padding-right:35px;text-transform:capitalize;border-radius:10px;-moz-box-shadow:5px 5px 16px -9px #0000006e;-webkit-box-shadow:5px 5px 16px -9px #0000006e;box-shadow:5px 5px 16px -9px #0000006e;animation:DOM-initial .5s ease}.DOM-error-div{background:#ffe2e0;padding:15px 20px;position:fixed;top:15px;right:15px;opacity:1;color:#f44336;z-index:9999999;max-width:250px;min-width:100px;padding-right:35px;text-transform:capitalize;border-radius:10px;-moz-box-shadow:5px 5px 16px -9px #0000006e;-webkit-box-shadow:5px 5px 16px -9px #0000006e;box-shadow:5px 5px 16px -9px #0000006e;animation:DOM-initial .5s ease}p.DOM-msg{margin:0!important;margin-top:15px!important;font-size:16px}.DOM-error-div span.DOM-close{position:absolute;top:5px;right:5px;text-transform:lowercase;background:#f44336;color:#fff;padding:0 2px 3px;line-height:1;display:flex;text-align:center;width:15px;height:15px;justify-content:center;align-items:center;cursor:pointer;border-radius:50px}.DOM-success-div span.DOM-close{position:absolute;top:5px;right:5px;text-transform:lowercase;background:green;color:#fff;padding:0 2px 3px;line-height:1;display:flex;text-align:center;width:15px;height:15px;justify-content:center;align-items:center;cursor:pointer;border-radius:50px}p.DOM-sub-heading{margin:0;font-size:13px;position:absolute;top:10px;left:20px}.DOM-div.DOM-remove{right:-500px;opacity:0;transition:all .5s ease}@keyframes DOM-initial{from{right:-500px;opacity:0}to{right:15px;opacity:1}}
            p.DOM-msg.DOM-no-sub-msg {margin-top: 0 !important;}
            `)
        let subMsg;
        if (message === "" || message.trim().length === 0) {
            return console.error("Must Provide Message")
        }
        if (subMessage) {
            subMsg = subMessage.trim();
        }
        let msg = message.trim();

        let div = this.createElement("div", document.querySelector("body"), "afterbegin", `
            <span class="DOM-close">&times;</span>
            ${subMsg ? '<p class="DOM-sub-heading">' + subMsg + '</p>' : ""}
            <p class="DOM-msg ${!subMsg ? 'DOM-no-sub-msg' : ''}">${msg}</p>
        `, {class: "DOM-div DOM-error-div"})

        var DOMClose = document.querySelector(".DOM-close");
        DOMClose.addEventListener("click", function () {
            this.closest(".DOM-div").classList.add("DOM-remove")
            setTimeout(() => {
                this.closest(".DOM-div").remove()
            }, 1000)
        })
    },
    success: function (message, subMessage = null) {
        let subMsg;
        if (message === "" || message.trim().length === 0) {
            return console.error("Must Provide Message")
        }
        if (subMessage) {
            subMsg = subMessage.trim();
        }
        let msg = message.trim();


        let style = this.createElement("style", document.querySelector("head"), "beforeend", `
            .DOM-success-div{background:#dfd;padding:15px 20px;position:fixed;top:15px;right:15px;opacity:1;color:green;z-index:9999999;max-width:250px;min-width:100px;padding-right:35px;text-transform:capitalize;border-radius:10px;-moz-box-shadow:5px 5px 16px -9px #0000006e;-webkit-box-shadow:5px 5px 16px -9px #0000006e;box-shadow:5px 5px 16px -9px #0000006e;animation:DOM-initial .5s ease}.DOM-error-div{background:#ffe2e0;padding:15px 20px;position:fixed;top:15px;right:15px;opacity:1;color:#f44336;z-index:9999999;max-width:250px;min-width:100px;padding-right:35px;text-transform:capitalize;border-radius:10px;-moz-box-shadow:5px 5px 16px -9px #0000006e;-webkit-box-shadow:5px 5px 16px -9px #0000006e;box-shadow:5px 5px 16px -9px #0000006e;animation:DOM-initial .5s ease}p.DOM-msg{margin:0!important;margin-top:15px!important;font-size:16px}.DOM-error-div span.DOM-close{position:absolute;top:5px;right:5px;text-transform:lowercase;background:#f44336;color:#fff;padding:0 2px 3px;line-height:1;display:flex;text-align:center;width:15px;height:15px;justify-content:center;align-items:center;cursor:pointer;border-radius:50px}.DOM-success-div span.DOM-close{position:absolute;top:5px;right:5px;text-transform:lowercase;background:green;color:#fff;padding:0 2px 3px;line-height:1;display:flex;text-align:center;width:15px;height:15px;justify-content:center;align-items:center;cursor:pointer;border-radius:50px}p.DOM-sub-heading{margin:0;font-size:13px;position:absolute;top:10px;left:20px}.DOM-div.DOM-remove{right:-500px;opacity:0;transition:all .5s ease}@keyframes DOM-initial{from{right:-500px;opacity:0}to{right:15px;opacity:1}}
            p.DOM-msg.DOM-no-sub-msg {margin-top: 0 !important;}
            `)
        let div = this.createElement("div", document.querySelector("body"), "afterbegin", `
            <span class="DOM-close">&times;</span>
            ${subMsg ? '<p class="DOM-sub-heading">' + subMsg + '</p>' : ""}
            <p class="DOM-msg ${!subMsg ? 'DOM-no-sub-msg' : ''}">${msg}</p>
        `, {class: "DOM-div DOM-success-div"})


        var DOMClose = document.querySelector(".DOM-close");
        DOMClose.addEventListener("click", function () {
            this.closest(".DOM-div").classList.add("DOM-remove")
            setTimeout(() => {
                this.closest(".DOM-div").remove()
            }, 1000)
        })
    },
    alertUI: function (message) {
        var divParent = document.createElement("div");
        let style = this.createElement("style", document.querySelector("head"), "beforeend",
            `
            .alert-parent{position:fixed;top:0;left:0;right:0;bottom:0;display:none;width:100%;height:100%;background:#7171717d;z-index:999999;user-select:none}.alert-parent .alertUi{position:relative;top:15px;left:50%;transform:translate(-50%,0);min-width:400px;width:100%;max-width:400px;height:auto;padding:15px;border-radius:5px;min-height:150px;background:#fff;box-shadow:0 4px 8px 0 rgba(0,0,0,.2)}.alert-parent .alertUi p{margin-top:0;font-size:17px;font-family:monospace}button.alert-btn{position:absolute;bottom:15px;right:15px;border:none;background:#9c27b0;color:#fff;padding:10px 20px;border-radius:5px;cursor:pointer}button.ok-btn{position:absolute;right:110px;border:none;background:#ff5722;padding:10px 20px;border-radius:5px;color:#fff;border:1px solid #ff5722;bottom:15px}button.cancel-btn{position:absolute;right:15px;border:none;background:#fff;padding:10px 20px;border-radius:5px;color:#ff5722;border:1px solid #ff5722;bottom:15px}@media screen and (max-width:600px){.alert-parent .alertUi{position:relative;top:50%;left:50%;transform:translate(-50%,-50%);min-width:90%;width:100%;max-width:90%;height:auto;padding:15px;border-radius:5px;min-height:150px;background:#fff;box-shadow:0 4px 8px 0 rgba(0,0,0,.2)}}
            `)
        divParent.className = "alert-parent";
        document.body.onload = function () {
            divParent.style.display = "block"
        }
        var alertUi = document.createElement("div");
        alertUi.className = "alertUi";
        alertUi.innerHTML = `<p>${location.host} Says</p> <p>${message}</p>`
        divParent.append(alertUi)
        var btn = document.createElement("button");
        btn.className = "alert-btn";
        btn.innerText = "OK"
        btn.onclick = function () {
            this.parentElement.parentElement.remove()
        }
        alertUi.append(btn)
        document.body.insertBefore(divParent, document.body.children[0])
    },
    defineClass: function (className, properties) {
        console.log(properties.constructor.name)
        if (typeof className === "string" && (typeof properties === "object" || properties.constructor.name === "Object")) {
            var dClass = (`${className}  ${JSON.stringify(properties).replace(/"/gm, "").replace(/,/gm, ";")}`)
            var styleTag = document.querySelector("[data-class]")
            if (styleTag && styleTag.tagName === "STYLE") {
                styleTag.innerHTML += dClass
            } else {
                var style = document.createElement("style");
                style.setAttribute("data-class", "true")
                style.innerHTML += dClass
                document.head.append(style)
            }
            return dClass
        } else {
            console.error("className must be of string type and properties must be an object")
        }

    },
    defineClasses: function (classArr) {
        if (Array.isArray(classArr) || classArr.constructor.name === "Array") {
            var classArray = []
            classArr.forEach(arr => {
                if (arr.length === 2) {
                    var className = arr[0]
                    var properties = arr[1]
                    var dClass = (`${className}  ${JSON.stringify(properties).replace(/"/gm, "").replace(/,/gm, ";")}`)
                    var styleTag = document.querySelector("[data-class]")

                    if (styleTag && styleTag.tagName === "STYLE") {
                        styleTag.innerHTML += dClass
                        classArray.push(dClass)
                    } else {
                        var style = document.createElement("style");
                        style.setAttribute("data-class", "true")
                        style.innerHTML += dClass
                        document.head.append(style)
                        classArray.push(dClass)
                    }
                } else {
                    console.error("nested array must have only two values")
                }

            })
            return classArray
        } else {
            console.error("argument must be an array")
        }

    },
    includeHTML: function () {
        var includesHTML = [...document.querySelectorAll("include")]
        includesHTML.forEach(v => {
            var src = v.dataset.src
            fetch(src).then(res => {
                res.text().then(html => {
                    v.insertAdjacentHTML("afterend", html)
                    v.remove()
                })
            })
        })
    },
    getQueryString: function (obj) {
        if (typeof obj !== "object" || obj.constructor.name !== "Object") return console.error("argument must be of type object")
        if (typeof (obj) === 'string') return data;
        let queryString = []
        for (var [key, value] of Object.entries(obj)) {
            queryString.push(`${key}=${value}`)
        }
        console.log(queryString.join("&"))

    },
    getDirectChildren: function (parent, selector) {
        return Array.prototype.slice.call(parent.querySelectorAll(selector))
    },
    decodeHTML: function (html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    },
    getParams: function (queryString) {
        var query = queryString.split("?")[1]
        var queryArray = query.split("&")
        var params = {}
        for (var i = 0; i < queryArray.length; i++) {
            var a = queryArray[i].split("=")
            params[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
        }
        return params
    },
    getParents: function (el, parent, filter) {
        let start = el;
        let parents = [start]
        while (start.parentElement !== document.querySelector(parent)) {
            parents.push(start.parentElement)
            start = start.parentElement
        }
        return parents
    },
    isVisible: function (elem) {
        var distance = elem.getBoundingClientRect();
        return (
            distance.top >= 0 &&
            distance.left >= 0 &&
            distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            distance.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    isOutOfViewport: function (elem) {
        var bounding = elem.getBoundingClientRect();
        var out = {};
        out.top = bounding.top < 0;
        out.left = bounding.left < 0;
        out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
        out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
        out.any = out.top || out.left || out.bottom || out.right;
        out.all = out.top && out.left && out.bottom && out.right;
        return out;
    },
    getNestedElements: function (selector) {
        return Array.prototype.slice.call(document.querySelectorAll(`${selector} *`))
    },
    importCss: function (filename, as) {
        var obj = {}

        function getStyleSheet(unique_title) {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                if (sheet.title == unique_title) {
                    return sheet.rules;
                }
            }
        }

        function uniqueid() {
            var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
            do {
                var ascicode = Math.floor((Math.random() * 42) + 48);
                if (ascicode < 58 || ascicode > 64) {
                    idstr += String.fromCharCode(ascicode);
                }
            } while (idstr.length < 32);
            return (idstr);
        }

        function sanitizeStyleRules(text, temp) {
            const result = text.match(/{([^}]+)}/g)
                .map(res => res.replace(/{|}/g, ''))[0]
            const ruleArray = result.split(";")
            var styleArray = ruleArray.filter(v => {
                let t = v.replace(/\s/g, '').length
                if (t.length !== 1) {
                    return t
                }
            })
            styleArray.forEach(styleArr => {
                [property, value] = styleArr.split(":")
                property = property.replace(/"/g, "").trim()
                value = value.replace(/"/g, "").trim()
                temp[property] = value
            })
        }

        return fetch(filename.toString().trim()).then(res => {
            return res.text().then(data => {
                var textCss = data
                var style = document.createElement("style")
                style.innerHTML = textCss
                var unique_id = uniqueid()
                style.title = unique_id
                var fontIndex = 0
                var ruleIndex = 0
                var keyIndex = 0
                var supportIndex = 0
                var mediaIndex = 0

                document.head.append(style)
                var styleRawArray = [...getStyleSheet(unique_id)]
                style.remove()
                styleRawArray.forEach(v => {
                    var tempObj = {}
                    if (v.type === 3) {
                        tempObj[v.href] = v.cssText.replace(/"/g, "'")
                        if (!obj["@import"]) {
                            obj["@import"] = []
                            obj["@import"].push(tempObj)
                        } else {
                            obj["@import"].push(tempObj)
                        }
                    } else if (v.type === 4) {
                        let text = ""
                        var cssRule = [...v.cssRules]
                        cssRule.forEach(v => {
                            var tempMedia = {}
                            text = v.cssText
                            sanitizeStyleRules(text, tempMedia)
                            if (v.selectorText in tempObj) {
                                tempObj[`${v.selectorText}_${mediaIndex}`] = tempMedia
                                mediaIndex++
                            } else {
                                tempObj[v.selectorText] = tempMedia
                            }

                        })


                        if (`@media ${v.media[0]}` in obj) {
                            obj[`@media ${v.media[0]}_${mediaIndex}`] = tempObj
                            mediaIndex++
                        } else {
                            obj[`@media ${v.media[0]}`] = tempObj
                        }
                    } else if (v.type === 7) {
                        var keyArray = v
                        for (const key in keyArray) {
                            if (!isNaN(parseInt(key))) {
                                var tempMedia = {}
                                var cssRule = keyArray[key]
                                text = cssRule.cssText
                                sanitizeStyleRules(text, tempMedia)

                                if (cssRule.keyText in tempObj) {
                                    tempObj[`${cssRule.keyText}_${keyIndex}`] = tempMedia
                                    keyIndex++
                                } else {
                                    tempObj[cssRule.keyText] = tempMedia
                                }
                            }
                        }
                        if (`@keyframes ${v.name}` in obj) {
                            obj[`@keyframes ${v.name}_${keyIndex}`] = tempObj
                            keyIndex++
                        } else {
                            obj[`@keyframes ${v.name}`] = tempObj
                        }

                    } else if (v.type === 12) {
                        let text = ""
                        var cssRule = [...v.cssRules]
                        cssRule.forEach(v => {
                            var tempMedia = {}
                            text = v.cssText
                            sanitizeStyleRules(text, tempMedia)

                            if (v.selectorText in tempObj) {
                                tempObj[`${v.selectorText}_${supportIndex}`] = tempMedia
                                supportIndex++
                            } else {
                                tempObj[v.selectorText] = tempMedia
                            }

                        })

                        if (`@supports ${v.conditionText}` in obj) {
                            obj[`@supports ${v.conditionText}_${supportIndex}`] = tempObj
                            supportIndex++
                        } else {
                            obj[`@supports ${v.conditionText}`] = tempObj
                        }
                    } else {
                        var text = v.cssText
                        sanitizeStyleRules(text, tempObj)
                        if (v.type === 1) {
                            if (v.selectorText in obj) {
                                obj[`${v.selectorText}_${ruleIndex}`] = tempObj
                                ruleIndex++
                            } else {
                                obj[`${v.selectorText}`] = tempObj
                            }
                        }
                        if (v.type === 5) {
                            if ("@font-face" in obj) {
                                obj[`@font-face_${fontIndex}`] = tempObj
                                fontIndex++
                            } else {
                                obj["@font-face"] = tempObj
                            }
                        }

                    }
                })
                if (as === "json") {
                    return JSON.stringify(obj)
                }
                return obj
            }).catch(err => {
                console.log(err)
            })
        })
    },
    hasChild: function (el) {
        return el.children.length > 0
    },
    childCount: function (el) {
        return el.children.length
    },
    generateId: function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    rand: function (min, max) {
        min = Number(min)
        max = Number(max)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    each: function (iterable, cb) {
        if(!iterable) return
        if (typeof iterable === "object" && iterable.constructor === Object) {
            var itr = Object.keys(iterable)
            itr.forEach((v, i) => {
                cb(v, iterable[v], iterable)
            })

        }
        else if(Array.isArray(iterable) && iterable.constructor === Array){
            iterable.forEach((v,i)=>{
                cb(v, i, iterable)
            })
        }
        else{
            var arrayEl=iterable
            for (var i=0;i<arrayEl.length;i++){
                cb(arrayEl[i],i,arrayEl)
            }
        }


    },
    rgbToHex: function (r, g, b) {

        function componentToHex(c) {
            if (c > 255) {
                c = 255;
            } else if (c < 0) {
                c = 0;
            }
            var hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }

        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    },
    rgbaToHex: function (r, g, b, a) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        a = Math.round(a * 255).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        if (a.length == 1)
            a = "0" + a;

        return "#" + r + g + b + a;
    },
    rgbToHsl: function (r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) {
            h = 0;
        } else if (cmax == r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax == g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);


        if (h < 0) {
            h += 360;
        }

        l = (cmax + cmin) / 2;


        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));


        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
    },
    rgbaToHsla: function (r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;

        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) {
            h = 0;
        } else if (cmax == r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax == g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);


        if (h < 0) {
            h += 360;
        }

        l = (cmax + cmin) / 2;


        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));


        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%," + a + ")";
    },
    hexToRgb: function (hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
    },
    hexToRgba: function (hex, alpha) {
        const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)
        const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, "g"))
        const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16)
        const getAlphafloat = (a, alpha) => {
            if (typeof a !== "undefined") {
                a = (a / 255).toFixed(2)
                if (a.split(".")[1] === "00") {
                    a = Number(a).toFixed(0)
                }
                return a
            }

            if ((typeof alpha != "number") || alpha < 0 || alpha > 1) {
                return 1
            }

            alpha = alpha.toFixed(2)
            if (alpha.split(".")[1] === "00") {
                alpha = Number(alpha).toFixed(0)
            }
            return alpha
        }
        if (!isValidHex(hex)) {
            throw new Error("Invalid HEX")
        }
        const chunkSize = Math.floor((hex.length - 1) / 3)
        const hexArr = getChunksFromString(hex.slice(1), chunkSize)
        const [r, g, b, a] = hexArr.map(convertHexUnitTo256)

        return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`
    },
    hexToHsl: function (H) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0;
        if (H.length == 4) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
    },
    hexToHsla: function (H) {
        let r = 0, g = 0, b = 0, a = 1;

        if (H.length == 5) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
            a = "0x" + H[4] + H[4];
        } else if (H.length == 9) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
            a = "0x" + H[7] + H[8];
        } else if (H.length == 7) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
            a = "0x" + "f" + "f";
        } else if (H.length == 4) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
            a = "0x" + "f" + "f";
        }

        // Normal conversion to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);


        if (a !== 1) {
            a = (a / 255).toFixed(2);
        }

        if (a.split(".")[1] === "00") {
            a = Number(a.split(".")[0])
        }

        return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
    },
    hslToHex: function (h, s, l) {
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        // Prepend 0s, if necessary
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    },
    hslaToHex: function (h, s, l, a) {
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        a = Math.round(a * 255).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        if (a.length == 1)
            a = "0" + a;

        return "#" + r + g + b + a;
    },
    hslToRgb: function (h, s, l) {
        // Must be fractions of 1
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;
        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return "rgb(" + r + "," + g + "," + b + ")";
    },
    hslaToRgba: function (h, s, l, a) {
        // Must be fractions of 1
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;
        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    },
    nameToRgb: function (name) {
        let fakeDiv = document.createElement("div");
        fakeDiv.style.color = name;
        document.body.appendChild(fakeDiv);
        let cs = window.getComputedStyle(fakeDiv),
            pv = cs.getPropertyValue("color");
        document.body.removeChild(fakeDiv);
        return pv;
    },
    nameToHex: function (name) {
        let fakeDiv = document.createElement("div");
        fakeDiv.style.color = name;
        document.body.appendChild(fakeDiv);

        let cs = window.getComputedStyle(fakeDiv),
            pv = cs.getPropertyValue("color");

        document.body.removeChild(fakeDiv);

        let rgb = pv.substr(4).split(")")[0].split(","),
            r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    },
    nameToHsl: function (name) {
        let fakeDiv = document.createElement("div");
        fakeDiv.style.color = name;
        document.body.appendChild(fakeDiv);

        let cs = window.getComputedStyle(fakeDiv),
            pv = cs.getPropertyValue("color");

        document.body.removeChild(fakeDiv);

        // Code ripped from RGBToHSL() (except pv is substringed)
        let rgb = pv.substr(4).split(")")[0].split(","),
            r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0)
            h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0)
            h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
    },
    getMonthName(type = "long", local = "en") {
        /*type="long" january||"short" jan*/
        const formatter = new Intl.DateTimeFormat(local.toString(), {month: type.toString()});
        const month = formatter.format(new Date());
        return month
    },
    getYear(type = "long") {
        /*type="long" = 2021||"short" = 21*/
        if (type === "long") {
            type = "numeric"
        }
        if (type === "short") {
            type = "2-digit"
        }
        const formatter = new Intl.DateTimeFormat("en", {year: type.toString()});
        const year = formatter.format(new Date());
        return year
    },
    getDay(type = "long") {
        /*type="long" = 02||"short" = 2*/
        if (type === "long") {
            type = "2-digit"
        }
        if (type === "short") {

            type = "numeric"
        }
        const formatter = new Intl.DateTimeFormat("en", {day: type});
        return formatter.format(new Date());
    },
    getHours(format = true, type = "long", local = "en") {
        /*type="long" 02||"short" 2*/
        if (type === "long") {
            type = "2-digit"

        }
        if (type === "short") {
            type = "numeric"
        }
        const formatter = new Intl.DateTimeFormat(local.toString(), {hour: type.toString(), hour12: format});
        let hour = formatter.format(new Date());
        if (type === "numeric") {
            if (hour.startsWith("0")) {
                hour = hour.replace("0", "")
            }
        }
        return hour.replace(/PM|AM|pm|am/, "").trim()
    },
    getMinutes(type = "long") {
        /*type="long" = 2021||"short" = 21*/
        if (type === "long") {
            type = "2-digit"
        }
        if (type === "short") {
            type = "numeric"
        }


        const formatter = new Intl.DateTimeFormat("en", {minute: type.toString()});
        let minute = formatter.format(new Date());
        if (type === "2-digit") {
            if (minute.length === 1) {
                minute = `0${minute}`
            }
        }
        return minute
    },
    getSeconds(type = "long") {
        /*type="long" = 02||"short" = 2*/
        if (type === "long") {
            type = "2-digit"
        }
        if (type === "short") {
            type = "numeric"
        }

        const formatter = new Intl.DateTimeFormat("en", {second: type});
        let seconds = formatter.format(new Date());
        if (type === "2-digit") {
            if (seconds.length === 1) {
                seconds = `0${seconds}`
            }
        }
        return seconds
    },
    getMeridiem() {
        var meridium = null
        const formatter = new Intl.DateTimeFormat("en", {hour: "numeric", hour12: true});
        return formatter.format(new Date()).split(" ")[1]
    },
    formatDate: function (date, format = "dd mm yy", delimeter = "-") {
        /*format
   d=>date = 1,10
   dd=>date = 01,10
   m=>month=>1,2,11,12
   mm<=>month=>01,02,11,12
   M=>month=jan,feb
   MM=>month=january,march
   y=>year=21,22
   yy=>year=2021,2022

   delimeter="-"|"/"...
   */
        function getDay(type = "long") {
            if (type === "long") {
                type = "2-digit"
            }
            if (type === "short") {

                type = "numeric"
            }
            const formatter = new Intl.DateTimeFormat("en", {day: type});
            return formatter.format(date);
        }

        function getMonthName(type = "long", local = "en") {
            const formatter = new Intl.DateTimeFormat(local.toString(), {month: type.toString()});
            const month = formatter.format(date);
            return month
        }

        function getYear(type = "long") {
            if (type === "long") {
                type = "numeric"
            }
            if (type === "short") {
                type = "2-digit"
            }
            const formatter = new Intl.DateTimeFormat("en", {year: type.toString()});
            const year = formatter.format(date);
            return year
        }

        var formatArr = format.split(" ")
        var isMonthNumeric = false
        var str = "d m y"
        var newFormat = {}
        formatArr.forEach(v => {
            if (v.startsWith("d")) {
                if (v.length === 2) {
                    newFormat.date = "long"
                } else {
                    newFormat.date = "short"
                }
            }
            if (v.startsWith("m")) {
                isMonthNumeric = true
                if (v.length === 2) {
                    newFormat.month = "2-digit"
                } else {
                    newFormat.month = "numeric"
                }
            }
            if (v.startsWith("M")) {
                if (v.length === 2) {
                    newFormat.month = "long"
                } else {
                    newFormat.month = "short"
                }

            }
            if (v.startsWith("y")) {
                if (v.length === 4) {
                    newFormat.year = "long"
                } else {
                    newFormat.year = "short"
                }
            }
        })

        var day = getDay(newFormat.date)
        var month = getMonthName(newFormat.month)
        if (isMonthNumeric) {
            month = getMonthName(newFormat.month)
        }

        var year = getYear(newFormat.year)

        str = str.replace("d", day)
        str = str.replace("m", month)
        str = str.replace("y", year)
        str = str.replace(/\s/g, delimeter)

        return str

    },
    formatTime: function (date, format = "hh mm ss aa", delimeter = ":") {
        /*format
   h=>24hours = 1,10
   hh=>24hours = 01,10
   m=>month=>1,2,11,12
   mm<=>month=>01,02,11,12
   H=>12 hours=1 AM|PM
   HH=>12 hours=01 AM|PM
   s=>second=1,2
   ss=>second=01,02
   ll=>millisecounds=999

   delimeter="-"|"/"...
   */
        function getHours(format = true, type = "long", local = "en") {
            /*type="long" 02||"short" 2*/
            if (type === "long") {
                type = "2-digit"
            }
            if (type === "short") {
                type = "numeric"
            }
            const formatter = new Intl.DateTimeFormat(local.toString(), {hour: type.toString(), hour12: format});
            let hour = formatter.format(date);
            if (type === "numeric") {
                if (hour.startsWith("0")) {
                    hour = hour.replace("0", "")
                }
            }
            return hour.replace(/PM|AM|pm|am/, "").trim()
        }

        function getMinutes(type = "long") {
            /*type="long" = 2021||"short" = 21*/
            if (type === "long") {
                type = "2-digit"
            }
            if (type === "short") {
                type = "numeric"
            }

            const formatter = new Intl.DateTimeFormat("en", {minute: type.toString()});
            let minute = formatter.format(date);
            if (type === "2-digit") {
                if (minute.length === 1) {
                    minute = `0${minute}`
                }
            }
            return minute
        }

        function getSeconds(type = "long") {
            /*type="long" = 02||"short" = 2*/
            if (type === "long") {
                type = "2-digit"
            }
            if (type === "short") {
                type = "numeric"
            }

            const formatter = new Intl.DateTimeFormat("en", {second: type});
            let seconds = formatter.format(date);
            if (type === "2-digit") {
                if (seconds.length === 1) {
                    seconds = `0${seconds}`
                }
            }
            return seconds
        }

        var formatArr = format.split(" ")
        var str = "h-m-s-l a"
        var milli = false
        var hourFormat = true
        var newFormat = {}
        formatArr.forEach(v => {
            if (v.startsWith("h")) {
                if (v.length === 2) {
                    newFormat.hour = "2-digit"
                } else {
                    newFormat.hour = "numeric"
                }
            }
            if (v.startsWith("l")) {
                milli = true
            }
            if (v.startsWith("H")) {
                hourFormat = false
                if (v.length === 2) {
                    newFormat.hour = "2-digit"
                } else {
                    newFormat.hour = "numeric"
                }
            }
            if (v.startsWith("m")) {
                if (v.length === 2) {
                    newFormat.minute = "2-digit"
                } else {
                    newFormat.minute = "numeric"
                }
            }

            if (v.startsWith("s")) {
                if (v.length === 2) {
                    newFormat.second = "long"
                } else {
                    newFormat.second = "short"
                }
            }
        })


        var hours = getHours(newFormat.hour)
        var minutes = getMinutes(newFormat.minute)
        var second = getSeconds(newFormat.second)
        var milliseconds = ""
        var meridium = ""
        const formatter = new Intl.DateTimeFormat("en", {hour: newFormat.hour, hour12: hourFormat});
        let hour = formatter.format(date).split(" ")[1]
        if (hour) {
            meridium = hour
        }
        if (milli) {
            milliseconds = date.getMilliseconds()
            milliseconds = milliseconds.toString().padStart(3, 0);
        } else {
            str = str.replace("-l", "")
        }

        if (newFormat.hour === "numeric") {
            if (hours.startsWith("0")) {
                hours = hours.replace("0", "")
            }
        }
        str = str.replace("h", hours)
        str = str.replace("m", minutes)
        str = str.replace("s", second)
        str = str.replace("l", milliseconds)
        str = str.replace("a", meridium)
        str = str.replace(/-/g, delimeter)

        return str

    },
    isItratable:function(obj) {
        if (obj == null) return false;
        return typeof obj[Symbol.iterator] === 'function';
    },
    getInfo:function(el){
        function isIterable(obj) {
            if (obj == null) return false;
            return typeof obj[Symbol.iterator] === 'function';
        }
        function setInfo(el) {
            var tempObj={}

            tempObj.tagName=el.tagName.toLowerCase()
            tempObj.element=`<${el.tagName.toLowerCase()}>`
            tempObj.hasChildren=!!(el.children.length)
            tempObj.text=el.innerHTML
            tempObj.outerHTML=el.outerHTML
            var attributes={}
            var attrs=[...el.attributes]
            for (var j=0;j<attrs.length;j++){
                attributes[attrs[j].nodeName]=attrs[j].nodeValue
            }
            tempObj.attributes=attributes
            if(!!(el.children.length)){
                tempObj.children=el.children
                tempObj.childElementCount=el.children.length
            }
            return tempObj
        }
        var isArray=isIterable(el)
        var info=[];
        if(isArray){
            let array=[...el]
            console.log(array)

            for (var i=0;i<array.length;i++){
                info.push(setInfo(array[i]))
            }

        }else{
            return setInfo(el)
        }
        return info
    },
    compare:function (el1,el2) {
        var diff={}
        function isIterable(obj) {
            if (obj == null) return false;
            return typeof obj[Symbol.iterator] === 'function';
        }
        function check(el1,el2) {
            if(el2.constructor===Object || el1.constructor===Object) return console.error("can't compare objects")
            if(Object.keys(el1.attributes)!==Object.keys(el2.attributes)){
                var el1data=el1.attributes
                var el2data=el2.attributes
                var temp={}
                if(Object.keys(el1data).length>0){
                    let obj=[...el1data]
                    obj.forEach(v=>{
                        var key=`${v.name}`
                        temp[key]={prev:v.value,next:null}
                    })
                }
                if(Object.keys(el2data).length>0){
                    let obj=[...el2data]
                    obj.forEach(v=>{
                        var key=`${v.name}`
                        if(!temp[key]){
                            temp[key]={prev:null}
                        }
                        temp[key].next=v.value
                    })
                }

                var temparr=Object.keys(temp)
                temparr.forEach(v=>{
                    if(temp[v].prev!==temp[v].next){
                        diff[v]={prev:temp[v].prev,next:temp[v].next}
                    }
                })
            }
            if(el1.innerHTML!==el2.innerHTML){
                diff.innerHTML={prev:el1.innerHTML,next:el2.innerHTML}
            }
            return diff
        }
        if(isIterable(el1)||isIterable(el2)) return console.error("can't compare itratable")
        if(el1.tagName!==el2.tagName) return console.error("can't compare element with diffrent tag")
        return check(el1,el2)
    },
    jsonToObject:function (json) {
        if(typeof json !== "string") return console.error("argument must be json")
        return JSON.parse(json)
    },
    objectToJson:function (obj) {
        if(typeof obj !== "object") return console.error("argument must be object")
        return JSON.stringify(obj)
    }
}
export default DOM
