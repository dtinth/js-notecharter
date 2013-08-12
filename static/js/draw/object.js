
define(function(require) {

  var _ = require('lodash')

  return function(desire) {

var doc = desire('doc')
var theme = desire('theme')
var columns = desire('columns')
var viewport = desire('viewport')
var opts = desire('draw.options')

var getStyle = desire('object_style')
var objectHeight = 12

return function drawObject(ctx) {

  function drawEvent(event) {

    var position = viewport.rowToView(event.row)
    var onScreen = position > 0 && position < viewport.height + objectHeight
    var column = columns.find(event.channel)

    if (onScreen && column) {

      ctx.save()

      if (event.preview) {
        ctx.globalAlpha = 0.5
      }

      var x = column.left + 1
      var y = position - objectHeight
      var width = column.width - 1
      var height = objectHeight
      var style = getStyle(event) || {}

      ctx.fillStyle = style.color || theme.object
      ctx.fillRect(x, y, width, height)
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.fillRect(x, y, width, 1)
      ctx.fillRect(x, y + 1, 1, height - 1)
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(x, y + height - 1, width, 1)
      ctx.fillRect(x + width - 1, y, 1, height - 1)

      var text = (style.text || '') + ''
      if (text) {
        _.assign(ctx, theme.objectText)
        ctx.fillText(text, x + width / 2 - 1, y + height - 1)
      }

      ctx.restore()

    }

  }

  doc.level.eachEvent(function(event) {
    drawEvent(event)
  })

  if (opts.preview) {
    drawEvent(opts.preview)
  }

}


  }
  
})
