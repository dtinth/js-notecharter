
define(function(require) {
  
  var util = require('../util')
  var _ = require('lodash')
  var when = require('when')

  return function(desire) {

var mode = desire('mode_handler').mode('select')
var metrics = desire('metrics')
var dirty = desire('dirty')
var columns = desire('columns')
var viewport = desire('viewport')
var marquee = desire('marquee')
var selection = desire('selection')
var doc = desire('doc')
var opts = desire('draw.options')
var ops = desire('ops')

var current
var minmax = util.minmax

function selectEventsUnderMarquee() {
  marquee.range(function(r1, r2, c1, c2) {
    var inRange = [ ]
    doc.eachEvent(function(event) {
      var column = columns.find(event.channel)
      if (!column) return
      if (!(c1.index <= column.index && column.index <= c2.index)) return
      if (!(r1 <= event.row && event.row < r2)) return
      inRange[inRange.length] = event
    })
    selection.set(inRange)
    dirty.check()
  })
}

var moving

function startMoving(anchor) {
  var objects = selection.get().map(function(event) {
    var columnIndex = columns.find(event.channel).index
    return { event: event, row: event.row, columnIndex: columnIndex }
  })
  var minRow = _.min(_.pluck(objects, 'row'))
  var minColumnIndex = _.min(_.pluck(objects, 'columnIndex'))
  var maxColumnIndex = _.max(_.pluck(objects, 'columnIndex'))
  var anchorRow = anchor.row
  var anchorColumnIndex = columns.find(anchor.channel).index
  var moves = null
  moving = {
    mousemove: function(p) {
      var pos = metrics.insertPosition(p)
      if (!pos) return
      var rowDelta = pos.row - anchorRow
      var columnDelta = pos.column.index - anchorColumnIndex
      if (minRow + rowDelta < 0) return
      if (minColumnIndex + columnDelta < 0) return
      if (maxColumnIndex + columnDelta >= columns.length) return
      moves = {}
      _.each(objects, function(object) {
        moves[object.event.id] = {
          row: object.row + rowDelta,
          channel: columns.get(object.columnIndex + columnDelta).channel
        }
      })
      opts.moves = moves
      dirty.check()
    },
    mouseup: function() {
      ops.move(moves)
      opts.moves = null
      moving = null
      dirty.check()
    }
  }
}

function mousedown(p) {
  var eventUnderMouse = metrics.getEventUnderPosition(p)
  if (eventUnderMouse) {
    if (selection.isSelected(eventUnderMouse)) {
      startMoving(eventUnderMouse)
    } else {
      selection.clear()
      selection.set([ eventUnderMouse ])
      dirty.check()
      startMoving(eventUnderMouse)
    }
  } else {
    var pos = metrics.selectPosition(p)
    if (pos) {
      current = { start: pos }
      selection.clear()
      dirty.check()
    }
  }
}

function mousemove(p) {
  if (moving) return moving.mousemove.apply(null, arguments)
  if (!current) return
  var pos = metrics.selectPosition(p)
  if (pos) {
    current.end = pos
    marquee.current = current
    selectEventsUnderMarquee()
    dirty.check()
  }
}

function mouseup(p) {
  if (moving) return moving.mouseup.apply(null, arguments)
  marquee.clear()
  current = null
  dirty.check()
}

function leave() {
  selection.clear()
}

function keydown(key, e) {
  if (key === 46 || key === 8) {
    var sel = selection.get()
    if (sel.length > 0) {
      ops.removeEvents(sel)
      dirty.check()
    }
    return false
  }
}

function handle() {
  mode
  .on('mousemove', mousemove)
  .on('mousedown', mousedown)
  .on('mouseup', mouseup)
  .on('leave', leave)
  .on('keydown', keydown)
}

return { handle: handle }
    
  }
  
})
