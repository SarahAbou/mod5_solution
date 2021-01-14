(function() {
'use strict';
angular.module('public')
.controller('InfoController',InfoController)

    InfoController.$inject = ['user'];
    function InfoController(user) {
        let info = this;
        info.isUserRegistered = !(Object.keys(user).length === 0 && user.constructor === Object);
        info.user = user;
    }
}());
