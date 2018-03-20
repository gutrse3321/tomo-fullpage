class TomoFullPage {
  constructor (options) {
    // 所有页面的容器
    this.MainElement = options.mainEl
    // 容器中的页面集合转为数组
    this.MainChild = Array.from(this.MainElement.children)
    // 点击子项的容器
    // this.ListElement = options.listEL
    // // 列表的子项集合转为数组
    // this.ListChild = Array.from(this.ListElement.children)
    // 移动的速度(时间) 以s计
    this.speed = options.speed
    // 是否是左右滑动 默认为否
    this.transverse = options.transverse || false
    // 等待下一次滚动的时间
    this.wait = options.wait
    // 当前页数
    this.currentPage = 0
    // 加载初始化
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

  // 所有页面的高度
  pageHeightList () {
    let hList = []
    let height,
        MainChildLen = this.MainChild.length
    // 获取设置第一个页面的高度
    height = this.MainChild[0].offsetHeight

    for (let i = 0; i < MainChildLen; i++) {
      // 按倍数获取到最后一个面的高度
      hList.push(height * i)
    }
    // 指向整个插件
    this.hList = hList
  }

  // 绑定事件
  bindEvent () {
    // 滚动事件
    this.MainElement.addEventListener('wheel', e => {
      // 防止过快的滚动
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 获取的时间后才能继续滑动
      this.timer = setTimeout(() => {
        this.changeCurrentPage(e)
      }, this.wait)
    })
    document.addEventListener('keydown', e => {
      // 防止过快的滚动
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 获取的时间后才能继续滑动
      this.timer = setTimeout(() => {
        this.changeCurrentPage(e)
      }, this.wait)
    })
    // 窗口大小改变事件
    window.addEventListener('resize', () => {
      // 窗口大小改变的时候，重新获取高度的列表和移动到正确的位置
      this.pageHeightList()
      this.movePage()
    })
  }

  // 改变当前页数
  changeCurrentPage (e) {
    // 传入event事件
    // e.deltaY为正数 向下，负向上
    if (e.deltaY > 0) {
      if (this.currentPage < this.MainChild.length - 1) {
        this.currentPage++
        console.log(`向下滑：${this.currentPage}`)
        this.movePage()
      }
    } else if (e.deltaY < 0) {
      if (this.currentPage > 0) {
        this.currentPage--
        console.log(`向上滑：${this.currentPage}`)
        this.movePage()
      }
    }

    // 键盘值
    if (e.keyCode === 38) {
      if (this.currentPage > 0) {
        this.currentPage--
        console.log(`向上滑：${this.currentPage}`)
        this.movePage()
      }
    } else if (e.keyCode === 40) {
      if (this.currentPage < this.MainChild.length - 1) {
        this.currentPage++
        console.log(`向下滑：${this.currentPage}`)
        this.movePage()
      }
    }
  }

  // 移动页面
  movePage () {
    // 获取高度列表滚动时的当前页的高度
    let nextPage = this.hList[this.currentPage]
    this.MainChild.forEach(ele => {
      ele.style.transform = `translate3d(0, -${nextPage}px, 0)`
    })
  }
}