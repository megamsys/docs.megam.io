import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/overview/welcome",
  "/overview/tour",
  "/overview/pricing",
  "/gettingstarted/system_requirements",
  "/installation/prequisites",
  "/installation/vertice",
  "/configuration/vertice",
  "/machines/deploying",
  "/containers/deploying",
  "/customapps/deploying"
];

test.describe("docs site", () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 10, 15)");
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("archive banner appears on every page", async ({ page }) => {
    await page.goto("/");
    const banner = page.locator(".archive-banner");
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Archived");
    await expect(banner).toContainText("get.megam.io");
  });

  test("archive banner persists on inner pages", async ({ page }) => {
    await page.goto("/installation/vertice");
    await expect(page.locator(".archive-banner")).toBeVisible();
  });

  test("dead get.megam.io references render as inactive", async ({ page }) => {
    await page.goto("/installation/vertice");
    const dead = page.locator(".dead-link").first();
    await expect(dead).toBeVisible();
  });

  test("home links to closure record and GitHub", async ({ page }) => {
    await page.goto("/");
    const header = page.getByLabel("Site header");
    await expect(header.getByRole("link", { name: "Closure record" })).toHaveAttribute(
      "href",
      "https://megam.io"
    );
    await expect(header.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/megamsys"
    );
  });

  test("sidebar groups visible", async ({ page }) => {
    await page.goto("/");
    const sidebar = page.getByLabel("Documentation navigation");
    await expect(sidebar.getByText("Overview", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("Install", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("Configure", { exact: true })).toBeVisible();
  });
});
