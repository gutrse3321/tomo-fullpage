'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TomoFullPage = function () {
  function TomoFullPage(options) {
    _classCallCheck(this, TomoFullPage);

    // 所有页面的容器
    this.MainElement = options.mainEl;
    // 容器中的页面集合转为数组
    this.MainChild = Array.from(this.MainElement.children);
    // 点击子项的容器
    // this.ListElement = options.listEL
    // // 列表的子项集合转为数组
    // this.ListChild = Array.from(this.ListElement.children)
    // 移动的速度(时间) 以s计
    this.speed = options.speed;
    // 是否是左右滑动 默认为否
    this.transverse = options.transverse || false;
    // 等待下一次滚动的时间
    this.wait = options.wait;
    // 当前页数
    this.currentPage = 0;
    // 加载初始化
    this.init();
  }

  _createClass(TomoFullPage, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.MainElement.style.overflow = 'hidden';
      this.MainChild.forEach(function (ele) {
        ele.style.transition = 'transform ' + _this.speed;
      });

      this.pageHeightList();
      this.bindEvent();
    }

    // 所有页面的高度

  }, {
    key: 'pageHeightList',
    value: function pageHeightList() {
      var hList = [];
      var height = void 0,
          MainChildLen = this.MainChild.length;
      // 获取设置第一个页面的高度
      height = this.MainChild[0].offsetHeight;

      for (var i = 0; i < MainChildLen; i++) {
        // 按倍数获取到最后一个面的高度
        hList.push(height * i);
      }
      // 指向整个插件
      this.hList = hList;
    }

    // 绑定事件

  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this2 = this;

      // 滚动事件
      this.MainElement.addEventListener('wheel', function (e) {
        // 防止过快的滚动
        if (_this2.timer) {
          clearTimeout(_this2.timer);
        }
        // 获取的时间后才能继续滑动
        _this2.timer = setTimeout(function () {
          _this2.changeCurrentPage(e);
        }, _this2.wait);
      });
      // 键盘事件
      document.addEventListener('keydown', function (e) {
        // 防止过快的滚动
        if (_this2.timer) {
          clearTimeout(_this2.timer);
        }
        // 获取的时间后才能继续滑动
        _this2.timer = setTimeout(function () {
          _this2.changeCurrentPage(e);
        }, _this2.wait);
      });
      // 触屏事件
      this.MainElement.addEventListener('touchstart', function (e) {
        var touch = e.changedTouches;
        _this2.starty = touch[0].clientY;
      });
      this.MainElement.addEventListener('touchend', function (e) {
        var touch = e.changedTouches;
        _this2.endy = touch[0].clientY;
        // 防止过快的滚动
        if (_this2.timer) {
          clearTimeout(_this2.timer);
        }
        // 获取的时间后才能继续滑动
        _this2.timer = setTimeout(function () {
          _this2.changeCurrentPage(e);
        }, _this2.wait);
      });
      // 窗口大小改变事件
      window.addEventListener('resize', function () {
        // 窗口大小改变的时候，重新获取高度的列表和移动到正确的位置
        _this2.pageHeightList();
        _this2.movePage();
      });
    }

    // 改变当前页数

  }, {
    key: 'changeCurrentPage',
    value: function changeCurrentPage(e) {
      // 传入event事件
      // e.deltaY为正数 向下，负向上
      if (e.deltaY > 0 || e.keyCode === 40 || this.starty > this.endy) {
        if (this.currentPage < this.MainChild.length - 1) {
          this.currentPage++;
          console.log('\u5411\u4E0B\u6ED1\uFF1A' + this.currentPage);
          console.log('Y\uFF1A' + this.starty + ',X\uFF1A' + this.endy);
          this.movePage();
        }
      } else if (e.deltaY < 0 || e.keyCode === 38 || this.starty < this.endy) {
        if (this.currentPage > 0) {
          this.currentPage--;
          console.log('\u5411\u4E0A\u6ED1\uFF1A' + this.currentPage);
          console.log('Y\uFF1A' + this.starty + ',X\uFF1A' + this.endy);
          this.movePage();
        }
      }
    }

    // 移动页面

  }, {
    key: 'movePage',
    value: function movePage() {
      // 获取高度列表滚动时的当前页的高度
      var nextPage = this.hList[this.currentPage];
      this.MainChild.forEach(function (ele) {
        ele.style.transform = 'translate3d(0, -' + nextPage + 'px, 0)';
      });
    }
  }]);

  return TomoFullPage;
}();