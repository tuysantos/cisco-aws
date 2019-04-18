import { AppPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should fail to login', () => {
    page.navigateTo();
    let user = page.getUser();
    user.sendKeys('Jane');
    let pwd = page.getPassword();
    pwd.sendKeys('1234');
    let btnSubmit = page.getSubmitButton()
    btnSubmit.click();
    let div = page.getMessageDiv();
    browser.sleep(4000);
    expect(div.getText()).toEqual('Invalid user or password');
  });

  it('should login and display both list type of instances', () => {
    page.navigateTo();
    let user = page.getUser();
    user.sendKeys('admin');
    let pwd = page.getPassword();
    pwd.sendKeys('supersecret');
    let btnSubmit = page.getSubmitButton();
    btnSubmit.click();
    browser.sleep(3000);
    let lnk = page.getLinkViewToServerSide();
    lnk.click();
    let spTitle = page.getSpanTitle();
    browser.sleep(4000);
    expect(spTitle.getText()).toEqual('Dashboard - Server-side Pagination click here for client-side pagination');
  });

  it('should filter results', () => {
    page.navigateTo();
    let user = page.getUser();
    user.sendKeys('admin');
    let pwd = page.getPassword();
    pwd.sendKeys('supersecret');
    let btnSubmit = page.getSubmitButton();
    btnSubmit.click();
    browser.sleep(3000);

    let searchCriteria = page.getSearchCriteria();
    searchCriteria.sendKeys('running');
    
    element(by.cssContainingText('option', 'state')).click();

    let btnSearch = page.getBtnSearch()
    btnSearch.click();
    let nRows = page.getRows();
    browser.sleep(4000);
    expect(element.all(by.css("table tbody tr")).count()).toBeGreaterThan(0);
  });
});
