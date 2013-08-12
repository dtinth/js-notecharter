

define(function(require) {
  
  var util = require('../util')
  var when = require('when')

  return function(desire) {

var mode = desire('mode_handler').mode('remove')
var metrics = desire('metrics')
var dirty = desire('dirty')
var columns = desire('columns')

var doc = desire('doc')
var ops = desire('ops')

var opts = desire('draw.options')
var toRemove

function mousemove(p) {
  opts.toRemove = toRemove = metrics.getEventUnderPosition(p)
  dirty.check()
}

function mousedown(p) {
}

function mouseup(p, e) {
  if (toRemove) {
    ops.removeEvent(toRemove)
    opts.toRemove = toRemove = null
    dirty.check()
  }
}

function leave() {
  opts.toRemove = toRemove = null
  dirty.check()
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
