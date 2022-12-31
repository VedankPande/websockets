const wss = require('websocket').server;
const http = require('http');

httpServer = http.Server()
httpServer.listen(8000);
console.log('listening on websocket port....')

server = new wss({
    httpServer: httpServer,
})
console.log('created websocket server')


server.on('request',function(request){
    console.log(request.origin);

    var connection = request.accept(null, request.origin);
    connection.on('message',function(message){console.log(message)})
    connection.send('connection made!')
    console.log((new Date()) + " Connection accepted.");
    console.log(connection.remoteAddresses);
})



