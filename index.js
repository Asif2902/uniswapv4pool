const axios = require('axios');

const etherscanAPIKey = 'GTZG3EJTX5U755XMYD3UZRCAPYUEQP13CH';
const tokenAddress = '0x634769EB87542EAf41C0008c05D5d8F5d8bEc3A5';
const etherscanBaseURL = 'https://api.etherscan.io/api';

// Function to fetch token transactions
async function fetchTokenTransactions() {
    const url = `${etherscanBaseURL}?module=account&action=tokentx&contractaddress=${tokenAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanAPIKey}`;

    try {
        const response = await axios.get(url);
        const transactions = response.data.result;

        if (transactions && transactions.length > 0) {
            console.log('Total Transactions:', transactions.length);
            analyzeTransactions(transactions);
        } else {
            console.log('No transactions found.');
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

// Function to analyze the transactions
function analyzeTransactions(transactions) {
    transactions.forEach((tx) => {
        const { from, to, value, tokenSymbol, hash } = tx;

        // Malicious detection logic can vary, for example:
        // - Look for unusually high transfer values
        // - Suspicious wallet addresses (e.g., known blacklisted wallets)
        // - Rapid transactions between the same addresses

        const isMalicious = checkForMaliciousActivity(tx);
        if (isMalicious) {
            console.log(`Malicious Transaction Found: ${hash}`);
            console.log(`From: ${from}, To: ${to}, Value: ${value} ${tokenSymbol}`);
        }
    });
}

// Example logic for detecting potential malicious activity
function checkForMaliciousActivity(tx) {
    const { value } = tx;

    // Detect unusually high-value transactions (example threshold)
    const suspiciousValue = 1000000 * (10 ** 18); // 1 million tokens (adjust based on token decimals)
    if (Number(value) > suspiciousValue) {
        return true;
    }

    // Add additional conditions for detecting suspicious wallets or activity patterns
    // e.g., rapid repeated transactions, known suspicious wallets, etc.

    return false;
}

// Fetch and analyze token transactions
fetchTokenTransactions();
