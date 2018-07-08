var express = require('express');
var path = require('path')
var app = express();
var server = require('http').Server(app);

app.use('/assets',express.static(__dirname + '/assets'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/fonts',express.static(__dirname + '/scss'));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.get('/favicon',function(req,res){
  res.sendFile(__dirname+'/favicon.ico');
});
app.get('/nav', function (req, res) {
  res.sendFile(__dirname+'/nav.html');
})
app.get('/footer', function (req, res) {
  res.sendFile(__dirname+'/footer.html');
})
app.get('/episodios', function (req, res) {
  res.sendFile(__dirname+'/episodios.html');
})
app.get('/acercade', function (req, res) {
  res.sendFile(__dirname+'/acercade.html');
})
app.get('/blog', function (req, res) {
  res.sendFile(__dirname+'/blog.html');
})
app.get('/contacto', function (req, res) {
  res.sendFile(__dirname+'/contacto.html');
})

server.listen(process.env.PORT || 8081,function(){
  console.log('Listening on '+server.address().port);
});
