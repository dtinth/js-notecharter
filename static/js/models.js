
define(function(require) {

var uuid = require('node-uuid')
var _ = require('lodash')
var _ = require('lodash')

function Level() {
  this._events = []
  this._timeSignatures = {}
}

Level.prototype.rowToMeasure = function(row) {
  return Math.floor(row / 192)
}

Level.prototype.measureToRow = function(measure) {
  return measure * 192
}

Level.prototype.getMeasureSize = function(measure) {
  return 192
}

Level.prototype.eachEvent = function(fn) {
  return _.sortBy(this._events, 'row').forEach(fn)
}

Level.prototype.addEvent = function(event) {
  this._events.push(event)
}

return {
  Level: Level,
  createEvent: function(event) {
    return _.assign({
      id: uuid.v1(),
      row: 0
    }, event)
  }
}

})
