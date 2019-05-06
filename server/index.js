const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(9000, () => {
    console.log('Server is now running at : 9000.')
});