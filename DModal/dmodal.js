const DModal = (function initModal() {
	let dModal = [...document.querySelectorAll("d-modal")]
	let dModalButton = [...document.querySelectorAll("d-modal-button")]
	dModalButton.forEach(v => {
		let buttonHtml = v.innerHTML
		let buttonId = v.dataset.modalOpen
		let dModalButton = `<button type="button" data-modal-open="${buttonId}">${buttonHtml}</button>`
		v.innerHTML = dModalButton
		v.removeAttribute("data-modal-open")
	})
	dModal.forEach(v => {
		let modalId = v.dataset.modal
		let modalBody = v.querySelector("d-modal-body")
		if (modalBody && modalBody.innerHTML) {
			modalBody = modalBody.innerHTML
		} else {
			if (modalBody) {
				modalBody.remove()
			}
			modalBody = v.innerHTML
		}
		let modalFooter = v.querySelector("d-modal-footer")
		let modalHeader = v.querySelector("d-modal-header")
		let headerHeading = v.dataset.modalHeader
		let successBtn = v.dataset.successButton
		let cancelBtn = v.dataset.cancelButton
		let cancelBtnEvent = v.dataset.cancel
		let closeBtnEvent = v.dataset.close
		let modalContent = v.dataset.modalContent ? v.dataset.modalContent : ""
		let modalContentValues = ["left", "right", "full", "bottom", "sm", "md"]
		if (!modalContentValues.includes(modalContent)) {
			modalContent = null
			console.error(`data-modal-content contains invalid value`)
		}
		let dModalHtml = `<div class="dModal" data-modal="${modalId}">
    <div class="dModal-content ${modalContent ? `dModal-${modalContent}-content` : ""}" data-modal-content="${modalContent}">
        <div class="dModal-header">
        ${modalHeader && modalHeader.innerHTML ? modalHeader.innerHTML : `<h3>${headerHeading ? headerHeading : "Modal Heading"}</h3>
            <span class="dModal-close" ${closeBtnEvent !== "none" ? `data-modal-${closeBtnEvent === "destroy" ? "destroy" : closeBtnEvent === "dismiss" ? "close" : console.error("data-cancel must have appropriate value")}` : ""} >&times;</span>`}

        </div>
        <div class="dModal-body">
            ${modalBody ? modalBody : ""}
        </div>
        <div class="dModal-footer">
        ${modalFooter && modalFooter.innerHTML ? modalFooter.innerHTML : `
            <div class="d-modal-button-div">
            <button type="button" data-modal-success>${successBtn ? successBtn : "Submit"}</button>
            <button type="reset" ${cancelBtnEvent !== "none" ? `data-modal-${(cancelBtnEvent === "destroy" ? "destroy" : cancelBtnEvent === "dismiss" ? "close" : console.error("data-cancel must have appropriate value"))}` : ""} >${cancelBtn ? cancelBtn : "Cancel"}</button>
            </div>
`}
        </div>
    </div>
</div>`
		v.innerHTML = dModalHtml
		removeModalAttributes(v)
	})
	
	function openDModal(e, modalId) {
		let id = modalId ? modalId : this.dataset.modalOpen
		let modal = document.querySelector(`[data-modal='${id}']`)
		if (!modal) {
			if (modalId) {
				return console.error(`can't find modal with the given name "${modalId}"`)
			}
			return console.error(`can't find modal please check the value "data-modal" and "data-modal-open are same"`)
		}
		modal.classList.add("dModal-show")
	}
	
	function closeModal(e) {
		this.closest("[data-modal]").classList.remove("dModal-show")
	}
	
	function destroyModal(e) {
		this.closest("[data-modal]").remove()
		let id = this.closest("[data-modal]").dataset.modal
		let modalOpener = [...document.querySelectorAll(`[data-modal-open='${id}']`)]
		modalOpener.forEach(v => {
			v.removeEventListener("click", openDModal)
		})
	}
	
	function removeModalAttributes(el) {
		let attributesArray = [
			"data-cancel",
			"data-modal",
			"data-success-button",
			"data-cancel-button",
			"data-modal-header",
			"data-close",
			"data-modal-content"
		]
		attributesArray.forEach((v, i, arr) => {
			if (i === arr.length - 1) {
				addEffect(el.firstElementChild)
			}
			el.removeAttribute(v)
		})
		
	}
	
	function addEffect(el) {
		el.addEventListener("click", function (e) {
			if (this === e.target) {
				this.classList.add("shake")
				setTimeout(() => {
					this.classList.remove("shake")
				}, 500)
			}
		})
	}
	
	let modalOpen = [...document.querySelectorAll("[data-modal-open]")]
	modalOpen.forEach(v => {
		v.addEventListener("click", openDModal)
	})
	
	let modalClose = [...document.querySelectorAll("[data-modal-close]")]
	modalClose.forEach(v => {
		v.addEventListener("click", closeModal)
	})
	
	let modalDestroy = [...document.querySelectorAll("[data-modal-destroy]")]
	modalDestroy.forEach(v => {
		v.addEventListener("click", destroyModal)
	})
	
	let Constructor = function (selector) {
		this.selector = selector
		this.show = () => {
			openDModal(null, this.selector)
		}
		this.hide = () => {
			let modals = document.querySelector(`[data-modal='${this.selector}']`)
			modals.classList.remove("dModal-show")
		}
		this.destroy = () => {
			let modal = document.querySelector(`[data-modal='${this.selector}']`)
			modal.remove()
			let modalOpener = [...document.querySelectorAll(`[data-modal-open='${this.selector}']`)]
			modalOpener.forEach(v => {
				v.removeEventListener("click", openDModal)
			})
		}
		this.header = (html) => {
			let modal = document.querySelector(`[data-modal='${this.selector}']`)
			modal.querySelector(".dModal-header").innerHTML = html
		}
		this.footer = (html) => {
			let modal = document.querySelector(`[data-modal='${this.selector}']`)
			modal.querySelector(".dModal-footer").innerHTML = html
		}
		this.body = (html) => {
			let modal = document.querySelector(`[data-modal='${this.selector}']`)
			modal.querySelector(".dModal-body").innerHTML = html
		}
		this.onSuccess = (func) => {
			let modal = document.querySelector(`[data-modal='${this.selector}']`)
			let successBtn = modal.querySelector("[data-modal-success]")
			successBtn.addEventListener("click", function () {
				func()
			})
		}
		this.onCancel = (func) => {
			let modal = document.querySelector(`[data-modal='${this.selector}']`)
			let cancelBtn = modal.querySelector("[data-modal-close]")
			cancelBtn.addEventListener("click", function () {
				func()
			})
			
		}
		this.onDestroy = (func) => {
			let modal = document.querySelector(`[data-modal='${this.selector}']`)
			let destroyBtn = modal.querySelector("[data-modal-destroy]")
			destroyBtn.addEventListener("click", function () {
				func()
			})
		}
		this.removeCancelEvent = () => {
			let modals = [...document.querySelectorAll(`[data-modal='${this.selector}']`)]
			modals.forEach(v => {
				let closeBtn = [...v.querySelectorAll("[data-modal-close]")]
				closeBtn.forEach(v => {
					v.removeEventListener("click", closeModal)
				})
			})
		}
		this.removeDestroyEvent = () => {
			let modals = [...document.querySelectorAll(`[data-modal='${this.selector}']`)]
			modals.forEach(v => {
				let closeBtn = [...v.querySelectorAll("[data-modal-destroy]")]
				closeBtn.forEach(v => {
					v.removeEventListener("click", destroyModal)
				})
			})
		}
	};
	return function (selector) {
		return new Constructor(selector);
	};
})()