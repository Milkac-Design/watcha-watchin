describe('Check out other Users movie list', () => {
  it('Opens Users movie list', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=username]').type('mario');
    cy.get('[data-cy=password]').type('1234');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=mymovies]').click();
    cy.get('[data-cy=searchMovieInput]').type('inception');
    cy.get('[data-cy=searchMovieButton]').click();
    cy.get('[data-cy=rate5]').click();
    cy.get('[data-cy=review]').type('dream on, dream on');
    cy.get('[data-cy=addMovie]').click();
    cy.get(':nth-child(3) > .deleteButtonStyle').click();
  });
});