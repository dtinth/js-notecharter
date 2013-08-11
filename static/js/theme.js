
define(function(require) {

  return function(desire) {

return {
  background: '#090807',
  grid: '#353433',
  beat: '#454443',
  measure: '#8b8685',
  object: '#c33',

  objectColorByChannel: {
    '1': '#ccc',
    '2': '#6ae',
    '3': '#ccc',
    '4': '#ea6',
    '5': '#ccc',
    '6': '#6ae',
    '7': '#ccc'
  },
  measureText: {
    font: 'bold italic 128px Helvetica',
    fillStyle: '#353433',
    textAlign: 'right'
  },
  objectText: {
    font: 'bold 11px Arial',
    fillStyle: '#fff',
    textAlign: 'center',
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowColor: 'black',
    shadowBlur: 2
  }
}
    
  }
  
})

