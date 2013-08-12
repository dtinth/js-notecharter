
define(function(require) {

  return function(desire) {

var doc = desire('doc')
var theme = desire('theme')
var columns = desire('columns')
var viewport = desire('viewport')
var metrics = desire('metrics')

return function drawGrid(ctx) {

  var level = doc.level

  // draw vertical grid
  function drawHorizontalGridline(row) {
    var y = viewport.rowToView(row) - 1
    ctx.fillRect(0, y, viewport.width, 1)
  }

  metrics.eachVisibleMeasure(function(measure) {

    var measureStart = level.measureToRow(measure)

    ctx.fillStyle = theme.grid
    metrics.eachRowInMeasure(measure, viewport.grid, function(row) {
      drawHorizontalGridline(row)
    })

    ctx.fillStyle = theme.beat
    metrics.eachRowInMeasure(measure, 4, function(row) {
      drawHorizontalGridline(row)
    })

    ctx.fillStyle = theme.measure
    drawHorizontalGridline(measureStart)
    
  })

  // draw horizontal grid
  columns.each(function(column, index) {
    
    ctx.fillStyle = theme.beat
    ctx.fillRect(column.left, 0, 1, viewport.height)
    ctx.fillRect(column.right, 0, 1, viewport.height)

  })


}


  }
  
})
