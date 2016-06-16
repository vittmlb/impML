/**
 * Created by Vittorio on 17/05/2016.
 */
angular.module('produtosml').controller('ListProdutosController', ['$scope', '$routeParams', '$location', 'ProdutosML', 'ngToast',
    function($scope, $routeParams, $location, ProdutosML, ngToast) {

        $scope.sortkey = 'media.venda';
        $scope.reverse = true;
        
        $scope.reverseSort = function() {
            $scope.reverse = !$scope.reverse;
        };
        
        $scope.sort = function(keyname) {
            $scope.sortkey = keyname;
        };
        
        $scope.create = function() {
            var produto = new ProdutosML({
                produtoId: this.produtoId
            });
            produto.$save(function (response) {
                $location.path('/produtos/' + response._id);
            }, function(errorResponse) {
                ngToast.danger(errorResponse.data.message);
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.remove = function(produto) {
            var result = confirm('Você deseja realmente remover este produto?');
            if(result) {
                if(produto) {
                    produto.$remove(function () {
                        for (var i in $scope.produtos) {
                            if($scope.produtos[i] === produto) {
                                $scope.produtos.splice(i, 1);
                            }
                        }
                    });
                } else {
                    $scope.produto.$remove(function () {
                        $location.path('#!/produtos');
                    });
                }
            }
        };
        $scope.find = function() {
            $scope.produtos = ProdutosML.query();
            $scope.filteredProdutos = $scope.produtos;
        };
        $scope.findOne = function() {
            $scope.produto = ProdutosML.get({
                produtoId: $routeParams.produtoId
            });
        };
        $scope.atualizarVenda = function(item) {
            item.$update(function () {
                $location.path('/produtos');
            }, function(errorResponse) {
                ngToast.danger(errorResponse.data.message);
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.atualizarTodasVendas = function() {
            $scope.produtos.forEach(function(prod) {
                prod.$update(function () {
                    ngToast.create('Produto atualizado com sucesso !!!');
                }, function(errorResponse) {
                    ngToast.danger(errorResponse.data.message);
                    $scope.error = errorResponse.data.message;
                });
            });
        };

        $scope.numItemsPerPage = 30;
        
    }
]);