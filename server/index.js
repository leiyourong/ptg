import express from 'express';
import route from './route';

const app = express();
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
};
   
app.use(allowCrossDomain)
app.use('/', route)

// route(router);

app.listen(9000, () => {
    console.log('Server is now running at : 9000.')
});