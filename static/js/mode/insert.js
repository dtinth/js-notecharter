
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
var getEventOptions = desire('new_event_options')
var error = desire('error')

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

function mouseup(p, e) {
  if (pos) {
    when({ row: pos.row, channel: pos.channel })
      .then(function(options) {
        return getEventOptions(options, e)
      })
      .then(ops.createAndAddEvent)
      .then(dirty.check)
      .then(null, error)
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
