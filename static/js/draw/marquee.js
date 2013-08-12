

define(function(require) {

  var _ = require('lodash')
  var It = require('itjs')
  var util = require('util')
  var minmax = util.minmax

  return function(desire) {

var theme = desire('theme')
var columns = desire('columns')
var viewport = desire('viewport')
var marquee = desire('marquee')

return function drawSelection(ctx) {

  if (marquee.current) {
    marquee.range(function(r1, r2, c1, c2) {
      var x1 = c1.left, x2 = c2.right
      var y1 = viewport.rowToView(r2)
      var y2 = viewport.rowToView(r1)
      ctx.strokeStyle = '#bcf'
      ctx.fillStyle = 'rgba(187, 204, 255, 0.25)'
      ctx.lineWidth = 1.5
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1)
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1)
    })
  }

}


  }
  
})
