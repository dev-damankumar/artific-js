const Dtabs = (function () {
	const instances = []
	const style = `<style>:root{--color1:#f9826c;--color2:#fafbfc;--color3:#1b1f2326}@font-face{font-family:SegoeUI;src:local("Segoe UI"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");font-weight:400}@font-face{font-family:SegoeUI Semibold;src:local("Segoe UI Semibold"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2) format("woff2"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff) format("woff"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf) format("truetype");font-weight:700}.Dtab-div{background:#fff;border-radius:5px;box-shadow:0 1px 13px rgb(0 0 0 / 10%);overflow:hidden}.Dtab-div *{font-family:SegoeUI,sans-serif;color:#302c3c;line-height:1.5;box-sizing:border-box;-webkit-transition:all .5s ease;transition:all .5s ease;outline:0}li[data-tab-disabled=true],li[data-tab-disabled=true] *{cursor:not-allowed!important;user-select:none}ul.Dtabs{display:flex;flex-wrap:nowrap;width:100%;overflow-x:auto;overflow-y:hidden;align-items:center;list-style:none;padding:0;padding-bottom:1px;box-shadow:0 1px 0 rgb(0 0 0 / 10%);border:none;margin:0;background:#f8f8f8;border-radius:5px 5px 0 0}.Dtabs-2 ul.Dtabs{box-shadow:0 1px 13px rgb(0 0 0 / 10%);border-radius:5px}.Dtabs-2 ul.Dtabs>li{border-radius:5px}li.tab-active,li[data-tab-active]{background:#fff}.Dtab-content-item{display:none}ul.Dtabs>li>a{color:gray;text-decoration:none;line-height:2;color:#6a737d;font-size:14px;display:flex;align-items:center;flex-wrap:wrap;font-family:"SegoeUI SemiBold",sans-serif!important;justify-content:flex-start;position:relative;font-family:"Segoe UI";white-space:nowrap}.Dtabs-content{padding:15px}ul.Dtabs>li{padding:7px 20px;position:relative;cursor:pointer}ul.Dtabs>li.data-tab-active:before,ul.Dtabs>li[data-tab-active]:before{content:"";position:absolute;bottom:-1px;left:0;width:100%;height:100%;border-bottom:2px solid #f9826c}ul.Dtabs>li:hover::before{content:"";position:absolute;bottom:-1px;left:0;width:100%;height:100%;border-bottom:2px solid #d1d5da}ul.Dtabs>li.tab-active:hover:before,ul.Dtabs>li[data-tab-active]:hover:before{border-bottom:2px solid #f9826c}ul.Dtabs>li.tab-active a,ul.Dtabs>li[data-tab-active] a{color:#343e57}.Dtab-content-item h1,.Dtab-content-item h2,.Dtab-content-item h3,.Dtab-content-item h4,.Dtab-content-item h5,.Dtab-content-item h6{margin:0;color:#343e57;font-family:SegoeUI SemiBold,sans-serif}.Dtab-content-item.Dtab-content-active,[data-content-active]{display:block}.Dtab-div.Dtabs-2{box-shadow:none;overflow:visible}.Dtab-div.Dtabs-2 .Dtabs-content{box-shadow:0 1px 13px rgb(0 0 0 / 10%);margin-top:15px;border-radius:5px}ul.Dtabs-dropdown{position:absolute;background:#fff;padding:0;list-style:none;box-shadow:0 4px 8px 0 rgb(0 0 0 / 20%);border-radius:5px;min-width:180px;top:100%;left:12px}li.more-tab:hover:before{display:none}ul.Dtabs-dropdown{display:none}li.more-tab{display:flex;align-items:center;padding:10px!important;margin-left:5px}li.more-tab:hover{background:#fff;border-radius:50px!important}ul.Dtabs-dropdown li a{text-decoration:none;padding:5px 15px;display:block;color:#6a737d}ul.Dtabs-dropdown{padding:5px 0}</style>`
	const styleVerticle = `<style>.Dtab-div{display:flex;align-items:flex-start}.Dtabs-2 ul.Dtabs>li{width:100%}.Dtab-div *{font-family:SegoeUI,sans-serif;color:#302c3c;line-height:1.5;box-sizing:border-box;-webkit-transition:all .5s ease;transition:all .5s ease;outline:0}ul.Dtabs{display:flex;flex-wrap:nowrap;flex-direction:column}ul.Dtabs{flex:0 0 200px;max-width:300px}.Dtabs-2 ul.Dtabs>li{border-radius:0;border-bottom:1px solid #f4f4f4!important}ul.Dtabs>li>a{font-size:15px}ul.Dtabs>li{padding:10px 15px}ul.Dtabs>li:hover::before{border-bottom:none}ul.Dtabs>li.data-tab-active:before,ul.Dtabs>li[data-tab-active]:before{border-left:2px solid #f9826c;border-bottom:none!important}ul.Dtabs>li:hover::before{border-left:2px solid #d1d5da}ul.Dtabs>li.tab-active:hover:before,ul.Dtabs>li[data-tab-active]:hover:before{border-left:2px solid #f9826c}.Dtab-div.Dtabs-2 .Dtabs-content{margin-top:0;flex:0 0 calc(100% - 220px);margin-left:20px}</style>`
	let styleSetVerticle = false
	let styleSet = false
	
	function Constructor(selector) {
		/*Properties*/
		const freeze = []
		let activeElement = null
		let setActive = (id, oldTab, newTab, oldContent = false, newContent = false) => {
			if(freeze.includes(id)) return console.error("can't active the disabled tab")
			if (!oldContent) oldContent = this.tabContent.querySelector(`[data-content-active]`)
			if (!newContent) newContent = this.tabContent.querySelector(`[data-content-item="${id}"]`)
			if (!(newContent) ) return console.error("can't find tab content")
			oldTab.classList.remove("tab-active")
			oldTab.removeAttribute("data-tab-active")
			newTab.classList.add("tab-active")
			newTab.setAttribute("data-tab-active", "")
			oldContent.classList.remove("Dtab-content-active")
			oldContent.removeAttribute("data-content-active")
			newContent.classList.add("Dtab-content-active")
			newContent.setAttribute("data-content-active", "")
			updateActive({id: newTab.dataset.tabId,el: newTab}, {id: newContent.dataset.contentItem,el: newContent})
		}
		function setAttributes(el) {
			let attrArray = [...el.attributes]
			let attributes = ""
			let classNames = ""
			attrArray.forEach(v => {
				if (v.name.trim() !== "data-tab-disabled" && v.name.trim() !== "data-tab-active" && v.name.trim() !== "data-content-active") {
					if (v.name.trim() !== "class") {
						attributes += `${v.name}="${v.value}" `
					} else {
						if (v.value.trim() !== "tab-active") {
							classNames += `${v.value} `
						}
					}
				}
			})
			return {attributes, classes: classNames}
		}
		function makeList(tabs) {
			let tabsHtml = "";
			tabs.forEach((v, i) => {
				let {attributes, classes} = setAttributes(v)
				let id = v.dataset.tabId.trim()
				tabsHtml += `<li class="${classes} ${i === 0 ? "tab-active" : ""}" ${i === 0 ? "data-tab-active" : ""} ${attributes} ${freeze.includes(id) ? "data-tab-disabled" : ""}><a href="#">${v.innerHTML}</a></li>`
			})
			return tabsHtml
		}
		function makeContentItem(contentItem) {
			let contentHtml = "";
			contentItem.forEach((v, i) => {
				let {attributes, classes} = setAttributes(v)
				contentHtml += ` <div class="Dtab-content-item ${i === 0 ? "Dtab-content-active" : ""} ${classes}" ${i === 0 ? "data-content-active" : ""} ${attributes}>${v.innerHTML}</div>`
			})
			return contentHtml
		}
		function updateActive(tab, content) {
			if (!(tab || content)) return false
			if ((tab.constructor === "object" || typeof tab === "object") && (content.constructor === "object" || typeof content === "object")) {
				if ("id" in tab) activeElement.activeTab.id = tab.id
				if ("el" in tab) activeElement.activeTab.el = tab.el
				if ("id" in content) activeElement.activeContent.id = tab.id
				if ("el" in content) activeElement.activeContent.el = tab.el
				console.table(activeElement)
				return activeElement
			}
		}
		
		this.selector = selector.toString().trim()
		this.tab = [...document.querySelectorAll(`dtabs[data-tabs="${this.selector}"]`)]
		let tabContents = [...document.querySelectorAll(`[data-tabs="${this.selector}"] Dtab-content-item`)]
		let tabItems = [...document.querySelectorAll(`[data-tabs='${this.selector}'] Dtabs-item`)]
		
		this.tab.forEach(v => {
			if (v.hasAttribute("data-tab-verticle")) {
				if (!styleSetVerticle) {
					document.head.innerHTML += styleVerticle
					styleSetVerticle = true
				}
			} else {
				if (!styleSet) {
					document.head.innerHTML += style
					styleSet = true
				}
			}
			let id = this.selector
			let styleSeperate = v.hasAttribute("data-style-seperate")
			v.removeAttribute("data-tabs")
			const tabHtml = `<div class="Dtab-div ${styleSeperate ? "Dtabs-2" : ""}" data-tabs="${id}"><ul class="Dtabs" data-tabs-ref="#${id}">${makeList(tabItems)}</ul><div class="Dtabs-content" data-content-ref="#${id}">${makeContentItem(tabContents)}</div></div>`
			v.innerHTML = tabHtml
			let tabUl = v.querySelector(`[data-tabs-ref="#${id}"]`)
			tabUl.addEventListener("click", (e) => {
				let li = null
				if (e.target.dataset.tabId) {
					li = e.target
				} else if (e.target.closest("[data-tab-id]")) {
					li = e.target.closest("[data-tab-id]")
				}
				if (freeze.includes(li.dataset.tabId.trim())) {
					li.setAttribute("data-tab-disabled", "true")
				}
				if (li && li.dataset.tabId.trim() && !freeze.includes(li.dataset.tabId.trim())) {
					let tabId = li.dataset.tabId
					let tabContent = document.querySelector(`[data-content-ref="#${id}"]`)
					let tabDiv = document.querySelector(`[data-tabs-ref="#${id}"]`)
					let tabContentItem = tabContent.querySelector(`[data-content-item="${tabId}"]`)
					let activeLi = [...tabDiv.querySelectorAll(".tab-active")] || [...tabDiv.querySelectorAll("[data-tab-active]")]
					if (tabContentItem) {
						if (activeLi[0] !== li) {
							window.dispatchEvent(new CustomEvent("tabChange"));
						}
						activeLi.forEach(v => {
							v.classList.remove("tab-active")
							v.removeAttribute("data-tab-active")
						})
						li.classList.add("tab-active")
						li.setAttribute("data-tab-active", "")
						let activeTabContent = [...tabContent.querySelectorAll(".Dtab-content-active")] || [...tabContent.querySelectorAll("[data-content-active]")]
						activeTabContent.forEach(v => {
							v.classList.remove("Dtab-content-active")
							v.removeAttribute("data-content-active")
						})
						tabContentItem.classList.add("Dtab-content-active")
						tabContentItem.setAttribute("data-content-active", "")
						window.dispatchEvent(new CustomEvent("tabActive"));
						updateActive({
							id: li.dataset.tabId,
							el: li
						}, {
							id: tabContentItem.dataset.contentItem,
							el: tabContentItem
						})
					} else {
						console.error("Cant Find Tab Content")
					}
				}
			})
		})
		
		this.tabUl = document.querySelector(`[data-tabs-ref="#${selector}"]`)
		this.tabContent = document.querySelector(`[data-content-ref="#${selector}"]`)
		activeElement = {
			activeTab: {
				id: this.tabUl.firstElementChild.dataset.tabId,
				el: this.tabUl.firstElementChild
			},
			activeContent: {
				id: this.tabContent.firstElementChild.dataset.contentItem,
				el: this.tabContent.firstElementChild
			}
		}
		Object.seal(activeElement);
		/*Methods*/
		this.addTab = (name, id) => {
			try {
				if (this.tabUl.querySelector(`[data-tab-id="${id}"]`)) {
					throw new Error("duplicate id")
				}
				const tab = `<li class="" data-tab-id="${id}"><a href="#">${name}</a></li>`
				this.tabUl.insertAdjacentHTML("beforeend", tab)
				window.dispatchEvent(new CustomEvent("tabAdded"));
				return true
			} catch (e) {
				console.error("error while adding tab")
				return false
			}
		}
		this.addContent = (html, id) => {
			try {
				if (this.tabContent.querySelector(`[data-content-item="${id}"]`)) {
					throw new Error("duplicate id")
				}
				const tabContent = `<div class="Dtab-content-item"  data-content-item="${id}">${html}</div>`
				this.tabContent.insertAdjacentHTML("beforeend", tabContent)
				window.dispatchEvent(new CustomEvent("contentAdded"));
			} catch (e) {
				console.error("error while adding tab")
				return false
			}
			
		}
		this.removeTab = (id, removeContent = false) => {
			let tab = this.tabUl.querySelector(`[data-tab-id="${id}"]`)
			if (id === activeElement.activeTab.id && id === activeElement.activeContent.id) {
				if (tab.nextElementSibling) {
					this.nextTab()
					tab.remove()
					if (removeContent) {
						this.removeContent(id)
					}
					window.dispatchEvent(new CustomEvent("tabDeleted"));
					return true
				} else {
					if (tab === this.tabUl.lastElementChild) {
						if (tab.previousElementSibling) {
							this.prevTab()
							tab.remove()
							if (removeContent) {
								this.removeContent(id)
							}
							window.dispatchEvent(new CustomEvent("tabDeleted"));
							return true
						} else {
							return console.error("can't remove the only tab")
						}
					} else {
						return console.error("can't remove the only tab")
					}
				}
			} else {
				tab.remove()
				if (removeContent) {
					this.removeContent(id)
				}
				window.dispatchEvent(new CustomEvent("tabDeleted"));
				return true
			}
		}
		this.removeContent = (id, removeTab = false) => {
			let tabContent = this.tabContent.querySelector(`[data-content-item="${id}"]`)
			if (tabContent.hasAttribute("data-content-active")) {
				if (tabContent.nextElementSibling) {
					this.nextTab()
					tabContent.remove()
					if (removeTab) {
						this.removeTab(id)
					}
					window.dispatchEvent(new CustomEvent("contentDeleted"));
					return true
				} else {
					if (tabContent === this.tabContent.lastElementChild) {
						if (tabContent.previousElementSibling) {
							this.prevTab()
							tabContent.remove()
							if (removeTab) {
								this.removeTab(id)
							}
							window.dispatchEvent(new CustomEvent("contentDeleted"));
							return true
						} else {
							return console.error("can't remove the only tab")
						}
					} else {
						return console.error("can't remove the only tab")
					}
				}
			} else {
				tabContent.remove()
				if (removeTab) {
					this.removeTab(id)
				}
				window.dispatchEvent(new CustomEvent("contentDeleted"));
				return true
			}
		}
		this.renameTab = (id, newName) => {
			let tab = this.tabUl.querySelector(`[data-tab-id="${id}"] a`)
			if (tab) {
				let oldName = tab.innerHTML
				tab.innerHTML = newName
				window.dispatchEvent(new CustomEvent("tabRenamed", {
					detail: {id: id, oldName: oldName, newName: newName}
				}))
			} else {
				throw new Error("Can't find tab with given id")
			}
		}
		this.changeContent = (id, newHtml) => {
			let tabContent = this.tabContent.querySelector(`[data-content-item="${id}"]`)
			if (tabContent) {
				let oldContent = tabContent.innerHTML
				tabContent.innerHTML = newHtml
				window.dispatchEvent(new CustomEvent("contentChanged", {
					detail: {id: id, oldContent: oldContent, newContent: newHtml}
				}))
			} else {
				throw new Error("Can't find tab with given id")
			}
		}
		this.changeId = (oldId, newId) => {
			if (oldId === activeElement.activeTab.id && oldId === activeElement.activeContent.id) {
				updateActive({id: newId}, {id: newId})
			}
			if (this.tabUl.querySelector(`[data-tab-id="${newId}"]`) ||
				this.tabContent.querySelector(`[data-content-item="${newId}"]`)
			) {
				return console.error(`"${newId}" id already exist`)
			}
			let tab = this.tabUl.querySelector(`[data-tab-id="${oldId}"]`)
			let tabContent = this.tabContent.querySelector(`[data-content-item="${oldId}"]`)
			tab.dataset.tabId = newId
			tabContent.dataset.contentItem = newId
			window.dispatchEvent(new CustomEvent("idChanged", {
				detail: {oldId: oldId, newId: newId}
			}))
		}
		this.active = (id) => {
			let activeTab = this.tabUl.querySelector(`[data-tab-active]`)
			if (activeTab.dataset.tabId !== id) {
				let tab = this.tabUl.querySelector(`[data-tab-id="${id}"]`)
				setActive(id, activeTab, tab)
			}
		}
		
		/*Events*/
		this.onTabChange = (func) => {
			window.addEventListener("tabChange", function (event) {
				func()
			});
		}
		this.onTabAdd = (func) => {
			window.addEventListener("tabAdded", function (event) {
				func()
			});
		}
		this.onContentAdd = (func) => {
			window.addEventListener("contentAdded", function (event) {
				func()
			});
		}
		this.onTabRemove = (func) => {
			window.addEventListener("tabDeleted", function (event) {
				func()
			});
		}
		this.onContentRemove = (func) => {
			window.addEventListener("contentDeleted", function (event) {
				func()
			});
		}
		this.onTabRename = (func) => {
			window.addEventListener("tabRenamed", function (event) {
				func(event.detail.id, event.detail.oldName, event.detail.newName)
			});
		}
		this.onChangeContent = (func) => {
			window.addEventListener("contentChanged", function (event) {
				func(event.detail.id, event.detail.oldContent, event.detail.newContent)
			});
		}
		this.onIdChange = (func) => {
			window.addEventListener("idChanged", function (event) {
				func(event.detail.oldId, event.detail.newId)
			});
		}
		this.onActive = (func) => {
			window.addEventListener("tabActive", function (event) {
				func()
			});
		}
		/*Navigation Control Methods*/
		this.nextTab = () => {
			let activeTab = this.tabUl.querySelector(`[data-tab-active]`)
			if (!(activeTab.nextElementSibling)) return false
			let id = activeTab.nextElementSibling.dataset.tabId
			if (freeze.includes(id)) return  false
			setActive(id, activeTab, activeTab.nextElementSibling)
			return true
		}
		this.prevTab = () => {
			let activeTab = this.tabUl.querySelector(`[data-tab-active]`)
			if (!(activeTab.previousElementSibling)) return false
			var id = activeTab.previousElementSibling.dataset.tabId
			if (freeze.includes(id)) return  false
			setActive(id, activeTab, activeTab.previousElementSibling)
			return true
		}
		this.disable = (id) => {
			if (freeze.includes(id)) console.error("tab is already disabled")
			freeze.push(id)
			let tab = this.tabUl.querySelector(`[data-tab-id="${id}"]`)
			let content = this.tabContent.querySelector(`[data-content-item="${id}"]`)
			let activeTab = this.tabUl.querySelector("[data-tab-active]")
			let firstTab = this.tabUl.firstElementChild
			let firstContent = this.tabContent.firstElementChild
			let activeContent = this.tabContent.querySelector("[data-content-active]")
			if (tab.nextElementSibling && tab.nextElementSibling.dataset.tabId) {
				if (freeze.includes(tab.nextElementSibling.dataset.tabId.trim())) {
					setActive(id, activeTab, firstTab)
				} else {
					if (tab === activeTab) {
						setActive(id, tab, tab.nextElementSibling, content, content.nextElementSibling)
					}
					tab.setAttribute("data-tab-disabled", "true")
				}
			} else if (tab.previousElementSibling && tab.previousElementSibling.dataset.tabId) {
				if (freeze.includes(tab.previousElementSibling.dataset.tabId.trim())) {
					setActive(id, activeTab, firstTab, activeContent, firstContent)
				} else {
					if (tab === activeTab) {
						setActive(id, tab, tab.previousElementSibling, content, content.previousElementSibling)
					}
					tab.setAttribute("data-tab-disabled", "true")
				}
			}
		}
		this.enable = (id) => {
			let arrayId = freeze.indexOf(id)
			if (arrayId > -1) freeze.splice(arrayId, 1);
			let tab = this.tabUl.querySelector(`[data-tab-id="${id}"]`)
			tab.removeAttribute("data-tab-disabled")
		}
	}
	
	return function instance(sel) {
		if (!sel) {
			return console.error("Must provide a tab id to method Dtabs()")
		}
		if (instances.includes(sel)) {
			return console.error(`instance for ${sel} is alerady in use`)
		}
		instances.push(sel)
		return new Constructor(sel)
	}
})()