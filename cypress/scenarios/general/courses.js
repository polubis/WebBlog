describe("Courses' page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("Starting courses works as expected", () => {
    cy.get("#home-navigation-link-Courses").click()
    cy.url().should("include", "courses")
    cy.get(":nth-child(1) > a > button").eq(0).click()
    cy.get("header > [href] > button").eq(1).click()
    /*Add for each course*/
  })

  it("Right navigation with chapters' titles works as expected", () => {
    cy.get("#home-navigation-link-Courses").click()
    cy.url().should("include", "courses")
    cy.get(":nth-child(1) > a > button").eq(0).click()
    cy.get("header > [href] > button").eq(1).click()
    cy.get(":nth-child(2) > a > .Text__M-gySkuI").click()
    cy.get(":nth-child(3) > a > .Text__M-gySkuI").click()
    cy.get(":nth-child(4) > a > .Text__M-gySkuI").click()
    cy.get(":nth-child(5) > a > .Text__M-gySkuI").click()
    /*Add loop*/
  })
})
