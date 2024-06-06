const baseUrl = 'https://api-staging.trendit3.com/api/admin';

const accessToken = getCookie('accessToken');

let exchangeRates = {};
let walletBalanceNGN = 0;
let totalPayoutsNGN = 0;
let isSorted = false; // Flag to track sorting state

// Fetch exchange rates
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/NGN');
        exchangeRates = await response.json().rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// Convert amount to selected currency
function convertAmount(amount, currency) {
    return amount / exchangeRates[currency];
}

// Update wallet and payouts amounts
function updateAmounts(currency) {
    const walletBalance = convertAmount(walletBalanceNGN, currency);
    const totalPayouts = convertAmount(totalPayoutsNGN, currency);

    document.getElementById('wallet-balance-amount').textContent = `${currency} ${walletBalance.toFixed(2)}`;
    document.getElementById('total-payouts-amount').textContent = `${currency} ${totalPayouts.toFixed(2)}`;
}

// Calculate and update percentages
function updatePercentages() {
    // Example calculations
    const previousBalance = walletBalanceNGN * 1.05; // Example previous balance
    const previousPayouts = totalPayoutsNGN * 1.1; // Example previous payouts

    const balancePercentage = ((walletBalanceNGN - previousBalance) / previousBalance) * 100;
    const payoutsPercentage = ((totalPayoutsNGN - previousPayouts) / previousPayouts) * 100;

    document.getElementById('wallet-balance-percentage').textContent = `${balancePercentage.toFixed(2)}%`;
    document.getElementById('total-payouts-percentage').textContent = `${payoutsPercentage.toFixed(2)}%`;
}

// Function to fetch transaction data
async function fetchTransactions(baseUrl, accessToken) {
    try {
        const url = `${baseUrl}/transactions`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transaction data:', error);
        throw error;
    }
}

// Function to update wallet section with fetched data
async function updateWalletSection(baseUrl, accessToken) {
    try {
        const transactionsData = await fetchTransactions(baseUrl, accessToken);

        walletBalanceNGN = transactionsData.transactions.reduce((acc, curr) => {
            if (curr.transaction_type === 'payment') {
                acc += curr.amount;
            } else {
                acc -= curr.amount;
            }
            return acc;
        }, 0);

        totalPayoutsNGN = transactionsData.transactions.filter(transaction => transaction.transaction_type === 'payment')
            .reduce((acc, curr) => acc + curr.amount, 0);

        document.getElementById('wallet-balance-amount').textContent = `NGN ${walletBalanceNGN.toFixed(2)}`;
        document.getElementById('total-payouts-amount').textContent = `NGN ${totalPayoutsNGN.toFixed(2)}`;

        updatePercentages();
    } catch (error) {
        console.error('Error updating wallet section:', error);
    }
}

// Function to generate transaction history entries
async function generateTransactionEntries(baseUrl, accessToken) {
    try {
        const transactionsData = await fetchTransactions(baseUrl, accessToken);
        let transactionHistory = transactionsData.transactions;

        // Sort transaction history if needed
        if (isSorted) {
            transactionHistory = transactionHistory.sort((a, b) => {
                return a.description.localeCompare(b.description);
            });
        }

        const walletContainer = document.querySelector('.wallet-container2');
        walletContainer.innerHTML = '';

        transactionHistory.forEach(transaction => {
            const walletBox = document.createElement('div');
            walletBox.classList.add('wallet-box');

            const leftDiv = document.createElement('div');
            leftDiv.classList.add('left');

            const arrowImage = document.createElement('img');
            arrowImage.src = transaction.transaction_type === 'credit' ? "./images/arrowupright.svg" : "./images/arrowleftdown.svg";
            arrowImage.alt = "Arrow Image";

            const creditDateDiv = document.createElement('div');
            creditDateDiv.classList.add('credit-date');

            const creditTypeParagraph = document.createElement('p');
            creditTypeParagraph.id = "highlight";
            creditTypeParagraph.textContent = transaction.transaction_type;

            const dateParagraph = document.createElement('p');
            dateParagraph.id = "date";
            dateParagraph.textContent = transaction.date;

            creditDateDiv.appendChild(creditTypeParagraph);
            creditDateDiv.appendChild(dateParagraph);

            const transactionDescriptionParagraph = document.createElement('p');
            transactionDescriptionParagraph.textContent = transaction.description;

            leftDiv.appendChild(arrowImage);
            leftDiv.appendChild(creditDateDiv);
            leftDiv.appendChild(transactionDescriptionParagraph);

            const rightDiv = document.createElement('div');
            rightDiv.classList.add('right');

            const amountParagraph = document.createElement('p');
            amountParagraph.id = "highlight";
            amountParagraph.textContent = (transaction.transaction_type === 'credit' ? '+ ' : '- ') + `₦${transaction.amount.toLocaleString()}`;

            rightDiv.appendChild(amountParagraph);

            walletBox.appendChild(leftDiv);
            walletBox.appendChild(rightDiv);

            walletContainer.appendChild(walletBox);
        });
    } catch (error) {
        console.error('Error generating transaction history entries:', error);
    }
}

