
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
      'draw.marquee': require('./draw/marquee'),
      'object_style': require('./object_style'),

      'view.scroll': require('./view_scroll'),
      'view.mouse': require('./view_mouse'),
      'keyboard': require('./keyboard'),

      'ops': require('./ops'),
      'marquee': require('./marquee'),
      'selection': require('./selection'),

      'mode.insert': require('./mode/insert'),
      'mode.select': require('./mode/select'),

      'draw.bms_longnote': require('./draw/bms_longnote'),

    },

    container: $('#main'),
    toolbar: $('#toolbar'),

    drawProcedures: [
      { component: 'draw.measure', priority: 10 },
      { component: 'draw.grid', priority: 20 },
      { component: 'draw.bms_longnote', priority: 70 },
      { component: 'draw.object', priority: 80 },
      { component: 'draw.marquee', priority: 100 }
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
    },

    modeHandlers: [
      'mode.insert',
      'mode.select'
    ]

  }

  function GetConfig(desire) {
    return config
  }

  return config
  
})
