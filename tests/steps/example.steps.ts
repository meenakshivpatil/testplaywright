import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PWWorld } from "../support/world";

Given("I open the home page", async function (this: PWWorld) {
  await this.page.goto(this.baseUrl(), { waitUntil: "domcontentloaded" });
});

Then("I should see the title {string}", async function (this: PWWorld, text: string) {
  const title = await this.page.title();
  console.log(`Page title: "${title}"`);
  expect(title).toBe(text);
}
);