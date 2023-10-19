const express = require('express')
const app = express()
const http = require("http")
const { Server } = require("socket.io")


const port = 3000
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let availableRooms = []

const emitMenuData = () => {
    io.to("menu").emit("data", {
        room: "menu",
        // shortcut: availableRooms: availableRooms
        availableRooms,
    })
}

const emitRoomData = (roomName) => {
    io.to(roomName).emit("data", {
        room: roomName
    })
}

io.on("connection", (socket) => {
    console.log(`[SOCKET CONNECTED] ${socket.id}`)

    socket.emit("connected")
    socket.join("menu")
    emitMenuData()

    socket.on("new-message", ({ name, message, roomName }) => {
        socket.broadcast
            .to(roomName)
            .emit("notification", `${name} a trimis un mesaj!`)
        io.to(roomName).emit("received-message", `${name}: ${message}`)
    })

    socket.on("create-room", (roomName) => {
        availableRooms.push(roomName)
        socket.leave("menu")
        socket.join(roomName)
        emitRoomData(roomName)
        emitMenuData()
    })

    socket.on("join-room", (roomName) => {
        socket.leave("menu")
        socket.join(roomName)
        socket.data.room = roomName
        availableRooms = availableRooms.filter((room) => room !== roomName)
        emitRoomData(roomName)
        emitMenuData()
        
    })
})

