
define(function(require) {

  return function(desire) {


var doc = desire('doc')
var theme = desire('theme')
var columns = desire('columns')

return function drawGrid(ctx, view) {

  var viewport = view.viewport
  var level = doc.level

  // draw vertical grid
  var frequency = 192 / viewport.grid

  function drawHorizontalGridline(row) {
    var y = viewport.rowToView(row) - 1
    ctx.fillRect(0, y, viewport.width, 1)
  }

  viewport.eachVisibleMeasure(level, function(measure) {

    var measureSize = level.getMeasureSize(measure)
    var measureStart = level.measureToRow(measure)

    ctx.fillStyle = theme.grid
    for (var i = frequency; i < measureSize; i += frequency) {
      drawHorizontalGridline(measureStart + i)
    }

    ctx.fillStyle = theme.beat
    for (var i = 48; i < measureSize; i += 48) {
      drawHorizontalGridline(measureStart + i)
    }

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
