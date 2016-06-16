/**
 * Created by Vittorio on 16/06/2016.
 */
angular.module('produtosml').directive('containerProdutos', function () {
    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'app/produtos_ml/views/partials/container-produto.client.partial.html'
    }
});