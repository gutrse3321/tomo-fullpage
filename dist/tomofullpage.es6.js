class TomoFullPage {
  constructor (options) {
    this.MainElement = options.mainEl
    this.MainChild = Array.from(this.MainElement.children)
    // 点击子项的容器
    // this.ListElement = options.listEL
    // // 列表的子项集合转为数组
    // this.ListChild = Array.from(this.ListElement.children)
    // 移动的速度(时间) 以s计
    this.speed = options.speed
    this.transverse = options.transverse || false
    this.wait = options.wait
    this.currentPage = 0
    this.init()
  }

  init () {
    this.MainElement.style.overflow = 'hidden'
    this.MainChild.forEach(ele => {
      ele.style.transition = `transform ${this.speed}`
    })
    this.pageHeightList()
    this.bindEvent()
  }

  pageHeightList () {
    let hList = []
    let height,
        MainChildLen = this.MainChild.length
    height = this.MainChild[0].offsetHeight
    for (let i = 0; i < MainChildLen; i++) {
      hList.push(height * i)
    }
    this.hList = hList
  }

  bindEvent () {
    this.MainElement.addEventListener('wheel', e => {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.changeCurrentPage(e)
      }, this.wait)
    })
    window.addEventListener('resize', () => {
      this.pageHeightList()
      this.movePage()
    })
  }

  changeCurrentPage (e) {
    if (e.deltaY > 0) {
      if (this.currentPage < this.MainChild.length - 1) {
        this.currentPage++
        this.movePage()
      }
    } else if (e.deltaY < 0) {
      if (this.currentPage > 0) {
        this.currentPage--
        this.movePage()
      }
    }
  }

  movePage () {
    let nextPage = this.hList[this.currentPage]
    this.MainChild.forEach(ele => {
      ele.style.transform = `translate3d(0, -${nextPage}px, 0)`
    })
  }
}