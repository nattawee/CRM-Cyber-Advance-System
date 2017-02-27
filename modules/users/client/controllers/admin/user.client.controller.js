'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve', 'BranchesService', 'DepartmentsService', '$http', 'RolesService',
    function ($scope, $state, Authentication, userResolve, BranchesService, DepartmentsService, $http, RolesService) {
        $scope.authentication = Authentication;
        $scope.user = userResolve;
        $scope.roles = RolesService.query();
        BranchesService.query(function (ret) {
            $scope.branchesService = ret;
        });
        DepartmentsService.query(function (resp) {
            $scope.departmentsService = resp;
        });

        $scope.remove = function (user) {
            if (confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    user.$remove();

                    $scope.users.splice($scope.users.indexOf(user), 1);
                } else {
                    $scope.user.$remove(function () {
                        $state.go('admin.users');
                    });
                }
            }
        };

        $scope.update = function (isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

            var user = $scope.user;

            user.$update(function () {
                $state.go('admin.users');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.signup = function () {
            $http.post('/api/auth/createuser', $scope.credentials).success(function (response) {
                // If successful we assign the response to the global user model
                // $scope.authentication.user = response;

                // And redirect to the previous or home page
                $state.go('admin.users');
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
