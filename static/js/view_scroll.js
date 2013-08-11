
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var view = desire('view')

function bind() {
  view.element.on('MozMousePixelScroll', function(e) {
    var pixels = e.originalEvent.detail
    view.viewport.scroll -= pixels
    if (view.viewport.scroll < 0) view.viewport.scroll = 0
    view.redraw()
  })
}

return { bind: bind }

  }

})
