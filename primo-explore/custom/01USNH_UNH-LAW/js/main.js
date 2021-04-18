import "primo-explore-unpaywall";

import UnpaywallConfig from "./components/unpaywall.config";
import PRMSearchResultAvailabilityLineAfterDirective from "./directives/prmSearchResultAvailabilityLineAfter.directive";

// eslint-disable-next-line no-undef
const app = angular.module("viewCustom", ["angularLoad", "bulibUnpaywall"]);

app
  .constant("unpaywallConfig", UnpaywallConfig)
  .component(
    "prmSearchResultAvailabilityLineAfter",
    PRMSearchResultAvailabilityLineAfterDirective
  );
