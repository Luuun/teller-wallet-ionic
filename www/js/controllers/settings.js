angular.module('generic-client.controllers.settings', [])

    .controller('SettingsCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PersonalDetailsCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, PersonalDetails) {
        'use strict';

        $scope.refreshData = function () {
            var getPersonalDetails = PersonalDetails.get();

            getPersonalDetails.success(
                function (res) {
                    $scope.data = {
                        "first_name": res.first_name,
                        "last_name": res.last_name,
                        "email_address": res.email,
                        "id_number": res.id_number,
                        "nationality": res.nationality
                    };
                }
            );

            getPersonalDetails.catch(function (error) {

            });
        };

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Saving Info...'
            });

            if (form.$valid) {

                PersonalDetails.create(form.first_name.$viewValue,
                    form.last_name.$viewValue,
                    form.email_address.$viewValue,
                    form.id_number.$viewValue,
                    form.nationality.$viewValue).then(function (res) {

                        if (res.status === 200) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                        $ionicLoading.hide();
                    });

                $scope.refreshData();
            }
        };
        $scope.refreshData();
    })

    .controller('MobileNumberCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {"mobile_number": "+27842490903"};

        $scope.submit = function (mobile_number) {
            $state.go('app.profile', {
                mobile_number: $scope.data.mobile_number
            });
        };
    })

    .controller('EmailAddressCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {"email_address": "helghardt@gmail.com"};

        $scope.submit = function (email_address) {
            $state.go('app.profile', {
                email_address: $scope.data.email_address
            });
        };
    })

    .controller('AddressCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, Address) {
        'use strict';

        $scope.refreshData = function () {
            var getAddress = Address.get();

            getAddress.success(
                function (res) {
                    $scope.data = {
                        "line_1": res.line_1,
                        "line_2": res.line_2,
                        "city": res.city,
                        "state_province": res.state_province,
                        "country": res.country,
                        "code": res.postal_code
                    };
                }
            );

            getAddress.catch(function (error) {

            });
        };

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Saving Address...'
            });

            if (form.$valid) {

                Address.create(form.line_1.$viewValue,
                    form.line_2.$viewValue,
                    form.city.$viewValue,
                    form.state_province.$viewValue,
                    form.country.$viewValue,
                    form.code.$viewValue).then(function (res) {

                        if (res.status === 200) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                        $ionicLoading.hide();
                    });

                $scope.refreshData();
            }
        };
        $scope.refreshData();
    })

    .controller('BankAccountsCtrl', function ($scope, $window, $ionicPopup, $ionicModal, $state, $ionicLoading, BankAccount) {
        'use strict';

        $scope.listData = function () {
            BankAccount.list().success(
                function (res) {
                    var items = [];

                    for (var i = 0; i < res.length; i++) {
                        items.push(res[i]);
                        console.log(res[i])
                    }

                    $scope.items = items;
                    $window.localStorage.setItem('myBankAccounts', JSON.stringify(items));
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.getData = function () {
            var getBankAccount = BankAccount.get(1);

            getBankAccount.success(
                function (res) {
                    $scope.data = {
                        "name": res.name,
                        "number": res.number,
                        "type": res.type,
                        "bank_name": res.bank_name,
                        "branch_code": res.branch_code,
                        "swift": res.swift,
                        "iban": res.iban,
                        "bic": res.bic
                    };
                }
            );

            getBankAccount.catch(function (error) {

            });
        };

        $scope.submit = function (form) {
            $ionicLoading.show({
                template: 'Adding Bank Account...'
            });

            if (form.$valid) {

                BankAccount.create(form.name.$viewValue,
                    form.number.$viewValue,
                    form.type.$viewValue,
                    form.bank_name.$viewValue,
                    form.branch_code.$viewValue,
                    form.swift.$viewValue,
                    form.iban.$viewValue,
                    form.bic.$viewValue).then(function (res) {

                        if (res.status === 200) {
                            $ionicLoading.hide();
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }
                    }).catch(function (error) {
                        $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                        $ionicLoading.hide();
                    });

                $scope.getData();
            }
        };

        $scope.getData();
        $scope.listData();
    })

    .controller('AddBankAccountCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};

        $scope.submit = function (bank_name, branch_name, account_number, account_holder_name, account_type) {
            $state.go('app.list_bank_accounts', {});
        };
    })

    .controller('SecurityCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('ResetPasswordCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('TwoFactorCtrl', function ($scope) {
        'use strict';
        $scope.data = {};
    })

    .controller('PinCtrl', function ($scope) {
        'use strict';
        $scope.pinList = [
            {text: "Opening app", checked: true},
            {text: "Sending or requesting money", checked: true},
            {text: "Reset password", checked: true},
            {text: "Deposting or withdrawing", checked: true}
        ];
    });

