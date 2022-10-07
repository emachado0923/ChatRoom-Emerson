import express from 'express';
import morgan from 'morgan';
import {Server as SocketServer} from 'socket.io';
import http from 'http';
import cors from 'cors';

import {PORT} from './config.js'

const app=express()
const server=http.createServer(app)
const io = new SocketServer(server,{
    cors: {
        origin:'*',
    }
})

app.use(cors())
app.use(morgan("dev"));

io.on('connection',(socket)=>{
     console.log(socket.id)
    // console.log(nick)
    socket.on('message',(message)=>{
        socket.broadcast.emit('message',{
            body:message.body,
            from:message.nick,            
            time:(new Date()).toLocaleString()
        })
    })
})

server.listen(PORT)
console.log('Server escuchando en el puerto ',PORT)




