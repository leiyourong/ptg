// 处理css
import 'css-modules-require-hook/preset';
// 处理图片
import 'asset-require-hook';
import React, {Fragment} from 'react';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {renderToNodeStream} from 'react-dom/server'
import {matchRoutes, renderRoutes} from 'react-router-config';

import App, {routerConfig} from '../router/index';
import {getStore} from '../store/index'
import buildPath from '../../dist/asset-manifest.json';

module.exports = (req, res) => {
    console.log('req: ' +  req.url);
    const store = getStore();
    const context = {};

    const matchedRoutes= matchRoutes(routerConfig, req.path);
    console.log(matchedRoutes);

    const stream = renderToNodeStream(
        <Provider store={store} location={req.url}>
            <StaticRouter context={context}>
                <Fragment>
                    <App />
                    <div className="container" style={{marginTop:70}}>
                        {renderRoutes(routerConfig)}
                    </div>
                </Fragment>
            </StaticRouter>
        </Provider>
    )
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8',
    });
    res.write(`
    <html>
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
            <div id='react'>`
    );
    stream.pipe(res, { end: false })
    stream.on('end', () => {
        res.write(`</div>
            <script>
                window.context = {
                    state: ${JSON.stringify(store.getState())}
                }
            </script>
            <script src="/${buildPath['bundle.js']}"></script>
            </body>
        </html>`);
        res.end();
    })
};

