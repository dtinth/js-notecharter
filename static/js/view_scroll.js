
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var view = desire('view')
var viewport = desire('viewport')

function bind() {
  view.element.on('wheel', function(e) {
    console.log(e)
    e.preventDefault()
    var pixels = e.originalEvent.deltaY
    viewport.scroll -= pixels
    if (viewport.scroll < 0) viewport.scroll = 0
    view.redraw()
  })
}

return { bind: bind }

  }

})
