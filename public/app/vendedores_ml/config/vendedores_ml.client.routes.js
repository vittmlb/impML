/**
 * Created by Vittorio on 12/05/2016.
 */
angular.module('vendedoresml').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vendedores', {
        templateUrl: 'app/vendedores_ml/views/list-vendedores.client.view.html'
    }).when('/vendedores/create', {
        templateUrl: 'app/vendedores_ml/views/create-vendedor.client.view.html'
    }).when('/vendedores/:vendedorId', {
        templateUrl: 'app/vendedores_ml/views/view-vendedor.client.view.html'
    });
}]);