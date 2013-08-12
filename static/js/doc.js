
define(function(require) {

  var models = require('./models')
  var _ = require('./lodash')

  return function(desire) {

    var dirty = desire('dirty')
    var level = new models.Level()

    var channels = ['1', '2', '3', '4', '5', '6', '7']

    function generateRandomNote(i) {
      level.batch(function() {
        _.take(_.shuffle(channels), _.random(1, 2)).forEach(function(channel) {
          var event = models.createEvent({ channel: channel, row: i * 12 })
          level.addEvent(event)
        })
      })
    }

    for (var i = 0; i < 1000; i ++) {
      generateRandomNote(i)
    }

    return {
      level: level,
      watch: dirty.watch(function() { return level.revision }),
      eachEvent: function(fn) {
        return level.eachEvent(fn)
      }
    }

  }
  
})
