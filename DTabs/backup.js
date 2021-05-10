const Dtabs = (function () {
	const instances=[]
	const freeze=[]
	const style = `<style>
        :root {
            --color1: #f9826c;
            --color2: #fafbfc;
            --color3: #1b1f2326;
        }

        @font-face {
            font-family: SegoeUI Light;
            src: local("Segoe UI Light"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf) format("truetype");
            font-weight: 100
        }

        @font-face {
            font-family: SegoeUI Semilight;
            src: local("Segoe UI Semilight"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.ttf) format("truetype");
            font-weight: 200
        }

        @font-face {
            font-family: SegoeUI;
            src: local("Segoe UI"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");
            font-weight: 400
        }

        @font-face {
            font-family: SegoeUI Bold;
            src: local("Segoe UI Bold"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.ttf) format("truetype");
            font-weight: 600
        }

        @font-face {
            font-family: SegoeUI Semibold;
            src: local("Segoe UI Semibold"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf) format("truetype");
            font-weight: 700
        }

        .Dtab-div {
            background: white;
            border-radius: 5px;
            box-shadow: 0px 1px 13px rgb(0 0 0 / 10%);
            overflow: hidden;
        }

        li[data-tab-disabled="true"],li[data-tab-disabled="true"] * {
            cursor: not-allowed !important;
            user-select: none;
        }

        ul.Dtabs {
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            align-items: center;
            list-style: none;
            padding: 0;
            padding-bottom: 1px;
            box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
            border: none;
            margin: 0;
            background: #f8f8f8;
            border-radius: 5px 5px 0 0;
        }

        .Dtabs-2 ul.Dtabs {
            box-shadow: 0px 1px 13px rgb(0 0 0 / 10%);
            border-radius: 5px;
        }

        .Dtabs-2 ul.Dtabs > li {
            border-radius: 5px;
        }

        li.tab-active, li[data-tab-active] {
            background: white;
        }

        .Dtab-content-item {
            display: none;
        }

        ul.Dtabs > li > a {
            color: gray;
            text-decoration: none;
            line-height: 2;
            color: #6a737d;
            font-size: 14px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            font-family: "SegoeUI SemiBold",sans-serif !important;
            justify-content: flex-start;
            position: relative;
            font-family: "Segoe UI";
            white-space: nowrap;
        }

        .Dtabs-content {
            padding: 15px;
        }

        ul.Dtabs > li {
            padding: 7px 20px;
            position: relative;
            cursor: pointer;
        }


        ul.Dtabs > li.data-tab-active:before, ul.Dtabs > li[data-tab-active]:before {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 100%;
            border-bottom: 2px solid #f9826c;
        }

        ul.Dtabs > li:hover::before {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 100%;
            border-bottom: 2px solid #d1d5da;
        }


        ul.Dtabs > li.tab-active:hover:before, ul.Dtabs > li[data-tab-active]:hover:before {
            border-bottom: 2px solid #f9826c;
        }

        ul.Dtabs > li.tab-active a, ul.Dtabs > li[data-tab-active] a {
            color: #343e57;
        }

        .Dtab-content-item h1,
        .Dtab-content-item h2,
        .Dtab-content-item h3,
        .Dtab-content-item h4,
        .Dtab-content-item h5,
        .Dtab-content-item h6 {
            margin: 0;
            color: #343e57;
            font-family: SegoeUI SemiBold, sans-serif;
        }

        .Dtab-content-item.Dtab-content-active, [data-content-active] {
            display: block;
        }

        .Dtab-div.Dtabs-2 {
            box-shadow: none;
            overflow: visible;
        }

        .Dtab-div.Dtabs-2 .Dtabs-content {
            box-shadow: 0px 1px 13px rgb(0 0 0 / 10%);
            margin-top: 15px;
            border-radius: 5px;
        }

        ul.Dtabs-dropdown {
            position: absolute;
            background: white;
            padding: 0;
            list-style: none;
            box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
            border-radius: 5px;
            min-width: 180px;
            top: 100%;
            left: 12px;
        }

        li.more-tab:hover:before {
            display: none;
        }

        ul.Dtabs-dropdown {
            display: none;
        }

        li.more-tab {
            display: flex;
            align-items: center;
            padding: 10px !important;
            margin-left: 5px;
        }

        li.more-tab:hover {
            background: white;
            border-radius: 50px !important;
        }

        ul.Dtabs-dropdown li a {
            text-decoration: none;
            padding: 5px 15px;
            display: block;
            color: #6a737d;
        }

        ul.Dtabs-dropdown {
            padding: 5px 0;
        }
    </style>`
	const styleVerticle=`<style>
        :root {
            --color1: #f9826c;
            --color2: #fafbfc;
            --color3: #1b1f2326;
        }

        @font-face {
            font-family: SegoeUI Light;
            src: local("Segoe UI Light"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf) format("truetype");
            font-weight: 100
        }

        @font-face {
            font-family: SegoeUI Semilight;
            src: local("Segoe UI Semilight"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.ttf) format("truetype");
            font-weight: 200
        }

        @font-face {
            font-family: SegoeUI;
            src: local("Segoe UI"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");
            font-weight: 400
        }

        @font-face {
            font-family: SegoeUI Bold;
            src: local("Segoe UI Bold"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.ttf) format("truetype");
            font-weight: 600
        }

        @font-face {
            font-family: SegoeUI Semibold;
            src: local("Segoe UI Semibold"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2) format("woff2"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff) format("woff"), url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf) format("truetype");
            font-weight: 700
        }

        .Dtab-div {
            background: white;
            border-radius: 5px;
            box-shadow: 0px 1px 13px rgb(0 0 0 / 10%);
            overflow: hidden;
        }

.Dtab-div {
    display: flex;
    align-items: flex-start;
}
        li[data-tab-disabled="true"],li[data-tab-disabled="true"] * {
            cursor: not-allowed !important;
            user-select: none;
        }
        .Dtab-div * {
            font-family: SegoeUI, sans-serif;
            color: #302c3c;
            line-height: 1.5;
            box-sizing: border-box;
            -webkit-transition: all .5s ease;
            transition: all .5s ease;
            outline: 0;
        }

       ul.Dtabs {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    align-items: stretch;
    list-style: none;
    padding: 0;
    padding-bottom: 1px;
    box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
    border: none;
    margin: 0;
    background: #fafbfc;
    border-radius: 5px 5px 0 0;
}
ul.Dtabs {
    flex: 0 0 200px;
    max-width: 300px;
}

        .Dtabs-2 ul.Dtabs {
            box-shadow: 0px 1px 13px rgb(0 0 0 / 10%);
            border-radius: 5px;
        }

        .Dtabs-2 ul.Dtabs > li {
    border-radius: 0;
    border-bottom: 1px solid #f4f4f4 !important;
}

        li.tab-active, li[data-tab-active] {
            background: white;
        }

        .Dtab-content-item {
            display: none;
        }

        ul.Dtabs > li > a {
            color: gray;
            text-decoration: none;
            line-height: 2;
            color: #6a737d;
            font-size: 15px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: flex-start;
            position: relative;
            font-family: "Segoe UI";
            white-space: nowrap;
        }

        .Dtabs-content {
            padding: 15px;
        }

        ul.Dtabs > li {
            padding: 10px 15px;
            position: relative;
            cursor: pointer;
        }


        ul.Dtabs > li.data-tab-active:before, ul.Dtabs > li[data-tab-active]:before {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 100%;
            border-left: 2px solid #f9826c;
        }

        ul.Dtabs > li:hover::before {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 100%;
            border-left: 2px solid #d1d5da;
        }


        ul.Dtabs > li.tab-active:hover:before, ul.Dtabs > li[data-tab-active]:hover:before {
            border-left: 2px solid #f9826c;
        }

        ul.Dtabs > li.tab-active a, ul.Dtabs > li[data-tab-active] a {
            color: #343e57;
        }

        .Dtab-content-item h1,
        .Dtab-content-item h2,
        .Dtab-content-item h3,
        .Dtab-content-item h4,
        .Dtab-content-item h5,
        .Dtab-content-item h6 {
            margin: 0;
            color: #343e57;
            font-family: SegoeUI SemiBold, sans-serif;
        }

        .Dtab-content-item.Dtab-content-active, [data-content-active] {
            display: block;
        }

        .Dtab-div.Dtabs-2 {
            box-shadow: none;
            overflow: visible;
        }

        .Dtab-div.Dtabs-2 .Dtabs-content {
    box-shadow: 0px 1px 13px rgb(0 0 0 / 10%);
    margin-top: 0;
    border-radius: 5px;
    flex: 0 0 calc(100% - 220px);
    margin-left: 20px;
}
        ul.Dtabs-dropdown {
            position: absolute;
            background: white;
            padding: 0;
            list-style: none;
            box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
            border-radius: 5px;
            min-width: 180px;
            top: 100%;
            left: 12px;
        }

        li.more-tab:hover:before {
            display: none;
        }

        ul.Dtabs-dropdown {
            display: none;
        }

        li.more-tab {
            display: flex;
            align-items: center;
            padding: 10px !important;
            margin-left: 5px;
        }

        li.more-tab:hover {
            background: white;
            border-radius: 50px !important;
        }

        ul.Dtabs-dropdown li a {
            text-decoration: none;
            padding: 5px 15px;
            display: block;
            color: #6a737d;
        }

        ul.Dtabs-dropdown {
            padding: 5px 0;
        }
    </style>`
	let styleSetVerticle=false
	let styleSet=false
	function setAttributes(el) {
		var attrArray = [...el.attributes]
		var attributes = ""
		var classNames = ""
		attrArray.forEach(v => {
			if(v.name.trim() !== "data-tab-disabled"){
				if (v.name.trim() !== "class") {
					attributes += `${v.name}="${v.value}" `
				} else {
					classNames += `${v.value} `
				}
			}
		})
		return {attributes, classes: classNames}
	}
	function makeList(tabs) {

		var tabsHtml = "";
		tabs.forEach(v => {
			var {attributes, classes} = setAttributes(v)

			var id=v.dataset.tabId.trim()
			if (v.hasAttribute("data-tab-active")) {
				tabsHtml += `<li class="tab-active ${classes}" ${attributes} ${freeze.includes(id)?"data-tab-disabled":""}><a href="#">${v.innerHTML}</a></li>`
			} else {
				tabsHtml += `<li class="${classes} " ${attributes} ${freeze.includes(id)?"data-tab-disabled":""}><a href="#">${v.innerHTML}</a></li>`
			}
		})
		return tabsHtml
	}
	function makeContentItem(contentItem) {
		var contentHtml = "";
		contentItem.forEach(v => {
			var {attributes, classes} = setAttributes(v)

			if (v.hasAttribute("data-content-active")) {
				contentHtml += ` <div class="Dtab-content-item Dtab-content-active ${classes}" ${attributes}>${v.innerHTML}</div>`
			} else {
				contentHtml += ` <div class="Dtab-content-item  ${classes}" ${attributes}>${v.innerHTML}</div>`
			}

		})
		return contentHtml
	}
	function Constructor(selector) {
		/*Properties*/
		this.selector = selector
		let tabContentItems = [...document.querySelectorAll(`[data-tabs="${this.selector}"] Dtab-content-item`)]
		let tabsDiv = [...document.querySelectorAll(`dtabs[data-tabs='${this.selector}']`)]
		let tabs = [...document.querySelectorAll(`[data-tabs='${this.selector}'] Dtabs-item`)]
		tabsDiv.forEach(v => {
			if(v.hasAttribute("data-tab-verticle")){
				if(!styleSetVerticle){
					document.head.innerHTML += styleVerticle
					styleSetVerticle=true
				}
			}
			else{
				if(!styleSet){
					document.head.innerHTML += style
					styleSet=true
				}
			}
			var id = v.dataset.tabs.trim()
			var styleSeperate=v.hasAttribute("data-style-seperate")
			v.removeAttribute("data-tabs")
			const tabHtml = `<div class="Dtab-div ${styleSeperate?"Dtabs-2":""}" data-tabs="${id}">
                            <ul class="Dtabs" data-tabs-ref="#${id}">
        ${makeList(tabs)}
      
    </ul>
                            <div class="Dtabs-content" data-content-ref="#${id}">
        ${makeContentItem(tabContentItems)}
    </div>
                         </div>`
			v.innerHTML = tabHtml

			let tabUl = document.querySelector(`[data-tabs-ref="#${id}"]`)
			tabUl.addEventListener("click", function (e) {

				var li = null
				if (e.target.dataset.tabId) {
					li = e.target
				} else if (e.target.closest("[data-tab-id]")) {
					li = e.target.closest("[data-tab-id]")
				}
				if(freeze.includes(li.dataset.tabId.trim())){
					li.setAttribute("data-tab-disabled","true")
				}
				if (li && li.dataset.tabId.trim() && !freeze.includes(li.dataset.tabId.trim())) {
					var tabId = li.dataset.tabId
					var contentDiv = document.querySelector(`[data-content-ref="#${id}"]`)
					var tabDiv = document.querySelector(`[data-tabs-ref="#${id}"]`)
					var tabContent = contentDiv.querySelector(`[data-content-item="${tabId}"]`)
					var activeLi = [...tabDiv.querySelectorAll(".tab-active")] || [...tabDiv.querySelectorAll("[data-tab-active]")]
					if (tabContent) {
						if(activeLi[0]!==li){
							window.dispatchEvent(new CustomEvent("tabChange"));
						}
						activeLi.forEach(v => {
							v.classList.remove("tab-active")
							v.removeAttribute("data-tab-active")
						})
						li.classList.add("tab-active")
						li.setAttribute("data-tab-active", "")
						var activeTabContent = [...contentDiv.querySelectorAll(".Dtab-content-active")] || [...contentDiv.querySelectorAll("[data-content-active]")]
						activeTabContent.forEach(v => {
							v.classList.remove("Dtab-content-active")
							v.removeAttribute("data-content-active")
						})
						tabContent.classList.add("Dtab-content-active")
						tabContent.setAttribute("data-content-active", "")
						window.dispatchEvent(new CustomEvent("tabActive"));
					} else {
						console.error("Cant Find Tab Content")
					}
				}
			})
		})

		this.tabUl = document.querySelector(`[data-tabs-ref="#${selector}"]`)
		this.tabContent = document.querySelector(`[data-content-ref="#${selector}"]`)

		/*Methods*/
		this.addTab = (name, id) => {
			try{
				if(this.tabUl.querySelector(`[data-tab-id="${id}"]`)){
					throw new Error("duplicate id")
				}
				const tab = `<li class="" data-tab-id="${id}"><a href="#">${name}</a></li>`
				this.tabUl.insertAdjacentHTML("beforeend", tab)
				window.dispatchEvent(new CustomEvent("tabAdded"));
				return true
			}catch (e) {
				console.error("error while adding tab")
				return false
			}


		}
		this.addContent = (html, id) => {
			try {
				if(this.tabContent.querySelector(`[data-content-item="${id}"]`)){
					throw new Error("duplicate id")
				}
				const tabContent = `<div class="Dtab-content-item"  data-content-item="${id}">${html}</div>`
				this.tabContent.insertAdjacentHTML("beforeend", tabContent)
				window.dispatchEvent(new CustomEvent("contentAdded"));
			}catch (e) {
				console.error("error while adding tab")
				return false
			}

		}
		this.removeTab=(id,removeContent=false)=>{
			var tab=this.tabUl.querySelector(`[data-tab-id="${id}"]`)
			if(tab.hasAttribute("data-tab-active")){
				if(tab.nextElementSibling){
					tab.nextElementSibling.classList.add("tab-active")
					tab.nextElementSibling.setAttribute("data-tab-active","")
					var contentId=tab.nextElementSibling.dataset.tabId

					var content=this.tabContent.querySelector(`[data-content-item="${id}"]`)
					var contentNext=this.tabContent.querySelector(`[data-content-item="${contentId}"]`)
					content.classList.remove("Dtab-content-active")
					content.removeAttribute("data-content-active")
					contentNext.classList.add("Dtab-content-active")
					contentNext.setAttribute("data-content-active","")
					tab.remove()
					if(removeContent){
						this.removeContent(id)
					}
					window.dispatchEvent(new CustomEvent("tabDeleted"));
					return true
				}else{
					if(tab ===this.tabUl.lastElementChild){
						if(tab.previousElementSibling){
							var contentId=tab.previousElementSibling.dataset.tabId
							tab.previousElementSibling.classList.add("tab-active")
							tab.previousElementSibling.setAttribute("data-tab-active","")
							var content=this.tabContent.querySelector(`[data-content-item="${id}"]`)
							var contentPrev=this.tabContent.querySelector(`[data-content-item="${contentId}"]`)
							content.classList.remove("Dtab-content-active")
							content.removeAttribute("data-content-active")
							contentPrev.classList.add("Dtab-content-active")
							contentPrev.setAttribute("data-content-active","")
							tab.remove()
							if(removeContent){
								this.removeContent(id)
							}
							window.dispatchEvent(new CustomEvent("tabDeleted"));
							return true
						}else{
							return console.error("can't remove the only tab")
						}

					}else{
						return console.error("can't remove the only tab")
					}
				}
			}else{
				tab.remove()
				if(removeContent){
					this.removeContent(id)
				}
				window.dispatchEvent(new CustomEvent("tabDeleted"));
				return true
			}
		}
		this.removeContent=(id,removeTab=false)=>{
			var tabContent=this.tabContent.querySelector(`[data-content-item="${id}"]`)
			if(tabContent.hasAttribute("data-content-active")){
				if(tabContent.nextElementSibling){
					tabContent.nextElementSibling.classList.add("Dtab-content-active")
					tabContent.nextElementSibling.setAttribute("data-content-active","")
					var contentId=tabContent.nextElementSibling.dataset.contentItem

					var content=this.tabUl.querySelector(`[data-tab-id="${id}"]`)
					var contentNext=this.tabUl.querySelector(`[data-tab-id="${contentId}"]`)

					content.classList.remove("tab-active")
					content.removeAttribute("data-tab-active")
					console.log(content)
					contentNext.classList.add("tab-active")
					contentNext.setAttribute("data-tab-active","")
					tabContent.remove()
					if(removeTab){
						this.removeTab(id)
					}
					window.dispatchEvent(new CustomEvent("contentDeleted"));
					return true
				}else{
					if(tabContent ===this.tabContent.lastElementChild){
						if(tabContent.previousElementSibling){
							var contentId=tabContent.previousElementSibling.dataset.contentItem
							tabContent.previousElementSibling.classList.add("Dtab-content-active")
							tabContent.previousElementSibling.setAttribute("data-content-active","")
							var content=this.tabUl.querySelector(`[data-tab-id="${id}"]`)
							var contentPrev=this.tabUl.querySelector(`[data-tab-id="${contentId}"]`)
							content.classList.remove("tab-active")
							content.removeAttribute("data-tab-active")
							contentPrev.classList.add("tab-active")
							contentPrev.setAttribute("data-tab-active","")
							tabContent.remove()
							if(removeTab){
								this.removeTab(id)
							}
							window.dispatchEvent(new CustomEvent("contentDeleted"));
							return true
						}else{
							return console.error("can't remove the only tab")
						}

					}else{
						return console.error("can't remove the only tab")
					}
				}
			}else{
				tabContent.remove()
				if(removeTab){
					this.removeTab(id)
				}
				window.dispatchEvent(new CustomEvent("contentDeleted"));
				return true
			}
		}
		this.renameTab=(id,newName)=>{
			let tab=this.tabUl.querySelector(`[data-tab-id="${id}"] a`)
			if(tab){
				var oldName=tab.innerHTML
				tab.innerHTML=newName
				window.dispatchEvent(new CustomEvent("tabRenamed",{
					detail: {id:id,oldName:oldName,newName:newName }
				}))
			}else{
				throw new Error("Can't find tab with given id")
			}
		}
		this.changeContent=(id,newHtml)=>{
			let tabContent=this.tabContent.querySelector(`[data-content-item="${id}"]`)
			if(tabContent){
				var oldContent=tabContent.innerHTML
				tabContent.innerHTML=newHtml
				window.dispatchEvent(new CustomEvent("contentChanged",{
					detail: {id:id,oldContent:oldContent,newContent:newHtml }
				}))
			}else{
				throw new Error("Can't find tab with given id")
			}
		}
		this.changeId=(oldId,newId)=>{
			if(this.tabUl.querySelector(`[data-tab-id="${newId}"]`) ||
				this.tabContent.querySelector(`[data-content-item="${newId}"]`)
			){
				return console.error(`"${newId}" id already exist`)
			}
			let tab=this.tabUl.querySelector(`[data-tab-id="${oldId}"]`)
			let tabContent=this.tabContent.querySelector(`[data-content-item="${oldId}"]`)
			tab.dataset.tabId=newId
			tabContent.dataset.contentItem=newId
			window.dispatchEvent(new CustomEvent("idChanged",{
				detail: {oldId:oldId,newId:newId }
			}))
		}
		this.active=(id)=>{
			let activeTab=this.tabUl.querySelector(`[data-tab-active]`)
			console.log(activeTab)
			if(activeTab.dataset.tabId!==id){
				let tab=this.tabUl.querySelector(`[data-tab-id="${id}"]`)
				let content=this.tabContent.querySelector(`[data-content-item="${id}"]`)
				let activeContent=this.tabContent.querySelector(`[data-content-active]`)
				activeTab.classList.remove("tab-active")
				activeTab.removeAttribute("data-tab-active")
				tab.classList.add("tab-active")
				tab.setAttribute("data-tab-active","")

				activeContent.classList.remove("Dtab-content-active")
				activeContent.removeAttribute("data-content-active")
				content.classList.add("Dtab-content-active")
				content.setAttribute("data-content-active","")
			}
		}

		/*Events*/
		this.onTabChange=(func)=>{
			window.addEventListener("tabChange", function(event) {
				func()
			});
		}
		this.onTabAdd=(func)=>{
			window.addEventListener("tabAdded", function(event) {
				func()
			});
		}
		this.onContentAdd=(func)=>{
			window.addEventListener("contentAdded", function(event) {
				func()
			});
		}
		this.onTabRemove=(func)=>{
			window.addEventListener("tabDeleted", function(event) {
				func()
			});
		}
		this.onContentRemove=(func)=>{
			window.addEventListener("contentDeleted", function(event) {
				func()
			});
		}
		this.onTabRename=(func)=>{
			window.addEventListener("tabRenamed", function(event) {
				func(event.detail.id,event.detail.oldName,event.detail.newName)
			});
		}
		this.onChangeContent=(func)=>{
			window.addEventListener("contentChanged", function(event) {
				func(event.detail.id,event.detail.oldContent,event.detail.newContent)
			});
		}
		this.onIdChange=(func)=>{
			window.addEventListener("idChanged", function(event) {
				func(event.detail.oldId,event.detail.newId)
			});
		}
		this.onActive=(func)=>{
			window.addEventListener("tabActive", function(event) {
				func()
			});
		}

		/*Navigation Control Methods*/
		this.nextTab=()=>{
			let activeTab=this.tabUl.querySelector(`[data-tab-active]`)
			if(activeTab.nextElementSibling){
				var id=activeTab.nextElementSibling.dataset.tabId
				let content=this.tabContent.querySelector(`[data-content-item="${id}"]`)
				let activeContent=this.tabContent.querySelector(`[data-content-active]`)
				if(content){
					activeTab.classList.remove("tab-active")
					activeTab.removeAttribute("data-tab-active")
					activeTab.nextElementSibling.classList.add("tab-active")
					activeTab.nextElementSibling.setAttribute("data-tab-active","")

					activeContent.classList.remove("Dtab-content-active")
					activeContent.removeAttribute("data-content-active")
					content.classList.add("Dtab-content-active")
					content.setAttribute("data-content-active","")
					return true
				}else{
					return console.error("can't find tab content")
				}
			}else{
				return false
			}
		}
		this.prevTab=()=>{
			let activeTab=this.tabUl.querySelector(`[data-tab-active]`)
			if(activeTab.previousElementSibling){
				var id=activeTab.previousElementSibling.dataset.tabId
				let content=this.tabContent.querySelector(`[data-content-item="${id}"]`)
				let activeContent=this.tabContent.querySelector(`[data-content-active]`)
				if(content){
					activeTab.classList.remove("tab-active")
					activeTab.removeAttribute("data-tab-active")
					activeTab.previousElementSibling.classList.add("tab-active")
					activeTab.previousElementSibling.setAttribute("data-tab-active","")

					activeContent.classList.remove("Dtab-content-active")
					activeContent.removeAttribute("data-content-active")
					content.classList.add("Dtab-content-active")
					content.setAttribute("data-content-active","")
					return true
				}else{
					return console.error("can't find tab content")
				}

			}else{
				return false
			}
		}
		this.disable=(id)=>{
			if(freeze.includes(id)){
				return console.error("tab is already disabled")
			}
			freeze.push(id)
			var tab=this.tabUl.querySelector(`[data-tab-id="${id}"]`)
			var content=this.tabContent.querySelector(`[data-content-item="${id}"]`)
			var activeTab=this.tabUl.querySelector("[data-tab-active]")
			var firstTab=this.tabUl.firstElementChild
			var firstContent=this.tabContent.firstElementChild
			var activeContent=this.tabContent.querySelector("[data-content-active]")
			if(tab.nextElementSibling && tab.nextElementSibling.dataset.tabId){
				if(freeze.includes(tab.nextElementSibling.dataset.tabId.trim())){
					activeTab.classList.remove("tab-active")
					activeTab.removeAttribute("data-tab-active")
					firstTab.classList.add("tab-active")
					firstTab.setAttribute("data-tab-active","")

					activeContent.classList.remove("Dtab-content-active")
					activeContent.removeAttribute("data-content-active")
					firstContent.classList.add("Dtab-content-active")
					firstContent.setAttribute("data-content-active","")
				}else{
					if(tab===activeTab){
						content.classList.remove("Dtab-content-active")
						content.removeAttribute("data-content-active")
						content.nextElementSibling.classList.add("Dtab-content-active")
						content.nextElementSibling.setAttribute("data-content-active","")
						tab.classList.remove("tab-active")
						tab.removeAttribute("data-tab-active")
						tab.nextElementSibling.classList.add("tab-active")
						tab.nextElementSibling.setAttribute("data-tab-active","")

					}
					tab.setAttribute("data-tab-disabled","true")

				}
			}else if(tab.previousElementSibling && tab.previousElementSibling.dataset.tabId){


				if(freeze.includes(tab.previousElementSibling.dataset.tabId.trim())){



					activeTab.classList.remove("tab-active")
					activeTab.removeAttribute("data-tab-active")
					firstTab.classList.add("tab-active")
					firstTab.setAttribute("data-tab-active","")

					activeContent.classList.remove("Dtab-content-active")
					activeContent.removeAttribute("data-content-active")
					firstContent.classList.add("Dtab-content-active")
					firstContent.setAttribute("data-content-active","")

				}else{
					if(tab===activeTab) {
						content.classList.remove("Dtab-content-active")
						content.removeAttribute("data-content-active")
						content.previousElementSibling.classList.add("Dtab-content-active")
						content.previousElementSibling.setAttribute("data-content-active", "")
						tab.classList.remove("tab-active")
						tab.removeAttribute("data-tab-active")
						tab.previousElementSibling.classList.add("tab-active")
						tab.previousElementSibling.setAttribute("data-tab-active", "")
					}
					tab.setAttribute("data-tab-disabled", "true")
				}
			}
		}
		this.enable=(id)=>{
			var arrayId=freeze.indexOf(id)
			if (arrayId > -1) {
				freeze.splice(arrayId, 1);
			}
			var tab=this.tabUl.querySelector(`[data-tab-id="${id}"]`)
			tab.removeAttribute("data-tab-disabled")
		}
	}

	return function instance(sel) {
		if(!sel){
			return console.error("Must provide a tab id to method Dtabs()")
		}
		if(instances.includes(sel)){
			return console.error(`instance for ${sel} is alerady in use`)
		}
		instances.push(sel)
		return new Constructor(sel)
	}
})()