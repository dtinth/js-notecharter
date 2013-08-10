
define(function(require) {

  var models = require('./models')
  var _ = require('./lodash')

  return function(desire) {

    var level = new models.Level()

    var channels = ['1', '2', '3', '4', '5', '6', '7']

    for (var i = 0; i < 1000; i ++) {
      _.take(_.shuffle(channels), _.random(1, 2)).forEach(function(channel) {
        var event = models.createEvent({ channel: channel, row: i * 12 })
        level.events.push(event)
      })
    }

    return {
      level: level
    }

  }
  
})
