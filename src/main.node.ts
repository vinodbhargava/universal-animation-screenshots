// the polyfills must be the first thing imported in node.js
// import 'angular2-universal/polyfills'; // polyfills are moved to server.ts


// Angular 2 Universal
import {
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

//webshot
var fs = require('fs');
var webshot = require('webshot');
var webshotOptions = {
  
  siteType: 'html',
  renderDelay: 1000,
  timeout: 6000


}

var htmlString = '';
// var path = require('path');
// var childProcess = require('child_process');
// var phantomjs = require('phantomjs-prebuilt');
// var binPath = phantomjs.path

// var childArgs = [
//   path.join(__dirname, 'phantomjs-script.js')
// ]

// Application
import {App} from './app/app.component';
import {routes} from './app/app.routes';

export function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [
      App
    ],
    platformProviders: [
      {provide: ORIGIN_URL, useValue: 'http://localhost:3000'},
      {provide: APP_BASE_HREF, useValue: baseUrl},
    ],
    providers: [
      {provide: REQUEST_URL, useValue: url},
      NODE_HTTP_PROVIDERS,
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS
    ],
    async: true,
    preboot: false // { appRoot: 'app' } // your top level app component selector
  };

  res.render('index', config, function(err, html) {
    console.log(html);
    htmlString = html;
    
    res.send(html);
    for(var i=0; i <50; i++) {
        webshot(html, './screenshots/image_'+i+'.png', webshotOptions, function(err) {
                    console.log('webshot method called')
        });
    }
    // trying to take snapshots here in the callback
  });

  // function takeScreenshots(valueString) {
  //   for(var i=0; i <50; i++) {
  //       webshot(valueString, '../screenshot/image_'+i+'.png', webshotOptions, function(err) {
  //                   console.log('webshot method called')
  //       });
  //   }
  // }

  // for(var i=0; i <50; i++) {
  //       webshot(htmlString, '../screenshot/image_'+i+'.png', webshotOptions, function(err) {
  //                   console.log('webshot method called')
  //       });
  //   }
}
