import util from '@/utils/util'

const sortable = {
    debug: true,
    options : null,
    dataLimited : {relX:0, relY:0, maxX:0, maxY:0},
    rootEle : null,
    currDragEle : null,
    eleMirror : null,
    listCompareEle : {prev:null, next:null},
    item : {oldIndex:0, newIndex:0},

    init(el, options){
      this.options = options;
      this.rootEle = el.children[1].getElementsByClassName('dragula-container')[0];
      this.eleMirror = el.children[1].getElementsByClassName('gu-mirror')[0];
      const body = document.body;
      const html = document.documentElement;
      const wihdow = window;
      //
      this.eleMirror.classList.add('active')
      this.dataLimited.relX = Math.floor(this.eleMirror.clientWidth/2);
      this.dataLimited.relY = Math.floor(this.eleMirror.clientHeight/2);
      this.eleMirror.classList.remove('active')
    },

    onStartDrag(evt){
      this.currDragEle = evt.target.parentElement.parentElement;
      this.item.oldIndex = util.getEleIndex(this.currDragEle);
      this.updateListCompareEleItem();
      //
      this.currDragEle.classList.add('gu-transit');
      this.eleMirror.classList.add('active');
      //
      this._on(document, 'mousemove', this.onMouseMove);
      this._on(window, 'mouseup', this.onMouseEnd);
    },

    onMouseMove(evt){
      const _this = sortable;
      const winScrollPosY = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
      //
      _this.manualScrollPage(evt, winScrollPosY);  
      //
      _this.mirrorFlowMouse(evt, _this.dataLimited.relX, _this.dataLimited.relY, winScrollPosY)
      //
      _this.compareSwapItem(_this.eleMirror, winScrollPosY, _this.currDragEle);      
    },

    mirrorFlowMouse (evt, relX, relY, winScrollPosY){
      var self = this;
      var diffX = Math.max(0, evt.pageX - relX);
      var diffY = Math.max(0, evt.pageY - relY - winScrollPosY);
      // console.debug(diffX, diffY)
      this.eleMirror.style.left = diffX + 'px';
      this.eleMirror.style.top = diffY + 'px';
    },

    manualScrollPage : function(evt, winScrollPosY){
      var winHeight = window.innerHeight;
      // console.debug(evt)
      var ePageY = evt.pageY; // 当前 MouseY 相对于整个 document 的 Y 坐标
      if(ePageY - winScrollPosY < 100){ //* case : mouse-point at the area[距离顶部100以内的区域]
        document.documentElement.scrollTop = (winScrollPosY - 20);
      }else if((ePageY - winScrollPosY) > (winHeight-100)){  //* case : mouse-point at the area[距离底部100以内的区域]
        document.documentElement.scrollTop = (winScrollPosY + 20);
      }
    },

    onMouseEnd(){
      console.debug('onMouseEnd');
      const _this = sortable;
      _this.item.newIndex = util.getEleIndex(_this.currDragEle);
      _this.currDragEle.classList.remove('gu-transit');
      _this.eleMirror.classList.remove('active');
      _this.currDragEle = null;
      _this._off(document, 'mousemove', _this.onMouseMove);
      _this._off(window, 'mouseup', _this.onMouseEnd);
      //
      const evt = {item:_this.item}
      _this.options.onChange.call(_this, evt);
    },

    compareSwapItem : function(eleMirror, fixDistance, currDragEle){
      const comparePosY = util.getOffset(eleMirror).top + fixDistance;
      //* 优化每次只比较 dragItem 前后两个 OtherItem
      var prevEleItem = this.listCompareEle.prev;
      var nextEleItem = this.listCompareEle.next;
      //
      if(prevEleItem != null){
        var prevPosY = util.getOffset(prevEleItem).top + prevEleItem.clientHeight/2;
        if(comparePosY<prevPosY){
          // console.log('drapItem before prevEleItem');
          this.rootEle.insertBefore(currDragEle, prevEleItem);
          this.updateListCompareEleItem();
          return;
        }
      }
      //      
      if(nextEleItem != null){
        var nextPosY = util.getOffset(nextEleItem).top + nextEleItem.clientHeight/2;
        if(comparePosY>nextPosY){
          // console.log('drapItem after nextEleItem');
          util.insertAfter(currDragEle, nextEleItem);
          this.updateListCompareEleItem();
          return;
        }
      }     
    },

    updateListCompareEleItem : function(){
      var prevEle = this.currDragEle.previousSibling;
      var nextEle = this.currDragEle.nextSibling;
      if(prevEle != null){
        this.listCompareEle.prev = prevEle;
      }else{
        this.listCompareEle.prev = null;
      }
      //
      if(nextEle != null){
        this.listCompareEle.next = nextEle;
      }else{
        this.listCompareEle.next = null;        
      }
    },

    _on(el, event, fn) {
      el.addEventListener(event, fn, {capture: false, passive: false });
    },

    _off(el, event, fn) {
      el.removeEventListener(event, fn, {capture: false, passive: false });
    },

    _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex, originalEvt) {
      sortable = (sortable || rootEl[expando]);
      var evt,
        options = sortable.options,
        onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
      // Support for new CustomEvent feature
      if (window.CustomEvent && !IE11OrLess && !Edge) {
        evt = new CustomEvent(name, {
          bubbles: true,
          cancelable: true
        });
      } else {
        evt = document.createEvent('Event');
        evt.initEvent(name, true, true);
      }

      evt.oldIndex = startIndex;
      evt.newIndex = newIndex;

      if (rootEl) {
        rootEl.dispatchEvent(evt);
      }

      if (options[onName]) {
        options[onName].call(sortable, evt);
      }
    }
};

export default sortable;