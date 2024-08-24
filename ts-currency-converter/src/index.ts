import * as readline from 'readline';

// Define a type for the exchange rates
type ExchangeRates = {
    [currency: string]: { [currency: string]: number };
};

// Predefined exchange rates
const exchangeRates: ExchangeRates = {
    USD: { EUR: 0.85, JPY: 110.0, FCFA: 600.0 },
    EUR: { USD: 1.18, JPY: 129.0, FCFA: 700.0 },
    JPY: { USD: 0.0091, EUR: 0.0078, FCFA: 5.0 },
    FCFA: { USD: 0.0017, EUR: 0.0014, JPY: 0.20 },
};

// Function to convert currencies
function convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
): number | null {
    const fromCurrencyUpper = fromCurrency.toUpperCase();
    const toCurrencyUpper = toCurrency.toUpperCase();

    if (!exchangeRates[fromCurrencyUpper] || !exchangeRates[toCurrencyUpper]) {
        console.log(`Invalid currency code. Please use USD, EUR, JPY, or FCFA.`);
        return null;
    }

    const ratesFromCurrency = exchangeRates[fromCurrencyUpper];
    if (ratesFromCurrency && ratesFromCurrency[toCurrencyUpper]) {
        const rate = ratesFromCurrency[toCurrencyUpper];
        return amount * rate;
    }
    return null; // Return null if conversion rate is unavailable
}

// Function to display the result
function displayResult(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    convertedAmount: number | null
): void {
    if (convertedAmount !== null) {
        console.log(
            `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`
        );
    } else {
        console.log(`Conversion rate from ${fromCurrency} to ${toCurrency} is not available.`);
    }
}

// Define readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to ask the user for input
const askQuestion = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
};

(async function main() {
    try {
        console.log("Currency converter program started...");

        // Get user input
        const amount = parseFloat(await askQuestion("Enter amount: "));
        console.log(`You entered amount: ${amount}`);
        const fromCurrency = await askQuestion("Enter source currency (USD, EUR, JPY, FCFA): ");
        console.log(`You entered source currency: ${fromCurrency}`);
        const toCurrency = await askQuestion("Enter target currency (USD, EUR, JPY, FCFA): ");
        console.log(`You entered target currency: ${toCurrency}`);

        // Perform the conversion
        const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        displayResult(amount, fromCurrency, toCurrency, convertedAmount);
    } catch (error) {
        console.error("An error occurred: ", error);
    } finally {
        // Close the readline interface
        rl.close();
    }
})();
