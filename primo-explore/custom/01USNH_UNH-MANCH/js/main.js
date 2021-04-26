import "@orbis-cascade/primo-explore-external-search";
import "primo-explore-help-menu";
import "primo-explore-lod-author-card";

import ExternalSearchConfig from "./components/externalSearch/externalSearch.config";
import HelpMenuConfig from "./components/helpMenu/helpMenu.config";
import PRMFullViewAfterDirective from "./directives/prmFullViewAfter.directive";

// eslint-disable-next-line no-undef
const app = angular.module("viewCustom", [
  "angularLoad",
  "externalSearch",
  "helpMenuContentDisplay",
  "helpMenuTopbar",
  "lodAuthorCard",
]);

app
  .constant("helpMenuConfig", HelpMenuConfig)
  .component("prmFullViewAfter", PRMFullViewAfterDirective)
  .value("searchTargets", ExternalSearchConfig);
