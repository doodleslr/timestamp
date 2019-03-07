const path = require('path');
const express = require('express');
const app = express();

app.use(['/', '/api/timestamp'], (req, res) => {
    if (req.url === '/') {
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    } else if (req.url.startsWith('/api/timestamp')){
        const dateString = req.url.split('/api/timestamp/')[1];
        var userDate;

        if(dateString === undefined || dateString.trim() == '') {
            userDate = new Date();
        } else {
            userDate = new Date(dateString);
        }
        res.send('The date requested is:\n' + userDate);
    } 
});

app.listen(4100);