/**
 * Created by Vittorio on 12/05/2016.
 */

var mainAppModuleName = 'impml';
var mainAppModule = angular.module('impml', [
    'ngResource',
    'ngRoute',
    'produtosml',
    'vendedoresml',
    'angularUtils.directives.dirPagination',
    'ngToast',
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ngFileUpload',
    'angular-flot',
    'slick'
]);

mainAppModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

if(window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainAppModuleName]);
});