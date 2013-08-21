
define(function(require) {

  var _ = require('lodash')

  return function(desire) {

var view = desire('view')
var doc = desire('doc')

var config = desire('config')

function run() {
  
  desire('columns').set(config.columns)

  _.each(config.drawProcedures, function(proc) {
    view.addDrawProcedure(desire(proc.component), proc.priority)
  })
  
  view.renderTo(config.container)

  _.each(config.binders, function(component) {
    desire(component).bind()
  })

  _.each(config.toolbarSections, function(element, component) {
    desire(component).renderTo(config.toolbar.find(element))
  })

  _.each(config.modeHandlers, function(component) {
    desire(component).handle()
  })

  _.each(config.plugins, function(component) {
    desire(component).initialize()
  })

  document.title = config.appName
  desire('mode_handler').watch()

}

return { run: run }

  }

})
