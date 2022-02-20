function echo(...args) {
	let terminal=`<div class="terminal" data-terminal-app>
    <div class="terminal-header">
        <div class="terminal-heading">
            <p>Terminal</p>
        </div>
        <div class="terminal-actions">
            <a href="#"><i class='bx bx-minus'></i></a>
            <a href="#"><i class='bx bx-exit-fullscreen'></i></a>
            <a href="#"><i class='bx bx-x'></i></a>
        </div>
    </div>
    <div class="terminal-body" data-terminal>
    </div>
</div>`
	if(!document.querySelector("[data-terminal-app]")){
		document.body.innerHTML+=terminal
	}
	function output(type, value) {
		var output = `<p><span class="output-span-icon">></span><span class="printable ${type}">${value}</span></p>`
		document.querySelector('[data-terminal]').innerHTML += output
	}
	
	args.forEach(v => {
		console.log(v)
		if (typeof v === 'string') {
			output('string', `"${v}"`)
		} else if (v.constructor === Array || Array.isArray(v)) {
			var array = JSON.stringify(v)
			array = array.replace(/\[/g, '<span class=\'square-bracket\'>[</span>')
			array = array.replace(/\]/g, '<span class=\'square-bracket\'>]</span>')
			output('array', array)
		} else if (v.constructor === Object) {
			var obj = JSON.stringify(v)
			obj = obj.replace(/\{/g, '<span class=\'curly-bracket\'>{</span>')
			obj = obj.replace(/\}/g, '<span class=\'curly-bracket\'>}</span>')
			output('object', obj)
		} else if (v.constructor === Number || typeof v === 'number') {
			output('number', v)
		} else if (v.constructor === Boolean || typeof v === 'boolean') {
			output('boolean', v)
		} else {
			output('html', v)
		}
	})
	
}

function clear() {
	document.querySelector('[data-terminal]').innerHTML = ''
}