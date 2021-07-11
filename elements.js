/*var $elements={
	"div":{
		className:"container",
		"data-ref":"hello",
		"style":"background:black;",
		children:[
			{
				"p":{
					style:"color:red;",
					innerText:"hello"
				}
			},
			{
				"div":{
					className:"abc",
					children: [{
						"span":{
							innerHTML: '<b>span</b>'
						}
					}],
					
				}
			}
		]
	}
}*//*var $elements={
	"div":{
		className:"container",
		"data-ref":"hello",
		"style":"background:black;",
		children:[
			{
				"p":{
					style:"color:red;",
					innerText:"hello"
				}
			},
			{
				"div":{
					className:"abc",
					children: [{
						"span":{
							innerHTML: '<b>span</b>'
						}
					}],
					
				}
			}
		]
	}
}*/
function elements(obj) {
	for(let el of Object.keys(obj)){
		var elm=document.createElement(el)
		for(let attr of Object.keys(obj[el])){
			let childs=[];
			if(attr==="children"){
				let children=[...obj[el][attr]]
				children.forEach(v=>{
					childs.push(elements(v))
				})
			}
			else if(attr==="innerText"){
				elm.innerText=obj[el][attr]
			}
			else if(attr==="innerHTML"){
				elm.innerHTML=obj[el][attr]
			}
			else{
				if(attr==="className"){
					elm.setAttribute("class",obj[el][attr])
				}else{
					elm.setAttribute(attr,obj[el][attr])
				}
			}
			if(childs){
				childs.forEach(v=>{
					elm.append(v)
				})
			}
		}
	}
	return elm
}