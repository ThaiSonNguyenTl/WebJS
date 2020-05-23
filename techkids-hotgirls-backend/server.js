const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./users/users.router');
const session  = require('express-session');
const cors = require('cors');
const postRouter = require('./posts/posts.router');
const uploadRouter = require('./uploads/uploads.router');


mongoose.connect('mongodb://localhost:27017/techkids-hotgirls', (error) => {
    if(error){
        throw error;
    } else {
        console.log('connect to mongodb success...')
        const app = express();

        // use midleware
        app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }));
        app.use(bodyParser.json());
        app.use(session({
            secret:'keyboad cat',
            resave: false,
            saveUninitialized: true,
        }));
        app.use(express.static('public'));
        
        // router
        app.use('/users',userRouter);
        app.use('/posts',postRouter);
        app.use('/uploads',uploadRouter);
        // start server
        app.listen(3001, (error) => {
            if(error){
                throw error;
            }
            console.log('Server listen on port 3001...')
        });
    }
});