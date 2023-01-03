/*
* Examples:
* <p>Copy me</p>
<button data-clipboard-action="copy" data-clipboard-target="p">Copy text</button>
*
*
* <p>Copy me</p>
<button data-clipboard-action="copy" data-clipboard-text="copy this text">Copy text</button>
*
*  */


const clipboardTargets = [...document.querySelectorAll("*[data-clipboard-target]")]
const targetText = [...document.querySelectorAll("*[data-clipboard-text]")]
clipboardTargets.forEach(target => {
    target.addEventListener("click", function () {
        const tId = this.dataset.clipboardTarget;
        const text = document.querySelector(`${tId}`);
        const tag = text.nodeName
        if (tag.toUpperCase() === "INPUT" || tag.toUpperCase() === "TEXTAREA") {
            text.select()
            const action = this.dataset.clipboardAction
            if(navigator.clipboard){
                navigator.clipboard.writeText(text)
            }else{
                if (action === "cut") {
                    document.execCommand("cut")
                } else {
                    document.execCommand("copy")
                }
            }
        } else {
            document.getSelection().setBaseAndExtent(text, 0, text, text.childNodes.length)
            document.execCommand("copy")
        }
        document.getSelection().removeAllRanges()
    })
})

targetText.forEach(v => {
    v.addEventListener("click", function () {
        const tId = this.dataset.clipboardText;
        const el = document.createElement('textarea');
        el.value = tId;
        document.body.appendChild(el);
        el.select();
        if(navigator.clipboard){
            navigator.clipboard.writeText(el.value)
        }else{
            document.execCommand("copy")
        }
        document.body.removeChild(el);
    })
})