
var express = require('express')
var app = express()
var port = parseInt(process.env.PORT, 10) || 15076

var fs = require('fs')
var filename = process.argv[2]

app.use(express.static(__dirname + '/static/'))
app.use(express.bodyParser())

app.get('/data.json', function(req, res, next) {
  try {
    res.json(JSON.parse(fs.readFileSync(filename, 'utf-8')))
  } catch (e) {
    res.json({ events: [] })
  }
})

app.post('/save', function(req, res, next) {
  fs.writeFileSync(filename, req.body.data, 'utf-8')
  res.end('ok')
})

app.listen(port, function() {
  console.log('listening on port ' + port)
})

