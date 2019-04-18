import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.driver.get('http://localhost:4200/');
  }

  getUser() {
    return element(by.id('username'));
  }

  getPassword() {
    return element(by.id('password'));
  }

  getSubmitButton(){
    return element(by.id('btnSubmit'));
  }

  getMessageDiv(){
    return element(by.id('divMessage'));
  }
  
  getLinkViewToServerSide(){
    return element(by.id('lnkServerView'));
  }
  
  getSpanTitle() {
    return element(by.id('spnTitle'));
  }

  getSearchCriteria() {
    return element(by.id('searchCriteria'));
  }
  getSelectedOption() {
    return element(by.id('select-type-basic'));
  }

  getBtnSearch() {
    return element(by.id('btnSearch'));
  }

  getRows() {
    return element(by.id('listResult'));
  }
}

//listResult
// btnReset