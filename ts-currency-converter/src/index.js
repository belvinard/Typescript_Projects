"use strict";
// src/index.ts
// Predefined exchange rates
const exchangeRates = {
    USD: { EUR: 0.85, JPY: 110.0 },
    EUR: { USD: 1.18, JPY: 129.0 },
    JPY: { USD: 0.0091, EUR: 0.0078 },
};
// Function to convert currencies
function convertCurrency(amount, fromCurrency, toCurrency) {
    const ratesFromCurrency = exchangeRates[fromCurrency];
    if (ratesFromCurrency && ratesFromCurrency[toCurrency]) {
        const rate = ratesFromCurrency[toCurrency];
        return amount * rate;
    }
    return null; // Return null if conversion rate is unavailable
}
// Function to display the result
function displayResult(amount, fromCurrency, toCurrency, convertedAmount) {
    if (convertedAmount !== null) {
        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`);
    }
    else {
        console.log(`Conversion rate from ${fromCurrency} to ${toCurrency} is not available.`);
    }
}
// Example user input
const amount = 100;
const fromCurrency = "USD";
const toCurrency = "EUR";
// Perform the conversion
const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
displayResult(amount, fromCurrency, toCurrency, convertedAmount);