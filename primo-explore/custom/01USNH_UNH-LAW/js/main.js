import "@orbis-cascade/primo-explore-external-search";
import "primo-explore-search-bar-sub-menu";
import "primo-explore-unpaywall";

import ExternalSearchConfig from "./components/externalSearch/externalSearch.config";
import SearchBarSubMenuConfig from "./components/searchBarSubMenu/searchBarSubMenu.config";
import UnpaywallConfig from "./components/unpaywall/unpaywall.config";
import PRMSearchResultAvailabilityLineAfterDirective from "./directives/prmSearchResultAvailabilityLineAfter.directive";
import PRMSearchBarAfterDirective from "./directives/prmSearchBarAfter.directive";

// eslint-disable-next-line no-undef
const app = angular.module("viewCustom", [
  "angularLoad",
  "externalSearch",
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
    "https://law-unh.libanswers.com/load_chat.php?hash=86e52d2b076540265353d6fa933a0022";
  // eslint-disable-next-line no-undef
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(lc, s);
})();

app
  .constant("searchBarSubMenuItems", SearchBarSubMenuConfig)
  .constant("unpaywallConfig", UnpaywallConfig)
  .component(
    "prmSearchResultAvailabilityLineAfter",
    PRMSearchResultAvailabilityLineAfterDirective
  )
  .component("prmSearchBarAfter", PRMSearchBarAfterDirective)
  .value("searchTargets", ExternalSearchConfig);
