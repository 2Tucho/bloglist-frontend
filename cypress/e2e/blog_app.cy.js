describe("Blog app", function () {
    beforeEach(function () {
        // cy.request("POST", "http://localhost:3003/api/testing/reset")
        // const user = {
        //     name: "Paco Paquez",
        //     username: "PPaco",
        //     password: "paquitronez"
        // }
        // cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.visit("http://localhost:5173")
    })

    it("Login form is shown", function () {
        cy.contains("log in").click()
        cy.contains("Username")
        cy.contains("Password")
        cy.contains("Log in")
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains("log in").click()
            cy.get("#username").type("PPaco")
            cy.get("#password").type("paquitronez")
            cy.get("#login-button").click()

            cy.contains("Paco Paquez logged in")
        })

        it('fails with wrong credentials', function () {
            cy.contains("log in").click()
            cy.get("#username").type("PPaco")
            cy.get("#password").type("nenenene")
            cy.get("#login-button").click()

            cy.contains("Wrong credentials")
        })
    })
})