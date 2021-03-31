(function(){
"use strict";
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var app = angular.module('viewCustom', ['angularLoad', 'bulibUnpaywall', 'searchBarSubMenu', 'helpMenuContentDisplay', 'helpMenuTopbar']);

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
// - configure Search Bar Sub Menu - //
app.component('prmSearchBarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  template: '<search-bar-sub-menu parent-ctrl="$ctrl.parentCtrl"></search-bar-sub-menu>'
}).constant('searchBarSubMenuItems', [{
  name: 'How To Search',
  description: 'Learn how to use the library search box',
  action: 'https://libraryguides.unh.edu/librarysearchbox_unhdurham',
  icon: {
    set: 'action',
    icon: 'ic_info_24px'
  },
  show_xs: true,
  cssClasses: 'button-over-light'
}, {
  name: 'UNH Law Library',
  description: 'Search the Law Library',
  action: 'https://unh.primo.exlibrisgroup.com/discovery/search?vid=01USNH_UNH:LAW',
  icon: {
    set: 'action',
    icon: 'ic_search_24px'
  },
  show_xs: true,
  cssClasses: 'button-over-light'
}, {
  name: 'UNH Manchester Library',
  description: 'Search the Manchester Library',
  action: 'https://unh.primo.exlibrisgroup.com/discovery/search?vid=01USNH_UNH:MANCH',
  icon: {
    set: 'action',
    icon: 'ic_search_24px'
  },
  show_xs: true,
  cssClasses: 'button-over-light'
}, {
  name: 'Ask a Librarian',
  description: 'Get help with your research',
  action: 'https://library.unh.edu/research-support/ask-librarian',
  icon: {
    set: 'action',
    icon: 'ic_question_answer_24px'
  },
  show_xs: true,
  cssClasses: 'button-over-light'
}, {
  name: 'Hours',
  description: 'Library hours',
  action: 'https://library.unh.edu/about-us/hours',
  icon: {
    set: 'action',
    icon: 'ic_schedule_24px'
  },
  show_xs: true,
  cssClasses: 'button-over-light'
}, {
  name: 'Locations',
  description: 'Library locations',
  action: 'https://library.unh.edu/locations',
  icon: {
    set: 'maps',
    icon: 'ic_place_24px'
  },
  show_xs: true,
  cssClasses: 'button-over-light'
}]);

// - configure unpaywall - //
app.component('prmSearchResultAvailabilityLineAfter', {
  bindings: {
    parentCtrl: '<'
  },
  template: '<bulib-unpaywall parent-ctrl="$ctrl.parentCtrl"></bulib-unpaywall>'
}).constant('unpaywallConfig', {
  email: 'jay.colbert@unh.edu',
  showOnResultsPage: true,
  overrideOACheck: true,
  showVersionLabel: true,
  logToConsole: true,
  showDebugTable: false,
  publishEvents: false,
  labelText: 'View Open Access Version via Unpaywall',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/archive/2/25/20181007070735%21Open_Access_logo_PLoS_white.svg',
  imageStyle: 'width: 20px; padding-right:5px; vertical-align: middle;'
});

angular.module('searchBarSubMenu', []).controller('searchBarSubMenuController', ['searchBarSubMenuItems', '$scope', '$filter', function (items, $scope, $filter) {
  this.$onInit = function () {
    $scope.items = items;
  };
  $scope.translate = function (original) {
    return original.replace(/\{(.+)\}/g, function (match, p1) {
      return $filter('translate')(p1);
    });
  };
  $scope.goToUrl = function (url) {
    window.open(url, '_blank');
  };
}]).component('searchBarSubMenu', {
  require: {
    prmSearchBarAfter: '^prmSearchBarAfter'
  },
  controller: 'searchBarSubMenuController',
  template: '\
      <div class="layout-align-center-center layout-row flex search-bar-sub-menu">\
        <ul>\
          <li ng-repeat="item in items">\
          <button data-href="{{ translate(item.action) }}" aria-label="{{ translate(item.description) }}" ng-click="goToUrl(translate(item.action))" class="button-with-icon zero-margin md-button md-small {{item.cssClasses}}" type="button">\
            <md-tooltip md-direction="bottom" md-delay="500">{{ translate(item.description) }}</md-tooltip><prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{item.icon.set}}" icon-definition="{{item.icon.icon}}"></prm-icon>\
            <span class="search-bar-sub-menu-item" ng-class="(item.show_xs) ? \'\' : \'hide-xs\'">{{ translate(item.name) }}</span>\
          </button>\
          </li>\
        </ul>\
      </div>\
      '
});

angular.module('bulibUnpaywall', []).controller('unpaywallController', ['$http', '$injector', function ($http, $injector) {
  var self = this; // 'this' changes scope inside of the $http.get(). 'self' is easier to track/trace

  var LOG_CONFIG_DISCOVERY = false;

  var logEventToGoogleAnalytics = function logEventToGoogleAnalytics(category, action, label) {
    if (window.ga) {
      window.ga('send', 'event', category, action, label);
    }
  };

  // obtain custom configuration information from 'unpaywallConfig' or primo-studio constant
  var unpaywallConfig = {};
  if ($injector.modules && LOG_CONFIG_DISCOVERY) {
    console.log($injector.modules);
  }
  if ($injector.has('unpaywallConfig')) {
    if (LOG_CONFIG_DISCOVERY) {
      console.log("'unpaywallConfig' found: ");
    }
    unpaywallConfig = $injector.get('unpaywallConfig');
  }
  if ($injector.has('primoExploreUnpaywallStudioConfig')) {
    if (LOG_CONFIG_DISCOVERY) {
      console.log("'primoExploreUnpaywallStudioConfig' found: ");
    }
    unpaywallConfig = $injector.get('primoExploreUnpaywallStudioConfig');
  }
  if (LOG_CONFIG_DISCOVERY) {
    console.log(unpaywallConfig);
  }

  // provide 'unpaywall' organization with default value including some context that it's from us (for rate-limiting)
  self.email = unpaywallConfig.email || "primo-explore-unpaywall@npmjs.com";

  // provide additional customization options (with defaults)
  self.logToConsole = Object.keys(unpaywallConfig).includes("logToConsole") ? unpaywallConfig.logToConsole : true;
  self.publishEvents = Object.keys(unpaywallConfig).includes("publishEvents") ? unpaywallConfig.publishEvents : false;
  self.showVersionLabel = Object.keys(unpaywallConfig).includes("showVersionLabel") ? unpaywallConfig.showVersionLabel : false;
  self.showDebugTable = Object.keys(unpaywallConfig).includes("showDebugTable") ? unpaywallConfig.showDebugTable : false;
  self.showOnResultsPage = Object.keys(unpaywallConfig).includes("showOnResultsPage") ? unpaywallConfig.showOnResultsPage : true;
  self.overrideOACheck = Object.keys(unpaywallConfig).includes("overrideOACheck") ? unpaywallConfig.overrideOACheck : false;
  self.logEvent = unpaywallConfig.logEvent || logEventToGoogleAnalytics;

  // customize UI/UX
  self.labelText = Object.keys(unpaywallConfig).includes("labelText") ? unpaywallConfig.labelText : null;
  self.imageUrl = Object.keys(unpaywallConfig).includes("imageUrl") ? unpaywallConfig.imageUrl : null;
  self.imageStyle = Object.keys(unpaywallConfig).includes("imageStyle") ? unpaywallConfig.imageStyle : "height: 24px; vertical-align: bottom; padding-right: 5px;";

  // conditionally log to the console
  self.logMessageToConsole = function (message) {
    if (self.logToConsole) {
      console.log("bulib-unpaywall) " + message);
    }
  };

  // conditionally call customized 'logEvent'
  self.logEventToAnalytics = function (category, action, label) {
    self.logMessageToConsole("triggering '" + category + "." + action + "' event [publish=" + self.publishEvents + "].");
    if (self.publishEvents) {
      self.logEvent(category, action, label);
    }
  };

  // ng-click response that logs data to google analytics
  self.trackLinkClick = function (doi) {
    self.logMessageToConsole("unpaywall link used for doi: " + doi);
    self.logEventToAnalytics("unpaywall", "usage", self.listOrFullViewLabel);
  };

  self.$postLink = function () {
    self.parentCtrl = self.prmSearchResultAvailabilityLine;
    var item = self.parentCtrl.result; // item data is stored in 'prmSearchResultAvailability' (its parent)

    // obtain contextual info on whether you're on the result list of the full item view
    var onFullView = this.parentCtrl.isFullView || this.parentCtrl.isOverlayFullView;
    self.listOrFullViewLabel = onFullView ? 'full' : 'list';
    self.show = onFullView || self.showOnResultsPage;

    try {
      // obtain doi and open access information from the item PNX (metadata)
      var addata = item.pnx.addata;
      if (addata) {
        this.doi = addata.hasOwnProperty("doi") ? addata.doi[0] : null; //default to first doi (list)
        this.is_oa = addata.hasOwnProperty("oa"); //true if property is present at all (regardless of value)
      }

      // if there's a doi and it's not already open access, ask the oadoi.org for an OA link
      if (this.doi && (!this.is_oa || self.overrideOACheck) && self.show) {
        self.logEventToAnalytics('unpaywall', 'api-call', self.listOrFullViewLabel);

        // make the actual call to unpaywall API
        var apiUrl = "https://api.oadoi.org/v2/" + self.doi + "?email=" + self.email;
        self.logMessageToConsole("-> making 'api-call' to " + apiUrl);
        $http.get(encodeURI(apiUrl)).then(function (successResponse) {
          // if there is a "best open access location", save it so it can be used in the template above
          var best_oa_location = successResponse.data.best_oa_location;
          if (!best_oa_location) {
            return; // can't get what we want from unpaywall. returning with nothing
          }

          // get the "best" content link from this "best_oa_location"
          self.best_oa_link = best_oa_location.url || "";
          self.logMessageToConsole("successfully acquired a 'best_oa_location' for doi '" + self.doi + "' at url: " + self.best_oa_link);
          self.logEventToAnalytics('unpaywall', 'api-success', self.listOrFullViewLabel);

          // optionally display whether the link is to a published, submitted, or accepted version
          var best_oa_version = best_oa_location.version.toLowerCase() || "";
          if (best_oa_version.includes("publish")) {
            self.best_oa_version = ""; // users should assume it's the 'published' version without it being clarified in the UI
          } else {
            self.best_oa_version = best_oa_version.includes("submit") ? "Submitted" : "Accepted";
          }
        }, function (errorResponse) {
          self.logMessageToConsole("[error status: " + errorResponse.status + "] error calling unpaywall API: " + errorResponse.statusText);
        });
      }
    } catch (e) {
      self.logMessageToConsole("error caught in unpaywallController: " + e.message);
    }
  };
}]).component('bulibUnpaywall', {
  require: {
    prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine'
  },
  template: '\
      <unpaywall ng-if="$ctrl.show">\
        <div layout="flex" ng-if="$ctrl.best_oa_link" class="layout-row" style="margin-top: 5px;">\
          <a ng-click="$ctrl.trackLinkClick($ctrl.doi)" target="_blank" href="{{$ctrl.best_oa_link}}"\
            style="margin-left: 3px; margin-top: 3px;" rel="noreferrer">\
            \
            <img ng-if="$ctrl.imageUrl" src="{{$ctrl.imageUrl}}" alt="unpaywall logo" style="{{$ctrl.imageStyle}}">\
            <prm-icon ng-hide="$ctrl.imageUrl" icon-type="svg" svg-icon-set="action" icon-definition="ic_lock_open_24px" style="color: #f68212;"></prm-icon>\
            \
            <span ng-if="$ctrl.labelText">{{$ctrl.labelText}}</span>\
            <span ng-hide="$ctrl.labelText"><strong>Open Access</strong> available via unpaywall</span>\
            \
            <span ng-if="$ctrl.showVersionLabel && $ctrl.best_oa_version">&nbsp({{$ctrl.best_oa_version}} version)</span>\
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\
          </a>\
        </div>\
        <div ng-if="$ctrl.showDebugTable" class="layout-row">\
          <table>\
            <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>\
            <tr><td><strong>is_OA</strong></td><td>{{$ctrl.is_oa}}</td>\
            <tr><td><strong>best_oa_link</strong></td><td>{{$ctrl.best_oa_link}}</td></tr>\
            <tr><td><strong>best_oa_version</strong></td><td>{{$ctrl.best_oa_version}}</td></tr>\
          </table>\
        </div>\
      </unpaywall>',
  controller: 'unpaywallController'
});
!function (e) {
  var n = {};function t(i) {
    if (n[i]) return n[i].exports;var o = n[i] = { i: i, l: !1, exports: {} };return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
  }t.m = e, t.c = n, t.d = function (e, n, i) {
    t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: i });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, t.t = function (e, n) {
    if (1 & n && (e = t(e)), 8 & n) return e;if (4 & n && "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && e && e.__esModule) return e;var i = Object.create(null);if (t.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & n && "string" != typeof e) for (var o in e) {
      t.d(i, o, function (n) {
        return e[n];
      }.bind(null, o));
    }return i;
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return t.d(n, "a", n), n;
  }, t.o = function (e, n) {
    return Object.prototype.hasOwnProperty.call(e, n);
  }, t.p = "", t(t.s = 0);
}([function (e, n, t) {
  e.exports = t(1);
}, function (e, n, t) {
  "use strict";
  t.r(n);var i = '\n  <md-button ng-hide="!entry" class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="back()">\n    <prm-icon icon-type="svg" svg-icon-set="navigation" icon-definition="ic_arrow_back_24px"\n              aria-label="return to help content list" ></prm-icon>\n  </md-button>\n  <h1>\n    <strong ng-if="helpMenuTitle">{{helpMenuTitle}}</strong>\n    <strong ng-hide="helpMenuTitle">Search Help</strong>\n    <span ng-hide="!entry"> - {{entry.title}}</span>\n  </h1>',
      o = '\n  <div ng-if="entry" id="search-help-menu-content" tabindex="-1">\n    <br />\n    <p ng-if="!entry.template"><em>{{entry.description}}</em></p>\n    <div ng-bind-html="entry.template"></div>\n  </div>\n  <h2 ng-hide="entry || !helpContentUpdates">{{updatesLabel}}</h2>\n  <ul ng-hide="entry || !helpContentUpdates" style="list-style: none; width: 100%; padding-left: 0px;">\n    <hr aria-hidden="true" />\n    <li ng-repeat="item in helpContentUpdates" class="row">\n      <a ng-if="item.id" href="#{{item.id}}">\n        <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"\n                  icon-type="svg" style="padding-right: 10px;"></prm-icon>\n        {{item.title}}\n      </a>\n      <hr ng-if="!item.id" aria-hidden="true" />\n    </li>\n    <hr aria-hidden="true" />\n  </ul>\n  <h2 ng-hide="entry || !helpContentList || !helpContentUpdates">{{entriesLabel}}</h2>\n  <ul ng-hide="entry || !helpContentList" style="list-style: none; width: 100%; padding-left: 0px;">\n    <hr aria-hidden="true" />\n    <li ng-repeat="item in helpContentList" class="row">\n      <a ng-if="item.id" href="#{{item.id}}">\n        <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"\n                  icon-type="svg" style="padding-right: 10px;"></prm-icon>\n        {{item.title}}\n      </a>\n      <hr ng-if="!item.id" aria-hidden="true" />\n    </li>\n    <hr aria-hidden="true" />\n  </ul>',
      l = '\n  <style>\n    help-menu-content-display { font-size: 140%; margin-bottom: 5px;}\n    #help-header { background-color: lightgrey; }\n    #help-content { padding: 0px 25px; }\n    prm-static-page > prm-static > div { display: none; }\n  </style>\n  <div id="help-header" class="md-toolbar-tools">'.concat(i, '</div>\n  <div id="help-content">').concat(o, "</div>"),
      a = "primoExploreHelpMenuStudioConfig",
      s = "help-menu-notification-indicator-dismissed",
      r = { logToConsole: !1, publishEvents: !1, enableNotificationIndicator: !1, notificationIndicatorExpiration: 12096e5, updatesLabel: "Search Updates", entriesLabel: "Help Entries", list_of_elements: [{ id: "getting-started", title: "Getting Started", description: "brief static html content with an overview on how to use BULS; links to direct to main BULS help page in WordPress, other pages, and/or other sections of the menu", icon: { code: "description", group: "action" }, template: "\n      <p>BU Libraries Search contains articles, books, journals, databases, films, music, dissertations, and other scholarly materials for your research</p>\n      <h2>Search Tips</h2>\n      <code>brief info about title or subject keyword searches</code>\n      <br /><br />\n      <h2>Filtering</h2>\n      <p>Use the filters to limit to one or more material types (books, articles)</p>\n      <p>Use Peer-Reviewed Articles to quickly limit to only these results...</p>\n    " }, { id: "tutorials", title: "Tutorials", description: "at a minimum, links to individual videos and a playlist of existing BULS video tutorials (tbd if in Kaltura, WordPress, or youtube); if possible and desired, embed using Kaltura embed code", icon: { code: "shop_two", group: "action" } }, {}, { id: "whats-in-search", title: "What's in Search?", description: 'brief description of material types, "scopes", and collections; may have submenus for each of the above; likely also link out to WordPress page with all PCI collections', icon: { code: "toc", group: "action" } }, { id: "didnt-find", title: "Didn't find it?", description: "TBD info about ILL, scope of collections, and problem cases", icon: { code: "swap_horiz", group: "action" } }, {}, { id: "guides", title: "Guides", description: "info about research, subject, course, and how to guides; how to find in BULS by way of search and related more info links; link out to LibGuides home", icon: { code: "directions", group: "maps" } }, { id: "glossary", title: "Glossary", description: "list of common terms (jargon) and definitions", icon: { code: "view_list", group: "action" } }, {}, { id: "query-builder", title: "Query Builder", description: "placeholder for this, tbd functionality for future development; interim step may just be to have text demonstrating adv query syntax", icon: { code: "find_in_page", group: "action" } }, {}, { id: "saving-results", title: "Saving Results", description: "information about My Favorites, exporting results, ref managers", icon: { code: "save", group: "content" } }, { id: "citing-sources", title: "Citing Sources", description: "likely, but may depend on if including saving results; would have info about ref managers", icon: { code: "create", group: "content" } }, { id: "account", title: "Account", description: "information about My Library Account functionality- loans, renewals, policies?; may also highlight or link to My Library Account", icon: { code: "account_box", group: "action" } }, {}, { id: "for-instructors", title: "For Instructors", description: 'may be more "For" sections; will need considerable content work', icon: { code: "info", group: "action" } }, {}, { id: "ask-us", title: "Ask Us", description: "needs definition; how to point to chat? link to ask a librarian?", icon: { code: "forum", group: "communication" } }, { id: "feedback", title: "Feedback", description: 'directs to a new form to send feedback in the format of specific questions, e.g. "rate your experience", "did you find what you\'re looking for?", "send us your thoughts on improving search"; will want to clearly differentiate from Ask and reference help, so that patrons who need help soon can get it', icon: { code: "chat", group: "communication" } }], helpMenuWidth: 500, logMessage: function logMessage(e) {
      this.logToConsole && console.log("bulib-help-menu) " + e);
    }, logEventToAnalytics: function logEventToAnalytics(e, n, t) {
      !function (e, n, t) {
        window.ga && window.ga("send", "event", e, n, t);
      }(e, n, t);
    }, logHelpEvent: function logHelpEvent(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location.pathname,
          t = "help-menu";this.logMessage("logging '".concat(t, "' event with action: '").concat(e, "', label:'").concat(n, "'. [publish: ").concat(this.publishEvents, "]")), this.publishEvents && this.logEventToAnalytics(t, e, n);
    }, isNotificationDismissed: function isNotificationDismissed() {
      try {
        var e = window.localStorage.getItem(s);return null !== e && (!(Date.now() - e >= r.notificationIndicatorExpiration) || (this.logMessage("'".concat(s, "' value is present, but has expired. removing it returning 'not dismissed'")), localStorage.removeItem(s), !1));
      } catch (e) {
        return this.logMessage(e), !0;
      }
    }, showNotificationIndicatorIfNotDismissed: function showNotificationIndicatorIfNotDismissed() {
      this.enableNotificationIndicator && !this.isNotificationDismissed() && (this.logMessage("'enableNotificationIndicator' is true, local storage is enabled, and it's not dismissed, so we'll show the indicator"), document.querySelector("help-menu-topbar").style.setProperty("--notification-indicator-display", "inline-block"));
    }, dismissNotificationIndicator: function dismissNotificationIndicator() {
      try {
        this.enableNotificationIndicator && (window.localStorage.setItem(s, Date.now()), document.querySelector("help-menu-topbar").style.setProperty("--notification-indicator-display", "none"), this.logMessage("notification-indicator dismissed"));
      } catch (e) {
        this.logMessage(e);
      }
    }, get_entry_by_id: function get_entry_by_id(e) {
      for (var n = 0; n < this.list_of_elements.length; n++) {
        if (this.list_of_elements[n].id === e) return this.list_of_elements[n];
      }for (var t = 0; t < this.list_of_updates.length; t++) {
        if (this.list_of_updates[t].id === e) return this.list_of_updates[t];
      }return {};
    }, override_with_config: function override_with_config(e) {
      e && Object.keys(e) && (Object.keys(e).includes("logToConsole") && (this.logToConsole = e.logToConsole), Object.keys(e).includes("publishEvents") && (this.publishEvents = e.publishEvents), Object.keys(e).includes("enableNotificationIndicator") && (this.enableNotificationIndicator = e.enableNotificationIndicator), Object.keys(e).includes("notificationIndicatorExpiration") && (this.notificationIndicatorExpiration = e.notificationIndicatorExpiration), Object.keys(e).includes("helpMenuWidth") && (this.helpMenuWidth = e.helpMenuWidth), Object.keys(e).includes("helpMenuTitle") && (this.helpMenuTitle = e.helpMenuTitle), Object.keys(e).includes("logEventToAnalytics") && (this.logEventToAnalytics = e.logEventToAnalytics), Object.keys(e).includes("entriesLabel") && (this.entriesLabel = e.entriesLabel), Object.keys(e).includes("list_of_elements") && (this.list_of_elements = e.list_of_elements), Object.keys(e).includes("updatesLabel") && (this.updatesLabel = e.updatesLabel), Object.keys(e).includes("list_of_updates") && (this.list_of_updates = e.list_of_updates));
    } },
      c = function c(e, n, t, i, o) {
    var l = {};n.has("helpMenuConfig") && (l = n.get("helpMenuConfig")), n.has(a) && (l = n.get(a)), e.override_with_config(l), t.helpMenuTitle = e.helpMenuTitle, t.entriesLabel = e.entriesLabel, t.helpContentList = e.list_of_elements, t.updatesLabel = e.updatesLabel, t.helpContentUpdates = e.list_of_updates, t.hide = function () {
      o.hide();
    }, t.back = function () {
      t.entry = null, window.top.location.hash = "";
    }, t.openItem = function (n) {
      var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];t.entry = e.get_entry_by_id(n), i && e.logHelpEvent("select-item", n);
    }, t.setEntryIdFromHash = function () {
      var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
          n = window.location.hash.substring(1);n && t.openItem(n, e);
    }, t.openHelpInNewWindow = function () {
      var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          i = window.location.pathname,
          o = "/primo-explore/static-file/help" + window.location.search;n && (o += "#" + n, i = n);var l = e.helpMenuTitle || "Search Help Menu",
          a = "width=".concat(e.helpMenuWidth, ",height=800,resizable=0,location=0,menubar=0,scrollbars=yes");e.logHelpEvent("open-window", i);var s = open(o, l, a);s.onload = function () {
        this.document.title = l;
      }, s.addEventListener("hashchange", t.setEntryIdFromHash, !0), t.hide();
    }, i(t.setEntryIdFromHash(!1), 10), window.addEventListener("hashchange", t.setEntryIdFromHash, !0), window.addEventListener("openHelpMenuEvent", function (n) {
      var i = n.detail || "";e.logMessage("opening helpMenu from 'openHelpMenuEvent' with 'item_id': '" + i + "'"), t.openHelpInNewWindow(i);
    });
  };angular.module("helpMenuContentDisplay", []).constant("helpMenuHelper", r).controller("helpMenuPopupController", ["helpMenuHelper", "$injector", "$scope", "$timeout", "$mdDialog", c]).component("prmExploreFooterAfter", { template: '\n      <help-menu-content-display>\n        <div ng-if="'.concat(window.location.pathname.includes("/static-file/help"), '">').concat(l, "</div>\n      </help-menu-content-display>"), controller: "helpMenuPopupController" }), angular.module("helpMenuTopbar", ["ngMaterial"]).constant("helpMenuHelper", r).controller("helpMenuDialogController", ["helpMenuHelper", "$injector", "$scope", "$timeout", "$mdDialog", c]).controller("helpMenuTopbarController", ["helpMenuHelper", "$injector", "$mdDialog", function (e, n, t) {
    var l = {};n.has("helpMenuConfig") && (l = n.get("helpMenuConfig")), n.has(a) && (l = n.get(a)), e.override_with_config(l), e.showNotificationIndicatorIfNotDismissed(), this.openHelpMenu = function (n) {
      var l;e.logHelpEvent("open-dialog", window.location.pathname), e.dismissNotificationIndicator(), t.show({ controller: "helpMenuDialogController", template: (l = e.helpMenuWidth, '\n  <md-dialog id="search-help-dialog" aria-label="Search Help Menu Dialog" style="width: '.concat(l, 'px;">\n    <form>\n      <md-toolbar>\n        <div class="md-toolbar-tools">\n          ').concat(i, '\n          <span flex></span>\n          <md-button class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="hide()">\n            <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px"></prm-icon>\n          </md-button>\n        </div>\n      </md-toolbar>\n      <md-dialog-content>\n        <div class="md-dialog-content">').concat(o, '</div>\n      </md-dialog-content>\n      <md-dialog-actions layout="row">\n        <md-button ng-click="openHelpInNewWindow(entry.id)">Open in New Window</md-button>\n      </md-dialog-actions>\n    </form>\n  </md-dialog>')), hasBackdrop: !0, multiple: !1, clickOutsideToClose: !0, fullscreen: !1, focusOnOpen: !0 });
    };
  }]).component("prmSearchBookmarkFilterAfter", { template: '\n      <help-menu-topbar>\n        <div class="layout-align-center layout-row">\n          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"\n                    aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu($event)"\n                    href="#" title="open help menu">\n            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>\n          </a>\n        </div>\n        <span class="notification-indicator"></span>\n      </help-menu-topbar>', controller: "helpMenuTopbarController" });
}]);
})();