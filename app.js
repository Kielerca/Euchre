var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));
serv.listen(2000);

console.log('Server Running.......')

var io = require('socket.io')(serv,{});

var playerArray;
playerArray = [];

io.sockets.on('connection',function(socket){
    console.log('socket connection');

    socket.on('connectMe', function(player){
        console.log('Data recieved from client' + player.name);
        playerArray.push(player.name)

        socket.emit('Welcome',{data: player.name});

        if (playerArray.length >= 4){
            console.log(playerArray);

            var num = Math.floor(Math.random() * 5) + 0;
            console.log(num);

            socket.emit('Start',{teammate:playerArray[num]});
            
        };

    });
    socket.emit('ServerMsg',{data: " here is The Server"});


});