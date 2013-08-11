
define(function(require) {

  var $ = require('jquery')

  return function(desire) {
  
var view = desire('view')
var modeHandler = desire('mode_handler')

function mousedown(e) {
  return modeHandler.fire('mousedown', e)
}
function mousemove(e) {
  return modeHandler.fire('mousemove', e)
}
function mouseup(e) {
  return modeHandler.fire('mouseup', e)
}

function bind() {
  view.element
  .on('mousedown', mousedown)
  .on('mousemove', mousemove)
  .on('mouseup',   mouseup)
}

return { bind: bind }

  }

})
