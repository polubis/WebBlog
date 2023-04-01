describe("Navigation bar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/")
    cy.viewport(1650, 795)
  })

  it("Navigation bar at top works as expected", () => {
    cy.get(`[data-id="HomeNavigationJoinLink"]`).should(
      "have.attr",
      "href",
      "/authors/"
    )
  })
})
