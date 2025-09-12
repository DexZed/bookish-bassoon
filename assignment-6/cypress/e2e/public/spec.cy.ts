/// <reference types="cypress"/>


describe('Visit Parcel Express', () => {
  it('Goes to Home Page', () => {
    cy.visit('http://localhost:5173/')
  })
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('Has a Welcome Message', () => {
    cy.contains('Hello there')
  })
  it("Goes To About Page",()=>{
    cy.get('#dropdown-menu').click()
    cy.get('#about').click()
    cy.url().should('include','/about')
    cy.contains('About Us')
  })
  it("Goes To Contact Page",()=>{
    cy.get('#dropdown-menu').click()
    cy.get('#contact').click()
    cy.url().should('include','/contact')
    cy.contains('Contact Us')
  })
  
})