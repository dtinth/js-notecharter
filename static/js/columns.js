
define(function(require) {

  var _ = require('lodash')
  var util = require('util')

  return function(desire) {

var columns = { }
var list

columns.set = function(array) {
  var x = 0
  array.forEach(function(column, index) {
    x += column.marginLeft || 0
    column.index = index
    column.left = x
    column.right = x + column.width
    x += column.width
  })
  list = array
  columns.length = list.length
}

columns.get = function(index) {
  return list[index]
}

columns.each = function(fn) {
  return _.each(list, fn)
}

columns.find = function(channel) {
  return util.find(list, function(column) {
    return column.channel == channel
  })
}

columns.fromView = function(x) {
  return util.find(list, function(column) {
    return column.left <= x && x < column.right
  })
}

return columns
    
  }
  
})
