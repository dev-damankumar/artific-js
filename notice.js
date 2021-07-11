const Notice = (function () {
	
	delay = 0
	style=`<style data-chip-style>
.chip-box{font-family: "Segoe UI",sans-serif}
   @font-face{font-family:SegoeUI;src:local("Segoe UI"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");font-weight:400}@keyframes fromLeft{0%{transform:translateX(-500px)}100%{transform:translateX(0)}}.chip-box{border-radius:10px;padding:15px;display:flex;align-items:flex-start;backdrop-filter:blur(2px);margin-top:10px;box-shadow:0 1px 3px 0 rgb(60 64 67 / 30%),0 4px 8px 3px rgb(60 64 67 / 15%);-webkit-font-smoothing:antialiased;letter-spacing:.2px;background-color:#202124e8;animation:fromLeft .5s ease;transition:all .5s ease;min-width:300px;max-width:500px}.chip-box.chip-box-close{transform:translateX(-500px)}.chip-wrapper{position:fixed;bottom:20px;left:20px;display:flex;flex-direction:column;align-items:flex-start}button.chip-close{background:0 0;border:none;backdrop-filter:blur(10px);border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;margin-left:auto}button.chip-close svg path{fill:#fff}button.chip-close svg{width:18px;height:18px}.chip-box p{color:#fff;font-size:16px;margin:0;margin-right:15px}.chip-box-destroying{height:0;margin:0;padding:0}
</style>`
	
	function Constructor() {
		let timeHandler=null;
		if(!document.querySelector("[ data-chip-style]")){
			document.head.innerHTML+=style;
		}
		
		function destroyMessage(toast) {
			toast.classList.add("chip-box-close")
			setTimeout(function () {
				toast.classList.add("chip-box-destroying")
			}, 200)
			setTimeout(function () {
				toast.remove()
			}, 400)
		}
		
		function setTimeForDestroy (toast) {
			destroyMessage(toast)
		}
		
		function makeMessage(msg) {
			let div = document.createElement("div")
			div.className = `chip-box`
			const message = `<p>${msg}</p>
      <button type="button" class="chip-close">
         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9,0.493C4.302,0.493,0.493,4.302,0.493,9S4.302,17.507,9,17.507
         S17.507,13.698,17.507,9S13.698,0.493,9,0.493z M12.491,11.491c0.292,0.296,0.292,0.773,0,1.068c-0.293,0.295-0.767,0.295-1.059,0
         l-2.435-2.457L6.564,12.56c-0.292,0.295-0.766,0.295-1.058,0c-0.292-0.295-0.292-0.772,0-1.068L7.94,9.035L5.435,6.507
         c-0.292-0.295-0.292-0.773,0-1.068c0.293-0.295,0.766-0.295,1.059,0l2.504,2.528l2.505-2.528c0.292-0.295,0.767-0.295,1.059,0
         s0.292,0.773,0,1.068l-2.505,2.528L12.491,11.491z"></path>
         </svg>
      </button>`
			div.innerHTML = message
			div.querySelector('.chip-close').addEventListener("click", () => {
				destroyMessage(div.querySelector('.chip-close').parentElement)
			})
			return div
		}
		
		function render(toast) {
			this.delay++
			let timer = this.delay / 2 * 1000
			setTimeout(() => {
				let wrapperExist = document.querySelector(`[data-chip-wrapper]`)
				if (wrapperExist) {
					return wrapperExist.insertAdjacentElement("beforeend", toast)
				}
				let wrapper = document.createElement('div')
				wrapper.className = 'chip-wrapper'
				wrapper.setAttribute("data-chip-wrapper", "")
				wrapper.append(toast)
				document.body.append(wrapper)
				this.delay = 0
			}, timer)
			
			timeHandler = setTimeout(setTimeForDestroy.bind(this, toast), 5000 + timer)
		}
		
		this.message = (message) => {
			let toast = makeMessage(message);
			render(toast)
			return this
		}
		
		this.hold = () => {
			clearTimeout(timeHandler)
		}
	}
	
	
	return function instance() {
		return new Constructor()
	}
	
})()