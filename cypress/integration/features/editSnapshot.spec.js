context('Edit snapshot', () => {
  beforeEach(() => {
    cy.task('createSnapshot', {
      firstName: 'Phineas',
      lastName: 'Flynn',
      queryFirstName: 'phineas',
      queryLastName: 'flynn',
      assets: [],
      createdBy: 'Dat',
      systemIds: ['wub'],
      created: '2019-06-09T15:46:47.857Z',
      dob: '2000-06-09',
      vulnerabilities: [],
      id: '1'
    });
    cy.setHackneyCookie(true);
  });

  afterEach(() => {
    cy.task('deleteSnapshot', '1');
  });

  describe('Edit snapshot', () => {
    it('Displays editable snapshot if there are no assets, vulnerabilites and notes added', () => {
      cy.visit(`/snapshots/1`);
      cy.get('h1').should('contain', 'Phineas Flynn');

      cy.get('h2').should('contain', 'Things to explore with the resident');

      cy.get('[data-testid=accordion-item]')
        .should('contain', 'Financial stability')
        .and('contain', 'Physical health')
        .and('contain', 'Mental health')
        .and('contain', 'Behaviour and engagement')
        .and('contain', 'Relationships and support network')
        .and('contain', 'Life events and transitions');

      cy.get('[data-testid=notes]').should('exist');
      cy.get('[data-testid=notes] > textarea').should(
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
      cy.visit(`/snapshots/1`);
      cy.get('[data-testid=accordion-item]').eq(0);
      cy.get(
        '[data-testid=financial-stability-v-rent-arrears-checkbox]'
      ).click();

      cy.get('[data-testid=accordion-item]').eq(4);
      cy.get(
        '[data-testid=behaviour-and-engagement-a-organised-and-or-engaged-checkbox]'
      ).click();

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
      cy.task('createSnapshot', {
        firstName: 'Phineas',
        lastName: 'Flynn',
        queryFirstName: 'phineas',
        queryLastName: 'flynn',
        assets: [],
        createdBy: 'Dat',
        systemIds: ['wub'],
        created: '2019-06-09T15:46:47.857Z',
        dob: '2000-06-09',
        vulnerabilities: [{ name: 'yup', data: [] }],
        id: '2'
      });
      cy.visit(`/snapshots/2`);

      cy.get('[data-testid=vulnerabilities-summary]')
        .should('contain', 'Vulnerabilities')
        .and('contain', 'yup');

      cy.task('deleteSnapshot', '2');
    });
  });

  describe('Text input', () => {
    it('Adds text input values to the active case vulnerability', () => {
      const baseServicesSelector =
        'support-needs-v-active-case-with-other-services-\\(e\\.g\\.-adult-social-care\\,-childrens\\)';
      cy.visit(`/snapshots/1`);
      cy.get('[data-testid=accordion-item]')
        .eq(3)
        .click();
      cy.get(`#${baseServicesSelector}`).click();

      cy.get(`#${baseServicesSelector}-service-i`)
        .click()
        .type('sample');

      cy.get(`#${baseServicesSelector}-contact-name-i`)
        .click()
        .type('wubwub');

      cy.get(`#${baseServicesSelector}-phone-number-i`)
        .click()
        .type('0700000000000');

      cy.get('[data-testid=finish-and-save-button]').click();

      cy.get('[data-testid=vulnerabilities-summary]')
        .should('contain', 'Vulnerabilities')
        .and('contain', 'Service: sample')
        .and('contain', 'Contact name: wubwub')
        .and('contain', 'Phone number: 0700000000000');
    });

    it('Adds text input values to the Other vulnerabilities and Other assets', () => {
      const otherVulnerabilityInputSelector =
        'financial-stability-v-other-other-vulnerabilities-i';
      const otherAssetInputSelector =
        'financial-stability-a-other-other-assets-i';
      cy.visit(`/snapshots/1`);
      cy.get('[data-testid=accordion-item]')
        .eq(0)
        .click();
      cy.get('[data-testid=financial-stability-v-other-checkbox]').click();
      cy.get(`#${otherVulnerabilityInputSelector}`).type('new vulnerability');
      cy.get('[data-testid=accordion-item]')
        .eq(0)
        .click();
      cy.get('[data-testid=financial-stability-a-other-checkbox]').click();
      cy.get(`#${otherAssetInputSelector}`).type('new asset');

      cy.get('[data-testid=finish-and-save-button]').click();
      cy.get('[data-testid=vulnerabilities-summary]')
        .should('contain', 'Vulnerabilities')
        .and('contain', 'new vulnerability');
      cy.get('[data-testid=assets-summary]')
        .should('contain', 'Assets')
        .and('contain', 'new asset');
    });
  });

  describe('Back button', () => {
    it('Sends the user back to Single View', () => {
      cy.visit(`/snapshots/1`);
      cy.get('[data-testid=back-link-test]')
        .should('contain', 'Back to Single View')
        .and(
          'have.attr',
          'href',
          'https://staging-singleview.hackney.gov.uk/customers/wub/view'
        );
    });
  });
});
