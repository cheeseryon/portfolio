/* page height 적용 */
let pageSection = Array.from(document.querySelectorAll('.page'))
function sectionHeightCalc() {
	pageSection.forEach((item) => {
		item.style.height = window.innerHeight + "px"
	})
}
sectionHeightCalc()

function imgAreaHeightCalc() {
	let imgArea = document.querySelectorAll('.imgArea')
	if (window.matchMedia("(min-width: 380px) and (max-width: 800px)").matches) {
			imgArea.forEach((item) => {
				item.style.height = item.clientWidth * 0.75 + "px"
			})
		}
}

/* 첫 렌더링시에만 home 화면의 title 변경 이벤트 */
function fistRenderingHomePageTitleChange () {
	let homePage = document.querySelector('#home')
	if(homePage.classList.contains("active")) {
		homePage.classList.add("change")
	}
	return
}
fistRenderingHomePageTitleChange()


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

				let filteredPage = pageSection.filter((item,idx) => idx < index)
				let totalHeight = filteredPage.reduce((accumulator,currentHeight) => {
					return accumulator + currentHeight.clientHeight
				}, 0)

				window.scrollTo({top: totalHeight , behavior:"smooth"}); 

				for(let i = 0; i < pageSection.length; i ++ ){
					pageSection[i].classList.remove('active')
				}
				pageSection[index].classList.add('active')

				addActiveClass()
				scrollToTopIconShow()	
				fistRenderingHomePageTitleChange()			
			})
		}
	}
}

let asideBtnOnClick = new OnClickPageMove(asideMoveBtn)
let fullMenuBtnOnClick = new OnClickPageMove(menuMoveBtn)

asideBtnOnClick.func()
fullMenuBtnOnClick.func()


/* 메뉴창 보이기 */
function onClickFullMenuShow () {
	let fullMenuShowBtn = document.querySelector('#fullMenuBtn > a')
	let fullMenu = document.querySelector('#fullMenu')

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
onClickFullMenuShow()


/* 스크롤시 페이지 이동 */
let scrolling = true;
function scrollPageMove(e) {
	if(scrolling) {
		if(e.deltaY > 0){
			if(index < pageSection.length - 1) {
				index ++
			}
		} else {
			if(index > 0)
			index --
		}

		let filteredPage = pageSection.filter((item , idx) => idx < index)
		let totalHeight = filteredPage.reduce((accumulator,currentHeight) => {
			return accumulator + currentHeight.clientHeight
		}, 0)

		window.scrollTo({top: totalHeight , behavior : "smooth"}); 

		for(let i = 0; i < pageSection.length; i ++) {
			pageSection[i].classList.remove('active')
		}
		pageSection[index].classList.add('active')

		scrolling = false;
		setTimeout(() => {
			scrolling = true
		}, 600)
	}

	scrollToTopIconShow()
	fistRenderingHomePageTitleChange()
}


/* 스파이 스크롤 버튼에 active 클래스 추가하기*/
function addActiveClass() {
	for(let i = 0; i < asideMoveBtn.length; i++) {
		if(pageSection[i].classList.contains('active')) {
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
	let filteredPage = pageSection.filter((item)=> 
		item.getBoundingClientRect().top <= 0 && item.getBoundingClientRect().bottom > 0
	)
	index = filteredPage[0].getAttribute('data-pageIdx')

	pageSection[index].classList.add('active')
	addActiveClass()
	fistRenderingHomePageTitleChange()
}


/* top 이동 아이콘 show && hide */
function scrollToTopIconShow() {
	let elem = document.querySelectorAll("#scroll div")
	let pageLastNum = pageSection.length - 1

	if(pageSection[pageLastNum].classList.contains("active")) {
		elem[0].classList.add("hide")
		elem[0].classList.remove("show")
		elem[1].classList.add("show")
		elem[1].classList.remove("hide")
	} else {
		elem[0].classList.remove("hide")
		elem[0].classList.add("show")
		elem[1].classList.remove("show")
		elem[1].classList.add("hide")
	}
}
scrollToTopIconShow()


/* 맨위로 이동 */
function scrollToTop(e) {
	e.preventDefault()
	index = 0;
	window.scrollTo({top:0, behavior:"smooth"})
	for(let i = 0; i < pageSection.length; i++) {
		pageSection[i].classList.remove("active")
	}
	pageSection[0].classList.add("active")
}

function onClickScrollTopBtn () {
	document.querySelector(".scrollTop > a").addEventListener("click", (e) => {
		scrollToTop(e)
		addActiveClass()
		scrollToTopIconShow()
	})
}
onClickScrollTopBtn()



/* window 이벤트 */
window.addEventListener('wheel', function(e) {
		e.preventDefault()
		scrollPageMove(e)
		addActiveClass()
		
	}, {passive: false}
)
window.addEventListener('load' , function () {
	reloadAddActiveClass()
  }
) 

window.addEventListener('resize' , function () {
	sectionHeightCalc()
	imgAreaHeightCalc()
  }
) 

