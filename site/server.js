var openBrowser = require('open');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);
var swig = require('swig');

// Function to render templates
var renderTemplate = function(res, templateLocation, context) {
    res.send(swig.renderFile(templateLocation, context));
};

// Starting the server
var port = process.env.PORT || 8080;
server.listen(port, '0.0.0.0');
console.log('Server starter at http://0.0.0.0:' + port);
openBrowser('http://0.0.0.0:' + port);

// URL configs and views
app.use("/static", express.static(__dirname + '/static'));
app.get('/', function(req, res) {
    var context = {
        foo: "fodo",
        bar: "bar"
    };
    renderTemplate(res, "./templates/index.html", context);
});

// RTC Event
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
