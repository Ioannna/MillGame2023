import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import Chat from "./components/room/chat/chat";
import Rooms from "./components/menu/rooms"

function App() {
const [connectedSocket, setConnectedSocket] = useState()
const [data, setData] = useState()

  useEffect(() => {
    const socket = io()

    socket.on("connected", () => {
      setConnectedSocket(socket)
    })

    socket.on("data", (receivedData) => {
      setData(receivedData)
    })
  }, [])

  console.log(data)

  if(!(data && connectedSocket)) {
    return <p>Waiting for connection...</p>
  }

  return ( 
    <div>
      <h1>Curs 4</h1>
      {
        data.room === 'menu' ? (
          <Rooms socket={connectedSocket} rooms={data.availableRooms}/>
         ) :  (
           <Chat socket={connectedSocket} roomName={data.room}/>
         )}
    </div>
    
  );
}

export default App;
