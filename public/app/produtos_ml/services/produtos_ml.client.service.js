/**
 * Created by Vittorio on 17/05/2016.
 */
angular.module('produtosml').factory('ProdutosML', ['$resource', function ($resource) {
    return $resource('/api/produtos_ml/:produtoId', {
        produtoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);