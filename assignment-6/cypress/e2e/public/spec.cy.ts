/// <reference types="cypress"/>

describe("Visit Parcel Express", () => {
  it("Goes to Home Page", () => {
    cy.visit("http://localhost:5173/");
  });
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Has a Welcome Message", () => {
    cy.contains("Hello there");
  });
  it("Goes To About Page", () => {
    cy.get("#dropdown-menu").click();
    cy.get("#about").click();
    cy.url().should("include", "/about");
    cy.contains("About Us");
  });
  it("Goes To Contact Page", () => {
    cy.get("#dropdown-menu").click();
    cy.get("#contact").click();
    cy.url().should("include", "/contact");
    cy.contains("Contact Us");
    //fill out form
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("jane.m.pierce@example-pet-store.com");
    cy.get('textarea[name="message"]').type(
      "Hello, I have a question about your services"
    );
    // Submit form
  cy.get('form').submit()

  // Assert SweetAlert2 popup appears
  cy.get('.swal2-popup').should('be.visible')
  cy.get('.swal2-title').should('have.text', 'Success')
  cy.get('.swal2-html-container').should('contain.text', 'Message sent successfully')

  // Confirm and wait for it to close
  cy.get('.swal2-confirm').click()
  cy.get('.swal2-popup').should('not.exist')

  // Now assert navigation
  cy.url().should('eq', 'http://localhost:5173/')
  });
  it('Goes to Search Page', () => {
    cy.get("search-link").click();
    cy.url().should("include", "/search");
    cy.contains("Search");
  })
});
