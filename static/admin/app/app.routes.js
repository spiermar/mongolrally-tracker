(function () {
    'use strict';

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($routeProvider) {
        $routeProvider.when('/tracker', {
            templateUrl: '/admin/app/tracker/tracker.html',
            controller: 'TrackerController',
            title: 'Yakin Around'
        })
        .when('/flickr', {
            templateUrl: '/admin/app/flickr/flickr.html',
            controller: 'FlickrController',
            title: 'Yakin Around'
        })
        .when('/instagram', {
            templateUrl: '/admin/app/instagram/instagram.html',
            controller: 'InstagramController',
            title: 'Yakin Around'
        })
        .when('/point/:type', {
            templateUrl: '/admin/app/point/point-list.html',
            controller: 'ListPointController',
            title: 'Yakin Around'
        })
        .when('/point/:type/new', {
            templateUrl: '/admin/app/point/point-new.html',
            controller: 'NewPointController',
            title: 'Yakin Around'
        })
        .when('/point/:type/:id/edit', {
            templateUrl: '/admin/app/point/point-edit.html',
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
