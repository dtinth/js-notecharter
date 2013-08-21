

define(function(require) {

return function(desire) {

var keyboard = desire('keyboard')
var doc = desire('doc')

return {
  initialize: function() {
    keyboard.register({
      '^83': function() {
        doc.save().then(null, console.error)
      },
    })
  }
}


}
  
})
