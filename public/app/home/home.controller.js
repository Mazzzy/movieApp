/**
 * @ngdoc controller
 * @name angularApp.controller:HomeController
 * @description
 * # HomeController
 * Home Controller loads home page data
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['MovieSearchService', 'StorageUtil', '$location', '$scope'];

    function HomeController(MovieSearchService, StorageUtil, $location, $scope) {
      var self = this;
      self.movieList = [];

      // watch for updated movie list based on search
      // note: angular.bind specifically to have results from MovieSearchService
      //       into current 'controller as' movieList rather than $scope
      $scope.$watch(function () {
          return MovieSearchService.results;
      },angular.bind(this, function (searchedMovies) {
        if (searchedMovies) {
          this.movieList = searchedMovies;
          return this.movieList;
        }
      }));

      self.logoutUser = function() {
          var status = StorageUtil.removeLocal('userId');
          if(status) {
              $location.path('/login');
          }
      }
    }
})();
