(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
    function SignupController(MenuService) {
        let signup = this;
        signup.firstname = '';
        signup.lastname = '';
        signup.email = '';
        signup.phone = '';
        signup.dish = '';
        signup.showError = false;
        signup.showMessage = false;

        signup.submit = function(form) {
            signup.showError = false;
            signup.showMessage = false;
            if(form.$invalid) {
                console.log('The form is not valid');
                return;
            }
            MenuService.getMenuItem()
                .then(response => {
                    let favoriteItemDetails = {};
                    for (const i in response.data.menu_items) {
                      if (response.data.menu_items[i].short_name === signup.dish ) {
                         favoriteItemDetails = response.data.menu_items[i];
                       }
                    }
                    if(Object.keys(favoriteItemDetails).length === 0 && favoriteItemDetails.constructor === Object){
                      signup.showError = true;
                    }else{
                      signup.showError = false;
                      MenuService.setUser({
                          firstName: signup.firstname,
                          lastName: signup.lastname,
                          email: signup.email,
                          phone: signup.phone,
                          dish: signup.dish,
                          favoriteItemDetails: favoriteItemDetails
                      });
                      signup.showMessage = true;
                    }
                })
                .catch(error => {
                    signup.showError = true;
                })
        }
    }


})();
