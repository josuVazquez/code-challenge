import { browser, logging } from 'protractor';
import { LoginPage } from './login.po';

describe('Login page', function() {
  let page: LoginPage;
  it('Login form success should be valid', async () => {  
    await page.getUsernameTextbox().sendKeys('user');  
    await page.getPasswordTextbox().sendKeys('pass');
    await page.getLoginButton().click();
    const alert = page.getAlert();
    const alertPresent = await browser.isElementPresent(alert);
    expect(alertPresent).toBe(false);
  });

  it('Login form error should be invalid', async () => {  
    await page.getUsernameTextbox().sendKeys('123');  
    await page.getPasswordTextbox().sendKeys('1234');  

    await page.getLoginButton().click(); 
    const alert = page.getAlert();
    const alertPresent = await browser.isElementPresent(alert);
    expect(alertPresent).toBe(true);
  });
  
  afterEach(async () => {
    // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //     level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
  
  beforeEach(() => {
    page = new LoginPage(); 
    // browser.executeScript("return window.localStorage.setItem('token', '');");
    page.navigateTo();  
  });
});
