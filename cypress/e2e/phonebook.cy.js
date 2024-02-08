describe('Phone book app', function () {
  it('Phone book can be opened', function () {
    cy.visit('http://localhost:3001')
    cy.contains('Phonebook')
    cy.contains('filter shown with')
    cy.contains('Add a new')
    cy.contains('name:')
    cy.contains('number:')
    cy.contains('add')
    cy.contains('Numbers')
  })
})