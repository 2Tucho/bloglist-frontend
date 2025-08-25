import { Buttons } from "@testing-library/user-event/dist/cjs/system/pointer/buttons.js"

describe("Blog app", function() {
  beforeEach(function() {
    cy.visit("http://localhost:5173")
  })

  it("Login form is shown", function() {
    cy.contains("log in").click()
    cy.contains("Username")
    cy.contains("Password")
    cy.contains("Log in")
  })
})