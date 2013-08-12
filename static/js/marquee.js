
define(function(require) {

  var util = require('util')
  var It = require('itjs')
  var minmax = util.minmax

  var getIndex = It.get('index')

  return function(desire) {
    
var marquee = { }

marquee.current = null

marquee.clear = function() {
  marquee.current = null
}

marquee.range = function(fn) {
  var current = marquee.current
  if (!current) return
  var start = current.start
  var end = current.end
  return minmax(start.row, end.row, It, function(r1, r2) {
    return minmax(start.column, end.column, getIndex, function(c1, c2) {
      return fn(r1, r2, c1, c2)
    })
  })
}

return marquee

  }
  
})
