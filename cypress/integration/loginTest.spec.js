
describe('Login test', () => {
  it('Log in', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=username]').type('mario');
    cy.get('[data-cy=password]').type('1234');
    cy.get('[data-cy=submit]').click();
  });
});
