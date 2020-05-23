const express = require('express');
const UserModel = require('./models');

const userRouter = express();

userRouter.post('/',async (req,res) => {
    //create User
    try{
        // check email
        const existEmail = await UserModel.findOne({
            email: req.body.email,
        }).exec();
        if(existEmail){
            res.status(403).send('Email has been used')
        }

        // Save to database
        const userInfo = req.body;
        const newUser = await UserModel.create({
            ...userInfo,
            createAt: new Date(),
        });

        res.status(201).json(newUser)
    } catch(error){
        res.status(500).end(error.message);
    }

});

module.exports = userRouter;