const baseUrl = 'https://api.trendit3.com/api/admin';
    const accessToken = getCookie('accessToken');


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
fetchTransactions(baseUrl, accessToken)
    .then(data => {
        console.log('Transaction data:', data);
        // Handle the fetched data as needed
    })
    .catch(error => {
        console.error('Failed to fetch transaction data:', error);
    });
// Function to display wallet balance and total payouts
async function displayWalletInfo(baseUrl, accessToken) {
    try {
        // Fetch transaction data
        const transactionsData = await fetchTransactions(baseUrl, accessToken);

        // Find wallet balance and total payouts from transactions data
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

        // Update HTML elements with wallet balance and total payouts
        document.getElementById('wallet-balance').textContent = `NGN ${walletBalance.toFixed(2)}`;
        document.getElementById('total-payouts').textContent = `NGN ${totalPayouts.toFixed(2)}`;
    } catch (error) {
        // Handle errors
    }
}

// Function to display transaction history
async function displayTransactionHistory(baseUrl, accessToken) {
    try {
        // Fetch transaction data
        const transactionsData = await fetchTransactions(baseUrl, accessToken);

        // Get the container for transaction history
        const transactionHistoryContainer = document.querySelector('.wallet-box');

        // Clear existing transaction history
        transactionHistoryContainer.innerHTML = '';

        // Populate transaction history with fetched data
        transactionsData.transactions.forEach(transaction => {
            const transactionBox = document.createElement('div');
            transactionBox.classList.add('wallet-box');

            const transactionType = transaction.transaction_type.charAt(0).toUpperCase() + transaction.transaction_type.slice(1);
            const transactionAmount = transaction.amount > 0 ? `+ ₦${transaction.amount.toFixed(2)}` : `- ₦${Math.abs(transaction.amount).toFixed(2)}`;

            transactionBox.innerHTML = `
                <div class="left">
                    <img src="./images/arrowleftdown.svg" alt="">
                    <div class="credit-date">
                        <p id="highlight">${transactionType}</p>
                        <p id="date">${transaction.description}</p>
                    </div>
                    <p>${transaction.description}</p>
                </div>
                <div class="right">
                    <p id="highlight">${transactionAmount}</p>
                </div>
            `;

            transactionHistoryContainer.appendChild(transactionBox);
        });
    } catch (error) {
        // Handle errors
    }
}



displayWalletInfo(baseUrl, accessToken);
displayTransactionHistory(baseUrl, accessToken);
