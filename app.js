import express from 'express'
import 'dotenv/config'
// import socket from './routes/socket.js'
import uRoute from './routes/user.js'
import cRoute from './routes/channel.js'
import path from 'path'
import cors from 'cors'
import http from 'http';
import { Server } from 'socket.io'

const app = express()
const port = process.env.APP_PORT || 3000


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join() })
})

app.use('/users', uRoute)
app.use('/channels', cRoute)

// app.use(cors({
//     port: '3000'
// }));

// Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

// socket(app)

const ws = http.createServer(app)
const io = new Server(ws)

var users = 0

// @todo: socket connection
io.on('connection', (client) => {
    
    // client.broadcast.emit('broadcast', {
    //     greeting: 'Hi there, how are you?'
    // })

    // console.log(`client join id: ${client.id}`)

    users++
    console.log(`total ${users} user is connected`)

    io.sockets.emit('broadcast', { count: `total ${users} user is connected` })

    // @todo: Simple Greeting
    setTimeout(() => {
        users--
        client.emit('greeting', { hello: `Connected ID: ${client.id}` })
    }, 2000);




    // Handle dynamic channel and room
    client.on('join', async (channel) => {
        // try {
        //     const uid = channel.id
        //     const arr = await axios.patch(`${process.env.BASE_URL}/users/${uid}/status`, {
        //         isOnline: 1,
        //         socketID: client.id
        //     }).then(res => res.data)
        //     // console.log(arr);
        // } catch (err) {
        //     console.error('Error fetching data:', err);
        // }


    });


    // // Handle dynamic channel and room
    // client.on('message', data => {
    //     console.log(data);
    // });


    // // Handle dynamic events
    // client.on('customEvent', ({ channel, room, data }) => {
    //     console.log(`Received custom event in channel ${channel} and room ${room}`);
    //     // Broadcast the event to all clients in the specified room
    //     io.to(`${channel}-${room}`).emit('customEvent', data);
    // });



    client.on('disconnect', async () => {
        // try {
        //     const arr = await axios.patch(`${process.env.BASE_URL}/users/offline`, {
        //         socketID: client.id
        //     }).then(res => res.data)
        //     console.log(arr);
        // } catch (err) {
        //     console.error('Error fetching data:', err);
        // }

        console.log(`client disconnect id: ${client.id}`)
    })
});

// http.listen(process.env.APP_PORT);

ws.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})