'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$http', '$filter', 'Admin', 'Authentication',
  function ($scope, $http, $filter, Admin, Authentication) {
    // Authentication.query(function (res) {
    //   $scope.authentication = res;
    // });

    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });

    $scope.tabs = [{
      renovate: 0,
      name: 'Guest',
      status: 'guest'
    },
    {
      renovate: 1,
      name: 'Viewer',
      status: 'viewer'
    },
    {
      renovate: 2,
      name: 'Preparer',
      status: 'dataentry'
    },
    {
      renovate: 3,
      name: 'Approver',
      status: 'approver'
    },
    {
      renovate: 4,
      name: 'Super User',
      status: 'superuser'
    },
    {
      renovate: 5,
      name: 'User Admin',
      status: 'admin'
    }];

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };


  }


]);
