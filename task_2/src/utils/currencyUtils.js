export async function fetchRates() {
  const urlRates =
    "https://openexchangerates.org/api/latest.json?app_id=7a49fcbdeaf341789422b8054bf17bb5";
  const urlDescriptions = "https://openexchangerates.org/api/currencies.json";

  try {
    const responseRates = await fetch(urlRates);
    const responseDescriptions = await fetch(urlDescriptions);

    if (!responseRates.ok || !responseDescriptions.ok) {
      throw new Error("Failed to fetch currency data.");
    }

    const rates = await responseRates.json();
    const descriptions = await responseDescriptions.json();

    return { rates: rates.rates, descriptions: descriptions };
  } catch (error) {
    console.error("Error fetching currency data:", error);
    throw error;
  }
}
