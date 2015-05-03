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
            templateUrl: '/static/admin/app/route/route.html',
            controller: 'RouteController',
            title: 'Route | Yakin Around'
        })
        .otherwise('/');
    }

    config.$inject = ['$routeProvider'];

    angular
        .module('app.routes')
        .config(config);

})();
