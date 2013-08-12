
define(function(require) {

  var models = require('./models')
  var _ = require('./lodash')

  return function(desire) {

    var doc = desire('doc')

    return {
      createAndAddEvent: function(options) {
        var event = models.createEvent(options)
        doc.level.addEvent(event)
      },
      removeEvent: function(event) {
        doc.level.removeEvent(event)
      },
      removeEvents: function(events) {
        doc.level.batch(function() {
          _.each(events, function(event) {
            doc.level.removeEvent(event)
          })
        })
      },
      move: function(moves) {
        doc.level.update(function() {
          _.each(moves, function(move, id) {
            var event = doc.level.get(id)
            if (event) {
              event.row = move.row
              event.channel = move.channel
            }
          })
        })
      }
    }

  }
  
})
