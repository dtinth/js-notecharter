
define(function(require) {
  
  return function(desire) {

var theme = desire('theme')

return function getStyle(event) {
  return {
    text: '',
    color: theme.objectColorByChannel[event.channel]
  }
}

  }

})
