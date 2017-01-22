/**
 * NOTE: This is kindof a demo. Did'nt really consider about any use case for this. 
 * Just wanted to learn mouse events and this is a good start... :)
*/

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

  function removeEvents(e) {
    var container = document.querySelector('.page');
    var contB = container.getBoundingClientRect();
    if(e.clientX > contB.left && e.clientY > contB.top && el.tagName !== 'INPUT') {
      var div = document.createElement('input');
      div.type = 'text';
      div.style.transform = `translate3d(${e.clientX - contB.left}px, ${e.clientY - contB.top}px, 0px)`;
      container.appendChild(div);
      dragon(div);
      el.style.transform = `translate3d(0px, 0px, 0px)`;
    }
    document.removeEventListener('mousemove',handler);
    document.removeEventListener('mouseup',removeEvents);
  }
}

var draggableElements = document.querySelectorAll('.sideSelector ul li');

draggableElements.forEach(function(item){
  new dragon(item);
});

