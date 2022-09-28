const http = require('http');
const mysql = require('mysql');
const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    res.setHeader('Content-Type', 'text/html');
    const con = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        // if database is created already mention this
        database: 'nodefdb',

    });
    if (url === "/") {
        res.write('db connecting....');
        con.connect(function (err) {
            // DATABASE CONECTION : 
            if (err) {
                throw err;
            } else {
                res.write("Connection established");

            }

            console.log("Connection established");
        })
    }

    if (url === '/dbcreate') {
        res.write('db created successfully!....');
        // Database creation : 
        con.query("CREATE DATABASE nodeFdb", function (err, result) {
            if (err) throw err;
            console.log("Database Created successfully!");
        });
    }

    if (url === '/dbTableCreate') {
        res.write("Table created successfully!....");
        // TABLE CREATION : 
        con.query("CREATE TABLE users (name VARCHAR(255) NOT NULL,address VARCHAR(255) NOT NULL,age INT(100))", function (err, result) {
            if (err) throw err;
            console.log("Table Created successfully! affected rows : " + result.affectedRows);
        });
    }

    if (url === '/dbTableAlter') {
        res.write("Table ALTERED successfully!....");
        // ALTER TABLE:
        con.query("ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY", function (err, result) {
            if (err) throw err;
            console.log("Table ALTERED successfully! affected rows : " + result.affectedRows);
        });
    }

    if (url === '/dbInsert') {
        res.write("DATA Inserted successfully!....");
        // INSERT DATA INTO TABLE :
        con.query("INSERT INTO users (name,address,age,id) VALUES ('saqeeb','mumbai','21',NULL)", function (err, result) {
            if (err) throw err;
            console.log("DATA INSERTED SUCCESSFULLY ! affected rows :: " + result.affectedRows);
        });
    }

    if(url === '/dbShowData'){
        res.write("Fetching data...<br>");
        // SELECT DATA FROM TABLE :
        con.query("SELECT * FROM users",function(err,result,fields){
            if(err) throw err;
            console.log("DATA FETCHED SUCCESSFULLY");
            console.log(result);

            // for fetching specific doc from result array :
            // console.log(result[2]) or console.log(result[1].name);
            // to get field name for specific doc:
            console.log("Field is: "+fields[2].name)
        });
        res.write("data fetch successfully!");
     
    }


    res.end();
}).listen(3000);