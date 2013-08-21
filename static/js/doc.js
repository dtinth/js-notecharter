
define(function(require) {

  var models = require('./models')
  var _ = require('./lodash')

  return function(desire) {

    var dirty = desire('dirty')
    var level = new models.Level()

    return {
      level: level,
      watch: dirty.watch(function() { return level.revision }),
      eachEvent: function(fn) {
        return level.eachEvent(fn)
      }
    }

  }
  
})
