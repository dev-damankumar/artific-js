const SortList=()=>{
	/*
	*
	* Example:
	* <ul data-sort-list>
<li data-list-item>
	<div class="arrow-div">
		<a data-list-up class="up-arrow"><i class="fa fa-angle-up"></i> </a>
		<a data-list-down class="down-arrow"><i class="fa fa-angle-down"></i> </a>
	</div>
	list 1
</li>
<li data-list-item>
	<div class="arrow-div">
		<a data-list-up class="up-arrow"><i class="fa fa-angle-up"></i> </a>
		<a data-list-down class="down-arrow"><i class="fa fa-angle-down"></i> </a>
	</div>
	list 2
</li>
<li data-list-item>
	<div class="arrow-div">
		<a data-list-up class="up-arrow"><i class="fa fa-angle-up"></i> </a>
		<a data-list-down class="down-arrow"><i class="fa fa-angle-down"></i> </a>
	</div>
	list 3
</li>
<li data-list-item>
	<div class="arrow-div">
		<a data-list-up class="up-arrow"><i class="fa fa-angle-up"></i> </a>
		<a data-list-down class="down-arrow"><i class="fa fa-angle-down"></i> </a>
	</div>
	list 4
</li>
<li data-list-item>
	<div class="arrow-div">
		<a data-list-up class="up-arrow"><i class="fa fa-angle-up"></i> </a>
		<a data-list-down class="down-arrow"><i class="fa fa-angle-down"></i> </a>
	</div>
	list 5
</li>
</ul>
	*
	* */
	function callbackDown(li) {
		li.classList.remove("go-down")
		li.previousElementSibling.classList.remove("go-up")
	}

	function callbackUp(li) {
		li.classList.remove("go-up")
		li.nextElementSibling.classList.remove("go-down")
	}

	const style=`<style>
 .go-down {
        -webkit-animation: goDown .5s ease forwards;
        animation: goDown .5s ease forwards;
    }

    .go-up {
        -webkit-animation: goUp .5s ease forwards;
        animation: goUp .5s ease forwards;

    }

    @keyframes goDown {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(calc(45px + 10px));
        }
    }
    @keyframes goUp {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-55px);
        }
    }
    </style>`;
	document.head.innerHTML+=style
	const items=[].slice.call(document.querySelectorAll("*[data-sort-list]"));
	for (let i=0; i < items.length; i++) {
		items[i].addEventListener("click", function (e) {
			if (e.target.closest("*[data-list-item]")) {
				const li=e.target.closest("*[data-list-item]");
				if (e.target.hasAttribute("data-list-up") || e.target.closest("*[data-list-up]")) {
					if (li.previousElementSibling) {
						li.classList.add("go-up")
						li.previousElementSibling.classList.add("go-down")
						setTimeout(function () {
							li.previousElementSibling.insertAdjacentElement("beforebegin", li)
							callbackUp(li)
						}, 600)

					}
				} else if (e.target.hasAttribute("data-list-down") || e.target.closest("*[data-list-down]")) {
					if (li.nextElementSibling) {
						li.classList.add("go-down")
						li.nextElementSibling.classList.add("go-up")
						setTimeout(function () {
							li.nextElementSibling.insertAdjacentElement("afterend", li)
							callbackDown(li)
						}, 600)

					}
				}
			}
		})
	}
}