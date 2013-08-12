
define(function(require) {
  
  var _ = require('lodash')

  return function(desire) {

var selection = { }

var map = {}

selection.clear = function(){
  map = {}
}

selection.get = function() {
  return _.values(map)
}

selection.set = function(events) {
  map = {}
  _.each(events, function(event) {
    map[event.id] = event
  })
}

selection.isSelected = function(event) {
  return map[event.id]
}

return selection

  }
  
})
