/**
 * @ngdoc directives
 * @name angularApp.directive:search-input
 * @description
 *
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .directive('searchInput', searchInput);

      searchInput.$inject = ['MovieSearchService', 'toastr'];

      function searchInput(MovieSearchService, toastr) {
          return {
              restrict: 'E',
              scope: {},
              template: [
                  '<div class="search-input">',
                      '<input type="text" ng-model="query" placeholder="Movie name..."></input>',
                      '<input type="button" class="find-button" value="Find" ng-click="findMovie()"></input>',
                  '</div>'
              ].join(''),

              link: function(scope, el, attrs) {
                  el.bind('keydown', function(e){
                      if (e.keyCode === 13) {
                        if(scope.query){
                          MovieSearchService.handleInput(scope.query);
                        }else{
                          toastr.error('Please enter movie name to search', {
                            closeButton: true
                          });
                        }
                      }
                  });

                  scope.findMovie = function () {
                    if(scope.query){
                      MovieSearchService.handleInput(scope.query);
                    }else{
                      toastr.error('Please enter movie name to search', {
                        closeButton: true
                      });
                    }
                  };
              }
          };
        }
})();
