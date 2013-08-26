
define(function(require) {

  var _ = require('lodash')
  var util = require('../util')
  var It = require('itjs')
  var models = require('../models')

  return function(desire) {

var keyboard = desire('keyboard')
var clipboard = desire('clipboard')
var ops = desire('ops')
var dirty = desire('dirty')
var selection = desire('selection')
var doc = desire('doc')
var notify = desire('notify')
var viewport = desire('viewport')

function getMeasureFor(row) {
  return util.last(util.up(0), function(measure) {
    return doc.level.measureToRow(measure) <= row
  })
}

function toClipboardData(subtractRow) {
  return function(event) {
    var out = _.omit(event, 'id')
    out.row -= subtractRow
    return out
  }
}

function oncopy() {

  var list = selection.get()
  if (list.length === 0) return false

  var minRow = _.min(_.pluck(list, 'row'))

  var startMeasure = getMeasureFor(minRow)
  var startRow = doc.level.measureToRow(startMeasure)
  var clipboardData = _.map(list, toClipboardData(startRow))

  return JSON.stringify(clipboardData)

}

function oncut() {
  var list = selection.get()
  if (list.length > 0) {
    ops.removeEvents(list)
    dirty.check()
  }
}

function getPasteMeasure() {
  return util.first(util.up(0), function(measure) {
    return viewport.rowToView(doc.level.measureToRow(measure)) <= viewport.height
  })
}
function getPasteRow() {
  return doc.level.measureToRow(getPasteMeasure())
}

function onpaste(json) {
  try {
    var data = JSON.parse(json)
    var addRow = getPasteRow()
    var level = doc.level
    _.each(data, function(event) {
      event.row += addRow
    })
    var modelEvents = _.map(data, function(event) {
      var modelEvent = models.createEvent(event)
      return modelEvent
    })
    ops.addEvents(modelEvents)
    selection.set(modelEvents)
    dirty.check()
  } catch (e) {
    notify('cannot paste: ' + e)
    console.error(e)
  }
}

return {
  initialize: function() {
    clipboard.oncopy = oncopy
    clipboard.oncut = oncut
    clipboard.onpaste = onpaste
  }
}


  }
  
})
