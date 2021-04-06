import 'primo-explore-unpaywall';
import '@orbis-cascade/primo-explore-external-search';
import 'primo-explore-help-menu'; // import './help-menu.js'
import 'primo-explore-search-bar-sub-menu';

import { unhListOfUpdates } from './menuUpdates';
import { unhListOfItems } from './menuElements';
import { searchTargets } from './searchConfig';
import searchBarSubMenuItemsConfig from './searchBarSubMenu';

var app = angular.module('viewCustom', [
  'angularLoad',
  'bulibUnpaywall',
  'externalSearch',
  'helpMenuContentDisplay',
  'helpMenuTopbar',
  'searchBarSubMenu',
]);

app
  .constant('unpaywallConfig', {
    email: 'jay.colbert@unh.edu',
    showOnResultsPage: true,
    overrideOACheck: true,
    showVersionLabel: true,
    logToConsole: true,
    showDebugTable: false,
    publishEvents: false,
    labelText: 'View Open Access Version via Unpaywall',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/archive/2/25/20181007070735%21Open_Access_logo_PLoS_white.svg',
    imageStyle: 'width: 20px; padding-right:5px; vertical-align: middle;',
  })
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<bulib-unpaywall></bulib-unpaywall>',
  })
  .constant('helpMenuConfig', {
    logToConsole: true,
    publishEvents: false,

    enableNotificationIndicator: true,
    notificationIndicatorExpiration: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks

    helpMenuTitle: 'Search Menu',
    updatesLabel: 'Search Updates',
    list_of_updates: unhListOfUpdates,
    entriesLabel: 'Help Entries',
    list_of_elements: unhListOfItems,

    helpMenuWidth: 500,
  })
  .constant(
    searchBarSubMenuItemsConfig.name,
    searchBarSubMenuItemsConfig.config
  )
  .component('prmSearchBarAfter', {
    template: '<search-bar-sub-menu></search-bar-sub-menu>',
  })
  .value('searchTargets', searchTargets.config);

/************************************* BEGIN libchat widget *************************************/
// Adds the chat slide out
(function () {
  var lc = document.createElement('script');
  lc.type = 'text/javascript';
  lc.async = 'true';
  lc.src =
    'https://v2.libanswers.com/load_chat.php?hash=17b1fa99b577483a418172851f40a779';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(lc, s);
})();
/************************************* END libchat widget ***************************************/
