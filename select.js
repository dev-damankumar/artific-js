Object.prototype.select = function () {
  var style=`<style>
* {
    font-family: monospace;
    font-size: 16px;
    box-sizing: border-box;
  }


  .select-div {
    flex: 0 0 30%;
    padding: 7px 10px;
    border-radius: 3px;
    width: 100%;
    cursor: pointer;
    position: relative;
    background: white;
  }
  input.search-div {
    display: none;
}

  .div-parent {
    position: absolute;
    background: white;
    width: 100%;
    height: auto;
    display: none;
    z-index: 99;
    top: 100%;
    left: 0px;
    border: 1px solid gainsboro;
  }
  .select-div.open {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}


  .div-parent .option-div {
    padding: 5px 10px;

  }

  .active {
    display: block;

  }

  .option-div:hover {
    background: gainsboro;

  }

  .select-div:before {
    content: "";
    position: absolute;
    transition: all .5s ease;
    top: 50%;
    right: 9px;
    width: 2px;
    height: 11px;
    background: #b0b0b0;
    transform: translate(-7px, -50%) rotate(45deg);
  }

  .select-div:after {
    content: "";
    position: absolute;
    transition: all .5s ease;
    top: 50%;
    right: 7px;
    width: 2px;
    height: 11px;
    background: #b0b0b0;
    transform: translate(-16px, -50%) rotate(-45deg);
  }

  .select-div.open:before {
    content: "";
    position: absolute;
    transition: all .5s ease;
    top: 50%;
    right: 9px;
    width: 2px;
    height: 11px;
    background: #b0b0b0;
    transform: translate(-7px, -50%) rotate(134deg)
  }

  .select-div.open:after {
    content: "";
    position: absolute;
    transition: all .5s ease;
    top: 50%;
    right: 7px;
    width: 2px;
    height: 11px;
    background: #b0b0b0;
    transform: translate(-16px, -50%) rotate(-133deg);
  }

  input.search-div {
    width: calc(100% - 10px);
    position: relative;
    padding: 5px 10px;
    border: 1px solid rgb(152, 114, 200);
    background: #f4f4f4;
    margin: 5px;
    text-transform: initial;
  }

  .option-div-parent {
    max-height: 174px;
    overflow-y: auto;
    height: auto;
  }

  .select-div select {
    display: none;
  }

  .option-div.visible.selected {
    background: rgb(152, 114, 200);
    color: rgb(255, 255, 255);
  }


  .option-div-parent::-webkit-scrollbar {
    width: 5px;
    border-radius: 50px;
    cursor: alias;

  }

  .option-div-parent::-webkit-scrollbar-thumb {
    background: rgb(152, 114, 200);
    border-radius: 50px;
    cursor: alias;
  }

  .option-div-parent::-webkit-scrollbar-track {
    background: #ffe0d6;
    cursor: alias;
  }

  /* Handle on hover */
  .option-div-parent::-webkit-scrollbar-thumb:hover {
    background: #ff865e;
    cursor: alias;
    border-radius: 50px;
  }

  .select-par {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media screen and (max-width:600px) {
    .select-div {
      width: 100%;
      flex: 0 0 100%;
    }

    .select-div {
      border: 1px solid rgb(220, 220, 220);
      padding: 7px 10px;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      margin-bottom: 30%;
    }
  }
  </style>`
  document.head.append(style)
  function getAttributes1(el){
    var nodes=[]
    if(el.attributes.length>0){
      for ( var t = 0; t<el.attributes.length; t++){
     
        nodes.push(el.attributes[t])
    }
    return nodes
    }
    
    
  }
  
    var reset = false

    var currentSelect;
    for (var b = 0; b < this.length; b++) {

      var select = this;
      var arr = [];


      var prev = undefined;
      var currentHover = undefined;

      function createHTML(name, classname, appendTo, innerhtml = "") {
        var element = document.createElement(name);
        element.className = classname
        if (innerhtml !== "")
          element.innerHTML = innerhtml
        appendTo.append(element)
        var elementClass = document.getElementsByClassName(classname)[0];
        return elementClass
      }

      var selectDiv = document.createElement("div");
      selectDiv.className = "select-div"
      select[b].parentElement.insertBefore(selectDiv, select[b]);
      selectDiv.append(select[b])
      select[b].style.opacity = "0"
      select[b].style.left = "-100px"
      select[b].style.position = "relative"

     

      selectDiv.innerHTML += "<span class='select-span'>" + select[b].children[0].innerText + "</span>"

      var selectCdiv = document.getElementsByClassName("select-div")
      var divCparent = document.getElementsByClassName("div-parent")
      var divParent = createHTML("div", "div-parent", selectCdiv[b])
      var searchDiv = createHTML("input", "search-div", divCparent[b])
      var searchCdiv = document.getElementsByClassName("search-div")
      var optionParent = createHTML("div", "option-div-parent", divCparent[b])
      var optionCparent = document.getElementsByClassName("option-div-parent")
     
      for (var i = 0; i < select[b].children.length; i++) {
       
        var option = createHTML("div", "option-div visible", optionCparent[b], select[b].children[i].innerHTML)
        arr.push(select[b].children[i].innerHTML)
       
        var output_div = document.getElementsByClassName("option-div-parent");
        output_div[b].children[i].addEventListener("mouseover", function () {
          currentHover = this;
        })
        output_div[b].children[i].addEventListener("mouseleave", function () {
          currentHover = undefined;
        })
        var attr=getAttributes1(select[b].children[i])
        if(attr!==undefined){
          for(var at=0;at<attr.length;at++){
            var o=document.getElementsByClassName("option-div-parent")[b].children[i]
            o.setAttribute(`${attr[at].name}`,`${attr[at].value}`)
            
          }
        }
      }

      selectDiv.addEventListener("click", function (e) {

        currentSelect = Array.prototype.indexOf.call([...document.getElementsByClassName("select-div")], this)

        reset = true
        if (e.target == this) {

          this.classList.toggle("open")
          this.querySelector(".div-parent").classList.toggle("active")
        }

        document.getElementsByClassName("search-div")[currentSelect].focus()
      })



      for (var option = 0; option < optionCparent[b].children.length; option++) {

        optionCparent[b].children[option].addEventListener("click", function (e) {
          var sele = document.getElementsByClassName("select")
          var currentIndex = Array.prototype.indexOf.call(this.parentNode.children, this)

          for (var t = currentSelect; t <= currentSelect; t++) {
            sele[t].options.selectedIndex = `${currentIndex}`
          }


          selectDiv.classList.remove("open")
          this.parentElement.parentElement.classList.remove("active")
          document.getElementsByClassName("select-span")[currentSelect].innerHTML = this.innerText
          /*  console.log(select[currentIndex]) */

        })
      }


      var last = undefined;
      var list = arr;
      srch(arr)

      function srch(a) {

        searchCdiv[b].addEventListener("input", function (event) {

          var searchValue = this.value;
          for (var j = 0; j < list.length; j++) {

            var output_div = this.nextElementSibling.children

            if (a[j].toUpperCase().indexOf(searchValue.toUpperCase()) > -1 && a[j].toUpperCase().indexOf(
                searchValue.toUpperCase()) == 0) {

              output_div[j].style.display = "block"
              output_div[j].classList.add("visible")

            } else {
              output_div[j].classList.add("not-visible")
              output_div[j].classList.remove("visible")
              output_div[j].style.display = "none"


            }

            output_div[j].classList.remove("selected")

          }

        })
      }

      Object.prototype.ms = function () {
        for (var i = 0; i < this.length; i++) {
          this[i].addEventListener("keydown", moveCursor)
        }
      }
      document.getElementsByClassName("search-div").ms()


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

    };

    function moveCursor(event) {
      this.classList.add("ea")
      if (event.keyCode == 40) {

        var a = moveSelection("down", currentHover, prev)
        prev = a[1];
        currentHover = a[0]
        document.getElementsByClassName("selected")[0].scrollIntoView({
          block: "nearest",
          inline: "nearest"
        })
      } else if (event.keyCode == 38) {
        var a = moveSelection("up", currentHover, prev)
        prev = a[1];
        currentHover = a[0]
        document.getElementsByClassName("selected")[0].scrollIntoView({
          block: "nearest",
          inline: "nearest"
        })
      } else if (event.keyCode == 13) {
        document.getElementsByClassName("selected")[0].click()
      }


    }

    function moveSelection(key, currentHover, prev) {

      var sel = document.getElementsByClassName("selected")

      if (currentHover !== undefined) {
        reset = false;

        if (prev) {
          prev.classList.remove("selected")
        }
        prev = currentHover;
        currentHover.classList.add("selected")
        currentHover = undefined;
        return [currentHover, prev]
      } else {
        if (reset == true) {

          if (document.getElementsByClassName("selected").length !== 0) {
            document.getElementsByClassName("selected")[0].classList.remove("selected")
          }

          prev = document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible")[0];

          reset = false
        }
        if (sel.length == 0) {
          var oldselect = currentSelect;

          prev = document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible")[0];
          document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible")[0]
            .classList.add("selected");
        } else {

          visible = document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible");



          if (key == "down") {

            if (visible[visible.length - 1].classList.contains("selected")) {

              visible[visible.length - 1].classList.remove("selected")
              visible[0].classList.add("selected");
              prev = visible[0]

            } else {

              prev.classList.remove("selected")
              getNextSibling(prev, ".visible").classList.add("selected");

              prev = getNextSibling(prev, ".visible");

            }
          } else {

            if (visible[0].classList.contains("selected")) {
              visible[0].classList.remove("selected")
              visible[visible.length - 1].classList.add("selected");
              prev = visible[visible.length - 1]

            } else {
              prev.classList.remove("selected")
              getPrevSibling(prev, ".visible").classList.add("selected");

              prev = getPrevSibling(prev, ".visible");

             
            }
          }
        }
        return [currentHover, prev]
      }
    }
  }


