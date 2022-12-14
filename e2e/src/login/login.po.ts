import {  
    browser,  
    by,  
    element  
} from 'protractor';  
export class LoginPage {  
    navigateTo() {  
        return browser.get('/login');  
    }  

    getUsernameTextbox() {  
        return element(by.name('username'));  
    }  
    getPasswordTextbox() {  
        return element(by.name('password'));  
    }

    getLoginButton() {
        return element(by.name('loginButton'))
    }

    getAlert() {
       return element(by.css('.alert-dialog'));
    }
} 