
define(function(require) {

  var $ = require('jquery')

  return function(desire) {
  
var view = desire('view')
var modeHandler = desire('mode_handler')

function position(e) {
  var offset = view.element.offset()
  var x = e.pageX - offset.left
  var y = e.pageY - offset.top
  return { x: x, y: y }
}

function mousedown(e) {
  return modeHandler.fire('mousedown', position(e), e)
}
function mousemove(e) {
  return modeHandler.fire('mousemove', position(e), e)
}
function mouseup(e) {
  return modeHandler.fire('mouseup', position(e), e)
}

function bind() {
  view.element
  .on('mousedown', mousedown)
  $(document)
  .on('mousemove', mousemove)
  .on('mouseup',   mouseup)
}

return { bind: bind }

  }

})
