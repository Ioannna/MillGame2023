import Notification from "../notification"
import ChatBox from "./chat_box"
import MessageForm from "./message_form"

const Chat = ({ socket, roomName }) => {

    return (
        <div>
            <Notification socket={socket}/>
            <ChatBox socket={socket}/>
            <MessageForm socket={socket} roomName={roomName}/>
        </div>
    )
}

export default Chat
