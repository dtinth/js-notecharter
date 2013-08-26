
define(function(require) {

  var models = require('./models')
  var _ = require('./lodash')
  var when = require('when')
  var $ = require('jquery')
  var util = require('util')

  return function(desire) {

    var dirty = desire('dirty')
    var level = new models.Level()

    var watchers = []

    var levelWatcher = dirty.watch(function() { return level.revision })

    var doc = {

      level: level,
      errors: [],

      watch: function(fn) {
        watchers.push(fn)
      },

      eachEvent: function(fn) {
        return level.eachEvent(fn)
      },

      load: function() {
        return when($.ajax({ url: '/data.json' }))
        .then(function(data) {
          level.batch(function() {
            _.each(data.events, function(event) {
              level.addEvent(models.createEvent(event))
            })
          })
          dirty.check()
        })
      },

      save: function() {
        var data = { events: util.toArray(level.eachEvent.bind(level)) }

        return when($.ajax({ url: '/save', type: 'POST',
          data: { data: JSON.stringify(data) } }))
        .then(function(resp) {
          if (resp == 'ok') {
            return 'ok'
          } else {
            throw new Error('bad response - ' + resp)
          }
        })
      }

    }

    levelWatcher(function(revision) {
      doc.errors = []
      _.each(watchers, function(watcher) {
        watcher(revision)
      })
    })

    return doc

  }
  
})
