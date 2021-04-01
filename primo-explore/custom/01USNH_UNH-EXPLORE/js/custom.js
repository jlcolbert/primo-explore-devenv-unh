(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad', 'externalSearch']);

app.value('searchTargets', [{
  name: 'Worldcat',
  url: 'https://unhlibrary.on.worldcat.org/search?',
  img: './custom/01USNH_UNH-EXPLORE/img/worldcat-logo.png',
  alt: 'Worldcat Logo',
  mapping: function mapping(queries, filters) {
    var query_mappings = {
      any: 'kw',
      title: 'ti',
      creator: 'au',
      subject: 'su',
      isbn: 'bn',
      issn: 'n2'
    };
    try {
      return 'queryString=' + queries.map(function (part) {
        var terms = part.split(',');
        var type = query_mappings[terms[0]] || 'kw';
        var string = terms[2] || '';
        var join = terms[3] || '';
        return type + ':' + string + ' ' + join + ' ';
      }).join('');
    } catch (e) {
      return '';
    }
  }
}, {
  name: 'Google Scholar',
  url: 'https://scholar.google.com/scholar?q=',
  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png',
  alt: 'Google Scholar Logo',
  mapping: function mapping(queries, filters) {
    try {
      return queries.map(function (part) {
        return part.split(',')[2] || '';
      }).join(' ');
    } catch (e) {
      return '';
    }
  }
}]);

angular.module('externalSearch', []).value('searchTargets', []).component('prmFacetAfter', {
  bindings: { parentCtrl: '<' },
  controller: ['externalSearch', function (externalSearch) {
    this.$onInit = function () {
      externalSearch.setController(this.parentCtrl);
      externalSearch.addExtSearch();
    };
  }]
}).component('prmPageNavMenuAfter', {
  controller: ['externalSearch', function (externalSearch) {
    this.$onInit = function () {
      if (externalSearch.getController()) externalSearch.addExtSearch();
    };
  }]
}).component('prmFacetExactAfter', {
  bindings: { parentCtrl: '<' },
  template: '<div ng-if="name === \'External Search\'">\
          <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">\
              <div class="section-content animate-max-height-variable">\
                  <div class="md-chips md-chips-wrap">\
                      <div ng-repeat="target in targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">\
                          <div class="md-chip-content layout-row" role="button" tabindex="0">\
                              <strong dir="auto" title="{{ target.name }}">\
                                  <a ng-href="{{ target.url + target.mapping(queries, filters) }}" target="_blank">\
                                      <img ng-src="{{ target.img }}" width="22" height="22" alt="{{ target.alt }}" style="vertical-align:middle;"> {{ target.name }}\
                                  </a>\
                              </strong>\
                          </div>\
                      </div>\
                  </div>\
              </div>\
          </div>\
      </div>',
  controller: ['$scope', '$location', 'searchTargets', function ($scope, $location, searchTargets) {
    this.$onInit = function () {
      $scope.name = this.parentCtrl.facetGroup.name;
      $scope.targets = searchTargets;
      var query = $location.search().query;
      var filter = $location.search().pfilter;
      $scope.queries = Object.prototype.toString.call(query) === '[object Array]' ? query : query ? [query] : false;
      $scope.filters = Object.prototype.toString.call(filter) === '[object Array]' ? filter : filter ? [filter] : false;
    };
  }]
}).factory('externalSearch', function () {
  return {
    getController: function getController() {
      return this.prmFacetCtrl || false;
    },
    setController: function setController(controller) {
      this.prmFacetCtrl = controller;
    },
    addExtSearch: function addExtSearch() {
      var xx = this;
      var checkExist = setInterval(function () {

        if (xx.prmFacetCtrl.facetService.results[0] && xx.prmFacetCtrl.facetService.results[0].name != "External Search") {
          if (xx.prmFacetCtrl.facetService.results.name !== 'External Search') {
            xx.prmFacetCtrl.facetService.results.unshift({
              name: 'External Search',
              displayedType: 'exact',
              limitCount: 0,
              facetGroupCollapsed: false,
              values: undefined
            });
          }
          clearInterval(checkExist);
        }
      }, 100);
    }
  };
});
})();