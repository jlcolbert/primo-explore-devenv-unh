import "primo-explore-lod-author-card";

import PRMFullViewAfterDirective from "./directives/prmFullViewAfter.directive";

// eslint-disable-next-line no-undef
const app = angular.module("viewCustom", ["angularLoad", "lodAuthorCard"]);

app.component("prmFullViewAfter", PRMFullViewAfterDirective);
