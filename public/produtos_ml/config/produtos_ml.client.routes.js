/**
 * Created by Vittorio on 17/05/2016.
 */
angular.module('produtosml').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/produtos', {
        templateUrl: '../produtos_ml/views/list-produtos.client.view.html'
    }).when('/produtos/create', {
        templateUrl: '../produtos_ml/views/create-produto.client.view.html'
    }).when('/produtos/:produtoId', {
        templateUrl: '../produtos_ml/views/view-produto.client.view.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);