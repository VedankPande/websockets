import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');
const UPDATE = "update"

function WebSocketButton(){

    const [data,setData] = useState("");
    

    useEffect(()=>{
        client.onopen = () => {
            console.log('connection opened') 

            client.onmessage = (message) => {
                const jsonMessage = JSON.parse(message.data)
                if (jsonMessage.type === UPDATE){
                    console.log("updating state using updated text")
                    setData(jsonMessage.data)
                }
                console.log(jsonMessage);
            }           
        }
        
    },[])
   
    const onTextChange = (text) =>{
        client.send(JSON.stringify({type:"update",data: text.target.value}))
        setData(text.target.value)
        console.log(text.target.value);
    }


    return(
        <div>
            <textarea value = {data}onChange={onTextChange} placeholder={"start typing here..."}></textarea>
        </div> 
    )
}

export default WebSocketButton;