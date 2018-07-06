var express = require('express');
var app = express();

app.get('/',function(req,res){
  //res.sendFile(__dirname+'/index0.html');
  //res.sendFile(__dirname+'/game.html');
  res.sendFile(__dirname+'/index.html');
});

server.listen(process.env.PORT || 8081,function(){
  console.log('Listening on '+server.address().port);
});
