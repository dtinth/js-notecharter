
define(function(require) {

  var _ = require('lodash')

  return function(desire) {

var doc = desire('doc')
var theme = desire('theme')

return function drawGrid(ctx, view) {

  var viewport = view.viewport
  var level = doc.level

  viewport.eachVisibleMeasure(level, function(measure) {

    var measureStart = level.measureToRow(measure)

    _.assign(ctx, theme.measureText)

    var x = viewport.width - 32
    var y = viewport.rowToView(measureStart)
    ctx.fillText('#' + measure, x, y)
    
  })

}


  }
  
})
