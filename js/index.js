/* imgArea height 조절 */
function imgAreaHeightCalc() {
	let imgArea = document.querySelectorAll('.imgArea')
	if (window.matchMedia("(min-width: 375px) and (max-width: 800px)").matches) {
			imgArea.forEach((item) => {
				item.style.height = item.clientWidth * 0.75 + "px"
			})
		}
}


/* 첫 렌더링시에만 home 화면의 title 변경 이벤트 */
function onChangeHomePageTitle () {
	let homePage = document.querySelector('#home')

	if(homePage.classList.contains("change")) {
		return
	}
	
	if(homePage.classList.contains("active")) {
		homePage.classList.add("change")
	}
}
onChangeHomePageTitle()


/* 메뉴창 열고 닫기 */
let fullMenuShowBtn = document.querySelector('#fullMenuBtn > button')
let fullMenu = document.querySelector('#fullMenu')

/* fullMenuButton 클릭시 열고 닫기 */
function onClickFullMenuToggle () {
	fullMenuShowBtn.addEventListener("click" , function(e) {
		e.preventDefault()
		 	if(this.classList.contains("active")) {
				this.classList.remove("active") 
				fullMenu.classList.remove("active") 
			} else {
				this.classList.add("active") 
				fullMenu.classList.add("active") 
			}
	})
}
onClickFullMenuToggle()

/* fullMenu가 아닌 곳 클릭시 닫기 */
function onClickFullMenuHide (e) {
	if(!e.target.closest("#fullMenu") && !e.target.closest('#fullMenuBtn')) {
		fullMenuShowBtn.classList.remove("active") 
		fullMenu.classList.remove("active") 
	}
}


/* 페이지 이동 기능 */
let page = Array.from(document.querySelectorAll('article'))
let scrolling = true;
function PageMove(touchStartOrDeltaY , touchEndOrNumberZero) {
	this.ifInLeftData = touchStartOrDeltaY,
	this.ifInRightData = touchEndOrNumberZero,
	this.move = function(e) {
		if(scrolling) {
			if(this.ifInLeftData > this.ifInRightData){
				if(index < page.length - 1) {
					index ++
				}
			} else if (this.ifInLeftData < this.ifInRightData) {
				if(index > 0)
				index --
			}

			let filteredPage = page.filter((item , idx) => idx < index)
			let totalHeight = filteredPage.reduce((accumulator,currentHeight) => {
				return accumulator + currentHeight.clientHeight
			}, 0)
	
			window.scrollTo({top: totalHeight , behavior : "smooth"}); 
	
			for(let i = 0; i < page.length; i ++) {
				page[i].classList.remove('active')
			}
			page[index].classList.add('active')
	
			scrolling = false;
			setTimeout(() => {
				scrolling = true
			}, 600)
		}
	
		scrollToTopIconShow()
		onChangeHomePageTitle()
	}
}

/* 마우스 휠 사용시 페이지 이동 */
function handelMouseWheelEvent (e) {
	e.preventDefault()
	let mouseWheelPageMove = new PageMove(e.deltaY , 0) //pageMove 인스턴스
	mouseWheelPageMove.move(e)
}

/* 터치 사용시 페이지 이동 */
let startY
window.addEventListener('touchstart', function(e) {
	startY = e.changedTouches[0].clientY 
})
window.addEventListener('touchend', function(e) {
	let endY = e.changedTouches[0].clientY 

	if(startY > endY + 100 || startY < endY - 100) {
		let touchPageMove = new PageMove(startY , endY) //pageMove 인스턴스
		touchPageMove.move(e)
	}
})


/* 스파이스크롤 기능 */
let asideMoveBtn = Array.from(document.querySelectorAll('.asideMoveBtn'))
let menuMoveBtn = Array.from(document.querySelectorAll('.menuMoveBtn'))
let index = 0

