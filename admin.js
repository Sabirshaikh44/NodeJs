
const express = require('express');

const path = require('path');


const fs = require('fs');
const zip = require('express-zip');

// Csv Converter :
const ConvertToCsv = require('json2csv').parse;

const userData = [];
var csvDownloadLink;

const router = express.Router();
// form submit page : NOTE THIS WILL RESPONSE FOR BOTH POST AND GET REQUESTS : to limit only for get or post requests use app.post or app.get instead of app.user it is also better to use get post so that is matches exactly the path of routes on each request so we don't have to mention other routes above the '/' route:

router.post('/user',(req, res, next) => {
    // Note: POST request will be use to handle sending of data other vice if you use get it will match the / of /user and will show the route not found page if we have routes with same path startings we can add that segments into our main file app.js where we using that route like app.use('pathtomatch this will get ignored', 'routepath this will be seen'): 
    // logging the data...
    // console.log(req.body);


    // to send data to view : 
    userData.push(req.body);

    // entering employee data into csv file :
    const csv = ConvertToCsv(userData);
    console.log(csv);
   
      fs.mkdirSync("./CSVFILES",{recursive: true});
   
    fs.writeFileSync(path.join("./CSVFILES" ,`EmpData.csv`),csv,(err)=>{
        if(err){
            throw err;
        }
    }); 
    
    // redirecting after submission...
    res.redirect('/');
   
});


// console.log( res.zip([{path : "./CSVFILES"+"/EmpData.csv",name : "EmpData.csv"}]));
router.get('/downloadCsv',(req, res, next)=>{
    res.zip([{path : "./CSVFILES"+"/EmpData.csv",name : "EmpData.csv"}]);
});

// router.get('/convertToCsv',(req,res,next)=>{
//     console.log("converttosv :"+JSON.stringify(userData));
//     res.redirect('/');
// });

// csvDownloadLink = path.join(__dirname, './',`EmpData.csv`);
// router.get(`/downloadCsv`,(req,res,next)=>{
//     console.log(csvDownloadLink);
//     res.redirect('/');
// });

exports.routes = router;
// exports.csvDownloadLink = csvDownloadLink;
exports.userData = userData;