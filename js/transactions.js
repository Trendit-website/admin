document.addEventListener("DOMContentLoaded", function() {
    // var hamburgerMenu = document.querySelector('.hamburger');
    // var navBar = document.querySelector('.nav-bar');

    // hamburgerMenu.addEventListener('click', function() {
    //     navBar.classList.toggle('active');
    // });


    // // Function to fetch and display user data
    // var data = getAllUsers();
    // // Display all users and execute the callback function once done
    // displayAllUsers(data);

    // Function to fetch and display transaction history
    var transactionData = getTransactionHistory();
    // Display transaction history and execute the callback function once done
    generateTransactionHistoryHTML(transactionData);
});

const baseUrl = 'https://api.trendit3.com/api/admin';
const accessToken = getCookie('accessToken');

// Function to fetch user transaction history data
async function fetchUserTransactionHistory() {
    try {
        const response = await fetch(`${baseUrl}/user_transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user transaction history data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user transaction history data:', error);
        return null;
    }
}

// Function to generate HTML for user transaction history
function generateTransactionHistoryHTML(transactionData) {
    const transactionHistoryContainer = document.querySelector('.transaction-history');
    if (!transactionHistoryContainer) return;

    // Clear previous content
    transactionHistoryContainer.innerHTML = '';

    // Create transaction box for each transaction
    transactionData.forEach(transactionItem => {
        const transactionBox = document.createElement('div');
        transactionBox.classList.add('transaction-box');

        // Create left content for the transaction box
        const leftContent = document.createElement('div');
        leftContent.classList.add('left');

        // Create right content for the transaction box
        const rightContent = document.createElement('div');
        rightContent.classList.add('right');

        // Populate left content
        const arrowIcon = document.createElement('img');
        arrowIcon.src = './images/arrowleftdown.svg';
        leftContent.appendChild(arrowIcon);

        const creditDate = document.createElement('div');
        creditDate.classList.add('credit-date');
        const creditText = document.createElement('p');
        creditText.id = 'highlight';
        creditText.textContent = transactionItem.credit ? '+' + transactionItem.amount : '-' + transactionItem.amount;
        const dateText = document.createElement('p');
        dateText.id = 'date';
        dateText.textContent = transactionItem.date;
        creditDate.appendChild(creditText);
        creditDate.appendChild(dateText);
        leftContent.appendChild(creditDate);

        const descriptionText = document.createElement('p');
        descriptionText.textContent = transactionItem.description;

        leftContent.appendChild(descriptionText);

        // Populate right content
        const amountText = document.createElement('p');
        amountText.id = 'highlight';
        amountText.textContent = transactionItem.amount;
        rightContent.appendChild(amountText);

        transactionBox.appendChild(leftContent);
        transactionBox.appendChild(rightContent);

        transactionHistoryContainer.appendChild(transactionBox);
    });
}

// Function to fetch user wallet data
async function fetchUserWalletData() {
    try {
        const response = await fetch(`${baseUrl}/transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user wallet data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user wallet data:', error);
        return null;
    }
}

// Function to generate HTML for user info wallet
function generateUserInfoWalletHTML(walletData) {
    const userInfoWalletContainer = document.querySelector('.user-info-wallet');
    if (!userInfoWalletContainer) return;

    // Clear previous content
    userInfoWalletContainer.innerHTML = '';

    // Create wallet box for each transaction
    walletData.forEach(walletItem => {
        const walletBox = document.createElement('div');
        walletBox.classList.add('wallet-box');

        // Create left content for the wallet box
        const leftContent = document.createElement('div');
        leftContent.classList.add('left');

        // Create right content for the wallet box
        const rightContent = document.createElement('div');
        rightContent.classList.add('right');

        // Populate left content
        const arrowIcon = document.createElement('img');
        arrowIcon.src = './images/arrowleftdown.svg';
        leftContent.appendChild(arrowIcon);

        const creditDate = document.createElement('div');
        creditDate.classList.add('credit-date');
        const creditText = document.createElement('p');
        creditText.id = 'highlight';
        creditText.textContent = walletItem.credit ? '+' + walletItem.amount : '-' + walletItem.amount;
        const dateText = document.createElement('p');
        dateText.id = 'date';
        dateText.textContent = walletItem.date;
        creditDate.appendChild(creditText);
        creditDate.appendChild(dateText);
        leftContent.appendChild(creditDate);

        const descriptionText = document.createElement('p');
        descriptionText.textContent = walletItem.description;

        leftContent.appendChild(descriptionText);

        // Populate right content
        const amountText = document.createElement('p');
        amountText.id = 'highlight';
        amountText.textContent = walletItem.amount;
        rightContent.appendChild(amountText);

        walletBox.appendChild(leftContent);
        walletBox.appendChild(rightContent);

        userInfoWalletContainer.appendChild(walletBox);
    });
}

// Function to populate user transaction history
async function populateUserTransactionHistory() {
    const userTransactionHistoryData = await fetchUserTransactionHistory();

    if (userTransactionHistoryData) {
        generateTransactionHistoryHTML(userTransactionHistoryData);
    } else {
        // Handle error or empty responses
    }
}

// Function to populate user info wallet
async function populateUserInfoWallet() {
    const userWalletData = await fetchUserWalletData();

    if (userWalletData) {
        generateUserInfoWalletHTML(userWalletData);
    } else {
        // Handle error or empty responses
    }
}

// Call the functions to populate user transaction history and user info wallet
populateUserTransactionHistory();
populateUserInfoWallet();
