'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TomoFullPage = function () {
  function TomoFullPage(options) {
    _classCallCheck(this, TomoFullPage);

    this.MainElement = options.mainEl;
    this.MainChild = Array.from(this.MainElement.children);
    // 点击子项的容器
    // this.ListElement = options.listEL
    // // 列表的子项集合转为数组
    // this.ListChild = Array.from(this.ListElement.children)
    // 移动的速度(时间) 以s计
    this.speed = options.speed;
    this.transverse = options.transverse || false;
    this.wait = options.wait;
    this.currentPage = 0;
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
  }, {
    key: 'pageHeightList',
    value: function pageHeightList() {
      var hList = [];
      var height = void 0,
          MainChildLen = this.MainChild.length;
      height = this.MainChild[0].offsetHeight;
      for (var i = 0; i < MainChildLen; i++) {
        hList.push(height * i);
      }
      this.hList = hList;
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this2 = this;

      this.MainElement.addEventListener('wheel', function (e) {
        if (_this2.timer) {
          clearTimeout(_this2.timer);
        }
        _this2.timer = setTimeout(function () {
          _this2.changeCurrentPage(e);
        }, _this2.wait);
      });
      window.addEventListener('resize', function () {
        _this2.pageHeightList();
        _this2.movePage();
      });
    }
  }, {
    key: 'changeCurrentPage',
    value: function changeCurrentPage(e) {
      if (e.deltaY > 0) {
        if (this.currentPage < this.MainChild.length - 1) {
          this.currentPage++;
          this.movePage();
        }
      } else if (e.deltaY < 0) {
        if (this.currentPage > 0) {
          this.currentPage--;
          this.movePage();
        }
      }
    }
  }, {
    key: 'movePage',
    value: function movePage() {
      var nextPage = this.hList[this.currentPage];
      this.MainChild.forEach(function (ele) {
        ele.style.transform = 'translate3d(0, -' + nextPage + 'px, 0)';
      });
    }
  }]);

  return TomoFullPage;
}();