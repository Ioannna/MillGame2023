import { useEffect, useState } from "react"
import RoomRow from "./room_row"

const Rooms = ({ socket, rooms }) => {
    const [roomName, setRoomName] = useState("")

    useEffect(() => {

    }, [])

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    const createRoom = () => {
        socket.emit("create-room", roomName)
        setRoomName("")
    }

    return(
        <div>
            <input 
                type="text" 
                placeholder="Enter Room Name"
                value={roomName}
                onChange={handleRoomNameChange}
            ></input>
            <button onClick={createRoom}>Create Room</button>
            <ul>
                {
                    rooms.map((room) => {
                        return <RoomRow room={room} socket={socket}/>
                    })
                }
            </ul>
        </div>
    )

}

export default Rooms