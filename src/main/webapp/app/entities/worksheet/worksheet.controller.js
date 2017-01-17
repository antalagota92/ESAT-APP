'use strict';

angular.module('esatAppApp')
    .controller('WorksheetController', function ($scope, Worksheet, ParseLinks) {
        $scope.worksheets = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Worksheet.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.worksheets = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Worksheet.get({id: id}, function(result) {
                $scope.worksheet = result;
                $('#worksheetConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Worksheet.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteWorksheetConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };


        $scope.clear = function () {
            $scope.updateDM = {userId: null, day: null, startHour: null, endHour: null, id: null};
        };
    });
