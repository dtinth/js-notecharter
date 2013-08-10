
define(function(require) {

  var $ = require('jquery')

  return function Canvas(parent, draw) {

    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')

    parent = $(parent)

    function updateSize() {
      var el = parent[0]
      canvas.width = el.clientWidth
      canvas.height = el.clientHeight
      redraw()
    }

    function redraw() {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        draw(ctx, canvas.width, canvas.height)
      } finally {
        ctx.restore()
      }
    }

    parent.append(canvas)
    $(window).resize(updateSize)

    updateSize()
    redraw()

    return { element: canvas, redraw: redraw }

  }

})
