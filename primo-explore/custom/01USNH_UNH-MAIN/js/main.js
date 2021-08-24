import "@orbis-cascade/primo-explore-external-search";
import "primo-explore-help-menu";
import "primo-explore-search-bar-sub-menu";
import "primo-explore-unpaywall";

import ExternalSearchConfig from "./components/externalSearch/externalSearch.config";
import HelpMenuConfig from "./components/helpMenu/helpMenu.config";
import SearchBarSubMenuConfig from "./components/searchBarSubMenu/searchBarSubMenu.config";
import UnpaywallConfig from "./components/unpaywall/unpaywall.config";
import PRMSearchBarAfterDirective from "./directives/prmSearchBarAfter.directive";
import PRMSearchResultAvailabilityLineAfterDirective from "./directives/prmSearchResultAvailabilityLineAfter.directive";

// eslint-disable-next-line no-undef
const app = angular.module("viewCustom", [
  "angularLoad",
  "externalSearch",
  "helpMenuContentDisplay",
  "helpMenuTopbar",
  "searchBarSubMenu",
  "bulibUnpaywall",
]);

// Adds the chat slide out
// eslint-disable-next-line func-names
(function () {
  // eslint-disable-next-line no-undef
  const lc = document.createElement("script");
  lc.type = "text/javascript";
  lc.async = "true";
  lc.src =
    "https://v2.libanswers.com/load_chat.php?hash=17b1fa99b577483a418172851f40a779";
  // eslint-disable-next-line no-undef
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(lc, s);
})();

app
  .constant("helpMenuConfig", HelpMenuConfig)
  .constant("searchBarSubMenuItems", SearchBarSubMenuConfig)
  .constant("unpaywallConfig", UnpaywallConfig)
  .component("prmSearchBarAfter", PRMSearchBarAfterDirective)
  .component(
    "prmSearchResultAvailabilityLineAfter",
    PRMSearchResultAvailabilityLineAfterDirective
  )
  .value("searchTargets", ExternalSearchConfig);
