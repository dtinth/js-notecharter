

define(function(require) {

return function(desire) {

var keyboard = desire('keyboard')
var doc = desire('doc')
var config = desire('config')
var ops = desire('ops')

return {
  initialize: function() {
    keyboard.register({
      '^83': function() {
        ops.save()
      },
    })
  }
}


}
  
})
