const http = require('http');
const fs = require('fs');

const getTimeStamp = date =>({
    unix: date.getTime(),
    utc: date.toUTCString()
});

const requestHandler = (req, res)=>{
    if(req.url === '/'){
        fs.readFile('views/index.html', 'utf8', (err, html)=>{
            if(err){
                throw err;
            }
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(html);
        });
    } else if (req.url.startsWith('/api/timestamp')){
        const dateString = req.url.split('/api/timestamp/')[1];
        // creates dateString array with [0] being removed url and [1] being remainder of url
        // be that empty and undefined, or the date provided in the req
        let date;

        if(dateString === undefined || dateString.trim() === '') {
            date = JSON.stringify(getTimeStamp(new Date()));
        } else {
            date = new Date(dateString);
        }
        // res.writeHead(200, {'Content-type': 'application/json'});
        res.end('The date is:\n' + date);
    }
};

// res.end(date + '\n' + JSON.stringify(timeStamp));
const server = http.createServer(requestHandler);
server.listen(process.env.PORT || 4100, err => {
    if(err) {
        throw err;
    }
    console.log(`Server running on PORT ${server.address().port}`);
});