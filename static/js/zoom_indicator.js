
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var view = desire('view')
var dirty = desire('dirty')

function renderTo(container) {

  var el = $('<span class="tb zoom"></span>').appendTo(container)

  dirty.watch(function() { return view.viewport.zoom })(function(value) {
    el.html('x' + value)
  })

}

return { renderTo: renderTo }

  }

})
