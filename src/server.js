var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use('/assets',express.static(__dirname + '/assets'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/fonts',express.static(__dirname + '/scss'));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
app.get('/acercade', function (req, res) {
  res.sendFile(__dirname+'/acercade.html');
})

server.listen(process.env.PORT || 8081,function(){
  console.log('Listening on '+server.address().port);
});
