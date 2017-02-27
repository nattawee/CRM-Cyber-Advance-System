(function() {
    'use strict';

    // Clients controller
    angular
        .module('clients')
        .controller('ClientsController', ClientsController);

    ClientsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'clientResolve'];

    function ClientsController($scope, $state, $window, Authentication, client) {
        var vm = this;
        vm.authentication = Authentication;
        vm.client = client;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.setData = setData;
        vm.init = init;
        vm.addItem = addItem;
        vm.removeItem = removeItem;

        function setData() {
            vm.client.type = 'P';
            vm.client.relations = [{ rela: '' }];
        }

        function addItem() {
            vm.client.relations.push({ rela: '' });
        }

        function removeItem(index) {
            vm.client.relations.splice(index, 1);
        }

        function init() {
            vm.setData();

        }
        // Remove existing Client
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.client.$remove($state.go('clients.list'));
            }
        }

        // Save Client
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.clientForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.client._id) {
                vm.client.$update(successCallback, errorCallback);
            } else {
                vm.client.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('clients.view', {
                    clientId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }


        }
    }
} ());
