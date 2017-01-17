'use strict';

angular.module('esatAppApp')
    .config(function ($stateProvider, ENTITY_AUTHORITIES) {
        $stateProvider
            .state('worksheet', {
                parent: 'entity',
                url: '/worksheets',
                data: {
                    authorities: ENTITY_AUTHORITIES,
                    pageTitle: 'Worksheets'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/worksheet/worksheet.html',
                        controller: 'WorksheetController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('worksheet');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('worksheet.detail', {
                parent: 'entity',
                url: '/worksheet/{id}',
                data: {
                    authorities: ENTITY_AUTHORITIES,
                    pageTitle: 'Worksheet detail'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/worksheet/worksheet-detail.html',
                        controller: 'WorksheetDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('Worksheet');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Worksheet', function($stateParams, Worksheet) {
                        return Worksheet.get({id : $stateParams.id});
                    }]
                }
            })
            .state('worksheet.new', {
                parent: 'worksheet',
                url: '/new',
                data: {
                    authorities: ENTITY_AUTHORITIES,
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
                    authorities: ENTITY_AUTHORITIES,
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'app/entities/worksheet/worksheet-dialog.html',
                        controller: 'WorksheetDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Worksheet', function(UpdateDM) {
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
    });
