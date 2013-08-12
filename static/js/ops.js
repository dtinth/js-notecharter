
define(function(require) {

  var models = require('./models')
  var _ = require('./lodash')

  return function(desire) {

    var doc = desire('doc')

    return {
      createAndAddEvent: function(options) {
        var event = models.createEvent(options)
        doc.level.addEvent(event)
      }
    }

  }
  
})
