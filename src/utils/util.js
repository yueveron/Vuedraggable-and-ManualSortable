const util = {
  moveItemFromTo(arr, oldIndex, newIndex){
    var item = arr[oldIndex];
    arr.splice(oldIndex, 1);
    arr.splice(newIndex, 0, item);
    return arr;
  },
  getEleIndex(ele){
    const eleIndex = [...ele.parentElement.children].indexOf(ele);
    return eleIndex;
  },
  getOffset(el){
    let _x = 0;
    let _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        // _y += el.offsetTop - el.scrollTop;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x }  
  },
  insertAfter(newEl, targetEl){
     var parentEl = targetEl.parentNode;      
    if(parentEl.lastChild == targetEl)
    {
      parentEl.appendChild(newEl);
    }else
    {
      parentEl.insertBefore(newEl, targetEl.nextSibling);
    }              
  } 
}

export default util;