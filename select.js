const DSelect = (function () {
  const theme = ["theme-1", "theme-2", "theme-3", "theme-4", "theme-5", "default"]
  const styleView = ["style-1", "style-2", "style-3", "style-4", "style-5", "default"]
  var multiple = false
  var multipleArray = {}
  var selectArray = {}
  var optionsAdded = []
  let uniqueId;

  function addOption(tag, optionText, index, options) {
    tag.forEach(selectTag => {
      var option = document.createElement("option");
      option.text = optionText.toString().trim();
      var optionDivParent = selectTag.parentElement.querySelector(".option-div-parent")
      selectTag.add(option, index !== null ? index : selectTag.options.length)
      var optionDiv = document.createElement("div");
      optionDiv.className = "option-div visible"
      var beforeIcon;
      var afterIcon;
      var isMultiple = selectTag.hasAttribute("multiple")

      if (optionsAdded.indexOf(optionText.toString().trim()) >= 0) {
        return console.error("element already exist")
      }
      optionsAdded.push(optionText.toString().trim())
      if (options && typeof options === "object") {

        if ("beforeIcon" in options) {
          beforeIcon = options.beforeIcon
        }
        if ("afterIcon" in options) {
          afterIcon = options.afterIcon
        }

        var beforeEL = getHTML(beforeIcon)
        var afterEL = getHTML(afterIcon)

        var validationBeforeResult = detectAdjecentAndDescendent(beforeEL, "before")
        var validationAfterResult = detectAdjecentAndDescendent(afterEL, "after")

        if (validationBeforeResult.error === true) {
          beforeIcon = null
        }
        if (validationAfterResult.error === true) {
          afterIcon = null
        }
      }

      optionDiv.innerHTML = `${isMultiple ? `<div class="multi-tag-wrap">` : `<div class="select-div-wrap">`}                          
                                ${beforeIcon ? `<div class="before-icon">${beforeIcon}</div>` : ""} 
                                <span class="option-value">${optionText.toString().trim()}</span> 
                                ${afterIcon ? `<div class="after-icon">${afterIcon}</div>` : ""}
                            </div>`

      var optionIndex = (index !== null) ? index : "last"
      if (index === optionDivParent.children.length - 1) {
        optionIndex = "last"
      }
      if (optionDivParent.querySelector(".selected")) {
        optionDivParent.querySelector(".selected").classList.remove("selected")
      }
      if (optionIndex === "last") {
        optionDivParent.append(optionDiv)
        return true
      }
      optionDivParent.children[optionIndex].insertAdjacentElement("beforebegin", optionDiv)

    })
    return true
  }

  function removeOption(tag, index) {
    if (typeof index !== "number" && index !== "last") return console.error("index must of type number")
    tag.forEach(selectTag => {
      if (index === "last") {
        index = selectTag.length - 1
      }
      var optionDivParent = selectTag.parentElement.querySelector(".option-div-parent")
      selectTag.options.remove(index)
      optionDivParent.children[index].remove()
    })
    return true
  }

  function setAttributes(el) {
    var attrArray = Array.prototype.slice.call(el.attributes)
    var attributes = ""
    var classNames = ""
    var len = attrArray.length;
    while (len--) {
      if (attrArray[len].name.trim() !== "class") {
        attributes += `${attrArray[len].name}="${attrArray[len].value}" `
      } else {
        classNames += `${attrArray[len].value} `
      }
    }
    return {attributes: attributes.trim(), classes: classNames.trim()}
  }

  function detectAdjecentAndDescendent(element, contentType) {
    if (element) {
      if (element.children.length > 1) {
        console.error(`"${contentType}-content" element should not have any adjacent elements`)
        return {error: true, contentType}
      }
      if (element.firstElementChild) {
        if (element.firstElementChild.children.length > 0) {
          console.log(element.firstElementChild.children)
          console.error(`"${contentType}-content" element should not have any descendent`)
          return {error: true, contentType}
        }
      }
    }
    return {error: false}
  }

  function getHTML(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    if (!(div.firstChild)) return null
    if (div.firstChild.tagName === "SCRIPT") return null
    return div
  }

  function getElement(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    if (!(div.firstChild)) return null
    if (div.firstChild.tagName === "SCRIPT") return null
    return div.firstChild
  }

  function makeOptions(el, beforeIcon, afterIcon) {
    let beforeContent = beforeIcon;
    let afterContent = afterIcon;
    let html = ""
    let firstValue = false
    let firstOption = ""
    const options = Array.prototype.slice.call(el.options);
    let labelIndex = 1
    let index = 0
    let len = options.length;

    function validateBeforeAndAfterContent(option) {
      if (!option) return;

      let beforeIconContent = option.getAttribute("before-content")
      let afterIconContent = option.getAttribute("after-content")
      option.removeAttribute("before-content")
      option.removeAttribute("after-content")

      let beforeEL = getHTML(beforeIconContent)
      let afterEL = getHTML(afterIconContent)

      if (beforeEL) {
        beforeContent = beforeIconContent
      }
      if (afterEL) {
        afterContent = afterIconContent
      }

      var validationBeforeResult = detectAdjecentAndDescendent(beforeEL, "before")
      var validationAfterResult = detectAdjecentAndDescendent(afterEL, "after")

      if (validationBeforeResult.error === true) {
        beforeContent = beforeIcon
      }
      if (validationAfterResult.error === true) {
        afterContent = afterIcon;
      }
    }

    while (len--) {
      let option = options[index]
      validateBeforeAndAfterContent(option)
      var {attributes, classes} = setAttributes(option)
      if (!(option.value.trim() !== "")) return
      if (firstValue === false) {

        firstValue = true
        firstOption = ` ${multiple ? `<div class="multi-tag-wrap">` : `<div class="select-div-wrap">`}                          
                                ${beforeContent ? `<div class="before-icon">${beforeContent}</div>` : ""} 
                                <span class="option-value">${option.value}</span> 
                                ${afterContent ? `<div class="after-icon">${afterContent}</div>` : ""}
                            </div>`
      }

      if (option.parentElement.firstElementChild === option && option.parentElement.tagName.toUpperCase() === "OPTGROUP") {
        html += `<div class="optgroup-div">${option.parentElement.label || `Option Group ${labelIndex++}`}</div> `
      }
      html += `<div class="option-div${option.disabled ? " option-disabled" : " visible"}${firstValue ? `${multiple ? "" : " option-selected "}` : ""} ${classes}"${attributes}>
                            ${multiple ? `<div class="multi-tag-wrap">` : `<div class="select-div-wrap">`}                          
                                ${beforeContent ? `<div class="before-icon">${beforeContent}</div>` : ""} 
                                <span class="option-value">${option.value}</span> 
                                ${afterContent ? `<div class="after-icon">${afterContent}</div>` : ""}
                            </div>
                         </div>`
      firstValue = null

      beforeContent = beforeIcon;
      afterContent = afterIcon;
      index++
    }

    let optionsDiv = `<div class="option-div-parent">${html}</div>`
    if (firstValue === false) {
      return false
    }
    return {optionsDiv, firstOption}
  }

  function addStyleTheme(styleTheme) {
    var styleThemeClasses = ""

    function applyTheme(styleStr, styleHolder, userStyleObj) {
      if (!(userStyleObj.hasOwnProperty(styleStr) || styleStr in userStyleObj)) return
      if (!styleHolder.includes(userStyleObj[styleStr].toString().trim())) return console.error(`"${userStyleObj[styleStr]}" theme does not exist`)
      if (styleHolder.includes(userStyleObj[styleStr].toString().trim()) && userStyleObj[styleStr].toString().trim() !== "default") {
        styleThemeClasses += userStyleObj[styleStr].toString().trim() + " "
      }
    }

    if (!(styleTheme && typeof styleTheme === "object" && Object.keys(styleTheme).length > 0)) {
      return console.error("styleTheme must be an object")
    }
    applyTheme("theme", theme, styleTheme)
    applyTheme("style", styleView, styleTheme)
    return styleThemeClasses
  }

  function addCustomization(tags, styleTheme, customizer, type) {
    if (!customizer.includes(styleTheme.toString().trim())) {
      return console.error(`"${styleTheme}" ${type} does not exist`)
    }
    tags.forEach(selectTag => {
      var selectDiv = selectTag.closest(".select-div")
      customizer.forEach(v => {
        if (selectDiv.classList.contains(v.trim())) {
          selectDiv.classList.remove(v.trim())
        }
      })
      selectDiv.classList.add(styleTheme.toString().trim())
    })
  }

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  function Constructor(selector) {
    this.selector = selector
    this.selectTags = [...document.querySelectorAll(this.selector)]
    var currentTargetIndex = -1;
    var cursorDirection = null
    var getSelected = (tag, nativeOption, type) => {
      if (tag.length > 1) {
        return console.warn("Can not call getSelectedOption() on multiple selector")
      }
      var selectTag = tag[0]
      multiple = selectTag.hasAttribute("multiple")

      var selectedIndex = selectTag.selectedIndex
      if (selectedIndex === -1) return

      if (type === "value") {
        if (multiple) {
          return multipleArray[selectTag.dataset.selectId]
        }
        if (nativeOption) {
          return selectTag[selectTag.selectedIndex].value
        } else {
          return selectTag[selectTag.selectedIndex].innerText
        }
      } else {
        var multiOptions = []
        if (multiple) {
          let arr = multipleArray[selectTag.dataset.selectId]
          arr.forEach(v => {
            if (nativeOption) {
              [...selectTag.options].forEach(t => {
                if (v === t.value) {
                  multiOptions.push(t)
                }
              })
            } else {
              var optionArr = [...selectTag.parentElement.querySelectorAll(".option-div")]
              optionArr.forEach(t => {
                if (v === t.querySelector(".option-value").innerText) {
                  multiOptions.push(t)
                }
              })
            }
          })
          return multiOptions
        }
        if (nativeOption) {
          return selectTag[selectTag.selectedIndex]
        } else {
          return selectTag.parentElement.querySelector(".option-div-parent").children[selectedIndex]
        }
      }

    }
    var observeChanges = (el) => {
      const targetNode = el
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        attributeFilter: ['class', 'style', 'multiple','data-select-id']
      };
      const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            var select = mutation.target
            var selectDiv = select.parentElement
            if (multiple) {
              let uniqueId = select.dataset.selectId
              multipleArray[uniqueId] = []
              selectDiv.querySelector(".select-span").innerHTML = "Choose Option"
            }

            var beforeIcon = select.getAttribute("before-content")
            var afterIcon = select.getAttribute("after-content")
            console.log(beforeIcon)
            select.removeAttribute("before-content")
            select.removeAttribute("after-content")
            var beforeEL = getHTML(beforeIcon)
            var afterEL = getHTML(afterIcon)
            var validationBeforeResult = detectAdjecentAndDescendent(beforeEL, "before")
            var validationAfterResult = detectAdjecentAndDescendent(afterEL, "after")

            if (validationBeforeResult.error === true) {
              beforeIcon = null
            }
            if (validationAfterResult.error === true) {
              afterIcon = null
            }

            var {optionsDiv, firstOption} = makeOptions(select, beforeIcon, afterIcon)
            selectDiv.querySelector(".option-div-parent").replaceWith(getElement(optionsDiv))
          }

          if(mutation.type==="attributes"){
            if(mutation.attributeName==="data-select-id"){
              location.reload()
            }
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    }
    this.select = function (styleTheme) {
      if (this.selectTags.length > 0) {
        var style = `<style>:root{--theme-1-selected-bg:#ffeeeb;--theme-1-selected-color:#f9826c;--theme-1-cursor:#f9826c;--theme-1-input-border:#d7d7d7;--theme-1-input-bg:#ffffff;--theme-1-scroll:#f9826c;--theme-2-selected-bg:#3fb27f;--theme-2-selected-color:#ffffff;--theme-2-cursor:#33475b;--theme-2-input-border:#33475b;--theme-2-input-bg:#ffffff;--theme-2-scroll:#3fb27f;--theme-3-selected-bg:#21e6c1;--theme-3-selected-color:#ffffff;--theme-3-cursor:#1f4287;--theme-3-input-border:#1f4287;--theme-3-input-bg:#ffffff;--theme-3-scroll:#1f4287;--theme-4-selected-bg:#3d5af1;--theme-4-selected-color:#ffffff;--theme-4-cursor:#0e153a;--theme-4-input-border:#3d5af1;--theme-4-input-bg:#ffffff;--theme-4-scroll:#22d1ee;--theme-5-selected-bg:#fc85ae;--theme-5-selected-color:#ffffff;--theme-5-cursor:#303a52;--theme-5-input-border:#fc85ae;--theme-5-input-bg:#fbfbfb;--theme-5-scroll:#9e579d;--theme-default-selected-bg:#d0e2ff;--theme-default-selected-color:#5068a9;--theme-default-cursor:#5068a9;--theme-default-input-border:#b3cdf6;--theme-default-input-bg:#fafafa;--theme-default-scroll:#5068a9}@font-face{font-family:SegoeUI Bold;src:local("Segoe UI Bold"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff2) format("woff2"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff) format("woff"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.ttf) format("truetype");font-weight:600}@font-face{font-family:SegoeUI Semibold;src:local("Segoe UI Semibold"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2) format("woff2"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff) format("woff"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf) format("truetype");font-weight:700}@font-face{font-family:SegoeUI;src:local("Segoe UI"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"),url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");font-weight:400}.div-parent .option-div.option-disabled,.div-parent .option-div.option-disabled *{color:gray;cursor:not-allowed}.select-div,.select-div *{font-family:SegoeUI,sans-serif;color:#24292e;line-height:1.5;box-sizing:border-box;-webkit-transition:all .5s ease;transition:all .5s ease;outline:0!important}.option-div.visible.option-selected,.option-div.visible.option-selected-multi{background:#d0e2ff;color:#5068a9}.optgroup-div{font-size:14px;font-family:SegoeUI Semibold;padding:5px 10px;color:#5068a9}.theme-1.select-div .optgroup-div{color:var(--theme-1-cursor)}.theme-2.select-div .optgroup-div{color:var(--theme-2-cursor)}.theme-3.select-div .optgroup-div{color:var(--theme-3-cursor)}.theme-4.select-div .optgroup-div{color:var(--theme-4-input-border)}.theme-5.select-div .optgroup-div{color:var(--theme-5-scroll)}.optgroup-div~.option-div{padding-left:20px!important}.select-div-wrap{display:flex;align-items:center;justify-content:flex-start}.after-icon *,.before-icon *{margin-top:0;margin-bottom:0}.select-div{padding:5px 12px;border-radius:6px;width:100%;cursor:pointer;position:relative;background:#fff;min-width:120px;border:1px solid #dcdcdc;font-size:14px;max-width:400px}.select-div{padding-right:35px!important}span.select-span{white-space:nowrap;overflow:hidden;text-overflow:clip;position:relative;user-select:none}span.select-span .before-icon{margin-left:0}.div-parent{position:absolute;background:#fff;width:100%;height:auto;display:none;z-index:9999;top:100%;left:0;border:1px solid #dcdcdc}.select-div.open{border-bottom-right-radius:0;border-bottom-left-radius:0}.div-parent .option-div{padding:5px 10px;user-select:none}.active{display:block}.option-div:hover{background:#f1f1f1}.select-div:before{content:"";position:absolute;transition:all .5s ease;top:50%;right:9px;width:1.5px;height:8px;background:#24292e;transform:translate(-7px,-50%) rotate(45deg)}.select-div:after{content:"";position:absolute;transition:all .5s ease;top:50%;right:5px;width:1.5px;height:8px;background:#24292e;transform:translate(-16px,-50%) rotate(-45deg)}.select-div.open:before{content:"";position:absolute;transition:all .5s ease;top:50%;right:9px;width:1.5px;height:8px;background:#24292e;transform:translate(-7px,-50%) rotate(134deg)}.select-div.open:after{content:"";position:absolute;transition:all .5s ease;top:50%;right:5px;width:1.5px;height:8px;background:#24292e;transform:translate(-16px,-50%) rotate(-133deg)}input.search-div{width:calc(100% - 10px);position:relative;padding:5px 10px;border:1px solid rgb(179 205 246);background:#fafafa;margin:5px;text-transform:initial;border-radius:5px}.option-div-parent{max-height:150px;overflow-y:auto;overflow-x:hidden;height:auto}.select-div select{display:none}.option-div.visible.selected{background:#5068a9;color:#fff}.option-div.visible.selected *{color:#fff}.option-div-parent::-webkit-scrollbar{width:5px;border-radius:50px;cursor:alias}.option-div-parent::-webkit-scrollbar-thumb{background:#5068a9;border-radius:50px;cursor:alias}.option-div-parent::-webkit-scrollbar-track{background:#fafafa;cursor:alias}.multi-tag-wrap{display:flex;align-items:center;justify-content:flex-start}span.select-span .multi-tag-wrap{margin-right:10px;border-radius:5px;background:#efefef;padding:2px 6px;font-size:13px;margin-bottom:4px;margin-top:4px}.before-icon{display:flex;align-items:center;margin-right:8px;margin-left:-3px}.after-icon{display:flex;align-items:center;margin-left:auto}span.select-span span{margin-right:8px}.option-div span{margin-right:8px}.after-icon>img,.before-icon>img{width:auto;height:16px;max-width:16px;border-radius:50px}.select-par{display:flex;flex-wrap:wrap;justify-content:space-between}@media screen and (max-width:600px){.select-div{width:100%;flex:0 0 100%}.select-div{border:1px solid #dcdcdc;padding:7px 10px;border-radius:3px;cursor:pointer;position:relative;margin-bottom:30%}}.style-1 .div-parent.active{box-shadow:0 3px 6px -4px rgb(0 0 0 / 12%),0 6px 16px 0 rgb(0 0 0 / 8%),0 9px 28px 8px rgb(0 0 0 / 5%);margin-top:15px;border:none}.style-1 input.search-div{border:1px solid rgb(215 215 215);background:#fff;border-radius:0}.style-1.select-div{border-radius:0;border:1px solid #f1f1f1}.style-1.select-div.open:after,.style-1.select-div.open:before,.style-1.select-div:after,.style-1.select-div:before{background:#dcdcdc}.style-1 .option-div:hover{background:#f1f1f1}.style-1 .div-parent.active:before{content:"";top:-2px;right:13px;width:8px;height:8px;border-radius:0;background:#fff;box-shadow:-3px -3px 5px rgb(82 95 127 / 4%);position:absolute;transform:rotate(45deg) translateX(-50%)}.theme-1 .option-div.visible.option-selected,.theme-1 .option-div.visible.option-selected-multi{background:var(--theme-1-selected-bg);color:var(--theme-1-selected-color)}.theme-1 input.search-div{border:1px solid var(--theme-1-input-border);background:var(--theme-2-input-bg)}.theme-1 .option-div.visible.selected{background:var(--theme-1-cursor);color:#fff}.theme-1 .option-div.visible.selected *{color:#fff}.theme-1 .option-div-parent::-webkit-scrollbar-thumb{background:var(--theme-1-scroll);border-radius:50px;cursor:alias}.style-1 .option-div-parent::-webkit-scrollbar-thumb{border-radius:50px;cursor:alias}.style-1 .option-div-parent::-webkit-scrollbar-track{background:#f1f1f1}.style-2 .div-parent.active{box-shadow:0 3px 6px -4px rgb(0 0 0 / 12%),0 6px 16px 0 rgb(0 0 0 / 8%),0 9px 28px 8px rgb(0 0 0 / 5%);margin-top:15px;border:none;border-radius:10px;padding:5px 0}.style-2 input.search-div{border-radius:5px}.theme-2 input.search-div{border:1px solid var(--theme-2-input-border);background:var(--theme-2-input-bg)}.style-2.select-div{border-radius:10px;border:1px solid #f1f1f1;box-shadow:0 1px 8px 1px rgb(0 0 0 / 9%);min-width:130px;padding:8px 12px}.theme-2.select-div,.theme-2.select-div *{color:#33475b}.style-2.select-div.open{border-bottom-right-radius:10px;border-bottom-left-radius:10px}.style-2.select-div.open:after,.style-2.select-div.open:before,.style-2.select-div:after,.style-2.select-div:before{background:#dcdcdc}.style-2 .option-div:hover{background:#f1f1f1}.style-2 .div-parent.active:before{content:"";top:-2px;right:13px;width:8px;height:8px;border-radius:0;background:#fff;box-shadow:-3px -3px 5px rgb(82 95 127 / 4%);position:absolute;transform:rotate(45deg) translateX(-50%)}span.select-span{display:flex;flex-wrap:nowrap;align-items:center;flex-wrap:wrap}.theme-2 .option-div.visible.option-selected,.theme-2 .option-div.visible.option-selected-multi{background:var(--theme-2-selected-bg);color:var(--theme-2-selected-color)}.theme-2 .option-div.visible.option-selected *,.theme-2 .option-div.visible.option-selected-multi *{color:var(--theme-2-selected-color)}.theme-2 .option-div.visible.selected{background:var(--theme-2-cursor);color:#fff}.theme-2 .option-div.visible.selected *{color:#fff}.theme-2 .option-div-parent::-webkit-scrollbar-thumb{background:var(--theme-2-scroll);border-radius:50px;cursor:alias}.style-2 .option-div-parent::-webkit-scrollbar-track{background:#f1f1f1}.style-2 .div-parent.active{box-shadow:0 3px 6px -4px rgb(0 0 0 / 12%),0 6px 16px 0 rgb(0 0 0 / 8%),0 9px 28px 8px rgb(0 0 0 / 5%);margin-top:15px;border:none;border-radius:10px;padding:5px 0}.style-2 input.search-div{border-radius:5px}.theme-2 input.search-div{border:1px solid var(--theme-2-input-border);background:var(--theme-2-input-bg)}.style-2.select-div{border-radius:10px;border:1px solid #f1f1f1;box-shadow:0 1px 8px 1px rgb(0 0 0 / 9%);min-width:130px;padding:8px 12px}.theme-2.select-div,.theme-2.select-div *{color:#33475b}.style-2.select-div.open{border-bottom-right-radius:10px;border-bottom-left-radius:10px}.style-2.select-div.open:after,.style-2.select-div.open:before,.style-2.select-div:after,.style-2.select-div:before{background:#dcdcdc}.style-2 .option-div:hover{background:#f1f1f1}.style-2 .div-parent.active:before{content:"";top:-2px;right:13px;width:8px;height:8px;border-radius:0;background:#fff;box-shadow:-3px -3px 5px rgb(82 95 127 / 4%);position:absolute;transform:rotate(45deg) translateX(-50%)}.style-3 .div-parent.active{box-shadow:0 1px 6px -4px rgb(0 0 0 / 12%),0 9px 16px 0 rgb(0 0 0 / 8%),0 18px 28px 8px rgb(0 0 0 / 5%);margin-top:0;border:none;border-radius:0 0 10px 10px;padding:5px 0;border-top:1px solid #efefef}.style-3.select-div.open{border-bottom-right-radius:0;border-bottom-left-radius:0}.style-3 input.search-div{border-radius:5px}.theme-3 input.search-div{border:1px solid var(--theme-3-input-border);background:var(--theme-3-input-bg)}.style-3.select-div{border-radius:10px;border:1px solid #f1f1f1;box-shadow:0 1px 8px 1px rgb(0 0 0 / 9%);min-width:130px;padding:8px 12px}.theme-3.select-div,.theme-3.select-div *{color:#0e153a}.style-3.select-div.open:after,.style-3.select-div.open:before,.style-3.select-div:after,.style-3.select-div:before{background:#dcdcdc}.style-3 .option-div:hover{background:#f1f1f1}.theme-3 .option-div.visible.option-selected,.theme-3 .option-div.visible.option-selected-multi{background:var(--theme-3-selected-bg);color:var(--theme-3-selected-color)}.theme-3 .option-div.visible.selected{background:var(--theme-3-cursor);color:#fff}.theme-3 .option-div.visible.selected *{color:#fff}.theme-3 .option-div-parent::-webkit-scrollbar-thumb{background:var(--theme-3-scroll);border-radius:50px;cursor:alias}.theme-3 .option-div-parent::-webkit-scrollbar-track{background:#f1f1f1}.style-4 .div-parent.active{box-shadow:0 1px 6px -4px rgb(0 0 0 / 12%),0 9px 16px 0 rgb(0 0 0 / 8%),0 18px 28px 8px rgb(0 0 0 / 5%);margin-top:15px;border:none;border-radius:0;padding:5px 0}.style-4 input.search-div{border-radius:0}.style-4 .div-parent.active:before{content:"";top:-2px;right:13px;width:8px;height:8px;border-radius:0;background:#fff;box-shadow:-3px -3px 5px rgb(82 95 127 / 4%);position:absolute;transform:rotate(45deg) translateX(-50%)}.theme-4 input.search-div{border:1px solid var(--theme-4-input-border);background:var(--theme-4-input-bg)}.style-4.select-div.open{border-bottom-right-radius:0;border-bottom-left-radius:0}.style-4.select-div{border-radius:0;border:1px solid #f1f1f1;box-shadow:0 1px 8px 1px rgb(0 0 0 / 9%);min-width:130px;padding:8px 12px}.theme-4.select-div,.theme-4.select-div *{color:#071e3d}.style-4.select-div.open:after,.style-4.select-div.open:before,.style-4.select-div:after,.style-4.select-div:before{background:#dcdcdc}.theme-4 .option-div:hover{background:#f1f1f1}.theme-4 .option-div.visible.option-selected,.theme-4 .option-div.visible.option-selected-multi{background:var(--theme-4-selected-bg);color:var(--theme-4-selected-color)}.theme-4 .option-div.visible.option-selected *,.theme-4 .option-div.visible.option-selected-multi *{color:var(--theme-4-selected-color)}.theme-4 .option-div.visible.selected{background:var(--theme-4-cursor);color:#fff}.theme-4 .option-div.visible.selected *{color:#fff}.theme-4 .option-div-parent::-webkit-scrollbar-thumb{background:var(--theme-4-scroll);border-radius:50px;cursor:alias}.theme-4 .option-div-parent::-webkit-scrollbar-track{background:#f1f1f1}.style-5 .div-parent.active:before{content:"";top:-2px;right:13px;width:8px;height:8px;border-radius:0;background:#fff;box-shadow:-3px -3px 5px rgb(82 95 127 / 4%);position:absolute;transform:rotate(45deg) translateX(-50%);border:1px solid #f1f1f1;border-bottom:0;border-right:0}.style-5 .div-parent.active{box-shadow:none;margin-top:15px;border:1px solid #f1f1f1}.style-5.select-div{border-radius:0;border:1px solid #f1f1f1}.style-5.select-div.open:after,.style-5.select-div.open:before,.style-5.select-div:after,.style-5.select-div:before{background:#dcdcdc}.style-5 input.search-div{border-radius:0}.theme-5 .option-div-parent::-webkit-scrollbar-thumb{background:var(--theme-5-scroll);border-radius:50px;cursor:alias}.theme-5 input.search-div{border:1px solid var(--theme-5-input-border);background:var(--theme-5-input-bg)}.theme-5 .option-div.visible.option-selected,.theme-5 .option-div.visible.option-selected-multi{background:var(--theme-5-selected-bg);color:var(--theme-5-selected-color)}.theme-5 .option-div.visible.option-selected *,.theme-5 .option-div.visible.option-selected-multi *{color:var(--theme-5-selected-color)}.theme-5.select-div,.theme-5.select-div *{color:var(--theme-5-cursor)}.theme-5 .option-div.visible.selected{background:var(--theme-5-cursor);color:#fff}.theme-5 .option-div.visible.selected *{color:#fff}</style>`
        var prevTargetIndex = 0;
        var hoverEvent = false
        var newSelectHolder = []
        document.head.innerHTML += style

        this.selectTags.forEach(selectTag => {
          uniqueId = guidGenerator()
          selectArray[uniqueId] = {}
          selectArray[uniqueId].disabled = []
          multiple = selectTag.hasAttribute("multiple")
          var styleThemeClasses = addStyleTheme(styleTheme)
          var beforeIcon = selectTag.getAttribute("before-content")
          var afterIcon = selectTag.getAttribute("after-content")
          selectTag.removeAttribute("before-content")
          selectTag.removeAttribute("after-content")
          var beforeEL = getHTML(beforeIcon)
          var afterEL = getHTML(afterIcon)

          var validationBeforeResult = detectAdjecentAndDescendent(beforeEL, "before")
          var validationAfterResult = detectAdjecentAndDescendent(afterEL, "after")

          if (validationBeforeResult.error === true) {
            beforeIcon = null
          }
          if (validationAfterResult.error === true) {
            afterIcon = null
          }

          var {optionsDiv, firstOption} = makeOptions(selectTag, beforeIcon, afterIcon)

          if (optionsDiv) {
            var selectDiv = document.createElement("div");
            if (styleTheme && typeof styleTheme === "object") {
              selectDiv.className = `select-div ${styleThemeClasses}`
            } else {
              selectDiv.className = `select-div`
            }

            selectTag.parentElement.insertBefore(selectDiv, selectTag);
            selectDiv.append(selectTag)
            selectTag.style.opacity = "0"
            selectTag.style.left = "-100px"
            selectTag.style.position = "relative"
            selectDiv.innerHTML += "<span class='select-span'>" + `${multiple ? "Choose Option" : firstOption}` + "</span>"
            var divParent = `<div class="div-parent"><input class="search-div">${optionsDiv}</div>`
            selectDiv.innerHTML += divParent
            var newSelect = selectDiv.querySelector("select")

            newSelect.dataset.selectId = uniqueId

            newSelect.addEventListener("change", function (e) {
              if (this.options.length > 0) {
                var options = [...this.options]
                options.forEach((v, i) => {
                  if (v.selected === true) {
                    let selectedIndex = i
                    var optionParent = selectDiv.querySelector(".option-div-parent")
                    optionParent.querySelectorAll(".option-div")[selectedIndex].click()
                  }
                })
              }
            })
            observeChanges(newSelect)

            newSelectHolder.push(newSelect)
          }
        })
        this.selectTags = newSelectHolder

        function removePreviousActive(selectDiv) {
          var lastActiveDiv = document.querySelector(".select-div.open .div-parent")
          var lastActiveSelect = document.querySelector(".select-div.open")
          if (!selectDiv) {
            if (lastActiveDiv) {
              lastActiveDiv.classList.remove("active")
            }
            if (lastActiveSelect) {
              lastActiveSelect.classList.remove("open")
            }
            return
          }
          if (lastActiveDiv) {
            if (lastActiveDiv !== selectDiv.querySelector(".div-parent")) {
              lastActiveDiv.classList.remove("active")
            }
          }
          if (lastActiveSelect) {
            if (lastActiveSelect !== selectDiv) {
              lastActiveSelect.classList.remove("open")
            }
          }
        }

        window.addEventListener("click", (e) => {
          let selectDiv = e.target.closest(".select-div") || e.target.classList.contains("select-div")
          if (e.target.tagName.toUpperCase() !== "SELECT") {
            if ((e.target.closest(".select-div") || e.target.classList.contains("select-div"))
                && !e.target.closest(".div-parent") && !e.target.closest("option-div-parent")
            ) {
              currentTargetIndex = -1
              if (selectDiv) {
                removePreviousActive(selectDiv)
                selectDiv.classList.toggle("open")
                selectDiv.querySelector(".div-parent").classList.toggle("active")
                selectDiv.querySelector(".search-div").focus()
              }
            } else {
              removePreviousActive(selectDiv)
            }

            if (e.target.closest(".option-div") || e.target.classList.contains("option-div")) {
              var selectedOption = selectDiv.querySelector(".option-selected")
              var nativeSelect = selectDiv.querySelector("select")
              multiple = nativeSelect.hasAttribute("multiple")

              if (selectedOption) {
                selectedOption.classList.remove("option-selected")
              }

              if (selectDiv) {
                var option = e.target.closest(".option-div") || e.target.classList.contains("option-div")
                uniqueId = nativeSelect.dataset.selectId

                if (!selectArray[uniqueId].disabled.includes(option.querySelector(".option-value").innerText)) {
                  var optionSelectedIndex = Array.prototype.indexOf.call([...option.parentElement.querySelectorAll(".option-div")], option)
                  if (multiple) {
                    var text = option.querySelector("span.option-value").innerText.trim()

                    if (!multipleArray[uniqueId]) {
                      multipleArray[uniqueId] = []
                    }

                    if (!option.classList.contains("option-selected-multi")) {
                      multipleArray[uniqueId].push(text)
                      option.classList.add("option-selected-multi")
                      if (multiple) {
                        selectDiv.querySelector("select").options[optionSelectedIndex].selected = true
                      }
                      if (multipleArray[uniqueId].length === 1) {
                        option.parentElement.parentElement.previousElementSibling.innerHTML = option.innerHTML
                      } else {
                        option.parentElement.parentElement.previousElementSibling.innerHTML += option.innerHTML
                      }

                    } else {
                      var index = multipleArray[uniqueId].indexOf(text)
                      if (index > -1) {
                        multipleArray[uniqueId].splice(index, 1);
                      }
                      option.classList.remove("option-selected-multi")
                      option.parentElement.parentElement.previousElementSibling.children[index].remove()
                      if (multiple) {
                        selectDiv.querySelector("select").options[optionSelectedIndex].selected = false
                      }
                      if (multipleArray[uniqueId].length === 0) {
                        console.log(multiple)
                        option.parentElement.parentElement.previousElementSibling.innerHTML = "<span>Choose Option</span>"
                      }
                    }
                    var selectwrap = selectDiv.querySelector(".select-div-wrap")
                    if(selectwrap){
                      selectwrap.classList.add("multi-tag-wrap")
                      selectwrap.classList.remove("select-div-wrap")
                    }
                  } else {
                    option.parentElement.parentElement.previousElementSibling.innerHTML = option.innerHTML
                    removePreviousActive(false)
                    selectDiv.querySelector("select").selectedIndex = optionSelectedIndex
                    var selected = [...selectDiv.querySelectorAll(".option-selected-multi")]
                    selected.forEach(v => {
                      v.classList.remove("option-selected-multi")
                    })
                    var multiwrap = selectDiv.querySelector(".multi-tag-wrap")
                    if(multiwrap){
                      multiwrap.classList.remove("multi-tag-wrap")
                      multiwrap.classList.add("select-div-wrap")
                    }
                    option.classList.add("option-selected")
                  }
                }
              }
              var selectedCursor = selectDiv.querySelector(".selected")
              if (selectedCursor) {
                selectedCursor.classList.remove("selected")
              }
            }
          }
        })

        function searchOptions() {
          document.body.addEventListener("input", function (e) {
            var searchValue = e.target.value;
            var searchList = [];
            var options = [...e.target.parentElement.parentElement.querySelector("select").options]
            options.forEach(option => {
              searchList.push(option.innerText.toString().trim())
            })
            var selected = e.target.parentElement.querySelector(".selected")
            if (selected) {
              currentTargetIndex = -1
              selected.classList.remove("selected")
            }

            for (var j = 0; j < searchList.length; j++) {
              if (e.target.classList.contains("search-div")) {
                var output_div = e.target.nextElementSibling.querySelectorAll(".option-div")
                if (searchList[j].toUpperCase().indexOf(searchValue.toUpperCase()) > -1 && searchList[j].toUpperCase().indexOf(
                    searchValue.toUpperCase()) === 0) {
                  output_div[j].style.display = "block"
                  if (!output_div[j].hasAttribute("disabled")) {
                    output_div[j].classList.add("visible")
                  }
                  output_div[j].classList.remove("not-visible")
                } else {
                  output_div[j].classList.add("not-visible")
                  output_div[j].classList.remove("visible")
                  output_div[j].style.display = "none"
                }
                output_div[j].classList.remove("selected")
              }
            }

          })
        }

        var getNextSibling = function (elem, selector) {
          var sibling = elem.nextElementSibling;
          while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
          }
        };
        var getPrevSibling = function (elem, selector) {
          var sibling = elem.previousElementSibling
          while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.previousElementSibling
          }
          return sibling
        };

        function moveCursor(event, callMove) {
          if (event.keyCode === 40 || event.which === 40) {
            cursorDirection = "down"
            moveSelection("down", event)
          } else if (event.keyCode === 38 || event.which === 38) {
            cursorDirection = "up"
            moveSelection("up", event)
          } else if (event.keyCode === 13 || event.which === 13) {
            cursorDirection = "enter"

            moveSelection("enter", event)
          }
        }

        function move(optionsDiv, currentIndex) {
          if (prevTargetIndex !== null) {
            optionsDiv.children[prevTargetIndex].classList.remove("selected")
          }

          if (cursorDirection === "down") {
            let activeEl = optionsDiv.children[currentIndex]
            if (activeEl) {
              if (!activeEl.classList.contains("visible")) {
                currentTargetIndex++
                return move(optionsDiv, currentTargetIndex)
              }
              activeEl.classList.add("selected")
              prevTargetIndex = Array.prototype.indexOf.call([...activeEl.parentElement.children], activeEl)
              var nextElement = getNextSibling(activeEl, ".visible")
              if (nextElement) {
                currentTargetIndex = Array.prototype.indexOf.call([...activeEl.parentElement.children], getNextSibling(activeEl, ".visible")) - 1
                activeEl.scrollIntoView({
                  block: "nearest",
                  inline: "nearest"
                })
              }
              activeEl.scrollIntoView({
                block: "nearest",
                inline: "nearest"
              })
            } else {
              currentTargetIndex = 0
              return move(optionsDiv, currentTargetIndex)
            }
          } else if (cursorDirection === "up") {
            let activeEl = optionsDiv.children[currentIndex]
            if (activeEl) {
              if (!activeEl.classList.contains("visible")) {
                currentTargetIndex--
                return move(optionsDiv, currentTargetIndex)
              }
              activeEl.classList.add("selected")
              prevTargetIndex = Array.prototype.indexOf.call([...activeEl.parentElement.children], activeEl)
              var nextElement = getPrevSibling(activeEl, ".visible")
              if (nextElement) {
                currentTargetIndex = Array.prototype.indexOf.call([...activeEl.parentElement.children], getPrevSibling(activeEl, ".visible")) + 1
                activeEl.scrollIntoView({
                  block: "nearest",
                  inline: "nearest"
                })
              }
              activeEl.scrollIntoView({
                block: "nearest",
                inline: "nearest"
              })
            } else {
              currentTargetIndex = optionsDiv.children.length - 1
              return move(optionsDiv, currentTargetIndex)
            }
          }
        }

        function moveSelection(key, elEvent) {
          if (elEvent.target.classList.contains("search-div") || elEvent.target.closest(".select-div.open")) {
            var optionsDiv = elEvent.target.nextElementSibling
            if (key === "down") {
              currentTargetIndex++
              if (hoverEvent) {
                currentTargetIndex = currentTargetIndex - 1
                hoverEvent = false
              }
              if (currentTargetIndex < optionsDiv.children.length) {
                move(optionsDiv, currentTargetIndex)
              } else {
                currentTargetIndex = 0
                move(optionsDiv, currentTargetIndex)

              }
            } else if (key === "up") {
              currentTargetIndex--
              if (hoverEvent) {
                currentTargetIndex = currentTargetIndex + 1
                hoverEvent = false
              }
              if (currentTargetIndex >= 0) {
                move(optionsDiv, currentTargetIndex)

              } else {
                currentTargetIndex = optionsDiv.children.length - 1
                move(optionsDiv, currentTargetIndex)
              }
            } else if (key === "enter") {
              optionsDiv.children[currentTargetIndex].click()
            }
          }
        }

        searchOptions()

        document.body.addEventListener("keydown", (e) => {
          moveCursor(e, true)
        })
        var mouseOver = false
        document.body.addEventListener("mouseover", function (e) {
          if (e.target.closest(".option-div-parent") || e.target.classList.contains("option-div-parent")) {
            var optionParent = e.target.closest(".option-div-parent") || e.target.classList.contains("option-div-parent")
            mouseOver = true
            if (mouseOver !== null) {
              var option = e.target.closest(".option-div") || e.target.classList.contains("option-div")
              var newTargetIndex = Array.prototype.indexOf.call([...optionParent.children], option)

              currentTargetIndex = newTargetIndex
              hoverEvent = true
              var selectedPrevEl = optionParent.querySelector(".selected")
              optionParent.addEventListener("mouseleave", function (e) {

                if (!optionParent.querySelector(".selected")) {
                  currentTargetIndex = 0
                } else {
                  if (selectedPrevEl) {
                    document.body.onkeydown = function (e) {
                      if (cursorDirection === "down") {
                        currentTargetIndex = Array.prototype.indexOf.call([...selectedPrevEl.parentElement.children], getNextSibling(selectedPrevEl, ".visible")) - 1
                        moveCursor(e, true)
                        mouseOver = null
                      } else if (cursorDirection === "up") {
                        currentTargetIndex = Array.prototype.indexOf.call([...selectedPrevEl.parentElement.children], getPrevSibling(selectedPrevEl, ".visible")) + 1
                        moveCursor(e, true)
                        mouseOver = null
                      }
                      document.body.onkeydown = function () {
                        return false
                      }
                    }
                  }
                }
                mouseOver = false
              })
            }
          }
        })

      }
    }
    this.addOption = (optionText, index = null, options = null) => {
      return addOption(this.selectTags, optionText, index, options)
    }
    this.removeOption = (index) => {
      return removeOption(this.selectTags, index)
    }
    this.removeLastOption = () => {
      return removeOption(this.selectTags, "last")
    }
    this.removeFirstOption = () => {
      return removeOption(this.selectTags, 0)
    }
    this.appendOption = (optionText, options = null) => {
      return addOption(this.selectTags, optionText, "last", options)
    }
    this.prependOption = (optionText, options) => {
      return addOption(this.selectTags, optionText, 0, options)
    }
    this.getSelectedOption = (nativeOption = false) => {
      return getSelected(this.selectTags, nativeOption, "option")
    }
    this.getSelectedValue = (nativeOption = false) => {
      return getSelected(this.selectTags, nativeOption, "value")
    }
    this.getSelectedIndex = () => {
      var selectTag = this.selectTags[0]
      multiple = selectTag.hasAttribute("multiple")
      var valueArr = []
      if (multiple) {
        var multiArr = multipleArray[selectTag.dataset.selectId]
        if (multiArr) {
          var selectArr = [...selectTag.options]
          selectArr.forEach((v, i) => {
            multiArr.forEach(arr => {
              if (v.value === arr) {
                valueArr.push(i)
              }
            })
          })
        }
        return valueArr
      }
      if (this.selectTags.length > 1) {
        return console.warn("Can not call getSelectedOption() on multiple selector")
      }
      return this.selectTags[0].selectedIndex
    }
    this.enableOption = (index) => {
      if (typeof index === "number") {
        this.selectTags.forEach(selectTag => {
          var uniqueId = selectTag.dataset.selectId
          if (!selectArray[uniqueId]) {
            selectArray[uniqueId] = []
          }
          if (!selectArray[uniqueId].disabled) {
            selectArray[uniqueId].disabled = []
          }
          if (index > -1) {

            if (selectArray[uniqueId].disabled.indexOf(selectTag.options[index].value) === -1) {
              return console.error("option is already enabled")
            }
            selectArray[uniqueId].disabled.forEach((v, i) => {
              if (v === selectTag.options[index].value) {
                selectArray[uniqueId].disabled.splice(i, 1);
              } else {
                console.error("unable to find option")
              }
            })
          }
          var optionDivParent = selectTag.parentElement.querySelector(".option-div-parent")
          selectTag.options[index].removeAttribute("disabled")
          optionDivParent.children[index].removeAttribute("disabled")
          optionDivParent.children[index].classList.remove("option-disabled")
          optionDivParent.children[index].classList.add("visible")
          currentTargetIndex = -1
        })
        return true
      }
    }
    this.disableOption = (index) => {
      if (typeof index === "number") {
        this.selectTags.forEach(selectTag => {
          var uniqueId = selectTag.dataset.selectId
          if (!selectArray[uniqueId]) {
            selectArray[uniqueId] = []
          }
          if (!selectArray[uniqueId].disabled) {
            selectArray[uniqueId].disabled = []
          }
          if (selectArray[uniqueId].disabled.indexOf(selectTag.options[index].value) > -1) {
            return console.error("option is already disabled")
          }
          selectArray[uniqueId].disabled.push(selectTag.options[index].value)

          var optionDivParent = selectTag.parentElement.querySelector(".option-div-parent")
          selectTag.options[index].setAttribute("disabled", "true")
          optionDivParent.children[index].setAttribute("disabled", "true")
          optionDivParent.children[index].classList.add("option-disabled")
          optionDivParent.children[index].classList.remove("visible")
          currentTargetIndex = -1
        })
        return true
      }
    }
    this.theme = (styleTheme) => {
      addCustomization(this.selectTags, styleTheme, theme, "theme")
    }
    this.style = (styleTheme) => {
      addCustomization(this.selectTags, styleTheme, styleView, "style")
    }
  }

  return function instance(sel) {
    return new Constructor(sel)
  }
})()