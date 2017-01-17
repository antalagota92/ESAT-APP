'use strict';

angular.module('esatAppApp')
    .controller('WorksheetDetailController', function ($scope, $rootScope, $stateParams, entity, Worksheet) {
        $scope.worksheet = entity;
        $scope.load = function (id) {
            Worksheet.get({id: id}, function(result) {
                $scope.worksheet = result;
            });
        };
        $rootScope.$on('esatAppApp:worksheetUpdate', function(event, result) {
            $scope.worksheet = result;
        });
    });
