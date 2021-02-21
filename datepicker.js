Object.prototype.setAttributes = function (obj) {

    var element = this;

    if (element.length == undefined || element.length == 0) {

        setAttr(element)
    } else {

        [].slice.call(element).forEach(v => {

            setAttr(v)
        })

    }

    function setAttr(el) {
        var attributes = obj
        for (attrKeys of Object.keys(attributes)) {
            if (attrKeys == "class") {
                classArr = attributes[attrKeys].trim().split(" ")
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

Object.prototype.createElement = function (name, mergeAt = "afterend", innerhtml = "", attributes = "") {
    var element = document.createElement(name);
    if (attributes !== "") {
        if (typeof (attributes) === "object") {


            element.setAttributes(attributes)
        }

    }
    if (innerhtml !== "")
        element.innerHTML = innerhtml

    if (mergeAt == "beforeend") {
        this.insertAdjacentElement(mergeAt, element)
    }
    if (mergeAt == "afterend") {
        this.insertAdjacentElement(mergeAt, element)
    }
    if (mergeAt == "afterbegin") {
        this.insertAdjacentElement(mergeAt, element)
    }
    if (mergeAt == "beforebegin") {
        this.insertAdjacentElement(mergeAt, element)
    }
    return element;

}

Object.prototype.datepicker = function () {
    var input = this;
    if (input.length == undefined || input.length == 0) {
        setDatePicker(input)
    } 
    else {
        [].slice.call(input).forEach(v => {
            setDatePicker(v)
        })
    }
var pre;
    function setDatePicker(input) {
        input.addEventListener("focus", function () {
            if(window.getComputedStyle(this.nextElementSibling).getPropertyValue("display")=="block"){
                this.nextElementSibling.style.display = "none"
                this.blur()
                pre=this
            }
            else{
                this.nextElementSibling.style.display = "block"
                this.blur()
                pre=this
            }
            
        })
        document.documentElement.onclick=function(e){
            if(!e.target.closest(".selectWrapper-div")&& e.target!==pre){
               
                pre.nextElementSibling.style.display = "none"
            }
            
        }
       
     
        var today = new Date().getDate();

        var month = new Date().getMonth()
        var year = new Date().getFullYear();

        var elm = input.createElement("div", "beforebegin", "", {
            class: "datepicker"
        })
        elm.append(input)

        var yearMonthDiv = input.createElement("div", "afterend", "", {
            class: "selectWrapper-div"
        })
        var datpickerHeader = yearMonthDiv.createElement("div", "beforeend", "", {
            class: "datepicker-header"
        })
        var monthOpt=`<option class="option-year">January</option><option class="option-year">February</option><option class="option-year">March</option><option class="option-year">April</option><option class="option-year">May</option><option class="option-year">June</option><option class="option-year">July</option><option class="option-year">August</option><option class="option-year">September</option><option class="option-year">October</option><option class="option-year">November</option><option class="option-year">December</option>`
        var monthDiv = datpickerHeader.createElement("select", "beforeend", monthOpt, {
            class: "select-month"
        })

        var yearDiv = datpickerHeader.createElement("select", "beforeend", "", {
            class: "select-year"
        })
        var yearArr = [];
        monthDiv.selectedIndex = month;


        for (var i = year - 10; i < year + 10; i++) {
            yearArr.push(i)
             yearDiv.createElement("option", "beforeend", `${i}`, {
                class: "option-year"
            })
        }

        yearDiv.selectedIndex = yearArr.indexOf(year)
        var select = monthDiv
        var dpSelectParent = select.createElement("div", "beforebegin", "", {
            class: "dp-select-parent"
        })
        dpSelectParent.append(select)

        var prevArrow = dpSelectParent.createElement("a", "beforeend", "<i class='fa fa-angle-left'></i>", {
            class: "dp-prev",
            href: "#",
            "data-select": "prev"
        })
        var selectDiv = dpSelectParent.createElement("div", "beforeend", "", {
            class: "dp-select-div"
        })
        selectDiv.addEventListener("click",function(){
            var val=window.getComputedStyle(this.parentElement.nextElementSibling).getPropertyValue("display")
            
            if(val=="none"){
                this.parentElement.style.width="68%"
                this.parentElement.nextElementSibling.style.display="block"
            }
            else{
                this.parentElement.style.width="100%"
                this.parentElement.nextElementSibling.style.display="none"
            }
          
        })
       
        var nextArrow = dpSelectParent.createElement("a", "beforeend", "<i class='fa fa-angle-right'></i>", {
            class: "dp-next",
            href: "#",
            "data-select": "next"
        })
       prevArrow.addEventListener("click", move)
        nextArrow.addEventListener("click", move) 

        function move() {
           
            var moveTo = this.dataset.select
            if (moveTo == "prev") {
              
                if (select[select.selectedIndex - 1] !== undefined) {
                    selectDiv.innerText = select[select.selectedIndex - 1].innerText
                    select.selectedIndex = select.selectedIndex - 1
                    draw()
                }
                else{
                    if(select.selectedIndex==0){
                       if(yearDiv[yearDiv.selectedIndex-1]!==undefined){
                        yearDiv.selectedIndex=yearDiv.selectedIndex-1
                        select.selectedIndex=select.length-1
                        selectDiv.innerText = select[select.selectedIndex].innerText
                        draw()
                        drawY()
                       }
                        
                    }
                }
               

                
            } else {
              
                if (select[select.selectedIndex + 1] !== undefined) {
                    selectDiv.innerText = select[select.selectedIndex + 1].innerText
                    select.selectedIndex = select.selectedIndex + 1
                    draw()
                    

                }
               else{
                if((select.length-1)==select.selectedIndex){
                    if(yearDiv[yearDiv.selectedIndex+1]!==undefined){
                    yearDiv.selectedIndex=yearDiv.selectedIndex+1
                    select.selectedIndex=0
                    selectDiv.innerText = select[select.selectedIndex].innerText
                    draw()
                    drawY()
                }
            }
                
               }
               
                
            }
        }

         
        selectDiv.innerText = select[select.selectedIndex].innerText
        function sync(year,month) {

           
            var dt = new Date(year, month);
            var month = dt.getMonth(),
                year = dt.getFullYear();
            var firstDay = new Date(year, month, 1).getDay();
            var lastDay = new Date(year, month + 1, 0);

            var square = [];
            if (firstDay !== 0) {
                for (var i = 0; i < firstDay; i++) {
                    square.push("")
                }
            }
            for (var i = 1; i < lastDay.getDate() + 1; i++) {
                square.push(i)
            }
         
            if (lastDay.getDay() - 1 % 7 !== 0) {
                for (var i = 1; i < (7 - (lastDay.getDay())); i++) {
                    square.push("")
                }
            }



            var table = yearMonthDiv.createElement("table", "beforeend", "", {
                class: "table-datepicker"
            })


            var days=`<td class="d-td">sun</td><td class="d-td">mon</td><td class="d-td">tue</td><td class="d-td">wed</td><td class="d-td">thu</td><td class="d-td">fri</td><td class="d-td">sat</td>`
            
            var tr = table.createElement("tr", "beforeend", days, {
                class: "d-th"
            })

            var s = 0;
            var t = 0;

            while (s <= 7) {
                var tr = table.createElement("tr", "beforeend", "", {
                    class: "d-tr"
                })
                for (var i = 0; i < 7; i++) {
                    if (square[t] !== undefined) {

                        console.log(square[t])
                        if (square[t] == today) {
                           
                            if(square[t]!==""){
                                var td=tr.createElement("td", "beforeend", `<div>${square[t]}</div>`, {
                                    class: "d-td active "
                                })
                                td.addEventListener("click",pickDate)
                            }
                            else{
                                var td=tr.createElement("td", "beforeend", `<div>${square[t]}</div>`, {
                                    class: "d-td active disabled"
                                })
                            }
                           
                            
                        } else {
                            if(square[t]!==""){
                                var td=tr.createElement("td", "beforeend", `<div>${square[t]}</div>`, {
                                    class: "d-td "
                                })
                                td.addEventListener("click",pickDate)
                            }
                            else{
                                var td=tr.createElement("td", "beforeend", `<div>${square[t]}</div>`, {
                                    class: "d-td disabled"
                                })
                            }
                           
                           
                        }

                        t++
                    }

                }
                s++
            }
        }
        sync(year, month)
        monthDiv.addEventListener("change", draw)
        yearDiv.addEventListener("change", drawY)
        function draw() {
            month = monthDiv.selectedIndex
            monthDiv.parentElement.parentElement.nextElementSibling.remove()
            sync(year, month)

        }
        function drawY() {
            year = yearArr[yearDiv.selectedIndex]
            monthDiv.parentElement.parentElement.nextElementSibling.remove()
            sync(year, month)
            console.log(this)
            if(this!==window){
                this.style.display="none"
                this.previousElementSibling.style.width="100%"
            }
           

        }
        function pickDate(){
            var inputDate=this.innerText;
            var inputMonth =monthDiv.selectedIndex
            var inputYear= yearArr[yearDiv.selectedIndex]
           var dateText=`${inputDate}/${inputMonth}/${inputYear}`;
           input.value=dateText
           input.dataset.value=dateText
           input.nextElementSibling.style.display="none"
        }
    }
}