import { test, expect } from "@playwright/test";
import { ChargerInstallationForm } from "../page-objects/chargerInstallationForm";

test.describe("Charge point installation form test cases", () => {
  let chargerInstallationForm: ChargerInstallationForm;

  test.beforeEach(async ({ page }) => {
    chargerInstallationForm = new ChargerInstallationForm(page);
    await page.goto("http://localhost:3000/");
  });

  test("Add serial number", async () => {
    await chargerInstallationForm.deleteAllSerialNumbers();
    await chargerInstallationForm.addSerialNumber();
  });

  test("Delete serial number", async () => {
    await chargerInstallationForm.deleteAllSerialNumbers();
    await chargerInstallationForm.addSerialNumber();
    await chargerInstallationForm.deleteLastSerialNumber();
  });

  test("Add 2 serial numbers and only delete the last one", async () => {
    await chargerInstallationForm.deleteAllSerialNumbers();
    await chargerInstallationForm.addSerialNumber();
    await chargerInstallationForm.addSerialNumber();
    await chargerInstallationForm.deleteLastSerialNumber();
  });

  //(negative) system should not accept adding empty serials!
  test.skip("Add empty charger", async () => {
    await chargerInstallationForm.deleteAllSerialNumbers();
    await chargerInstallationForm.addEmptycharger();
  });
});
