describe("Breadcrumbs on desktop tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(400, 522)
  })

  // it("View breadcrumbs in the articles' page", () => {
  //   cy.get(".MobileNavigation__Expander-jzbZcb").click()
  //   cy.get("#home-navigation-mobile-link-Articles").click()
  //   cy.url().should("include", "articles")
  //   cy.get(".Grid-fPzpTg > :nth-child(1) > [href]").click()
  //   cy.get(".Breadcrumbs__Container-eJMSmD > :nth-child(2) > a").click()
  //   cy.url().should("include", "articles")
  //   /*Add for each article*/
  // })

  // it("View breadcrumbs in the courses' page", () => {
  //   cy.get(".MobileNavigation__Expander-jzbZcb").click()
  //   cy.get("#home-navigation-mobile-link-Courses").click()
  //   cy.url().should("include", "courses")
  //   cy.get(":nth-child(1) > a > button").eq(0).click()
  //   cy.get(".Breadcrumbs__Container-eJMSmD > :nth-child(2) > a").click()
  //   cy.url().should("include", "courses")
  //   /*Add for each course*/
  // })

  // it("View breadcrumbs in the lessons", () => {
  //   cy.get(".MobileNavigation__Expander-jzbZcb").click()
  //   cy.get("#home-navigation-mobile-link-Courses").click()
  //   cy.url().should("include", "courses")
  //   cy.get(":nth-child(1) > a > button").eq(0).click()
  //   cy.get("header > [href] > button").eq(1).click()
  //   /*Add for each lesson for each lesson*/
  // })
})
