export class Slider {

// This method sets minimum value rating and checks its setting value
  setMinRating(targetMinValue) {
    const step = 0.5;

    cy.get('[data-test="slider"] .ngx-slider-pointer-min').then(
      ($currentObject) => {
        const currentValue = parseInt($currentObject.attr("aria-valuetext"));

        if (currentValue < targetMinValue) {
          const stepRepeat = (targetMinValue - currentValue) / step;

          cy.wrap($currentObject).type("{rightarrow}".repeat(stepRepeat));
        } else {
          if (currentValue > targetMinValue) {
            const stepRepeat = (currentValue - targetMinValue) / step;
            cy.wrap($currentObject).type("{leftarrow}".repeat(stepRepeat));
          }
        }
        cy.wrap($currentObject).should(
          "have.attr",
          "aria-valuenow",
          targetMinValue
        );
      }
    );
  }

  // This method sets maximum value rating and checks its setting value
  setMaxRating(targetMaxValue) {
    const step = 0.5;

    cy.get('[data-test="slider"] .ngx-slider-pointer-max').then(
      ($currentObject) => {
        const currentValue = parseInt($currentObject.attr("aria-valuetext"));

        if (currentValue < targetMaxValue) {
          const stepRepeat = (targetMaxValue - currentValue) / step;

          cy.wrap($currentObject).type("{rightarrow}".repeat(stepRepeat));
        } else {
          if (currentValue > targetMaxValue) {
            const stepRepeat = (currentValue - targetMaxValue) / step;
            cy.wrap($currentObject).type("{leftarrow}".repeat(stepRepeat));
          }
        }
        cy.wrap($currentObject).should(
          "have.attr",
          "aria-valuenow",
          targetMaxValue
        );
      }
    );
  }

  // This method checks are there display the places with rating between min rating and max rating
  assertRating(minRating, maxRating) {
    this.setMinRating(minRating);
    this.setMaxRating(maxRating);

    cy.get('[data-test="rating"]').then(($places) => {
      cy.wrap($places).each((listItem) => {
        const itemRating = listItem.attr("ng-reflect-rating");

        cy.wrap(itemRating).then(parseFloat).should("be.gte", minRating);
        cy.wrap(itemRating).then(parseFloat).should("be.lte", maxRating);
      });
    });
  }
}

export const onSlider = new Slider();
