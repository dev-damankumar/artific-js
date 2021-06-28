/*var formStructure = {
    name: {
        el: "input",
        config: {
            type: "text",
            placeholder: "Enter name",
            name: "name",
            id: "name",
            value: "daman"
        },
        label: "First Name"


    },
    password: {
        el: "input",
        config: {
            type: "password",
            placeholder: "Enter password",
            name: "pass",
            id: "pass",
            value: "12345"
        },
        label: "password"

    },
    select: {
        el: "select",
        config: {
            type: "select",
            placeholder: "Select options",
            name: "select",
            id: "select",
            value: "option 2"
        },
        options: [
            {
                value: "option 1",
                config: {
                    id: '1',
                    name: "2"
                }
            },
            {
                value: "option 2",
                config: {
                    id: '2',
                    name: "3"
                }
            },
            {
                value: "option 3",
                config: {
                    id: '3',
                    name: "4"
                }
            }
        ],
        label: "password"
    },
    gender: {
        el: "input",
        config: {
            type: "radio"
        },
        value: "male",
        options: [
            {
                value: "male",
                config: {
                    name: "gender",
                    id: "male"
                }
            },
            {
                value: "female",
                config: {
                    name: "gender"
                }
            }
        ],
        label: "gender"
    },
    age: {
        el: "input",
        config: {
            type: "checkbox"
        },
        value: "13",
        options: [
            {
                value: "male",
                config: {
                    name: "gender",
                    id: "male"
                }
            },
            {
                value: "female",
                config: {
                    name: "gender",
                    checked: true
                }
            }
        ],
        label: "age"
    },
    color:{
        el:"textarea",
        config:{
            value:"22-12-20"
        },
        label:"date"
    }

}*/

class Form {
	
	constructor(handle,formStructure) {
		this.form = document.createElement("form");
		this.hasError = false
		this.handle=handle
		this.inputs = []
		if (typeof formStructure == "object") {
			for (let [key, value] of Object.entries(formStructure)) {
				
				try {
					if ("el" in value) {
						if ("type" in value.config || value.config.type!=="textarea") {
							let label = null
							let input = document.createElement("div")
							if (value.config.type !== "radio" && value.config.type !== "checkbox") {
								input = document.createElement(encodeURIComponent(value.el.toString()));
								this.setAttributes(input, value.config)
							}
							if (value.config.type === "select") {
								this.createOptions("option", input, value, "option")
							}
							if (value.config.type === "radio") {
								this.createOptions("input", input, value, "radio")
							}
							if (value.config.type === "checkbox") {
								this.createOptions("input", input, value, "checkbox")
								
							}
							if (value.el === "textarea") {
								input.innerText=value.config.value
							}
							if ("label" in value) {
								label = document.createElement("label")
								label.innerText = value.label
							}
							
							this.inputs.push({input, label})
							
						} else {
							throw new Error("config object must have type property")
						}
						
					} else {
						throw new Error("must specify el property in object")
					}
				} catch (e) {
					this.hasError = true
					this.error(e)
					console.error(e)
				}
				if(this.hasError===false){
					this.render()
				}else{
					break;
				}
				
			}
			
		} else {
			this.error("argument must be of type object")
			console.error("argument must be of type object")
		}
	}
	
	setAttributes(el, obj) {
		let element = el;
		if (element === undefined || element.length <= 0) {
			return console.error("No HTML Element Found")
		}
		
		if (element.length == undefined) {
			setAttr(element)
		} else {
			[].slice.call(element).forEach(v => {
				setAttr(v)
			})
		}
		
		function setAttr(el) {
			var attributes = obj
			for (let attrKeys of Object.keys(attributes)) {
				if (attrKeys == "class") {
					var classArr = attributes[attrKeys].trim().split(" ")
					for (var i = 0; i < classArr.length; i++) {
						if (classArr[i] !== "") {
							el.classList.add(classArr[i].trim())
						}
					}
				} else {
					el.setAttribute(`${attrKeys}`, `${attributes[attrKeys]}`)
				}
			}
		}
		
	}
	
	createOptions(tagType, input, value, type) {
		if (type) {
			if (!("options" in value && value.options.length > 0)) {
				throw new Error("select element must have one option in options array")
			} else {
				for (let [ko, vo] of Object.entries(value.options)) {
					var option = document.createElement(tagType);
					if (type === "radio" || type === "checkbox") {
						option = document.createElement("label");
						var tempInput = document.createElement("input");
						tempInput.value = vo.value;
						tempInput.innerText = vo.value
						tempInput.type = type
						this.setAttributes(tempInput, vo.config)
						if (vo.value === value.value) {
							tempInput.setAttribute("checked", "true")
						}
						option.append(tempInput)
						option.innerHTML += `<span>${vo.value}</span>`
						input.append(option)
						if (value.config.value === vo.value) {
							input.value = value.config.value
						}
					}
					if (type === "option") {
						option.value = vo.value;
						option.innerText = vo.value
						option.type = type
						this.setAttributes(option, vo.config)
						input.append(option)
						if (value.config.value === vo.value) {
							input.value = value.config.value
						}
					}
				}
				
			}
		} else {
			throw new Error("Must have type to create option element")
		}
	}
	
	render() {
		if ((this.inputs.length === Object.keys(formStructure).length) && this.hasError !== true) {
			this.inputs.forEach(el => {
				if (el.label) {
					this.form.append(el.label)
				}
				this.form.append(el.input)
			})
			
			if(this.handle){
				return this.handle.append(this.form)
			}
			document.body.append(this.form)
		}
	}
	
	error(err) {
		var error = `
            <style>
            .errorDiv {
    background: #FFEBEE;
    color: #F44336;
    padding: 20px;
    width: 90%;
    border-radius: 5px;
    margin: 30px auto;
}
</style>
            <div class="errorDiv">
                <p>Failed To Render Form</p>
                <p>for more information see the error below</p>
                ${err}
            </div>
            `;
		if(this.handle){
			return this.handle.innerHTML=error
		}
		document.body.innerHTML += error
	}
}

/*
var abc = new Form(formStructure)*/
