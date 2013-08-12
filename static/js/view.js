
define(function(require) {

  var Canvas = require('./canvas')
  var $ = require('jquery')

  return function(desire) {

var viewport = desire('viewport')
var dirty = desire('dirty')
var view = { }

view.drawProcedures = []

function draw(ctx, w, h) {
  viewport.resize(w, h)
  view.drawProcedures.forEach(function(fn) {
    try {
      ctx.save()
      fn.fn(ctx, view)
    } finally {
      ctx.restore()
    }
  })
}

view.addDrawProcedure = function(fn, priority) {
  view.drawProcedures.push({ fn: fn, priority: priority })
  view.drawProcedures.sort(function(a, b) {
    return a.priority - b.priority
  })
  view.redraw()
}

view.redraw = function() {
  if (view.canvas) {
    view.canvas.redraw()
  }
}

view.renderTo = function(container) {
  view.canvas = new Canvas(container, draw)
  view.element = $(view.canvas.element)
  view.redraw()
  return view.element
}

desire('dirty').always(view.redraw.bind(view))

return view


  }

})
