const baseUrl = 'https://api.trendit35.com/api/admin';
const accessToken = getCookie('accessToken');
let isLoading = false; // Flag to track loading state
let isSorted = false; // Flag to track sorting state

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

        const walletBalance = transactionsData.transactions.reduce((acc, curr) => {
            if (curr.transaction_type === 'payment') {
                acc += curr.amount;
            } else {
                acc -= curr.amount;
            }
            return acc;
        }, 0);

        const totalPayouts = transactionsData.transactions.filter(transaction => transaction.transaction_type === 'payment')
            .reduce((acc, curr) => acc + curr.amount, 0);

        document.getElementById('wallet-balance-amount').textContent = `NGN ${walletBalance.toFixed(2)}`;
        document.getElementById('total-payouts-amount').textContent = `NGN ${totalPayouts.toFixed(2)}`;
    } catch (error) {
        console.error('Error updating wallet section:', error);
    }
}

// Function to format amount with commas and currency symbol
function formatAmount(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
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
            arrowImage.src = transaction.transaction_type === 'payment' ? "./images/arrowupright.svg" : "./images/arrowleftdown.svg";
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
            const formattedAmount = formatAmount(transaction.amount);
            amountParagraph.textContent = transaction.transaction_type === 'payment' ? `+ ${formattedAmount}` : formattedAmount;

            rightDiv.appendChild(amountParagraph);

            walletBox.appendChild(leftDiv);
            walletBox.appendChild(rightDiv);

            walletContainer.appendChild(walletBox);
        });
    } catch (error) {
        console.error('Error generating transaction history entries:', error);
    }
}

// Update wallet section with fetched data
updateWalletSection(baseUrl, accessToken);

// Generate transaction history entries
generateTransactionEntries(baseUrl, accessToken);

// Function to sort transaction history entries
function sortTransactionEntries() {
    isSorted = !isSorted; // Toggle sorting state
    generateTransactionEntries(baseUrl, accessToken);
}

// Attach event listener to the Sort button
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

async function loadMoreTransactionData() {
    try {
        // Fetch more transaction history data from the server
        const moreData = await fetchMoreData(); // Replace fetchMoreData with your actual function to fetch more data
        
        // Check if there is more data
        if (moreData && moreData.length > 0) {
            // Process and append the new data to the existing transaction history
            appendMoreTransactionHistory(moreData); // Replace appendMoreTransactionHistory with your actual function to append more data
        } else {
            console.log('No more transaction history data available.');
            // Optionally, you can display a message to the user indicating that there is no more data available
        }
    } catch (error) {
        console.error('Failed to load more transaction history:', error);
    }
}

// Create an intersection observer
const historyObserver = new IntersectionObserver(loadMoreTransactionHistory, options);

// Function to observe the transaction history container
function observeTransactionHistory() {
    const transactionHistoryContainer = document.querySelector('.transaction-history-container');
    if (transactionHistoryContainer) {
        historyObserver.observe(transactionHistoryContainer);
    } else {
        console.error('Transaction history container not found.');
    }
}

// Call the function to observe the transaction history container
observeTransactionHistory();
