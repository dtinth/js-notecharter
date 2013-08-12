
define(function(require) {

  var Desire = require('desire')

  var config = {

    components: {

      'config': GetConfig,

      'app': require('./app'),
      'doc': require('./doc'),

      'modes': require('./modes'),
      'mode_handler': require('./mode_handler'),
      'mode_switcher': require('./mode_switcher'),
      'grid_switcher': require('./grid_switcher'),
      'zoom_indicator': require('./zoom_indicator'),
      
      'view': require('./view'),
      'viewport': require('./viewport_factory'),
      'metrics': require('./metrics'),

      'theme': require('./theme'),
      'columns': require('./columns'),

      'dirty': require('./dirty'),
      'draw.options': require('./draw/options'),
      'draw.measure': require('./draw/measure'),
      'draw.grid': require('./draw/grid'),
      'draw.object': require('./draw/object'),
      'object_style': require('./object_style'),

      'view.scroll': require('./view_scroll'),
      'view.mouse': require('./view_mouse'),
      'keyboard': require('./keyboard'),

      'ops': require('./ops'),

      'handler.insert': require('./handler/insert')

    },

    container: $('#main'),
    toolbar: $('#toolbar'),

    drawProcedures: [
      { component: 'draw.measure', priority: 10 },
      { component: 'draw.grid', priority: 20 },
      { component: 'draw.object', priority: 100 }
    ],

    binders: [
      'view.scroll',
      'view.mouse',
      'keyboard'
    ],

    toolbarSections: {
      'mode_switcher': '.modes',
      'grid_switcher': '.grid',
      'zoom_indicator': '.zoom'
    }

  }

  function GetConfig(desire) {
    return config
  }

  return config
  
})
