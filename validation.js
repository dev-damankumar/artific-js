(function(){
 var style = `<style>.error {border: 1px solid rgb(244, 67, 54) !important;border-radius: 3px;}.error::placeholder {color: rgb(244, 67, 54);}p.error-msg{position: relative;  bottom: 0px;  font-size: inherit;  background: rgb(255, 218, 215);  color: rgb(244, 67, 54);  padding: 5px 10px;  border-radius: 50px;  margin: 15px 0;}p.error-msg p {white-space: nowrap;width: 180px;overflow: hidden;text-overflow: ellipsis;margin: 0;}span.close-error {position: absolute;left: 100%;font-size: 25px;top: 50%;transform: translateY(-50%) rotate(45deg);cursor: pointer;}.error-parent {position: relative;}</style>`
document.getElementsByTagName("body")[0].insertAdjacentHTML("beforebegin", style)

function trimExtra(value) {
    var str = value
    if (/\s/gm.test(value)) {
        str = value.replace(/\s{2,}/gm, " ")
        str = str.trim()
    }
    return str
}

function runLoop(el, input, vFunc) {
    function createMsg(el) {
        var msg = el.dataset.msg;
        var trimed = trimExtra(msg)
        msg = trimed
        if (msg == undefined) {
            msg = "Please enter valid data"
        }
        return msg
    }

    document.body.onsubmit = function (e) {
        e.preventDefault()
        if (input.length == undefined) {
            if (el.value == "") {
                e.preventDefault()
            }
            var msg = createMsg(el)
            var t = vFunc(el, msg, e.target)
            if (t === true) {
                el.closest("form").submit()
            }
        } else {
            arr.forEach(v => {
                if (v.value == "") {
                    e.preventDefault()
                }
                var msg = createMsg(v)

                var t = vFunc(v, msg, e.target)
                if (t === true) {
                    v.closest("form").submit()
                }
            })
        }
    }
    el.onblur = function (e) {
        var msg = createMsg(this)
        vFunc(el, msg, e.target)
    }
}

function inputTypeText(el, func) {
    if (el.length == undefined) {
        runLoop(el, el, func)
    } else {
        arr = [].slice.call(el)
        arr.forEach((v, i, a) => {
            runLoop(v, el, func)
        })
    }
}

function createError(element, msg) {
    element.classList.add("error")
    var p = document.createElement("p");
    p.innerHTML = `<p>${msg}</p>`;
    p.className = "error-msg";
    p.innerHTML += '<span class="close-error">+</span>'

    if (element.closest('form') !== element.parentElement) {
        element.parentElement.classList.add("error-parent")
        if (element.parentElement.getElementsByClassName("error-msg")[0] == undefined) {
            element.parentElement.append(p)
        }
    } else {
        if (!element.nextElementSibling.classList.contains("error-msg")) {
            element.insertAdjacentElement("afterend", p)
        }
    }

    var close = document.getElementsByClassName("close-error");
    for (var i = 0; i < close.length; i++) {
        close[i].addEventListener("click", function () {
            if (this.parentElement.parentElement) {
                if (this.parentElement.previousElementSibling.classList.contains("error")) {
                    this.parentElement.previousElementSibling.classList.remove("error")
                    if (element.closest('form') !== element.parentElement) {
                        this.parentElement.parentElement.classList.remove("error-parent")
                    }
                }
            }
            this.parentElement.remove()
        })
    }
    return false
}

function destroyError(element, btn) {
    element.classList.remove("error")
    if (element.type !== "submit") {
        if (element.closest('form') !== element.parentElement) {
            if (element.parentElement.getElementsByClassName("error-msg")[0] !== undefined) {
                element.parentElement.getElementsByClassName("error-msg")[0].remove()
            }
        } else {
            if (element.nextElementSibling.classList.contains("error-msg")) {
                element.nextElementSibling.remove()
            }
        }
    }
    if (btn.closest("form").getElementsByClassName("error").length == 0) {
        return true
    }
}

function check(element, msg, btn) {
    var ifSpaces = /^\s*\S/gm;
    /*  var ifSpaces2 = /^\s*\S(\w+\s?|\S+\s?)*\s*$/gm */
    if (element.closest("form") == btn.closest("form")) {
        if ((element.value == "" || !ifSpaces.test(element.value)) && element.type !== "submit") {
            var trimed = trimExtra(element.value)
            element.value = trimed
            createError(element, msg)
            return false
        } else {
            var trimed = trimExtra(element.value)
            element.value = trimed
            var t = destroyError(element, btn)
            if (t == true) {
                return true
            }
        }
    } else {
        return false
    }
}

function inputTypeNumber(el, func, strict) {
    if (el.length == undefined) {
        runLoop(el, el, func)
        if (strict == true) {
            var keyNum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            el.addEventListener("keydown", function (e) {
                if (keyNum.indexOf(e.key.toLowerCase()) !== -1) {
                    e.preventDefault()
                }
            })
        }
    } else {
        arr = [].slice.call(el)
        arr.forEach((v, i, a) => {
            runLoop(v, el, func)
            if (strict == true) {
                var keyNum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
                v.addEventListener("keydown", function (e) {
                    if (keyNum.indexOf(e.key.toLowerCase()) !== -1) {
                        e.preventDefault()
                    }
                })
            }
        })
    }
}

function email(element, msg, btn) {
    var ifSpaces = /^[a-z|A-Z]*@\w*\.[a-z|A-Z]*$/g
    if (element.closest("form") == btn.closest("form")) {
        if ((element.value == "" || !ifSpaces.test(element.value)) && element.type !== "submit") {
            createError(element, msg)
            return false
        } else {
            destroyError(element, btn)
            return true
        }
    }
}

function number(element, msg, btn) {
    var ifSpaces = /[^0-9]/g
    if (element.closest("form") == btn.closest("form")) {
        if ((element.value == "" || ifSpaces.test(element.value)) && element.type !== "submit") {
            createError(element, msg)
            return false
        } else {
            var t = destroyError(element, btn)
            if (t == true) {
                return true
            }
        }
    } else {
        return false
    }
}

Object.prototype.validate = function () {
    var input = this;
    inputTypeText(input, check)
}

Object.prototype.email1 = function () {
    var input = this;
    inputTypeText(input, check)
    inputTypeText(input, email);

}
Object.prototype.number1 = function (strict) {
    var input = this;
    inputTypeText(input, check)
    inputTypeNumber(input, number, strict)
}
})()
//checkbox and radio
// setFileType([".jpg","png"])
//setLimit({min:0,max:100})
//phoneNumber(countryCode:true)
/* setPasswordPattern({
    alpha:{true,range:{min:0,max:100},containsCaps:true},
    number:{true,range:{min:0,max:100}}
    specialChar:{true,range:{min:0,max:100}}
}) */