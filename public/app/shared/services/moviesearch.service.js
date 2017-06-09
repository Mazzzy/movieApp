/**
 * @ngdoc service
 * @name angularApp.service:MovieSearchService
 * @description
 * # MovieSearchService
 * Home Service for home controller
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('MovieSearchService', MovieSearchService);

    MovieSearchService.$inject = ['$http', '$q', 'toastr', '$loading',];

    function MovieSearchService($http, $q, toastr, $loading) {
        var service = {
          results: [],
          isLoading: false,
          getMovieData: function(movieName){
            // note: api key is custom key generated during signin up on themoviedb.org
            // given key corresponds to my account

            var deferred = $q.defer();
            var str = "?api_key=335b3bddaf7bb975ea074ac6f544c36c&language=en-US&query="+movieName;
            var url = "https://api.themoviedb.org/3/search/movie" + str;

            $http.get(url)
            .then(function(response) {
              if(response && response.data) {
                  var resp = {"data":response.data};
                  deferred.resolve(resp);
              }
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
          },
          handleInput : function(val){
            $loading.start('commonLoader');
            var self = this;
            if (val) {
                this.getMovieData(val).then(function (res) {
                  $loading.finish('commonLoader');
                  self.isLoading = false;
                  self.results = [];
                  self.error = '';
                  if (res.data.results.length) {
                      self.results = res.data.results;
                  }
                },function (err) {
                  $loading.finish('commonLoader');
                  self.error = err || 'No movies found.';
                  toastr.error('Unable to get Movie Data '+err, {
                      closeButton: true
                  });
                });
            }
          }
        };

        return service;

    }
})();
