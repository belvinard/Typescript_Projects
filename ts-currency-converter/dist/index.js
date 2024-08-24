"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Predefined exchange rates
const exchangeRates = {
    USD: { EUR: 0.85, JPY: 110.0, FCFA: 600.0 },
    EUR: { USD: 1.18, JPY: 129.0, FCFA: 700.0 },
    JPY: { USD: 0.0091, EUR: 0.0078, FCFA: 5.0 },
    FCFA: { USD: 0.0017, EUR: 0.0014, JPY: 0.20 },
};
// Function to convert currencies
function convertCurrency(amount, fromCurrency, toCurrency) {
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
function displayResult(amount, fromCurrency, toCurrency, convertedAmount) {
    if (convertedAmount !== null) {
        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`);
    }
    else {
        console.log(`Conversion rate from ${fromCurrency} to ${toCurrency} is not available.`);
    }
}
// Define readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Function to ask the user for input
const askQuestion = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Currency converter program started...");
            // Get user input
            const amount = parseFloat(yield askQuestion("Enter amount: "));
            console.log(`You entered amount: ${amount}`);
            const fromCurrency = yield askQuestion("Enter source currency (USD, EUR, JPY, FCFA): ");
            console.log(`You entered source currency: ${fromCurrency}`);
            const toCurrency = yield askQuestion("Enter target currency (USD, EUR, JPY, FCFA): ");
            console.log(`You entered target currency: ${toCurrency}`);
            // Perform the conversion
            const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
            displayResult(amount, fromCurrency, toCurrency, convertedAmount);
        }
        catch (error) {
            console.error("An error occurred: ", error);
        }
        finally {
            // Close the readline interface
            rl.close();
        }
    });
})();
