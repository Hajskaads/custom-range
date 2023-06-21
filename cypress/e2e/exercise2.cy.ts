describe("Exercise2", () => {
  beforeEach(() => {
    cy.visit("/exercise2");
  });

  it("should display the min range label", () => {
    cy.contains("1.99 €");
  });
  it("should display the max range label", () => {
    cy.contains("70.99 €");
  });
});
