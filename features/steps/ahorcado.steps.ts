import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given(
  "una partida con la palabra {string}",
  async ({ page }, palabra: string) => {
    await page.goto(`/?word=${palabra}`);
  },
);

Then("se ve la palabra {string}", async ({ page }, esperada: string) => {
  await expect(page.getByTestId("word")).toHaveText(esperada);
});

When(
  "el jugador adivina la letra {string}",
  async ({ page }, letra: string) => {
    const input = page.getByRole("textbox");
    await input.fill(letra);
    await input.press("Enter");
  },
);

Then("se ven {int} vidas", async ({ page }, vidas: number) => {
  await expect(page.getByTestId("lives")).toHaveText(String(vidas));
});

// Agos

When("el jugador adivina todas las letras", async ({ page }) => {
  const url = new URL(page.url());
  const palabra = url.searchParams.get("word")!;
  const input = page.getByRole("textbox");
  for (const letra of palabra) {
    await input.fill(letra);
    await input.press("Enter");
  }
});
Then(
  "se muestra el mensaje {string}",
  async ({ page }, mensajeGanador: string) => {
    await expect(page.getByTestId("message")).toHaveText(mensajeGanador);
  },
);
When("el jugador falla todas las vidas", async ({ page }) => {
  const input = page.getByRole("textbox");
  for (const letra of ["B", "C", "D", "E", "F", "H"]) {
    await input.fill(letra);
    await input.press("Enter");
  }
});