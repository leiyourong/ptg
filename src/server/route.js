// 处理css
import 'css-modules-require-hook/preset';
// 处理图片
import 'asset-require-hook';
import React, {Fragment} from 'react';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
// import {renderRoutes, matchRoutes} from 'react-router-config';

import App, {routerConfig} from '../router/index';
import {getStore} from '../store/index'
import buildPath from '../../dist/asset-manifest.json';
import {Helmet} from 'react-helmet';

module.exports = (req, res) => {
    console.log('req: ' +  req.url);
    const store = getStore();
    const context = {};
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
                <Fragment>
                    <App />
                </Fragment>
            </StaticRouter>
        </Provider>
    )
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8',
    });
    const helmet = Helmet.renderStatic();
    res.write(`<html>
        <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel='stylesheet' type='text/css' href='${buildPath['index.css']}'/>
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
            <script>
                window.context = {
                    state: ${JSON.stringify(store.getState())}
                }
            </script>
            <script src='/${buildPath['index.js']}'></script>
            <script src='/${buildPath['runtime~index.js']}'></script>
            </body>
        </html>
    `);
    res.end();
};

