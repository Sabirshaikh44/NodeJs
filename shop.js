const express = require('express');

const path = require('path');

const router = express.Router();

const Data = require('./admin');

// const form = `
//                 <html>
//                   <head><title>Home</title></head>
//                   <body>
//                     <form method="post" action="/user">
//                         <input type="text" name="username" placeholder="Enter your username..." />

//                         <button type="submit" value="Submit">Submit</button>
//                     </form>
//                   </body>
//                 </html>
//             `;

router.get('/', (req, res, next) =>{
    // res.send(form);
    // instead of creating html component and passing them as variables like above we can do server file as follows:

    // sending data from admin and receive data here:
    // console.log(Data.userData);
    const userData = Data.userData;
    console.log(JSON.parse(JSON.stringify(userData)));
    // serving html file....
    res.sendFile(path.join(__dirname,'../', 'views','index.html'));

    // to tell express to serve the pug template engine html file with dynamic data:
    res.render('shop',{userData});

});

module.exports = router;