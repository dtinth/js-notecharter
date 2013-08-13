
var express = require('express')
var app = express()
var port = 15076

app.use(express.static(__dirname + '/static/'))
app.listen(port, function() {
  console.log('listening on port ' + port)
})

