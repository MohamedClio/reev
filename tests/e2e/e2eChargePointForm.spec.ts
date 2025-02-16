import { test, expect } from "@playwright/test";
import { ChargerInstallationForm } from "../page-objects/chargerInstallationForm";

/*the following test suite deals with multiple positive scenarios and one negative scenario of adding
a new charger serial, deleting a charging serial, adding multiple serials, and a negative scenario of
adding an empty serial */
test.describe("Charge point installation form test cases", () => {
  let chargerInstallationForm: ChargerInstallationForm;

  test.beforeEach(async ({ page }) => {
    chargerInstallationForm = new ChargerInstallationForm(page);
    await page.goto("http://localhost:3000/");
  });

  //A test to add a new charger serial
  test("Add serial number", async () => {
    await chargerInstallationForm.deleteAllSerialNumbers();
    await chargerInstallationForm.addSerialNumber();
  });

  //A test to delete a charger serial
  test("Delete serial number", async () => {
    await chargerInstallationForm.deleteAllSerialNumbers();
    await chargerInstallationForm.addSerialNumber();
    await chargerInstallationForm.deleteLastSerialNumber();
  });

  //A test to add 2 charger serials
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
