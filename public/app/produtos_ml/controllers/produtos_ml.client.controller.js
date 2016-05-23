/**
 * Created by Vittorio on 17/05/2016.
 */
angular.module('produtosml').controller('ProdutosController', ['$scope', '$routeParams', '$location', 'ProdutosML',
    function($scope, $routeParams, $location, ProdutosML) {
        $scope.create = function() {
            var produto = new ProdutosML({
                produtoId: this.produtoId
            });
            produto.$save(function (response) {
                $location.path('/produtos/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data;
            });
        };
        $scope.find = function() {
            $scope.produtos = ProdutosML.query();
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
                $scope.error = errorResponse;
            });
        };
        $scope.atualizarTodasVendas = function() {
            $scope.produtos.forEach(function(prod) {
                prod.$update(function () {
                    alert('Success');
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message
                });
            });
        };
    }
]);

angular.module('produtosml').controller('ListProdutosController', ['$scope', '$routeParams', '$location', 'ProdutosML',
    function($scope, $routeParams, $location, ProdutosML) {
        $scope.create = function() {
            var produto = new ProdutosML({
                produtoId: this.produtoId
            });
            produto.$save(function (response) {
                $location.path('/produtos/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data;
            });
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
                $scope.error = errorResponse;
            });
        };
        $scope.atualizarTodasVendas = function() {
            $scope.produtos.forEach(function(prod) {
                prod.$update(function () {
                    alert('Success');
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message
                });
            });
        };

        $scope.filteredProdutos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.mexSize = 5;

        // $scope.$watch('currentPage + numPerPage', updateFilteredItems);
        //
        // function updateFilteredItems() {
        //     var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        //     var end = begin + $scope.numPerPage;
        //
        //     $scope.filteredProdutos = $scope.produtos.slice(begin, end);
        //
        // }


    }
]);