
define(function(require) {

  return function(desire) {

var view = desire('view')
var doc = desire('doc')

view.addDrawProcedure(desire('draw.measure'), 10)
view.addDrawProcedure(desire('draw.grid'), 10)
view.addDrawProcedure(desire('draw.object'), 100)

view.renderTo(desire('container'))

desire('dirty').always(view.redraw.bind(view))
desire('view.scroll').bindTo(view)

desire('mode_switcher').renderTo(desire('toolbar').find('.modes'))
desire('grid_switcher').renderTo(desire('toolbar').find('.grid'))
desire('zoom_indicator').renderTo(desire('toolbar').find('.zoom'))

desire('keyboard').bind()

  }

})