// Function to show or hide currency dropdown
function toggleCurrencyDropdown(event) {
    const dropdownId = event.target.id === 'wallet-currency-toggle' ? 'wallet-currency-dropdown' : 'payouts-currency-dropdown';
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Function to handle currency selection
function handleCurrencySelection(event) {
    const selectedCurrency = event.target.getAttribute('data-currency');
    updateAmounts(selectedCurrency);
    updatePercentages();
    document.getElementById('wallet-currency-dropdown').style.display = 'none';
    document.getElementById('payouts-currency-dropdown').style.display = 'none';
}

// Function to sort transaction history entries
function sortTransactionEntries() {
    isSorted = !isSorted; // Toggle sorting state
    generateTransactionEntries(baseUrl, accessToken);
}

// Attach event listeners
document.getElementById('wallet-currency-toggle').addEventListener('click', toggleCurrencyDropdown);
document.getElementById('payouts-currency-toggle').addEventListener('click', toggleCurrencyDropdown);
document.querySelectorAll('.currency-option').forEach(option => {
    option.addEventListener('click', handleCurrencySelection);
});

const sortButton = document.querySelector('.sort-button');
sortButton.addEventListener('click', sortTransactionEntries);

// Intersection Observer setup for transaction history
const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 0.2 // Trigger when 20% of the target is visible
};

// Function to load more transaction history when the bottom is reached
async function loadMoreTransactionData() {
    try {
        // Construct the URL to fetch more transaction data
        const nextPageUrl = `${baseUrl}/transactions?page=2`; // Adjust the URL as per your API
        
        // Fetch the next page of transaction data
        const response = await fetch(nextPageUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch more transaction data');
        }
        
        // Parse the response JSON
        const newData = await response.json();
        
        // Extract the transaction history from the response data
        const moreTransactionHistory = newData.transactions;

        // Check if there is more data
        if (moreTransactionHistory && moreTransactionHistory.length > 0) {
            return moreTransactionHistory; // Return the new transaction history data
        } else {
            return []; // Return an empty array if there is no more data
        }
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
}

async function loadMoreTransactionHistory(entries) {
    const entry = entries[0];
    if (entry.isIntersecting) {
        try {
            const moreData = await loadMoreTransactionData();
            if (moreData.length > 0) {
                appendMoreTransactionHistory(moreData);
            } else {
                console.log('No more transaction history data available.');
            }
        } catch (error) {
            console.error('Failed to load more transaction history:', error);
        }
    }
}

// Function to observe the transaction history container
function observeTransactionHistory() {
    const transactionHistoryContainer = document.querySelector('.transaction-history-container');
    if (transactionHistoryContainer) {
        historyObserver.observe(transactionHistoryContainer);
    } else {
        console.error('Transaction history container not found.');
    }
}

// Fetch initial data and exchange rates
fetchExchangeRates();
updateWalletSection(baseUrl, accessToken);
generateTransactionEntries(baseUrl, accessToken);

// Create an intersection observer
const historyObserver = new IntersectionObserver(loadMoreTransactionHistory, options);

// Call the function to observe the transaction history container
observeTransactionHistory();

