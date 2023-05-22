describe("Main page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  // it('"Check blog" button moves to articles page', () => {
  //   cy.get(".check-blog-button").click()
  //   cy.location("pathname").should("eq", "/articles/")
  // })

  // it("Info about articles' count in stats section moves to articles' page", () => {
  //   cy.get(".statsSectionContainer a")
  //     .first("a")
  //     .should("have.attr", "href", "/articles/")
  //     .then(firstElement => {
  //       cy.wrap(firstElement).click()
  //     })
  //   cy.wait(4000)
  //   cy.location("pathname").should("eq", "/articles/")
  // })

  // it("Info about authors' count in stats section moves to articles' page", () => {
  //   cy.get(".statsSectionContainer a")
  //     .eq(1)
  //     .should("have.attr", "href", "/authors/")
  //     .then(secondElement => {
  //       cy.wrap(secondElement).click()
  //     })
  //   cy.wait(4000)
  //   cy.location("pathname").should("eq", "/authors/")
  // })

  // it("Info about courses' count in stats section moves to articles' page", () => {
  //   cy.get(".statsSectionContainer a")
  //     .eq(2)
  //     .should("have.attr", "href", "/courses/")
  //     .then(thirdElement => {
  //       cy.wrap(thirdElement).click()
  //     })
  //   cy.wait(4000)
  //   cy.location("pathname").should("eq", "/courses/")
  // })

  // it('"Write your first article" button moves to creator page', () => {
  //   cy.get(".write-article-button").click()
  //   cy.location("pathname").should("eq", "/blog-creator/")
  // })

  // it("The first timeline links moves to the latest article", () => {
  //   cy.get(".timeline-group-item")
  //     .first("a")
  //     .then(firstElement => {
  //       cy.wrap(firstElement).click()
  //       cy.wait(4000)
  //       cy.go("back")
  //     })
  // })

  // it("The last timeline links moves to the oldest article", () => {
  //   cy.get(".timeline-group-item")
  //     .last("a")
  //     .then(firstElement => {
  //       cy.wrap(firstElement).click()
  //       cy.wait(4000)
  //       cy.go("back")
  //     })
  // })

  // it('Link "this form" on "about us" section in the footer opens contact form', () => {
  //   cy.get(".form-button").click()
  //   cy.get('[type="email"]').type("example@mail.com")
  //   cy.get("textarea").type("Some text")
  //   cy.get('[type="submit"]').contains("SEND").click()
  //   cy.get(".ok").should(
  //     "have.text",
  //     "We have your submission! We will get back to you within 2 days"
  //   )
  //   cy.get('[type="submit"]').contains("CLOSE").click()
  // })

  // it("The first image in recommended articles in footer moves to a relevant article", () => {
  //   cy.get(".recommendedArticlesLink")
  //     .first("a")
  //     .then(firstElement => {
  //       cy.wrap(firstElement).click()
  //       cy.wait(4000)
  //       cy.go("back")
  //     })
  // })

  // it("The last image in recommended articles in footer moves to a relevant article", () => {
  //   cy.get(".recommendedArticlesLink")
  //     .last("a")
  //     .then(firstElement => {
  //       cy.wrap(firstElement).click()
  //       cy.wait(4000)
  //       cy.go("back")
  //     })
  // })

  // it("LinkedIn logo moves to LinkedIn profile", () => {
  //   cy.get(
  //     '.contentFooter a[href*="https://www.linkedin.com/company/greenon-software/"]'
  //   )
  //     .then($a => {
  //       expect($a).to.have.attr("target", "_blank")
  //       $a.attr("target", "_self")
  //     })
  //     .click()
  //   cy.wait(4000)
  //   cy.url().should("contain", "linkedin")
  // })

  // it("Discord logo moves to Discord channel", () => {
  //   cy.get('.contentFooter a[title*="GreenOn Software Discord channel"]')
  //     .then($a => {
  //       expect($a).to.have.attr("target", "_blank")
  //       $a.attr("target", "_self")
  //     })
  //     .click()
  //   cy.wait(4000)
  //   cy.url().should("contain", "discord")
  // })

  it("Facebook logo moves to Facebook group", () => {
    cy.get('.contentFooter a[title*="GreenOn Software Facebook profile"]')
      .then($a => {
        expect($a).to.have.attr("target", "_blank")
        $a.attr("target", "_self")
      })
      .click()
    cy.wait(4000)
    cy.url().should("contain", "facebook")
  })
})
