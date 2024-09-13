import app from './1_app.js';
import db_connect from './Utiles/db_cunnect.js';
import env from 'dotenv'
import { Server } from 'socket.io';
import {createServer} from 'http';

env.config();
const surver = createServer(app);

const io=new Server(surver,{
    cors:{
        origin:'https://easyskill.netlify.app',
        methods:['GET','POST'],
        credentials:true,
    },
})

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    // Listen the messages from clients
    socket.on('send_message', (data) => {
        // Emit the message to all connected clients
        io.emit('receive_message', data);
    });
})

surver.listen(process.env.PORT,(req,res)=>{  
    try {
        db_connect();
        console.log('app is listing...at 8000');
    } catch (error) {
        res.send({
            status:false,
            message:'database not connect'
        })
    }
})
