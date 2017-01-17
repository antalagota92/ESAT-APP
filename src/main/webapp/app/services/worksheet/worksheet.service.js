(function () {
    'use strict';

    angular
        .module('esatAppApp')
        .factory('Worksheet', Worksheet);

    Worksheet.$inject = ['$resource'];

    function Worksheet ($resource) {
        var service = $resource('api/worksheets/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'},
            'all': {method: 'GET', isArray: true, url: 'api/worksheets/all/:id'},
        });

        return service;
    }
})();
