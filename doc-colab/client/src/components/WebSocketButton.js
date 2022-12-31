import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { w3cwebsocket as W3CWebSocket } from "websocket";



function WebSocketButton(){

    useEffect(()=>{
        console.log('rendered button');
    },[])

    
    const connect = () =>{
        const client = new W3CWebSocket('ws://127.0.0.1:8000');
        client.onopen = () =>{
            console.log('connection opened');
            try{
                client.send('hello server')
            }
            catch(e){
                console.log(e);
            }
    
        }
        
        client.onmessage = (message) => {
            console.log(message.data);
        }
    
    }

    return(
        <div>
            <button onClick={connect}>
            Click to connect to wsServer
            </button>
        </div>
    )
}

export default WebSocketButton;