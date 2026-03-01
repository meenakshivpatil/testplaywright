import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { PWWorld } from "./world";

setDefaultTimeout(30_000);

Before(async function (this: PWWorld) {
  await this.init();
});

After(async function (this: PWWorld) {
  await this.dispose();
});