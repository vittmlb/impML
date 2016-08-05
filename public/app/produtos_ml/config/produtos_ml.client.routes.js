/**
 * Created by Vittorio on 17/05/2016.
 */
angular.module('produtosml').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('produtos_create', {
                url: '/produtos/create',
                templateUrl: 'app/produtos_ml/views/create-produto.client.view.html',
                controller: 'ListProdutosController'
            })
            .state('produtos_list', {
                url: '/produtos',
                templateUrl: 'app/produtos_ml/views/list-produtos.client.view.html',
                controller: 'ListProdutosController'
            })
            .state('produtos_view', {
                url: '/produtos/:produtoId',
                templateUrl: 'app/produtos_ml/views/view-produto.client.view.html',
                controller: 'ListProdutosController'
            })
    }
]);