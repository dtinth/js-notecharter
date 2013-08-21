
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
      '49': switchGrid(8),
      '50': switchGrid(16),
      '51': switchGrid(32),
      '52': switchGrid(12),
      '53': switchGrid(24),
      '54': switchGrid(48)
    })
  }
}


}
  
})
