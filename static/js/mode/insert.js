
define(function(require) {
  
  var util = require('../util')
  var when = require('when')

  return function(desire) {

var mode = desire('mode_handler').mode('insert')
var metrics = desire('metrics')
var dirty = desire('dirty')
var columns = desire('columns')

var doc = desire('doc')
var ops = desire('ops')

var opts = desire('draw.options')

var pos // the next insert position

function mousemove(p) {
  pos = metrics.insertPosition(p)
  if (pos) {
    opts.preview = { preview: true, row: pos.row, channel: pos.channel }
    dirty.check()
  } else {
    opts.preview = null
    dirty.check()
  }
}

function mousedown(p) {
}

function getEventOptions(options, event) {
  if (event.shiftKey) {
    options.longNote = true
  }
  return options
}

function mouseup(p, e) {
  if (pos) {
    when(getEventOptions({ row: pos.row, channel: pos.channel }, e))
      .then(ops.createAndAddEvent)
      .then(dirty.check)
  }
}

function leave() {
  pos = null
  opts.preview = null
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
