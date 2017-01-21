function dragon(selector) {
  var el = selector;
  var dragStartX, dragStartY, currentElPosX, currentElPosY;
  var originOffSetX = el.offsetLeft,
      originOffSetY = el.offsetTop;
  el.addEventListener('mousedown',function(e) {
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    var pos = el.getBoundingClientRect();
    currentElPosX = pos.left;
    currentElPosY = pos.top;
    document.addEventListener('mousemove',handler);
    document.addEventListener('mouseup',removeEvents);
  });

  function handler(e) {
    var x = currentElPosX + (e.clientX - dragStartX) - originOffSetX;
    var y = currentElPosY + (e.clientY - dragStartY) - originOffSetY;
    el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

  function removeEvents() {
    document.removeEventListener('mousemove',handler);
    document.removeEventListener('mouseup',removeEvents);
  }
}

var draggableElements = document.querySelectorAll('ul li');

draggableElements.forEach(function(item){
  new dragon(item);
});

