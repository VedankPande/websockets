const wss = require('ws');
const http = require('http');

const UPDATE = "update"

server = new wss.WebSocketServer({port: 8000})
console.log('created websocket server')


server.on('connection',function(connection, req){
    console.log("A new device connected");

    server.clients.forEach(client => {
        console.log("num clients:",server.clients.size)
        if (client !== connection && client.readyState === wss.WebSocket.OPEN){
            client.send(JSON.stringify({type:"notif",data:"A new device joined the document"}));
        }            
    }); 

    connection.on('message',function(message){
        
        const data = JSON.parse(message)
        if (data.type === UPDATE){
            console.log("updates from editor:", data.data)

            server.clients.forEach(client => {
                if (client !== connection && client.readyState === wss.WebSocket.OPEN){
                    client.send(JSON.stringify({type:"update",data:data.data}));
                }            
            });

        }        
    })
})