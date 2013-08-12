
define(function(require) {
  
  var _ = require('lodash')

  return function(desire) {

var modes = desire('modes')
var handlers = {}

function fireMode(mode, event) {
  if (mode == null) mode = modes.mode
  var args = _.drop(arguments, 2)
  if (handlers[mode] && typeof handlers[mode][event] == 'function') {
    return handlers[mode][event].apply(null, args)
  } else {
    console.log('unhandled:', mode, event)
  }
}

function fire() {
  var args = _.toArray(arguments)
  args.unshift(null)
  return fireMode.apply(null, args)
}

function watch() {
  modes.watch(function(mode, prev) {
    if (prev) fireMode(prev, 'leave')
    fireMode(mode, 'enter')
  })
}

function getMode(mode) {
  var object = handlers[mode] || (handlers[mode] = { })
  return {
    on: function(event, fn) {
      object[event] = fn
      return this
    }
  }
}

return { watch: watch, fire: fire, fireMode: fireMode, mode: getMode }

  }
  
})
