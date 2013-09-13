
define(function(require) {

  var models = require('./models')
  var _ = require('./lodash')
  var when = require('when')
  var $ = require('jquery')

  return function(desire) {

    var doc = desire('doc')
    var notify = desire('notify')
    var selection = desire('selection')
    
    var undos = []
    var redos = []

    function op(up, down) {
      return { up: up, down: down }
    }
    function add(event) {
      return op(
        function() { doc.level.addEvent(event) },
        function() { doc.level.removeEvent(event) }
      )
    }
    function remove(event) {
      return op(
        function() { doc.level.removeEvent(event) },
        function() { doc.level.addEvent(event) }
      )
    }
    function set(obj, prop, val) {
      var old
      return op(
        function() { old = obj[prop]; obj[prop] = val },
        function() { obj[prop] = old }
      )
    }
    function batcher(fn) {
      return function() {
        doc.level.batch(fn)
      }
    }
    function chain(fn) {
      var un = []
      function run(operation) { un.push(operation); operation.up() }
      return op(
        batcher(function() { un = []; fn(run) }),
        batcher(function() { un.forEach(function(c) { return c.down() }) })
      )
    }
    function perform(operation) {
      operation.up()
      redos = []
      undos.push(operation)
    }

    var ops = {
      undo: function() {
        var c = undos.pop()
        if (!c) return
        c.down()
        redos.push(c)
      },
      redo: function() {
        var c = redos.pop()
        if (!c) return
        c.up()
        undos.push(c)
      },
      createAndAddEvent: function(options) {
        var event = models.createEvent(options)
        perform(add(event))
      },
      addEvents: function(events) {
        perform(chain(function(run) {
          _.each(events, function(event) {
            run(add(event))
          })
        }))
      },
      removeEvent: function(event) {
        perform(remove(event))
      },
      removeEvents: function(events) {
        perform(chain(function(run) {
          _.each(events, function(event) {
            run(remove(event))
          })
        }))
      },
      move: function(moves) {
        perform(chain(function(run) {
          _.each(moves, function(move, id) {
            var event = doc.level.get(id)
            if (event) {
              run(set(event, 'row', move.row))
              run(set(event, 'channel', move.channel))
            }
          })
        }))
      },
      updateEvents: function(events, callback) {
        perform(chain(function(run) {
          _.each(events, function(event) {
            callback(event, function(key, value) {
              run(set(event, key, value))
            })
          })
        }))
      },
      updateSelection: function(callback) {
        var sel = selection.get()
        if (sel.length === 0) return
        ops.updateEvents(sel, callback)
      },
      save: function() {
        notify.progress(doc.save(), 'Saving...', 'Saved!')
      }
    }

    return ops

  }
  
})
