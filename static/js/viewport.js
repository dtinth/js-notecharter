
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

Viewport.prototype.getGridFrequency = function(grid) {
  return 192 / (grid || this.grid)
}

return Viewport

})
