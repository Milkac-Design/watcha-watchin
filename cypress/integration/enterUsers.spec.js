describe('Check out other Users movie list', () => {
  it('Opens Users movie list', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=username]').type('mario');
    cy.get('[data-cy=password]').type('1234');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=users]').click();
    cy.get(':nth-child(1)>a').click();
  });
});
