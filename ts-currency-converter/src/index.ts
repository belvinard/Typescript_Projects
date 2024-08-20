import * as readline from 'readline';

// Define a type for the exchange rates
type ExchangeRates = {
    [currency: string]: { [currency: string]: number };
};

// Predefined exchange rates
const exchangeRates: ExchangeRates = {
    USD: { EUR: 0.85, JPY: 110.0 },
    EUR: { USD: 1.18, JPY: 129.0 },
    JPY: { USD: 0.0091, EUR: 0.0078 },
};

// Function to convert currencies
function convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
): number | null {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        console.log(`Invalid currency code. Please use USD, EUR, or JPY.`);
        return null;
    }

    const ratesFromCurrency = exchangeRates[fromCurrency];
    if (ratesFromCurrency && ratesFromCurrency[toCurrency]) {
        const rate = ratesFromCurrency[toCurrency];
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
    // Get user input
    const amount = parseFloat(await askQuestion("Enter amount: "));
    const fromCurrency = await askQuestion("Enter source currency (USD, EUR, JPY): ");
    const toCurrency = await askQuestion("Enter target currency (USD, EUR, JPY): ");

    // Perform the conversion
    const convertedAmount = convertCurrency(amount, fromCurrency.toUpperCase(), toCurrency.toUpperCase());
    displayResult(amount, fromCurrency.toUpperCase(), toCurrency.toUpperCase(), convertedAmount);

    // Close the readline interface
    rl.close();
})();
