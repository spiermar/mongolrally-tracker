(function () {
    'use strict';

    /**
    * @name config
    * @desc 
    */
    function config(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            v: '3.17',
            libraries: 'drawing'
        });
    }

    config.$inject = ['uiGmapGoogleMapApiProvider'];

    angular
        .module('app.map')
        .config(config);

})();
