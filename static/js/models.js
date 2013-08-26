
define(function(require) {

var uuid = require('node-uuid')
var _ = require('lodash')
var _ = require('lodash')

function Level() {
  this._map = { }
  this._list = [ ]
  this._timeSignatures = {}
  this.revision = 0
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
  return _.each(this._list, fn)
}

Level.prototype.eachChannel = function(fn) {
  return _.each(_.groupBy(this._list, 'channel'), fn)
}

Level.prototype.range = function(lower, upper) {
  var a = _.sortedIndex(this._list, { row: lower }, 'row')
  var b = _.sortedIndex(this._list, { row: upper }, 'row')
  return this._list.slice(a, b)
}

Level.prototype.batch = function(fn) {
  if (this._inBatch) throw new Error("cant call batch in batch")
  this.update(function() {
    this._inBatch = true
    try {
      fn.call(this)
    } finally {
      this._inBatch = false
    }
  })
}

Level.prototype.update = function(fn) {
  fn.call(this)
  if (!this._inBatch) {
    this._list = _.sortBy(_.values(this._map), 'row')
    this.revision ++
  }
}

Level.prototype.get = function(id) {
  return this._map[id]
}

Level.prototype.addEvent = function(event) {
  this.update(function() {
    this._map[event.id] = event
  })
}

Level.prototype.removeEvent = function(event) {
  this.update(function() {
    delete this._map[event.id]
  })
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
