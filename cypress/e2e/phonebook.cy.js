describe('Phone book app', function () {
  beforeEach(function() {
    cy.visit('http://localhost:3001')
  })
  it('Front page can be opened', function () {
    cy.contains('Phonebook')
    cy.contains('filter shown with')
    cy.contains('Add a new')
    cy.contains('name:')
    cy.contains('number:')
    cy.contains('add')
    cy.contains('Numbers')
  })

  it('New person can be added to phone book', function() {
    // Check first that its not existing already
    cy.contains('Cypress TestUser').should('not.exist')
    cy.contains('div', 'name:').find('input').type('Cypress TestUser')
    cy.contains('div', 'number:').find('input').type('040-1231233123123')
    cy.contains('div', 'add').find('button').click()
    cy.contains('Cypress TestUser 040-1231233123123')
    // Check that appropriate message is also shown
    cy.contains('Added Cypress TestUser')
  })

  it('Filtering works', function() {
    // Check that added person exists
    cy.contains('Cypress TestUser 040-1231233123123')
    cy.contains('div', 'filter shown with').find('input').type('Cypress Test user')
    cy.contains('Cypress TestUser').should('not.exist')
    cy.contains('div', 'filter shown with').find('input').clear()
    cy.contains('div', 'filter shown with').find('input').type('Cypress Test')
    cy.contains('Cypress TestUser 040-1231233123123')
  })

  it('If person exists, its found and number changed', function() {
    cy.contains('Cypress TestUser 040-1231233123123')
    cy.contains('div', 'name:').find('input').type('Cypress TestUser')
    cy.contains('div', 'number:').find('input').type('040-1111111111')
    cy.contains('div', 'add').find('button').click()
    cy.contains('Cypress TestUser 040-1231233123123').should('not.exist')
    cy.contains('Cypress TestUser 040-1111111111')
    // Check that appropriate message is also shown
    cy.contains('Changed number of Cypress TestUser')
  })

  it('Existing person can be deleted', function() {
    cy.contains('Cypress TestUser 040-1111111111')
    cy.contains('Cypress TestUser 040-1111111111').find('button', 'delete').click()
    cy.contains('Cypress TestUser 040-1111111111').should('not.exist')
    // Check that appropriate message is also shown
    cy.contains('Removed Cypress TestUser from phonebook')
  })
})