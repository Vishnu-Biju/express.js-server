const express = require('express')
const router = express.Router();
const path = require('path');


// HERE instead of app.get we habe router.get
//on server.js
 router.get('^/$|/index(.html)?', (req, res) => {
   res.sendFile(path.join(__dirname, '..','views','subdir','index.html'));
});

 router.get('/test(.html)?', (req, res) => {
   res.sendFile(path.join(__dirname, '..','views','subdir','test.html'));
});


module.exports =router;