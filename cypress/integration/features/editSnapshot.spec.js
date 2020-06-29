context('Edit snapshot', () => {
  before(() => {
    cy.task('createSnapshot', {
      firstName: 'Phineas',
      lastName: 'Flynn',
      assets: [],
      createdBy: 'Dat',
      systemIds: [],
      created: '2019-06-09T15:46:47.857Z',
      dob: '2000-06-09',
      vulnerabilities: [],
      id: '1'
    });

    cy.setHackneyCookie(true);
  });

  after(() => {
    cy.task('deleteSnapshot', '1');
  });

  describe('Edit snapshot', () => {
    it('Displays editable snapshot if there are no assets, vulnerabilites and notes added', () => {
      cy.visit(`http://localhost:3000/snapshots/1`);

      cy.get('h1').should('contain', 'Phineas Flynn');

      cy.get('h2').should('contain', 'Things to explore with the resident');

      cy.get('[data-testid=accordion-item]')
        .should('contain', 'Financial stability')
        .and('contain', 'Physical health')
        .and('contain', 'Mental health')
        .and('contain', 'Behaviour and engagement')
        .and('contain', 'Relationships and support network')
        .and('contain', 'Life events and transitions');

      cy.get('[data-testid=notes-input]').should(
        'contain',
        "Any other notes you'd like to add?"
      );
      cy.get('[data-testid=notes-input] > textarea').should(
        'have.attr',
        'id',
        'notes'
      );

      cy.get('[data-testid=finish-and-save-button]').should(
        'contain',
        'Finish & save'
      );
    });

    it('Adds vulnerabilities, assets and notes', () => {
      cy.visit(`http://localhost:3000/snapshots/1`);

      cy.get('[data-testid=accordion-item]')
        .eq(0)
        .click();
      cy.get('[data-testid=financial-stability-v-0-checkbox]').click();

      cy.get('[data-testid=accordion-item]')
        .eq(4)
        .click();
      cy.get('[data-testid=behaviour-and-engagement-a-1-checkbox]').click();

      cy.get('textarea')
        .click()
        .type('Note');

      cy.get('[data-testid=finish-and-save-button]').click();

      cy.get('[data-testid=vulnerabilities-summary]')
        .should('contain', 'Vulnerabilities')
        .and('contain', 'Rent arrears');

      cy.get('[data-testid=assets-summary]')
        .should('contain', 'Assets')
        .and('contain', 'Organised and/or engaged');

      cy.get('[data-testid=notes-summary]')
        .should('contain', 'Notes')
        .and('contain', 'Note');
    });

    it('Persists the snapshot', () => {
      cy.visit(`http://localhost:3000/snapshots/1`);

      cy.get('[data-testid=vulnerabilities-summary]')
        .should('contain', 'Vulnerabilities')
        .and('contain', 'Rent arrears');

      cy.get('[data-testid=assets-summary]')
        .should('contain', 'Assets')
        .and('contain', 'Organised and/or engaged');

      cy.get('[data-testid=notes-summary]')
        .should('contain', 'Notes')
        .and('contain', 'Note');
    });
  });
});
