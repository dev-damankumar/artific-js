/* data-clipboard="#p"
  data-clipboard-action="cut/copy"
  data-clipboard-text="hello world sfv" */
var target = [...document.querySelectorAll("*[data-clipboard]")]
var targetText = [...document.querySelectorAll("*[data-clipboard-text]")]
target.forEach(v => {
    v.addEventListener("click", function () {
        var tId = this.dataset.clipboard;
        var textId = tId.replace("#", "")
        var text = document.getElementById(textId);
        var tag = text.nodeName
        if (tag.toUpperCase() == "INPUT" || tag.toUpperCase() == "TEXTAREA") {
            text.select()
            var action = this.dataset.clipboardAction
            if (action == "cut") {
                document.execCommand("cut")
            } else {
                document.execCommand("copy")
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
        var tId = this.dataset.clipboardText;
        const el = document.createElement('textarea');
        el.value = tId;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy")
        document.body.removeChild(el);
    })
})