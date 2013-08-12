
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var view = desire('view')
var viewport = desire('viewport')

function bind() {
  view.element.on('MozMousePixelScroll', function(e) {
    var pixels = e.originalEvent.detail
    viewport.scroll -= pixels
    if (viewport.scroll < 0) viewport.scroll = 0
    view.redraw()
  })
}

return { bind: bind }

  }

})
