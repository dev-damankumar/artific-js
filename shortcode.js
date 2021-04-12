var shortcode={
    "$site_url":"https://www.youtube.com/",
    "$found":"<p style='color:red'>not found</p>",
    "$show":"true"
}
var myvar={
    "$site_url":"https://google.com",
}
const varToString = varObj => Object.keys(varObj)[0]


function shortcode_init(shortcodeData) {
    let hasError=false
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    var regex=/\[[^\[\]]*\]/g;
    var documentDiv=[...document.body.childNodes]
    documentDiv.forEach(v=>{
        if(v.tagName !== "SCRIPT" || v.nodeName==="#text"){
            var result
            if(v.nodeName==="#text"){
                result=regex.exec(v.data)
            }else{
                result=regex.exec(decodeHtml(v.outerHTML))
            }

            if(result){
                result.forEach(r=>{
                    var dataRegex=/data=["|'].*["|']/g
                    var varRegex=/\[.*\s/g
                    var dataArr=dataRegex.exec(r)
                    var varArr=varRegex.exec(r)
                    var mainVar=varArr[0].replace("[","").trim()
                    if(dataArr){
                        dataArr.forEach(d=>{
                            var shortVar=d.split(/data=["|']/)[1].replace(/["|']/,"")
                            if(!hasError){
                                if(shortcodeData===shortVar){

                                    var data=window[shortVar]
                                    var rData=data[`$${mainVar}`]
                                    if(v.nodeName==="#text"){
                                        var div=document.createElement("div")
                                        console.log(rData)
                                        div.innerHTML=v.data.replace(regex,rData)
                                        v.parentElement.replaceChild(div,v)
                                    }else{
                                        v.outerHTML=v.outerHTML.replace(regex,rData)
                                    }
                                }else{
                                    hasError=true
                                    console.error(`${shortcodeData} is not defined`)
                                }
                            }
                        })
                    }
                })
            }
        }
    })
}
shortcode_init("shortcode")
shortcode_init("myvar")

