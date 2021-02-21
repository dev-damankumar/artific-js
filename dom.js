var DOMInstance = {
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
    defineClass:function(className, properties) {
        console.log(properties.constructor.name)
        if(typeof className==="string" && (typeof properties === "object" || properties.constructor.name==="Object")){
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
        }
        else{
            console.error("className must be of string type and properties must be an object")
        }

    },
    defineClasses:function (classArr) {
        if(Array.isArray(classArr) || classArr.constructor.name ==="Array"){
            var classArray=[]
            classArr.forEach(arr=>{
                if(arr.length===2){
                    var className=arr[0]
                    var properties=arr[1]
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
                }else{
                    console.error("nested array must have only two values")
                }

            })
            return classArray
        }else{
            console.error("argument must be an array")
        }

    },
    includeHTML:function(){
        var includesHTML=[...document.querySelectorAll("include")]
        includesHTML.forEach(v=>{
            var src=v.dataset.src
            fetch(src).then(res=>{
                res.text().then(html=>{
                    v.insertAdjacentHTML("afterend",html)
                    v.remove()
                })
            })
        })
    }
}


const DOM = Object.create(DOMInstance);
export default DOM
