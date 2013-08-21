


define(function(require) {

return function(desire) {

var keyboard = desire('keyboard')
var ops = desire('ops')
var dirty = desire('dirty')

return {
  initialize: function() {
    keyboard.register({
      '^90': function() { ops.undo(); dirty.check() },
      '^89': function() { ops.redo(); dirty.check() }
    })
  }
}


}
  
})
