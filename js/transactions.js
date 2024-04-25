
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
        const transactionHistory = transactionsData.transactions;

        const walletContainer = document.querySelector('.wallet-container');
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
