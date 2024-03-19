class loginPage {
  //   get logo() {
  //     return cy.get(".login_logo");
  //   }
  // }

  elements = {
    logo: () => cy.get(".login_logo"),
    usernameInput: () => cy.get('input[data-test="username"]'),
    passwordInput: () => cy.get('input[data-test="password"]'),
    loginButton: () => cy.get('input[data-test="login-button"]'),
  };
}

export default new loginPage();
