import { expect, Locator, Page } from "@playwright/test";
import { generateRandomChargerSerial } from "../utils/helpers";

export class ChargerInstallationForm {
  //define the page object
  private readonly page: Page;
  private readonly serialNumberInbut: Locator;
  private readonly addButton: Locator;
  private readonly deleteButton: Locator;
  private readonly chargersList: Locator;

  //constructor to initialize the page object
  constructor(page: Page) {
    this.page = page;
    this.serialNumberInbut = page.locator("input[name='input-serial-number']");
    this.addButton = page.locator(".addButton");
    this.deleteButton = page.locator(".list-button");
    this.chargersList = page.locator(".list-text");
  }

  //define the methods to interact with the charger installation form

  async addSerialNumber(): Promise<void> {
    const serialNumber = generateRandomChargerSerial();
    const count = await this.page.locator(".list-text").count();
    await this.serialNumberInbut.fill(`${serialNumber}`);
    await this.addButton.click();
    expect(await this.chargersList.nth(count).innerText()).toBe(
      `${serialNumber}`
    );
    console.log(`Added serial number: ${serialNumber}`);
  }

  async deleteLastSerialNumber(): Promise<void> {
    const count = await this.page.locator(".list-text").count();
    if (count > 0) {
      await this.deleteButton.nth(-1).click();
    }
    expect(await this.chargersList.count()).toBe(count - 1);
    console.log("Deleted the last serial number");
  }

  async deleteAllSerialNumbers(): Promise<void> {
    while (await this.deleteButton.nth(0).isVisible()) {
      await this.deleteButton.nth(0).click();
    }
    expect(await this.chargersList.count()).toBe(0);
    console.log("Deleted all serial numbers");
  }

  async getSerialsCount(): Promise<number> {
    return await this.page.locator(".list-text").count();
  }

  async addEmptycharger(): Promise<void> {
    await this.addButton.click();
    console.log(
      "Should display an error message that user tried to enter an empty serial number"
    );
    expect(await this.chargersList.nth(0).count()).toBe(0);
  }
}
