import { browser } from 'protractor';
import { TransactionPage } from './transactions.po';
const axios = require('axios');

describe('Transaction page', function() {
  let page: TransactionPage;

  it('Transactions should appear', async () => {  
    const rows = await page.getRows();  
    expect(rows.length).toBe(15);
  });

  it('Transactions filtered', async () => {  
    await page.getInputFilter().sendKeys('tempor');
    await page.getFilterButton().click();
    const rows = await page.getRows();  
    expect(rows.length).toBe(1);
  });

  it('Transactions order', async () => {  
    await page.selectAscendant();
    await page.getFilterButton().click();
    const cell = page.getFirstCell();
    const text = await cell.getText();
    expect(+text).toBe(5038);
  });


  it('Should LogOut', async () => {  
    await page.getLogOutButton().click();
    const res = await browser.executeScript(`window.localStorage.getItem('token');`);
    expect(res).toBeFalsy();
  });

  beforeEach( async (done) => {
    page = new TransactionPage();
    const res = await auth();
    page.navigateTo(res.data.accessToken);
    done();
  });

});
function auth() {
  return axios.post('http://localhost:8080/token', { username: 'user', password: 'pass' });
}