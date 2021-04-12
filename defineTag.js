document.head.innerHTML+=`<style>d-template {display: none;}</style>`
function defineTag(name, content=null) {

    function getStyleSheet(unique_title) {
        var sheet = document.querySelector(`[data-style-for="${unique_title}"]`)
        for (var t = 0; t < document.styleSheets.length; t++) {
            sheet = document.styleSheets[t]
            if (sheet.ownerNode.dataset.styleFor.toString().trim() == unique_title) {
                return sheet.cssRules;
            }
        }
    }
    var templateContent=content
    var template=document.querySelector(`d-template[data-template-for="${name.toString().trim()}"]`)
    if(!content){

        if(!template){
            var templateStyle=document.querySelector(`[data-style-for="${name.toString().trim()}"]`);
            if(templateStyle){
                templateStyle.remove()
            }
            return console.error("must provide template for tag")
        }
        templateContent=template.innerHTML
        template.remove()
    }
    if(template){
        template.remove()
    }
    var styles=getStyleSheet(name.toString().trim())
    console.log(styles)
    if(styles){
        var arrStyle = [...styles]
        arrStyle.forEach(v => {
            v.selectorText = `${name.toString().trim()} ${v.selectorText}`
            v.cssText = `${name.toString().trim()} ${v.cssText}`
        })
    }



    var tags = document.querySelectorAll(name.toString())
    for (let i = 0; i < tags.length; i++) {

        var div = document.createElement("div")
        div.innerHTML = templateContent
        var divArr = div.querySelectorAll("*")

        for (let j = 0; j < divArr.length; j++) {
            for (var att = 0; att < divArr[j].attributes.length; att++) {
                var v = divArr[j].attributes[att]
                var attrName = v.name.trim()
                divArr[j].removeAttribute(attrName)
                attrName = attrName.replace(/\[|\]/gm, "")
                if(tags[i].attributes[`${attrName}`]){
                    divArr[j].setAttribute(tags[i].attributes[`${attrName}`].name, tags[i].attributes[`${attrName}`].value)
                }
            }
        }

        var elms = Array.prototype.slice.call(div.children, 0);
        for (let k = 0; k < elms.length; k++) {
            tags[i].append(elms[k])
        }

        while (tags[i].attributes.length > 0)
            tags[i].removeAttribute(tags[i].attributes[0].name);
    }

}

defineTag("my-tag-1")
defineTag("my-tag",`<div [class]><h3>Card Tilte 2</h3>
        <p [style]>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur doloremque magnam
            nemo odit possimus quae quo sed tempore vel?</p>
    </div>`)

/*
<style data-style-for="my-tag-1">
        .card {
            background: #f8f8f8;
            padding: 15px;
            border-radius: 5px;
            max-width: 50%;
        }

        .card h3 {
            margin-top: 0;
        }
    </style>
<d-template data-template-for="my-tag-1">
    <div [class]><h3>Card Tilte 1</h3>
<p [style]>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur doloremque magnam
nemo odit possimus quae quo sed tempore vel?</p>
</div>
</d-template>

<my-tag class="card"></my-tag>
    <my-tag-1 class="card" style="color:gray"></my-tag-1>*/
