
define(function(require) {
  
  var _ = require('lodash')
  
  return function(desire) {

var dirty = {}
var watchers = []
var always = []

dirty.watch = function(fn) {
  function then(callback) {
    var initial = {}, value = initial
    var watcher = function() {
      var newValue = fn()
      if (newValue !== value) {
        var oldValue = value === initial ? (void 0) : value
        value = newValue
        callback(newValue, oldValue)
        return true
      } else {
        return false
      }
    }
    watchers.push(watcher)
    watcher()
  }
  then.then = then
  return then
}

dirty.always = function(callback) {
  always.push(callback)
  callback()
}

function run(watcher) {
  return watcher() === true
}

dirty.check = function() {
  var list = watchers
  for (var i = 0; i < 10; i ++) {
    list = _.filter(list, run)
    if (list.length === 0) return _.each(always, run)
  }
  _.each(always, run)
  console.error(list)
  throw new Error('infinite loop?')
}

return dirty
    
  }

})
