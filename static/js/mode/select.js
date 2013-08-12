
define(function(require) {
  
  var util = require('../util')
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

var current
var minmax = util.minmax

function mousemove(p) {
  if (!current) return
  var pos = metrics.selectPosition(p)
  if (pos) {
    current.end = pos
    marquee.current = current
    selectEventsUnderMarquee()
    dirty.check()
  }
}

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

function startMoving() {
  var events = selection.get()
}

function mousedown(p) {
  var eventUnderMouse = metrics.getEventUnderPosition(p)
  if (eventUnderMouse) {
    if (selection.isSelected(eventUnderMouse)) {
      startMoving()
    } else {
      selection.clear()
      selection.set([ eventUnderMouse ])
      dirty.check()
      startMoving()
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

function mouseup(p) {
  marquee.clear()
  current = null
  dirty.check()
}

function leave() {
  selection.clear()
}

function handle() {
  mode
  .on('mousemove', mousemove)
  .on('mousedown', mousedown)
  .on('mouseup', mouseup)
  .on('leave', leave)
}

return { handle: handle }
    
  }
  
})
