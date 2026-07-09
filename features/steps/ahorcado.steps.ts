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
    const input = page.getByTestId("letter-input");
    await input.fill(letra);
    await input.press("Enter");
  },
);

When(
  "el jugador adivina la palabra {string}",
  async ({ page }, palabra: string) => {
    await page.getByTestId("word-guess").fill(palabra);
    await page.getByTestId("guess-btn").click();
  },
);

Then("se ven {int} vidas", async ({ page }, vidas: number) => {
  await expect(page.getByTestId("lives")).toHaveText(String(vidas));
});

// Agos

When("el jugador adivina todas las letras", async ({ page }) => {
  const url = new URL(page.url());
  const palabra = url.searchParams.get("word")!;
  const input = page.getByTestId("letter-input");
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
  const input = page.getByTestId("letter-input");
  for (const letra of ["B", "C", "D", "E", "F", "H"]) {
    await input.fill(letra);
    await input.press("Enter");
  }
});

When("el jugador escribe varias letras", async ({ page }) => {
  const input = page.getByTestId("letter-input");
  await input.fill("ABC");
});

Then("solo hay una letra escrita", async ({ page }) => {
  const input = page.getByTestId("letter-input");
  await expect(input).toHaveValue(/^.$/);
});

Then("se muestra el botón {string}", async ({ page }, boton: string) => {
  await expect(page.getByTestId("restart")).toBeVisible();
  await expect(page.getByTestId("restart")).toHaveText(boton);
});

When("el jugador hace clic en {string}", async ({ page }, _boton: string) => {
  await page.getByTestId("restart").click();
});

Then("no se muestra ningún mensaje", async ({ page }) => {
  await expect(page.getByTestId("message")).toHaveText("");
});

Then(
  "la parte {string} es visible",
  async ({ page }, parte: string) => {
    await expect(page.getByTestId(parte)).toBeVisible();
  },
);

Then(
  "la parte {string} no es visible",
  async ({ page }, parte: string) => {
    await expect(page.getByTestId(parte)).not.toBeVisible();
  },
);
