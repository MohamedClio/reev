/* Function to generate a random Charger serial while assuming that each serial is a 6-digit number */
export function generateRandomChargerSerial(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
