
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var view = desire('view')
var dirty = desire('dirty')

function renderTo(container) {

  var grids = [4, 8, 12, 16, 24, 32, 48, 64, 192]

  var watchGrid = dirty.watch(function() {
    return view.viewport.grid
  })

  grids.forEach(function(grid) {

    var el = $('<span class="tb grid"></span>')
      .html(grid)
      .click(function() {
        view.viewport.grid = grid
        dirty.check()
      })
      .appendTo(container)

    watchGrid(function(value) {
      el.toggleClass('active', value === grid)
    })

  })

}

return { renderTo: renderTo }

  }

})
