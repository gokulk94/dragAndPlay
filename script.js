/**
 * NOTE: This is kindof a demo. Did'nt really consider about any use case for this. 
 * Just wanted to learn mouse events and this is a good start... :)
*/

function dragon(selector,isdragged) {
  var el = selector;
  var dragStartX, dragStartY, currentElPosX, currentElPosY;
  var originOffSetX = el.offsetLeft,
    originOffSetY = el.offsetTop;
  el.addEventListener('mousedown', function (e) {
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    var pos = el.getBoundingClientRect();
    currentElPosX = pos.left;
    currentElPosY = pos.top;
    document.addEventListener('mousemove', handler);
    document.addEventListener('mouseup', removeEvents);
  });

  function handler(e) {
    if(isdragged) {
      var x = currentElPosX + (e.clientX - dragStartX) - originOffSetX + window.scrollX;
      var y = currentElPosY + (e.clientY - dragStartY) - originOffSetY + window.scrollY;
      el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
  }

  function removeEvents(e) {
    console.log(e.target);
    var container = e.target;
    var contB = container.getBoundingClientRect();

    /*
      All the logic for the formBuilder feature should be here.
      Yet to decide on how to structure this
    */

    if (container.parentNode.className == 'page_wrapper' && e.clientX > contB.left && e.clientY > contB.top && el.tagName !== 'INPUT' && el.tagName !== 'SPAN' && e.clientX < (contB.width + contB.left)) {
      insertItem(el.getAttribute('data-purpose'), e.clientX, e.clientY, contB, el, container);
    }
    document.removeEventListener('mousemove', handler);
    document.removeEventListener('mouseup', removeEvents);
  }
}

function insertItem(purpose, clientX, clientY, clientRect, el, container) {
  var div;
  if(purpose === 'inputField') {
    div = document.createElement('input');
    div.type = 'text';
    div.classList.add('inputField');
  } else if(purpose === 'signBox') {
    div = document.createElement('span');
    div.classList.add('signBox');
  }
  div.style.transform = `translate3d(${clientX - clientRect.left}px, ${clientY - clientRect.top}px, 0px)`;
  container.appendChild(div);
  dragon(div,true);
  el.style.transform = `translate3d(0px, 0px, 0px)`;
}

var draggableElements = document.querySelectorAll('.sideSelector ul li');

draggableElements.forEach(function (item) {
  new dragon(item,false);
});

function sendData() {
  var content = document.querySelectorAll('.page_wrapper * *');
  var coordinates = [];
  content.forEach(function(item) {
    var t = item.style.transform.split('(')[1].split(',');
    coordinates.push({
      purpose: item.className,
      coordinateX: t[0],
      coordinateY: t[1],
      parent: item.parentNode.className
    });
  });
  console.log(coordinates);
}