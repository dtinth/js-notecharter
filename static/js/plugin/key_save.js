

define(function(require) {

return function(desire) {

var keyboard = desire('keyboard')
var doc = desire('doc')
var config = desire('config')

return {
  initialize: function() {
    keyboard.register({
      '^83': function() {
        doc.save().then(function() {
          document.title = config.appName + ' [saved ' + new Date() + ']'
        }, console.error)
      },
    })
  }
}


}
  
})
