
define(function(require) {

  return function(desire) {

var dirty = desire('dirty')
var modes = { }

modes.mode = 'select'
modes.MODES = [ 'select', 'insert', 'remove' ]

modes.watch = dirty.watch(function() { return modes.mode })

return modes


  }

})
