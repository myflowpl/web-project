describe('template spec', () => {
  it('passes', () => {

    function submit() {
      cy.dataCy('submit-btn').click();
    }

    cy.visit('http://localhost:4200')

    cy.get('header span').first().contains('My App');

    cy.dataCy('items-link').click();

    cy.url().should('contains', '/items');

    cy.dataCy('item-form').should('exist')

    cy.dataCy('invalid-error').should('not.exist');

    submit()

    cy.dataCy('invalid-error').should('exist');

    cy.dataCy('name-input').type('Pomidor');

    submit();

    cy.dataCy('invalid-error').should('not.exist');

    cy.get('app-text').should('exist').should('contain', 'Pomidor')

    cy.dataCy('type-select').select('map');

    cy.dataCy('name-input').clear().type('Pomidor{leftArrow}{leftArrow}dd{enter}');

    // submit();

    cy.get('app-map').should('exist').should('contain', 'Pomidddor')

  })
})
