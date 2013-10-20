var express = require('express');
var app = express();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);
var swig = require('swig');
var renderTemplate = function(res, templateLocation, context) {
        res.send(swig.renderFile(templateLocation, context));
    };

var port = process.env.PORT || 8080;
server.listen(port, '0.0.0.0');

app.use("/static", express.static(__dirname + '/static'));
app.get('/', function(req, res) {
    var context = {
        foo: "fodo",
        bar: "bar"
    };
    renderTemplate(res, "./templates/test.html", context);
});

webRTC.rtc.on('chat_msg', function(data, socket) {
    var roomList = webRTC.rtc.rooms[data.room] || [];
    for (var i = 0; i < roomList.length; i++) {
        var socketId = roomList[i];
        if (socketId !== socket.id) {
            var soc = webRTC.rtc.getSocket(socketId);
            if (soc) {
                soc.send(JSON.stringify({
                    "eventName": "receive_chat_msg",
                    "data": {
                        "messages": data.messages,
                        "color": data.color
                    }
                }), function(error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        }
    }
});