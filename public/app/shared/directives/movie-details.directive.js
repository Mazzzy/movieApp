/**
 * @ngdoc directives
 * @name angularApp.directive:movie-details
 * @description
 *
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .directive('movieDetails', movieDetails)
        .directive('starRating', starRating);

      movieDetails.$inject = ['MovieSearchService'];

      function movieDetails(MovieSearchService) {
        return {
            restrict: 'E',
            scope: {},
            template: [
                '<div class="col-md-4 col-sm-6 col-xs-12">',
                ' <div class="movie-tile">',
                '  <div class="movie-poster col-md-5 col-sm-7 col-xs-4">',
                '   <img src="{{movie.posterUrl}}" class="img-responsive">',
                '  </div>',
                '  <div class="movie-info col-md-7 col-sm-5 col-xs-8">',
                '   <dt><a ng-href="#">{{movie.title}}</a></dt><br/>',
                '   <dd><strong>Year:</strong>{{movie.releaseDate}}</dd><br/>',
                '   <dt>Popularity: </dt>',
                '   <dd>',
                '    <div star-rating rating-value="getPopularityCount()" max="5"></div>',
                '   </dd>',
                '  </div>',
                ' </div>',
                '</div>'
            ].join(''),

            link: function(scope, el, attrs) {
                var movieObj = JSON.parse(attrs.movie);
                var imgurl = "./assets/images/noimage.jpg";
                var imgName = movieObj.poster_path;

                if(imgName){
                  imgurl = "https://image.tmdb.org/t/p/w300/"+imgName;
                }

                scope.movie = {
                  "title"       : movieObj.title,
                  "releaseDate" : (new Date(movieObj.release_date)).getFullYear(),
                  "overview"    : movieObj.overview,
                  "popularity"  : movieObj.popularity,
                  "posterUrl"   : imgurl
                };

                scope.getPopularityCount= function(){
                  return scope.movie.popularity;
                }
            }
        };
      }

      // rating directive
      function starRating() {
          return {
              restrict: 'A',
              template: '<ul class="rating">' +
                  // '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                  '<li ng-repeat="star in stars" ng-class="star">' +
                  '\u2605' +
                  '</li>' +
                  '</ul>',
              scope: {
                  ratingValue: '=',
                  max: '=',
                  onRatingSelected: '&'
              },
              link: function (scope, elem, attrs) {

                  var updateStars = function () {
                      scope.stars = [];
                      for (var i = 0; i < scope.max; i++) {
                          scope.stars.push({
                              filled: i < scope.ratingValue
                          });
                      }
                  };

                  scope.toggle = function (index) {
                      scope.ratingValue = index + 1;
                      scope.onRatingSelected({
                          rating: index + 1
                      });
                  };

                  scope.$watch('ratingValue', function (oldVal, newVal) {
                      if (newVal) {
                          updateStars();
                      }
                  });
              }
          }
      }



})();
