// 26-09-22
// server module :
const http = require('http');

// file system read write update delete :
const fs = require('fs');

const homePage = `<html>
<head>
    <title>ASSIGN1 nodejs server</title>
</head>
<body>
    <header>
        <h3>Header</h3>
    </header>
    <h1>Welcome to Home page</h1>
    <p>This is first assignment</p>
    <ul>
        <li>USER 1</li>
        <li>USER 2</li>
    </ul>

    <form action="/create-user" method="POST">
        <input type="text" name="username" placeholder="Enter username" required></input>
        <button type="submit">Submit</button>
    
    </form>
</body>
</html>`;

const userPage = `<html>
                    <head>
                        <title>first html page in nodejs server</title>
                    </head>
                    <body>
                        <h1>data inserted successfully!</h1>
                    </body>
                   </html>`;
const server = http.createServer(function (req, res) {
    const method = req.method;
    const url = req.url;

    res.setHeader('Content-Type', 'text/html');

    if (url === "/") {
        res.write(homePage);
        res.write(`Home /`)
    }

    if (url === "/create-user" && method === 'POST') {
        const dataBody = [];
        res.write(userPage);
        res.write(`${url}`);
        // streaming converting data to chunks :
        req.on('data', function (dataChunk) {
            // console.log(dataChunk);
            dataBody.push(dataChunk);

        });
        // reading data from stream chunk by chunk (buffering) : 
        req.on('end', function () {
            const parsedDataBody = Buffer.concat(dataBody).toString();
            const formData = parsedDataBody;
            // console.log(`Data : ${formData.split('&')}`);

            fs.appendFileSync('contactData.txt', formData, function (err) {
                if (err) throw err;
                console.log('data saved to file');
            });


        });
        req.on('error', function (err) {
            console.log(err);
        });
    }
    res.end();
});

server.listen(3000);