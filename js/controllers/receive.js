angular.module('generic-client.controllers.receive', [])

    .controller('ReceiveCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('ReceiveCtrl', function ($scope, $window, $state, PersonalDetails) {
        PersonalDetails.getUsername().then(function (res) {
            if (res.status === 200) {
                if ($window.localStorage.myAddress) {
                    $scope.myAddress = JSON.parse($window.localStorage.myAddress);
                }

                $scope.account = res.data.details.reference             
                var myAddress = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=stellar:' + $scope.account + '&choe=UTF-8';
                $scope.myAddress = myAddress;
            } else {
                $state.go('app.username');
            }
        }).catch(function (error) {
            $ionicPopup.alert({title: 'Authentication failed', template: error.message});
            $ionicLoading.hide();
        });        
    });