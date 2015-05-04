(function () {
    'use strict';

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/static/admin/app/main/main.html',
            controller: 'MainController',
            title: 'Home | Yakin Around'
        })
        .when('/route', {
            templateUrl: '/static/admin/app/route/route-list.html',
            controller: 'RouteListController',
            title: 'Route | Yakin Around'
        })
        .when('/route/new', {
            templateUrl: '/static/admin/app/route/route-new.html',
            controller: 'RouteNewController',
            title: 'Route | Yakin Around'
        })
        .when('/route/:id/edit', {
            templateUrl: '/static/admin/app/route/route-edit.html',
            controller: 'RouteEditController',
            title: 'Route | Yakin Around'
        })
        .otherwise('/');
    }

    config.$inject = ['$routeProvider'];

    angular
        .module('app.routes')
        .config(config);

})();
