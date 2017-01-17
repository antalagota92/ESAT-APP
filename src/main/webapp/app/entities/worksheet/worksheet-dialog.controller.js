'use strict';

angular.module('esatAppApp').controller('WorksheetDialogController',
    ['$scope', '$stateParams', '$modalInstance', '$q', 'entity', 'Worksheet','User',
        function ($scope, $stateParams, $modalInstance, $q, entity, Worksheet, User) {
        $scope.worksheet = entity;
        $scope.users = User.query();
        $scope.load = function(id) {
            Worksheet.get({id : id}, function(result) {
                $scope.worksheet = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('esatAppApp:worksheetUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.worksheet.id != null) {
                Worksheet.update($scope.worksheet, onSaveFinished);
            } else {
                Worksheet.save($scope.worksheet, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        }]);


