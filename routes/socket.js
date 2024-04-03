import http from 'http';
import { Server } from 'socket.io'
import axios from 'axios';

const socket = (app) => {
    const ws = http.createServer(app)
    const io = new Server(ws)

    // @todo: socket connection
    io.on('connection', client => {
        // client.broadcast.emit('broadcast', {
        //     greeting: 'Hi there, how are you?'
        // })

        // console.log(`client join id: ${client.id}`)

        setTimeout(() => {
            client.emit('greeting', {sayHello: `Hi there id ${client.id}`})
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

    io.listen(process.env.APP_PORT);
}

export default socket