
define(function(require) {

  var util = require('./util')
  var _ = require('lodash')

  return function(desire) {

var doc = desire('doc')
var viewport = desire('viewport')
var columns = desire('columns')

var metrics = { }

metrics.eachVisibleMeasure = function(fn) {
  
  var level = doc.level

  var bottom = viewport.scroll
  var top = viewport.viewToRow(0)

  var startMeasure = Math.max(0, level.rowToMeasure(bottom))

  for (var measure = startMeasure;
       level.measureToRow(measure) <= top;
       measure++) {
    if (fn(measure) === false) return false
  }

}

metrics.eachVisibleEvent = function(fn) {
  var level = doc.level
  viewport.visibleRowRange(metrics.objectHeight, function(lower, upper) {
    var array = level.range(lower, upper)
    return _.each(array, fn)
  })
}

metrics.eachRowInMeasure = function(measure, grid, fn) {

  var level = doc.level

  var measureSize = level.getMeasureSize(measure)
  var measureStart = level.measureToRow(measure)
  var step = viewport.getGridFrequency(grid)

  for (var i = step; i < measureSize; i += step) {
    if (fn(measureStart + i) === false) return false
  }

}

metrics.eachGrid = function(grid, fn) {

  var level = doc.level

  return metrics.eachVisibleMeasure(function(measure) {

    if (fn(level.measureToRow(measure)) === false) return false

    return metrics.eachRowInMeasure(measure, grid, function(row) {
      if (fn(row) === false) return false
    })

  })

}

metrics.viewToRowOnGrid = function(pixel) {
  return util.last(_.partial(metrics.eachGrid, null), function(row) {
    return pixel <= viewport.rowToView(row)
  })
}

function positionToRowColumn(position, snap) {
  var row = snap ? metrics.viewToRowOnGrid(position.y)
                 : viewport.viewToRow(position.y)
  var column = columns.fromView(position.x)
  if (row >= 0 && column) {
    return { row: row, column: column, channel: column.channel }
  }
}

metrics.insertPosition = function(position) {
  return positionToRowColumn(position, true)
}

metrics.selectPosition = function(position) {
  return positionToRowColumn(position, false)
}

metrics.objectHeight = 12

metrics.getEventUnderPosition = function(position) {
  return util.find(doc.eachEvent, function(event) {
    var column = columns.find(event.channel)
    if (column == null) return false
    if (!(column.left <= position.x && position.x < column.right)) return false
    var pixel = viewport.rowToView(event.row)
    return pixel - metrics.objectHeight <= position.y && position.y <= pixel
  })
}


return metrics

  }
  
})
