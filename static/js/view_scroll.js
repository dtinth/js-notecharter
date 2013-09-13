
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var view = desire('view')
var viewport = desire('viewport')

function wheel(deltaY) {
  var pixels = deltaY
  viewport.scroll -= pixels
  if (viewport.scroll < 0) viewport.scroll = 0
  view.redraw()
}

function bind() {
  if ('deltaX' in WheelEvent.prototype) {
    view.element.on('wheel', function(e) {
      e.preventDefault()
      wheel(e.originalEvent.deltaY)
    })
  } else {
    view.element.on('mousewheel', function(e) {
      e.preventDefault()
      wheel(e.originalEvent.wheelDeltaY / -3)
    })
  }
}

return { bind: bind }

  }

})
