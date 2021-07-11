const Loader = (function () {
	style = `<style data-loader-style>.loader-loading{overflow:hidden}.loader-modal{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:#000000a8;display:flex;align-items:center;justify-content:center;z-index:999999;display:none}.loader-modal.loader-modal-show{display:flex}.loader-modal.loader-modal-hide{display:none}.loader,.loader:after,.loader:before{background:#fff;-webkit-animation:load1 1s infinite ease-in-out;animation:load1 1s infinite ease-in-out;width:1em;height:4em}.loader{color:#fff;text-indent:-9999em;margin:88px auto;position:relative;font-size:11px;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation-delay:-.16s;animation-delay:-.16s}.loader:after,.loader:before{position:absolute;top:0;content:''}.loader:before{left:-1.5em;-webkit-animation-delay:-.32s;animation-delay:-.32s}.loader:after{left:1.5em}@-webkit-keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}@keyframes load1{0%,100%,80%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}</style>`
	loader = `<div data-loader-modal class="loader-modal">
    <div class="loader">Loading...</div></div>`
	
	function Constructor() {
		if (!document.querySelector("[data-loader-style]")) {
			document.head.innerHTML += style
		}
		if (!document.querySelector("[data-loader-modal]")) {
			document.body.innerHTML += loader
		}
		this.selector = document.querySelector(".loader-modal")
		
		this.show=()=> {
			if (this.selector) {
				document.body.classList.add("loader-loading")
				this.selector.classList.remove("loader-modal-hide")
				this.selector.classList.add("loader-modal-show")
			} else {
				document.body.innerHTML += loader
				this.selector = document.querySelector(".loader-modal")
				this.show()
			}
		}
		
		this.hide=()=> {
			if (this.selector) {
				document.body.classList.remove("loader-loading")
				this.selector.classList.remove("loader-modal-show")
				this.selector.classList.add("loader-modal-hide")
			}
		}
		
		this.destroy=()=> {
			if (this.selector) {
				document.body.classList.remove("loader-loading")
				this.selector.remove()
				this.selector = undefined
			}
		}
	}
	
	
	
	return function instance() {
		return new Constructor()
	}
	
})()
