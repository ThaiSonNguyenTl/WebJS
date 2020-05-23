const express = require('express');
const bcryptjs = require('bcryptjs');
const UserModel = require('../users/models');

const authRouter = express();
// resgiter
authRouter.post('/register',async(req,res) =>{
    try{
        const userInfo = req.body;
        // check email/password/firstname/lastname/ empty
        // check email regex
        // check exist
        // check password regex
        
        // ma hoa password
        const hashPassword = await bcryptjs.hash(userInfo.password,10);
        // save to db
        const newUser = await UserModel.create({
            ...userInfo, // truyen toan bo thong tin nguoi dung truyen len vao
            password: hashPassword,
        });
        res.status(201).json(newUser);

    } catch(error){
        res.status(500).end(error.message)
    }

});
// login
authRouter.post('/login', async(req,res) => {
    try{
        const loginInfo = req.body;
        // check email/password empty
        const user = await UserModel.findOne({email: loginInfo.email}).exec();

        if(!user){
            res.status(404).json({
                message: 'User not found',
                success: false,
            });
        } else{
            const comparePassword = bcryptjs.compare(
                loginInfo.password,// password nguoi dung truyen len
                user.password // password da ma hoa luu trong database
                );
            // bcryptjs.compare kq tra ve boolean 
            if(comparePassword){
                //if true => success
                // save user into session storage
                req.session.user = {
                    _id: user._id,
                    email: user.email, 
                    permissions: user.permissions.length > 0 ? user.permissions : [] ,
                };
                req.session.save();

                res.status(200).json({
                    message : "Login success",
                    success: true,
                });
            } else{
                //false
                res.status(200).json({
                    message: "Password isn't correct",
                    success: false,
                });
            }
        }
    } catch(error){
        res.status(500).end(error.message);
    }
});

authRouter.get('/test', (req,res) => {
    console.log(req.session);
    res.status(200).end();
});
// logout
authRouter.get('/logout', async(req,res) => {
    try{
        req.session.destroy();
        res.status(200).json({
            message: 'Log out success'
        })
    } catch(error){
        res.status(500).end(error.message);
    }
});
module.exports = authRouter;