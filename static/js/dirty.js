
define(function(require) {
  
  return function(desire) {

var dirty = {}
var watchers = []

dirty.watch = function(fn) {
  function then(callback) {
    var initial = {}, value = initial
    var watcher = function() {
      var newValue = fn()
      if (newValue !== value) {
        var oldValue = value === initial ? (void 0) : value
        value = newValue
        callback(newValue, oldValue)
      }
    }
    watchers.push(watcher)
    watcher()
  }
  then.then = then
  return then
}

dirty.always = function(callback) {
  watchers.push(callback)
  callback()
}

dirty.check = function() {
  watchers.forEach(function(watcher) {
    watcher()
  })
}

return dirty
    
  }

})
