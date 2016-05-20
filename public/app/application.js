/**
 * Created by Vittorio on 12/05/2016.
 */

var mainAppModuleName = 'impML';
var mainAppModule = angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'produtosml']);

mainAppModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

if(window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainAppModuleName]);
});