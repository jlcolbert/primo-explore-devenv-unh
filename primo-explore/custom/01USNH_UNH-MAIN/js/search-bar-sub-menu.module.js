angular
  .module('searchBarSubMenu', [])
  .controller('searchBarSubMenuController', [
    'searchBarSubMenuItems',
    '$scope',
    '$filter',
    function (items, $scope, $filter) {
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
    },
  ])
  .component('searchBarSubMenu', {
    require: {
      prmSearchBarAfter: '^prmSearchBarAfter',
    },
    controller: 'searchBarSubMenuController',
    template:
      '\
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
      ',
  });
