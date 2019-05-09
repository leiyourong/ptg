import React from 'react';
import Router from './routerConfig'
import { Provider } from 'react-redux'
import {renderToString} from 'react-dom/server'
import express from 'express';
import store from '../src/store/index'
const router = express.Router();

router.get('/', (req, res) => {
    const content = renderToString(
        <Provider store={store}>
            <Router />
        </Provider>
    )
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8',
    });
    res.write(`<html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <script>
            if ('serviceWorker' in navigator && location.search.includes('serviceWorker')) {
                navigator.serviceWorker.register('./serviceWorker.js', {scope: '/'})
                .then(function(registration) {
                    console.log('你的ServiceWorker作用于：' + registration.scope);
                }).catch(function(e) {
                    console.error(e);
                })
            }
        </script>
        </head>
        <body>
            <div id='react'>${content}</div>
        </body>
    </html>`);
    res.end();
    // res.send(renderToString(<Homepage />));
})

router.get('/books', (req, res) => {
    const books = [{id: 1,name: 1, price: 1}]
    res.status(200).send(books);
})

export default router;