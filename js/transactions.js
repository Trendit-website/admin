const baseUrl = 'https://api.trendit3.com/api/admin';
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
            arrowImage.src = "./images/arrowleftdown.svg";
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
            amountParagraph.textContent = transaction.amount;

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
async function loadMoreTransactionHistory(entries, observer) {
    entries.forEach(async entry => {
        if (entry.isIntersecting && !isLoading) {
            isLoading = true;
            try {
                // Call a function to load more transaction history data
                await loadMoreTransactionData();
            } catch (error) {
                console.error('Failed to load more transaction history:', error);
            } finally {
                isLoading = false;
            }
        }
    });
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
