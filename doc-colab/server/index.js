const wss = require('ws');
const http = require('http');

server = new wss.WebSocketServer({port: 8000})
console.log('created websocket server')


server.on('connection',function(connection, req){
    console.log("A new device connected");

    connection.on('message',function(message){
        
        console.log(message.toString())
        connection.send('hello from the server!')
        console.log("num clients:", server.clients.size)
        server.clients.forEach(client => {
            if (client !== connection && client.readyState === wss.WebSocket.OPEN){
                console.log('sending broadcast')
                client.send('A new device joined the document');
            }            
        });
    })
})