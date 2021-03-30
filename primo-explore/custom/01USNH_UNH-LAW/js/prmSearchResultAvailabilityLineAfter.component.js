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