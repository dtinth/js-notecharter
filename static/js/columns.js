
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

var columnWidth = 36
var gutterWidth = 8

columns.set([
  { channel: 'BPM', width: columnWidth, marginLeft: gutterWidth },
  { channel: 'Scroll', width: columnWidth },
  { channel: '1', width: columnWidth, marginLeft: gutterWidth },
  { channel: '2', width: columnWidth },
  { channel: '3', width: columnWidth },
  { channel: '4', width: columnWidth },
  { channel: '5', width: columnWidth },
  { channel: '6', width: columnWidth },
  { channel: '7', width: columnWidth },
  { channel: 'A1', width: columnWidth, marginLeft: gutterWidth },
  { channel: 'A2', width: columnWidth },
  { channel: 'A3', width: columnWidth },
  { channel: 'A4', width: columnWidth },
  { channel: 'A5', width: columnWidth },
  { channel: 'A6', width: columnWidth },
  { channel: 'A7', width: columnWidth },
  { channel: 'A8', width: columnWidth },
  { channel: 'A9', width: columnWidth },
  { channel: 'A10', width: columnWidth }
])

return columns
    
  }
  
})
