describe('user-search', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('h2').contains('Search for Users by username');
  });
});
