const express = require('express');
const multer = require('multer');
const fs = require('fs');

// khoi tao Router
const uploadRouter = express.Router();
// khoi tao multer
const upload = multer({
    dest: 'public/',
});
// upload.single('ten phai khop vs cai ben formData')
uploadRouter.post('/image', upload.single('image') ,(req,res) => {
    // console.log(req.file);
    fs.rename(`public/${req.file.filename}`, `public/${req.file.originalname}`,(err) => {
        if(err){
            res.status(500).json({
                success: false,
                message: err.message,
            });
        } else {
            res.status(201).json({
                success: true,
                data: {
                    imageUrl: `http://localhost:3001/${req.file.originalname}`,
                },
            });
        }
    });
});

module.exports = uploadRouter;
