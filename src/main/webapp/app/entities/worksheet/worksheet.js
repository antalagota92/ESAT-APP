(function() {
    'use strict';

    angular
        .module('esatAppApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                   .state('worksheet', {
                       parent: 'entity',
                       url: '/worksheets',
                       data: {
                           authorities: ['ROLE_ADMIN'],
                           pageTitle: 'Worksheets'
                       },
                       views: {
                           'content@': {
                               templateUrl: 'app/entities/worksheet/worksheet.html',
                               controller: 'WorksheetController'
                           }
                       }
                   })
                   .state('worksheet.detail', {
                       parent: 'entity',
                       url: '/worksheet/{id}',
                       data: {
                           authorities: ['ROLE_ADMIN'],
                           pageTitle: 'Worksheet detail'
                       },
                       views: {
                           'content@': {
                               templateUrl: 'app/entities/worksheet/worksheet-detail.html',
                               controller: 'WorksheetDetailController'
                           }
                       },
                       resolve: {
                           entity: ['$stateParams', 'Worksheet', function($stateParams, Worksheet) {
                               return Worksheet.get({id : $stateParams.id});
                           }]
                       }
                   })
                   .state('worksheet.new', {
                       parent: 'worksheet',
                       url: '/new',
                       data: {
                           authorities: ['ROLE_ADMIN'],
                       },
                       onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                           $modal.open({
                               templateUrl: 'app/entities/worksheet/worksheet-dialog.html',
                               controller: 'WorksheetDialogController',
                               size: 'lg',
                               resolve: {
                                   entity: function () {
                                       return {userId: null, day: null, startHour: null, endHour: null, id: null};
                                   }
                               }
                           }).result.then(function(result) {
                               $state.go('worksheet', null, { reload: true });
                           }, function() {
                               $state.go('worksheet');
                           })
                       }]
                   })
                   .state('worksheet.edit', {
                       parent: 'worksheet',
                       url: '/{id}/edit',
                       data: {
                           authorities: ['ROLE_ADMIN'],
                       },
                       onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                           $modal.open({
                               templateUrl: 'app/entities/worksheet/worksheet-dialog.html',
                               controller: 'WorksheetDialogController',
                               size: 'lg',
                               resolve: {
                                   entity: ['Worksheet', function(Worksheet) {
                                       return Worksheet.get({id : $stateParams.id});
                                   }]
                               }
                           }).result.then(function(result) {
                               $state.go('worksheet', null, { reload: true });
                           }, function() {
                               $state.go('^');
                           })
                       }]
                   });
    }
})();

