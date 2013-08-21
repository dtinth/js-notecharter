

define(function(require) {

return function(desire) {

var keyboard = desire('keyboard')
var viewport = desire('viewport')
var dirty = desire('dirty')

function switchGrid(grid) {
  return function() {
    viewport.grid = grid
    dirty.check()
    return false
  }
}

return {
  initialize: function() {
    keyboard.register({
      '173': function() { viewport.zoomOut(); dirty.check(); return false },
      '61': function() { viewport.zoomIn(); dirty.check(); return false }
    })
  }
}


}
  
})
