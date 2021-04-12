const Window = (function () {
    const style = `<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'><style>
    .window {
        z-index: 9;
        width: 70%;
        height: 80vh;
        transition: width .5s ease-out, height .5s ease-out, transform 1s cubic-bezier(.5, -.75, .7, 2);
        background: white;
        border: 4px solid white;
        border-top-width: 2px;
        border-bottom-width: 3px;
        border-radius: 5px;
        position: absolute;
        transform-origin: 10px 127%;
       
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        box-shadow: 0 0 20px 0 rgb(4 4 4 / 10%);

    }
    /*.window-icon-minimize-div:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        border: 10px solid white;
        left: -10px;
        background: #fff;
        z-index: -1;
    }*/

    .window-body img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .window-header-items {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .window-header-items a {
        padding: 1px 4px;
        color: gray;
        font-size: 20px;
        margin-left: 8px;
    }

    .window-header-items a:hover {
        background: #f4f4f4;
        border-radius: 5px;
    }

    .window-header {
        height: 32px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
    }

    .window-body {
        height: calc(100% - 32px);
    }

    .window.data-window-expaned, *[data-window-expaned] {
        width: 100%;
        height: 100%;
    }

    body {
        margin: 0;
    }

    .window-area {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: height .5s ease;
    }

    .window-drag-area {
        flex: 1;
    }

    * {
        box-sizing: border-box;
        /*transition: all .5s ease-out;*/
    }

    .destroy {
        transform: translateX(200%);
        animation: fade .5s cubic-bezier(.5, -.75, .7, 2) forwards;
    }

    @keyframes fade {
        0% {
            opacity: 1;
        }

        50% {
            opacity: .4;

        }
        100% {
            opacity: 0;
        }
    }
    .window-icon-minimize-div {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background: white;
        border-radius: 5px;
        padding: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    .window-icon-minimize-div img {
        width: auto;
        height: 40px;
    }
    img.title-img {
        width: auto;
        height: 30px;
        object-fit: cover;
    }
    i.window-app-icon {
        font-size: 23px;
    }
    .window-drag-area {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .shrink{
        transition-delay: .5s;
        transform: skewY(
                -36deg
        ) scale(0);
        transform-origin: 10px 127%;
        animation: fade 2s cubic-bezier(.5, -.75, .7, 2);
    }
    .window-icon-minimize-div{
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
    }
</style>`
    function Constructor(selector) {
        document.head.innerHTML+=style
        this.create = function () {
            function createElementFromStr(htmlString) {
                var div = document.createElement('div');
                div.innerHTML = htmlString.trim();

                // Change this to div.childNodes to support multiple top-level nodes
                return div.firstChild;
            }

            var windowHTML = `<div class="window-area">
<div class="window-icon-minimize-div">
    <img src="https://www.freepnglogos.com/uploads/instagram-icon-png/instagram-icon-suzem-limited-make-known-20.png">
</div>
    <div class="window" data-window>
        <div class="window-header">
            <div class="window-drag-area">
            <i class='bx bx-caret-right-circle window-app-icon'></i>
</div>
            <div class="window-header-items">
                <a href="#" class="minimize"><i class='bx bx-minus'></i></a>
                <a href="#" class="maximize"><i class='bx bx-expand-alt'></i></a>
                <a href="#" class="close"><i class='bx bx-x'></i></a>
            </div>
        </div>
        <div class="window-body">
            <h2>Window Body</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, dolorum iste laboriosam libero molestias nisi officia officiis porro quia tempore!</p>
        </div>
    </div>
</div>`
            var windowElement = createElementFromStr(windowHTML)
            console.log(windowElement)
            var max = windowElement.querySelector(".maximize")
            var min = windowElement.querySelector(".minimize")
            var close = windowElement.querySelector(".close")
            var appIcon = windowElement.querySelector(".window-icon-minimize-div")
            var windowDiv = windowElement
            max.addEventListener("click", function () {
                console.log(windowDiv)
                windowDiv.querySelector("*[data-window]").toggleAttribute("data-window-expaned")
                windowDiv.querySelector("*[data-window]").classList.toggle("data-window-expaned")
                windowDiv.querySelector("*[data-window]").style.left = 0
                windowDiv.querySelector("*[data-window]").style.top = 0
            })
            close.addEventListener("click", function () {
                windowDiv.querySelector(".window").classList.add("destroy")
                setTimeout(() => {
                    windowDiv.remove()
                }, 1100)
            })
            min.addEventListener("click", function () {
                windowDiv.querySelector(".window").style.transition = "all 1s cubic-bezier(.5, -.75, .7, 2)"
                windowDiv.querySelector(".window").style.left = "0"
                windowDiv.querySelector(".window").style.top = "0"
                windowDiv.querySelector(".window").classList.add("shrink")
                appIcon.style.opacity = "1"
                appIcon.style.visibility = "visible"
                setTimeout(() => {
                    windowDiv.querySelector(".window").style.transition = ""
                }, 1000)
            })
            appIcon.addEventListener("click", function () {

                windowDiv.querySelector(".window").classList.remove("shrink")
                setTimeout(() => {
                    appIcon.style.opacity = "0"
                    appIcon.style.visibility = "hidden"
                }, 500)
            })
            document.body.append(windowElement)
        }
    }

    return function instance(sel) {
        return new Constructor(sel)
    }
})()
