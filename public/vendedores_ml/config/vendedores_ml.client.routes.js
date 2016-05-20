/**
 * Created by Vittorio on 12/05/2016.
 */
angular.module('vendedoresml').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vendedores', {
        templateUrl: '../vendedores_ml/views/list-vendedores.client.view.html'
    }).when('/vendedores/create', {
        templateUrl: '../vendedores_ml/views/create-vendedor.client.view.html'
    }).when('/vendedores/:vendedorId', {
        templateUrl: '../vendedores_ml/views/view-vendedor.client.view.html'
    });
}]);