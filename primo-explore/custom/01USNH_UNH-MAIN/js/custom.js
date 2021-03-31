(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad', 'bulibUnpaywall']);
/************************************* BEGIN libchat widget *************************************/
// Adds the chat slide out
(function () {
  var lc = document.createElement('script');
  lc.type = 'text/javascript';
  lc.async = 'true';
  lc.src = 'https://v2.libanswers.com/load_chat.php?hash=17b1fa99b577483a418172851f40a779';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(lc, s);
})();
/************************************* END libchat widget ***************************************/
// - configure unpaywall - //
app.component('prmSearchResultAvailabilityLineAfter', {
  bindings: {
    parentCtrl: "<"
  },
  template: '<bulib-unpaywall parent-ctrl="$ctrl.parentCtrl"></bulib-unpaywall>'
}).constant('unpaywallConfig', {
  "email": "jay.colbert@unh.edu",
  "showOnResultsPage": true,
  "overrideOACheck": true,
  "showVersionLabel": true,
  "logToConsole": true,
  "showDebugTable": false,
  "publishEvents": false,
  "labelText": "View Open Access Version via Unpaywall",
  "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/archive/2/25/20181007070735%21Open_Access_logo_PLoS_white.svg",
  "imageStyle": "width: 20px; padding-right:5px; vertical-align: middle;"
});
})();