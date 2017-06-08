/**
 * @ngdoc Service
 * @name angularApp.Service:loginAuthenticationService
 * @description
 * # loginAuthenticationService
 * loginAuthentication Service for user login check
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('loginAuthenticationService', loginAuthenticationService);

    loginAuthenticationService.$inject = ['StorageUtil'];

    function loginAuthenticationService(StorageUtil) {

        var service = {
            getLoggedInUserId: getLoggedInUserId
        };

        return service;

        function getLoggedInUserId() {
            var userId = StorageUtil.getLocal('userId');
            return userId;
        }
    }

})();
