const Syntax = (function () {
	function escapeHtml(unsafe) {
		return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
	}
	function getLines(lines) {
		let linerows = document.createElement('div')
		linerows.className = 'line-numbers'
		
		let count = lines.length > 1 ? lines.length + 1 : 1
		for (let i = 0; i < count; i++) {
			let span = document.createElement('span')
			linerows.append(span)
		}
		return linerows
	}
	let style=`<style data-syntax>span.keyword{color:#009688}span.bracket{color:#e91e63}span.method{color:#dd4a68}span.digit{color:#2196f3}.code-preview{box-shadow:0 1px 13px rgb(0 0 0 / 10%);border-radius:10px;padding:10px;position:relative;overflow:auto;margin-bottom:20px}.code-preview code{color:#000}.string,.string *{color:#d94c20!important}span.token{color:#9c27b0}code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:12px;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;width:100%;display:block}span.globals{color:#2196f3}span.props{color:#673ab7}.line-numbers>span:before{content:counter(linenumber);color:#999;display:block;text-align:right;line-height:18px;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace}.line-numbers>span{display:block;counter-increment:linenumber;font-size:12px;line-height:18px}code[class*=language-].line-numbers{position:relative;padding-left:0;counter-reset:linenumber}.line-numbers{position:absolute;left:10px;top:10px}.code-preview pre{margin:0;padding-left:25px;display:flex}code[class*=language-] ::selection,code[class*=language-]::selection{text-shadow:none;background:rgba(141 ,192,255,.32)}span.selector{color:#750e86}span.css-prop{color:#d94c20}span.css-value{color:#009688}span.css-media{color:#008eff}span.tag{color:#750e86}span.tag-bracket{color:#5e5e5e}.code-preview code{color:#000}.string,.string *{color:#009688!important}span.props{color:#d94c20}span.quote{color:#999!important}span.doctype{color:#708090}</style>`
	if(!document.querySelector("[data-syntax]")){
		document.head.innerHTML+=style
	}
	let Constructor = function (selector) {
		this.selector = selector
		this.elements = [...document.querySelectorAll(this.selector)]
		this.js = () => {
			let keyword = ['function', 'return', 'document']
			let tokens = ['var', 'let', 'const', 'yield', 'if', 'else', 'else if', 'switch', 'case', 'import', 'export', 'default']
			let brackets = ['{', '}', '(', ')', '[', ']']
			let globals = /(\w*)(\.)/g
			let string = /(["'`])((?:(?=(\\?))\2.)*?)\1/g
			let method = /(\.)(\w*)\(/g
			let functions = /(\w*)\(/g
			let props = /(\.)(\w*)/g
			let digit = /(\d+)/g
			let style = `
<style>
</style>`
			document.head.innerHTML += style
			this.elements.forEach(el => {
				let code = el.querySelector('code')
				let codePreview = document.createElement('div')
				codePreview.className = 'code-preview'
				let codeInnerText = code.innerText
				let lines = code.innerText.split('\n')
				let lineRows = getLines(lines)
				
				codePreview.append(lineRows)
				codeInnerText = codeInnerText.replace(string, '<span class="string">$1$2$1</span>')
				codeInnerText = codeInnerText.replace(method, '$1<span class="method">$2(</span>')
				codeInnerText = codeInnerText.replace(digit, '<span class="digit">$1</span>')
				codeInnerText = codeInnerText.replace(props, '$1<span class="props">$2</span>')
				codeInnerText = codeInnerText.replace(globals, '<span class="globals">$1$2</span>')
				
				keyword.forEach(keyword => {
					if (codeInnerText.includes(keyword)) {
						codeInnerText = codeInnerText.replaceAll(keyword, `<span class="keyword">${keyword}</span>`)
					}
				})
				brackets.forEach(bracket => {
					if (codeInnerText.includes(bracket)) {
						codeInnerText = codeInnerText.replaceAll(bracket, `<span class="bracket">${bracket}</span>`)
					}
				})
				tokens.forEach(token => {
					if (codeInnerText.includes(token)) {
						codeInnerText = codeInnerText.replaceAll(token, `<span class="token">${token}</span>`)
					}
				})
				
				code.innerHTML = codeInnerText
				el.append(code)
				el.insertAdjacentElement("beforebegin", codePreview)
				codePreview.append(el)
			})
		}
		this.css = () => {
			let selector = /(.*)({)/g
			let prop = /(\S.*):/g
			let value = /(?<!:):(?!:)(.*)([^;\n])/g
			let string = /(["'`])((?:(?=(\\?))\2.)*?)\1/g
			let media = /(@\w*)/g
			this.elements.forEach(el => {
				let code = el.querySelector('code')
				let codePreview = document.createElement('div')
				codePreview.className = 'code-preview'
				let codeInnerText = code.innerText
				
				let lines = code.innerText.split('\n')
				let lineRows = getLines(lines)
				codePreview.append(lineRows)
				
				codeInnerText = codeInnerText.replace(string, '<span class="string">$1$2$1</span>')
				codeInnerText = codeInnerText.replace(selector, '<span class="selector">$1</span>$2')
				codeInnerText = codeInnerText.replace(prop, '<span class="css-prop">$1</span>:')
				codeInnerText = codeInnerText.replace(value, ':<span class="css-value">$1$2</span>')
				codeInnerText = codeInnerText.replace(media, '<span class="css-media">$1</span>')
				code.innerHTML = codeInnerText
				el.append(code)
				el.insertAdjacentElement("beforebegin", codePreview)
				codePreview.append(el)
			})
		}
		this.html = () => {
			let tag = /&lt;([\w\/]*)/g
			let angle = /(&lt;|&gt;)/g
			let quote = /&quot;(.*?)&quot;/g
			let singlequote = /&#039;(.*?)&#039;/g
			let doctype = /(&lt;!.*&gt;)/g
			let prop = /(\w*=|\w*-\w*=)/g
			
			this.elements.forEach(el => {
				let code = el.querySelector('code')
				let codePreview = document.createElement('div')
				codePreview.className = 'code-preview'
				let codeInnerText = escapeHtml(code.innerText)
				
				let lines = code.innerText.split('\n')
				let lineRows = getLines(lines)
				codePreview.append(lineRows)
				
				
				codeInnerText = codeInnerText.replaceAll(prop, `<span class="props">$1</span>`)
				codeInnerText = codeInnerText.replaceAll(quote, `<span class="string"><span class="quote">"</span>$1<span class="quote">"</span></span>`)
				codeInnerText = codeInnerText.replaceAll(singlequote, `<span class="string"><span class="quote">'</span>$1<span class="quote">'</span></span>`)
				codeInnerText = codeInnerText.replaceAll(doctype, `<span class="doctype">$1</span>`)
				codeInnerText = codeInnerText.replaceAll(tag, `&lt;<span class="tag">$1</span>`)
				codeInnerText = codeInnerText.replaceAll(angle, `<span class="tag-bracket">$1</span>`)
				
				code.innerHTML = (codeInnerText)
				
				el.append(code)
				el.insertAdjacentElement("beforebegin", codePreview)
				codePreview.append(el)
			})
		}
	};
	return function (selector) {
		return new Constructor(selector);
	};
})()