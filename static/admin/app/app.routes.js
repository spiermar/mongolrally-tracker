(function () {
    'use strict';

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($routeProvider) {
        $routeProvider.when('/tracker', {
            templateUrl: '/static/admin/app/tracker/tracker.html',
            controller: 'TrackerController',
            title: 'Yakin Around'
        })
        .when('/point/:type', {
            templateUrl: '/static/admin/app/point/point-list.html',
            controller: 'ListPointController',
            title: 'Yakin Around'
        })
        .when('/point/:type/new', {
            templateUrl: '/static/admin/app/point/point-new.html',
            controller: 'NewPointController',
            title: 'Yakin Around'
        })
        .when('/point/:type/:id/edit', {
            templateUrl: '/static/admin/app/point/point-edit.html',
            controller: 'EditPointController',
            title: 'Yakin Around'
        })
        .otherwise('/tracker');
    }

    config.$inject = ['$routeProvider'];

    angular
        .module('app.routes')
        .config(config);

})();
