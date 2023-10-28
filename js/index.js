/* 스파이크롤러 기능 */
let pageMoveBtn = Array.from(document.querySelectorAll('.pageMoveBtn'))
let pageSection = Array.from(document.querySelectorAll('.page'))
let index = 0
function btnClickPageMove () {
	for(let i = 0; i < pageMoveBtn.length; i++) {
		pageMoveBtn[i].addEventListener('click' , function(e) {
			e.preventDefault()
			index = e.target.getAttribute('data-btnIdx')

			let filteredPage = pageSection.filter((item,idx) => idx < index)
			let totalHeight = filteredPage.reduce((accumulator,currentHeight) => {
				return accumulator + currentHeight.clientHeight
			}, 0)

			window.scrollTo({top: totalHeight , behavior : "smooth"}); 

			for(let i = 0; i < pageSection.length; i ++ ){
				pageSection[i].classList.remove('active')
			}
			pageSection[index].classList.add('active')

			btnClassAdd()//버튼 클릭시 active 클래스 추가를 위한 함수
		})
	}
}
btnClickPageMove()


/* 스크롤시 섹션이동 기능 */
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
		let totalHieght = filteredPage.reduce((accumulator,currentHeight) => {
			return accumulator + currentHeight.clientHeight
		}, 0)

		window.scrollTo({top: totalHieght , behavior : "smooth"}); 

		for(let i = 0; i < pageSection.length; i ++) {
			pageSection[i].classList.remove('active')
		}
		pageSection[index].classList.add('active')

		scrolling = false;
		setTimeout(() => {
			scrolling = true
		}, 600)
	}
}


/* 버튼에 active 클래스 추가 함수 */
function btnClassAdd() {
	for(let i = 0; i < pageMoveBtn.length; i++) {
		if(pageSection[i].classList.contains('active')) {
			pageMoveBtn[i].classList.add('active')
		} else {
			pageMoveBtn[i].classList.remove('active')
		}
	} 
}


/* 새로고침시 버튼에 active클래스 추가 */
function btnReloadClassAdd() {
	let filteredPage = pageSection.filter((item)=> 
		item.getBoundingClientRect().top <= 0 && item.getBoundingClientRect().bottom > 0
	)
	let pageIndex = filteredPage[0].getAttribute('data-pageIdx')
	index = pageIndex

	pageSection[index].classList.add('active')
	btnClassAdd()
}


/* 모바일 gnb 보이기 */
let moblieGnbShowBtn = document.querySelector('.moblieGnb a img')
function mobileGnbShow() {
	moblieGnbShowBtn.addEventListener('click' , function() {
		let leftArea = document.querySelector('.leftArea')
		leftArea.classList.add('active')
	})
}
mobileGnbShow()


/* 모바일 gnb 숨기기 */
let mobileGnbCloseBtn = document.querySelector('.closeBtn a img')
function mobileGnbClose() {
	mobileGnbCloseBtn.addEventListener('click' , function() {
		let leftArea = document.querySelector('.leftArea')
		leftArea.classList.remove('active')
	})
}
mobileGnbClose()


/* 함수실행 */
window.addEventListener('wheel', function(e) {
		e.preventDefault()
		scrollPageMove(e)
		btnClassAdd()
	}, {passive: false}
)

window.addEventListener('load' , function () {
	btnReloadClassAdd()
  }
) 