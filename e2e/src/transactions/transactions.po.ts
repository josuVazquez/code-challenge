import {  
    browser,  
    by,  
    element  
} from 'protractor';  
export class TransactionPage {  

    navigateTo(token: string) {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.executeScript(`window.localStorage.setItem('token', '${token}');`);
        browser.get('/transactions');  
        return;
    } 

    getLogOutButton() {
        return element(by.id('button--logout'));  
    }

    getFirstCell() {
        return element(by.css('.mat-cell')); 
    }

    getFirstRow() {
        return element(by.css('.mat-row')); 
    }

    getRows() {
        return element.all(by.css('.mat-row')); 
    }

    getInputFilter() {
        return element(by.name('description')); 
    }
    
    async selectAscendant() {
        await element(by.name('sort')).click();
        await element(by.css(`.mat-option[value="asc"]`)).click();
    }

    getSelectInput() {
        return element(by.name('sort')); 
    }

    getFilterButton() {
        return element(by.name('filterButton')); 
    }

} 