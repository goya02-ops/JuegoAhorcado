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

Then("la parte {string} es visible", async ({ page }, parte: string) => {
  await expect(page.getByTestId(parte)).toBeVisible();
});

Then("la parte {string} no es visible", async ({ page }, parte: string) => {
  await expect(page.getByTestId(parte)).not.toBeVisible();
});

// Agos - AT 4

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

// Agos - AT 19

Given("que el jugador abre el juego", async ({ page }) => {
  await page.goto("/");
});
Then("el menú de inicio es visible", async ({ page }) => {
  await expect(page.getByTestId("menu-inicio")).toBeVisible();
});

// Agos - AT 20

When("el jugador hace clic en el botón Jugar Aleatoria", async ({ page }) => {
  await page.getByRole("button", { name: "Jugar Aleatoria" }).click();
});

Then("se ve una palabra enmascarada", async ({ page }) => {
  const texto = await page.getByTestId("word").textContent();
  expect(texto).toMatch(/^[_A-Z ]+$/);
  expect(texto).toContain("_");
});

Then("el menú de inicio no es visible", async ({ page }) => {
  await expect(page.getByTestId("menu-inicio")).not.toBeVisible();
});

// Agos - AT 21

When(
  "el jugador hace clic en el botón Jugar Personalizada",
  async ({ page }) => {
    await page.getByRole("button", { name: "Jugar Personalizada" }).click();
  },
);

Then("se muestra un input para escribir la palabra", async ({ page }) => {
  await expect(page.getByTestId("custom-word-input")).toBeVisible();
});

Then("un boton para confirmar", async ({ page }) => {
  await expect(page.getByTestId("custom-word-btn")).toBeVisible();
});
