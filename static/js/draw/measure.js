
define(function(require) {

  var _ = require('lodash')

  return function(desire) {

var doc = desire('doc')
var theme = desire('theme')
var viewport = desire('viewport')
var metrics = desire('metrics')

return function drawGrid(ctx) {

  var level = doc.level

  metrics.eachVisibleMeasure(function(measure) {

    var measureStart = level.measureToRow(measure)

    _.assign(ctx, theme.measureText)

    var x = viewport.width - 32
    var y = viewport.rowToView(measureStart)
    ctx.fillText('#' + measure, x, y)
    
  })

}

  }
  
})
