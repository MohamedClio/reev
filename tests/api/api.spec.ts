import { test, expect } from "@playwright/test";
import { generateRandomChargerSerial } from "../utils/helpers";

test.describe("Charge Point API Tests", () => {
  // Base URL for the API
  const baseUrl = "http://localhost:3001";

  // Test for adding a charge serial
  test("should create a charge point successfully", async ({ page }) => {
    // Step 1: Create a charge serial
    const response = await page.request.post(`${baseUrl}/charge-point`, {
      data: {
        serialNumber: generateRandomChargerSerial(),
      },
    });
    expect(response.status()).toBe(201);
  });

  test("should be able to delete a charge serial", async ({ page }) => {
    // Step 1: Create a charge serial
    const response = await page.request.post(`${baseUrl}/charge-point`, {
      data: {
        serialNumber: generateRandomChargerSerial(),
      },
    });
    expect(response.status()).toBe(201);

    // Step 2: Delete the charge serial
    const chargePointId = response.json().id;
    const deleteResponse = await page.request.delete(
      `${baseUrl}/charge-point/${chargePointId}`
    );
    expect(deleteResponse.status()).toBe(204);
  });
});
