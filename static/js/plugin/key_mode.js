
define(function(require) {

return function(desire) {

var keyboard = desire('keyboard')
var modes = desire('modes')
var dirty = desire('dirty')

function switchMode(mode) {
  return function() {
    modes.mode = mode
    dirty.check()
    return false
  }
}

return {
  initialize: function() {
    keyboard.register({
      '112': switchMode('select'),
      '113': switchMode('insert'),
      '114': switchMode('remove')
    })
  }
}


}
  
})
