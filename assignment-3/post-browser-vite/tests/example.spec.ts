import { test, expect } from "@playwright/test";

// mock API response for deterministic tests
const mockPost = (id: number) => ({
    id,
    title: `Mock Title ${id}`,
    body: `Mock Body ${id}`
});

const mockComments = [
    { id: 1, name: "Mock User", email: "mock@test.com", body: "Mock Comment" }
];

test.beforeEach(async ({ page }) => {
    // intercept all post requests and return mock data
    await page.route("**/posts/**", async route => {
        const url = route.request().url();
        if (url.includes("comments")) {
            await route.fulfill({ json: mockComments });
        } else {
            const id = parseInt(url.split("/").pop() || "1");
            await route.fulfill({ json: mockPost(id) });
        }
    });

    await page.goto("/");
    // wait for initial load to complete before each test
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-title-display")).not.toBeEmpty();
});

// Navigation
test("page loads with post 1", async ({ page }) => {
    await expect(page.locator("#post-number")).toHaveText("1");
    await expect(page.locator("#post-title-display")).toHaveText("Mock Title 1");
    await expect(page.locator("#post-body-display")).toHaveText("Mock Body 1");
});

test("next button loads post 2", async ({ page }) => {
    await page.locator("#next-btn").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("2");
    await expect(page.locator("#post-title-display")).toHaveText("Mock Title 2");
});

test("prev button loads post 1 after going to post 2", async ({ page }) => {
    await page.locator("#next-btn").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("2");

    await page.locator("#prev-btn").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("1");
    await expect(page.locator("#post-title-display")).toHaveText("Mock Title 1");
});

test("prev button is disabled on post 1", async ({ page }) => {
    await expect(page.locator("#post-number")).toHaveText("1");
    await expect(page.locator("#prev-btn")).toBeDisabled();
});

test("prev button on post 1 does nothing", async ({ page }) => {
    await expect(page.locator("#post-number")).toHaveText("1");
    await expect(page.locator("#prev-btn")).toBeDisabled();
    await page.locator("#prev-btn").click({ force: true });
    await expect(page.locator("#post-number")).toHaveText("1");
});

test("next button is disabled on post 100", async ({ page }) => {
    page.on("dialog", dialog => dialog.dismiss());
    await page.locator("#jump-input").fill("100");
    await page.locator("#jump-button").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("100");
    await expect(page.locator("#next-btn")).toBeDisabled();
});

// Jump Input
test("jumping to a valid post loads that post", async ({ page }) => {
    await page.locator("#jump-input").fill("50");
    await page.locator("#jump-button").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("50");
    await expect(page.locator("#post-title-display")).toHaveText("Mock Title 50");
});

test("input clears after successful jump", async ({ page }) => {
    await page.locator("#jump-input").fill("5");
    await page.locator("#jump-button").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#jump-input")).toHaveValue("");
});

// Post Content
test("title is not empty after load", async ({ page }) => {
    await expect(page.locator("#post-title-display")).not.toBeEmpty();
});

test("body is not empty after load", async ({ page }) => {
    await expect(page.locator("#post-body-display")).not.toBeEmpty();
});

test("post number matches current ID after navigation", async ({ page }) => {
    await page.locator("#next-btn").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("2");
});

// Comments
test("comments container is empty before clicking view comments", async ({ page }) => {
    await expect(page.locator("#comments-container")).toBeEmpty();
});

test("clicking view comments loads comments", async ({ page }) => {
    await page.locator("#view-comments-btn").click();
    await expect(page.locator("#comments-container")).not.toBeEmpty();
});

test("comments have a name and body", async ({ page }) => {
    await page.locator("#view-comments-btn").click();
    await expect(page.locator("#comments-container strong").first()).toHaveText("Mock User");
    await expect(page.locator("#comments-container p").first()).toHaveText("Mock Comment");
});

// Refresh
test("refresh resets to post 1", async ({ page }) => {
    await page.locator("#next-btn").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("2");

    await page.locator("#refresh-btn").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-number")).toHaveText("1");
    await expect(page.locator("#post-title-display")).not.toBeEmpty();
});

test("post content is still visible after refresh", async ({ page }) => {
    await page.locator("#refresh-btn").click();
    await expect(page.locator("#post-loader")).toBeHidden();
    await expect(page.locator("#post-title-display")).not.toBeEmpty();
    await expect(page.locator("#post-body-display")).not.toBeEmpty();
});