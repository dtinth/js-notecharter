
define(function(require) {

  return function(desire) {

var modes = desire('modes')
var dirty = desire('dirty')
var view = desire('view')

function bind() {

  var keys = {
    '112': switchMode('select'),
    '113': switchMode('insert'),
    '114': switchMode('remove'),

    '49': switchGrid(8),
    '50': switchGrid(16),
    '51': switchGrid(32),
    '52': switchGrid(12),
    '53': switchGrid(24),
    '54': switchGrid(48),

    '173': function() { view.viewport.zoomOut(); dirty.check(); return false },
    '61': function() { view.viewport.zoomIn(); dirty.check(); return false }
  }

  function switchMode(mode) {
    return function() {
      modes.mode = mode
      dirty.check()
      return false
    }
  }
  function switchGrid(grid) {
    return function() {
      view.viewport.grid = grid
      dirty.check()
      return false
    }
  }

  $(window).on('keydown', function(e) {

    var key = e.which

    if (keys[key]) {
      return keys[key](key, e)
    } else {
      console.log(key)
    }
    
  })

}

return { bind: bind }

  }

})
