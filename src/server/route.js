// 处理css
import 'css-modules-require-hook/preset';
// 处理图片
import 'asset-require-hook';

import express from 'express';

import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'

import App from '../../src/router/index';
import {getStore} from '../../src/store/index'
import buildPath from '../../dist/asset-manifest.json';

const router = express.Router();

router.get('/', (req, res) => {
    const store = getStore();
    const context = {};
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter context={context}>
                <App />
            </StaticRouter>
        </Provider>
    )
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8',
    });
    res.write(`<html>
        <head>
        <title>ssr</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <link rel="stylesheet" type="text/css" href="${buildPath['bundle.css']}"/>
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
        <script>
            window.context = {
                state: ${JSON.stringify(store.getState())}
            }
        </script>
    </html>`);
    res.end();
})

router.get('/books', (req, res) => {
    const books = [{id: 1,name: 1, price: 1}]
    res.status(200).send(books);
})

module.exports = router;