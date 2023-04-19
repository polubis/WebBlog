describe("Navigation bar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("should navigate to the articles' page", () => {
    cy.get(`#home-navigation-link-Articles`)
      .should("have.attr", "href", "/articles/")
      .click()
    cy.url().should("include", "/articles")
  })

  it("should navigate to the authors' page", () => {
    cy.get(`#home-navigation-link-Authors`)
      .should("have.attr", "href", "/authors/")
      .click()
    cy.url().should("include", "/authors")
  })

  it("should navigate to the courses' page", () => {
    cy.get(`#home-navigation-link-Courses`)
      .should("have.attr", "href", "/courses/")
      .click()
    cy.url().should("include", "/courses")
  })

  it("should navigate to the creator's page", () => {
    cy.get(`#home-navigation-link-Creator`)
      .should("have.attr", "href", "/blog-creator/")
      .click()
    cy.url().should("include", "/blog-creator")
  })
})
