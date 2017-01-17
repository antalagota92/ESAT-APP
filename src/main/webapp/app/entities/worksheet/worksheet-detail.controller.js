'use strict';

angular.module('buddyguardcloudApp')
    .controller('UpdateDMDetailController', function ($scope, $rootScope, $stateParams, entity, UpdateDM) {
        $scope.updateDM = entity;
        $scope.load = function (id) {
            UpdateDM.get({id: id}, function(result) {
                $scope.updateDM = result;
            });
        };
        $rootScope.$on('buddyguardcloudApp:updateDMUpdate', function(event, result) {
            $scope.updateDM = result;
        });
    });
