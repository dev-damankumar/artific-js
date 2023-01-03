const Loader = (function () {
	const style = `<style data-loader-style>
	.artific-loader-loading {
			overflow: hidden
		}

		.artific-loader-modal {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: #000000a8;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 999999;
			display: none
		}

		.artific-loader-modal.artific-loader-modal-show {
			display: flex
		}

		.artific-loader-modal.artific-loader-modal-hide {
			display: none
		}

		.artific-loader, .artific-loader:after, .artific-loader:before {
			background: #fff;
			-webkit-animation: load1 1s infinite ease-in-out;
			animation: load1 1s infinite ease-in-out;
			width: 1em;
			height: 4em
		}

		.artific-loader {
			color: #fff;
			text-indent: -9999em;
			margin: 88px auto;
			position: relative;
			font-size: 11px;
			-webkit-transform: translateZ(0);
			-ms-transform: translateZ(0);
			transform: translateZ(0);
			-webkit-animation-delay: -.16s;
			animation-delay: -.16s
		}

		.artific-loader:after, .artific-loader:before {
			position: absolute;
			top: 0;
			content: ''
		}

		.artific-loader:before {
			left: -1.5em;
			-webkit-animation-delay: -.32s;
			animation-delay: -.32s
		}

		.artific-loader:after {
			left: 1.5em
		}

		@-webkit-keyframes load1 {
			0%, 100%, 80% {
				box-shadow: 0 0;
				height: 4em
			}
			40% {
				box-shadow: 0 -2em;
				height: 5em
			}
		}

		@keyframes load1 {
			0%, 100%, 80% {
				box-shadow: 0 0;
				height: 4em
			}
			40% {
				box-shadow: 0 -2em;
				height: 5em
			}
		}
</style>`
	const loader = `<div data-loader-modal class="artific-loader-modal">
    <div class="artific-loader">Loading...</div></div>`
	
	function Constructor() {
		if(typeof window === "undefined") return
		window.addEventListener('DOMContentLoaded',()=>{

			if (!document.querySelector("[data-loader-style]")) {
				document.head.insertAdjacentHTML("beforeend",style)
			}
			if (!document.querySelector("[data-loader-modal]")) {
				document.body.insertAdjacentHTML("beforeend",loader)
			}

			this.selector = document.querySelector(".artific-loader-modal")
			this.show=()=> {
				if (this.selector) {
					document.body.classList.add("artific-loader-loading")
					this.selector.classList.remove("artific-loader-modal-hide")
					this.selector.classList.add("artific-loader-modal-show")
				} else {
					document.body.innerHTML += loader
					this.selector = document.querySelector(".loader-modal")
					this.show()
				}
			}

			this.hide=()=> {
				if (this.selector) {
					document.body.classList.remove("artific-loader-loading")
					this.selector.classList.remove("artific-loader-modal-show")
					this.selector.classList.add("artific-loader-modal-hide")
				}
			}

			this.destroy=()=> {
				if (this.selector) {
					document.body.classList.remove("artific-loader-loading")
					this.selector.remove()
					this.selector = undefined
				}
			}
		})

	}

	return function instance() {
		return new Constructor()
	}
	
})()
