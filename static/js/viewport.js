
define(function(require) {

var util = require('util')
var It = require('itjs')

function Viewport() {
  this.scroll = 0
  this.grid = 16
  this.zoom = 1
  this.width = 0
  this.height = 0
}

Viewport.prototype.resize = function(w, h) {
  this.width = w
  this.height = h
}

var zooms = [0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4]

Viewport.prototype.zoomIn = function() {
  this.zoom = util.first(zooms, It['>'](this.zoom), this.zoom)
}
Viewport.prototype.zoomOut = function() {
  this.zoom = util.last(zooms, It['<'](this.zoom), this.zoom)
}

// unit conversion
var pixelsPerRow = 16 / 192 * 16

Viewport.prototype.pixelToRow = function(pixel) {
  return pixel / (pixelsPerRow * this.zoom)
}

Viewport.prototype.rowToPixel = function(row) {
  return row * (pixelsPerRow * this.zoom)
}

// convert view offset in pixels to rows
Viewport.prototype.viewToRow = function(pixel) {
  var distance = this.height - 24 - pixel
  return this.pixelToRow(this.rowToPixel(this.scroll) + distance)
}

Viewport.prototype.rowToView = function(row) {
  var distance = this.rowToPixel(row) - this.rowToPixel(this.scroll)
  return Math.round(this.height - 24 - distance)
}

// loop through visible measure
Viewport.prototype.eachVisibleMeasure = function(level, fn) {

  var bottom = this.scroll
  var top = this.viewToRow(0)
  var startMeasure = Math.max(0, level.rowToMeasure(bottom))

  for (var measure = startMeasure;
       level.measureToRow(measure) <= top;
       measure++) {
    if (fn(measure) === false) return false
  }

}

Viewport.prototype.getGridFrequency = function(grid) {
  return 192 / (grid || this.grid)
}

Viewport.prototype.eachRowInMeasure = function(level, measure, grid, fn) {

  var measureSize = level.getMeasureSize(measure)
  var measureStart = level.measureToRow(measure)
  var step = this.getGridFrequency(grid)

  for (var i = step; i < measureSize; i += step) {
    if (fn(measureStart + i) === false) return false
  }

}

Viewport.prototype.eachGrid = function(level, grid, fn) {
  var that = this
  return this.eachVisibleMeasure(level, function(measure) {
    if (fn(level.measureToRow(measure)) === false) return false
    return that.eachRowInMeasure(level, measure, grid, function(row) {
      if (fn(row) === false) return false
    })
  })
}

return Viewport

})
