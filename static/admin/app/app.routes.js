(function () {
    'use strict';

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($routeProvider) {
        $routeProvider.when('/route', {
            templateUrl: '/static/admin/app/route/route.html',
            controller: 'RouteController',
            title: 'Route | Yakin Around'
        })
        .otherwise('/route');
    }

    config.$inject = ['$routeProvider'];

    angular
        .module('app.routes')
        .config(config);

})();
