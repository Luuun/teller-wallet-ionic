angular.module('generic-client.controllers.send', [])

    .controller('SendCtrl', function ($scope, $state, $window) {
        'use strict';

        $scope.data = {};
        $scope.currency = JSON.parse($window.localStorage.getItem('myCurrency'));

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.send_to', {
                    amount: form.amount.$viewValue,
                    memo: form.memo.$viewValue,
                    currency: $scope.currency
                });
            }
        };
    })

    .controller('SendToCtrl', function ($scope, $state, $stateParams, ContactsService) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.memo = $stateParams.memo;
        $scope.currency = $stateParams.currency;

        function onSuccess(contacts) {
            $scope.contacts = ContactsService.format(contacts)
        }

        function onError() {
            alert('Error!');
        }

        $scope.getValue = function () {
            ContactsService.list($scope.data.to, onSuccess, onError)
        };

        $scope.selectTo = function (selectTo) {
            $scope.data.to = selectTo;
        };

        $scope.clearSearch = function () {
            $scope.contacts = [];
            $scope.data.to = "";
        };

        $scope.submit = function (form) {
            if (form.$valid) {
                $state.go('app.send_confirm', {
                    amount: $scope.amount,
                    memo: $scope.memo,
                    to: form.to.$viewValue,
                    currency: $scope.currency
                });
            }
        };
    })

    .controller('SendConfirmCtrl', function ($scope, $state, $stateParams, $ionicLoading, $translate, Stellar, $ionicPopup, Conversions) {
        'use strict';
        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.memo = $stateParams.memo;
        $scope.to = $stateParams.to;
        $scope.currency = $stateParams.currency;

        if ($scope.memo === null) {
            $scope.memo = ''
        }

        $scope.submit = function (amount, memo, to, currency) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_SENDING")
            });

            Stellar.send(Conversions.to_cents(amount),
                         memo,
                         to,
                         currency.code).then(function (res) {
                if (res.status === 201) {
                    $ionicLoading.hide();
                    $state.go('app.send_success', {
                        amount: amount,
                        memo: memo,
                        to: to,
                        currency: currency
                    });
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.data.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };
    })

    .controller('SendSuccessCtrl', function ($scope, $state, $stateParams) {
        'use strict';

        $scope.data = {};
        $scope.amount = $stateParams.amount;
        $scope.memo = $stateParams.memo;
        $scope.to = $stateParams.to;
        $scope.currency = $stateParams.currency;
    });
