
define(function(require) {

  var _ = require('lodash')

  return function(desire) {


var doc = desire('doc')
var theme = desire('theme')
var columns = desire('columns')

var getText = desire('draw.object.text')
var objectHeight = 12

return function drawObject(ctx, view) {

  var viewport = view.viewport

  doc.level.eachEvent(function(event) {

    var position = viewport.rowToView(event.row)
    var onScreen = position > 0 && position < viewport.height + objectHeight
    var column = columns.find(event.channel)

    if (onScreen && column) {

      var x = column.left + 1
      var y = position - objectHeight
      var width = column.width - 1
      var height = objectHeight

      ctx.fillStyle = theme.channels[event.channel] || theme.note
      ctx.fillRect(x, y, width, height)
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.fillRect(x, y, width, 1)
      ctx.fillRect(x, y + 1, 1, height - 1)
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(x, y + height - 1, width, 1)
      ctx.fillRect(x + width - 1, y, 1, height - 1)

      var text = getText(event)
      if (text) text = '' + text
      if (text) {
        ctx.save()
        _.assign(ctx, theme.objectText)
        ctx.fillText(text, x + width / 2 - 1, y + height - 1)
        ctx.restore()
      }

    }
    
  })

}


  }
  
})