function OnClickPageMove (moveBtn) {
	this.btn = moveBtn;
	this.func = function () {
		for(let i = 0; i < this.btn.length; i++) {
			this.btn[i].addEventListener('click' , function(e) {
				e.preventDefault()
				index = this.getAttribute('data-btnIdx')

				let filteredPage = page.filter((item,idx) => idx < index)
				let totalHeight = filteredPage.reduce((accumulator,currentHeight) => {
					return accumulator + currentHeight.clientHeight
				}, 0)

				window.scrollTo({top: totalHeight , behavior:"smooth"}); 

				for(let i = 0; i < page.length; i ++ ){
					page[i].classList.remove('active')
				}
				page[index].classList.add('active')

				addActiveClass()
				scrollToTopIconShow()	
				onChangeHomePageTitle()	

				if (window.innerWidth < 800) {
					fullMenuShowBtn.classList.remove("active") 
					fullMenu.classList.remove("active") 
				}
			})
		}
	}
}
let asideBtnOnClick = new OnClickPageMove(asideMoveBtn)
let fullMenuBtnOnClick = new OnClickPageMove(menuMoveBtn)
asideBtnOnClick.func()
fullMenuBtnOnClick.func()

/* 스파이 스크롤 버튼에 active 클래스 추가하기*/
function addActiveClass() {
	for(let i = 0; i < asideMoveBtn.length; i++) {
		if(page[i].classList.contains('active')) {
			asideMoveBtn[i].classList.add('active')
			menuMoveBtn[i].classList.add('active')
		} else {
			asideMoveBtn[i].classList.remove('active')
			menuMoveBtn[i].classList.remove('active')
		}
	} 
}
/* 새로고침시 버튼에 active클래스 추가 */
function reloadAddActiveClass() {
	let filteredPage = page.filter((item)=> 
		item.getBoundingClientRect().top <= 0 && item.getBoundingClientRect().bottom > 0
	)
	index = filteredPage[0].getAttribute('data-pageIdx')

	page[index].classList.add('active')
	addActiveClass()
	onChangeHomePageTitle()
}


/* top 이동 아이콘 show && hide */
function scrollToTopIconShow() {
	let scrollElem = document.querySelectorAll("#scroll div")
	let pageLastNum = page.length - 1

	if(page[pageLastNum].classList.contains("active")) {
		scrollElem[0].classList.add("hide")
		scrollElem[0].classList.remove("show")
		scrollElem[1].classList.add("show")
		scrollElem[1].classList.remove("hide")
	} else {
		scrollElem[0].classList.remove("hide")
		scrollElem[0].classList.add("show")
		scrollElem[1].classList.remove("show")
		scrollElem[1].classList.add("hide")
	}
}
scrollToTopIconShow()


/* 맨위로 이동 */
function ScrollToTop(clickBtn) {
	this.btn = clickBtn
	this.func = function() {
		this.btn.addEventListener("click", (e) => {
			e.preventDefault()
			index = 0;
			window.scrollTo({top:0, behavior:"smooth"})
			for(let i = 0; i < page.length; i++) {
				page[i].classList.remove("active")
			}
			page[0].classList.add("active")

			addActiveClass()
			scrollToTopIconShow()
		})
	}
}

let logo = document.querySelector(".logo a")
let arrowBtn = document.querySelector(".scrollTop > button")

let onClickLogoScrollToTop = new ScrollToTop(logo)
let onClickArrowScrollToTop = new ScrollToTop(arrowBtn)

onClickLogoScrollToTop.func()
onClickArrowScrollToTop.func()


window.addEventListener('click', function(e) {
	onClickFullMenuHide(e)
})

window.addEventListener('wheel', function(e) {
		e.preventDefault()
		handelMouseWheelEvent(e)
		addActiveClass()
	}, {passive: false}
)
window.addEventListener('load' , function () {
	reloadAddActiveClass()
  }
) 

window.addEventListener('resize' , function () {
	imgAreaHeightCalc()
  }
) 

