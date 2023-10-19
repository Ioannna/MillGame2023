const RoomRow = (props) => {

    const joinRoom = () => {
        props.socket.emit("join-room", props.room)
    } 

    return (
        <div>
            <li key={props.room} onClick={joinRoom}>
                {props.room}
            </li>
        </div>
    )
}

export default RoomRow