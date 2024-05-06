document.addEventListener("DOMContentLoaded", function() {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');

    hamburgerMenu.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });

    // Function to fetch and display user data
    var data; // Declare data variable

    getAllUsers()
        .then(function(response) {
            data = response; // Assign response to data variable
            displayAllUsers(data);
        })
        .catch(function(error) {
            console.error('Error fetching user data:', error);
        });
});


function displayUserInModal(user, userId) { 
    // Update the user popup with the user's information
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const username = document.getElementById('username');
    const gender = document.getElementById('gender');
    const location = document.getElementById('location');
    const phone = document.getElementById('phone');
    const birthday = document.getElementById('birthday');
    const profilePicture = document.getElementById('profile-picture');

    userName.textContent = user.firstname + ' ' + user.lastname;
    userEmail.textContent = user.email;
    username.textContent = '@' + user.username;
    gender.textContent = user.gender || "Not Specified";
    location.textContent = user.country || "Not Specified";
    phone.textContent = user.phone ? '+234' + user.phone : "Not Specified";
    birthday.textContent = user.birthday ? new Date(user.birthday).toDateString() : "Not Specified";
    profilePicture.src = user.profile_picture || "./images/default-user.png"; // Default profile picture if none provided

    // Show the user popup
    const userPopup = document.querySelector('.user-popup');
    const overlay = document.querySelector(".overlay");
    userPopup.style.display = 'block';
    overlay.style.display = 'block';

    // Fetch user transaction history
    fetchUserTransactionHistory(userId);
}


// Close the user popup when "Go back" is clicked
const backButton = document.querySelector('.user-popup .back');
backButton.addEventListener('click', function() {
    const userPopup = document.querySelector('.user-popup');
    const overlay = document.querySelector(".overlay");
    userPopup.style.display = 'none';
    overlay.style.display = 'none';

});

// Event delegation to handle click events on user name boxes
// const container = document.getElementById('users-container');
// container.addEventListener('click', function(event) {
//     const nameBox = event.target.closest('.name-box');
//     if (nameBox) {
//         const userId = nameBox.dataset.userId;
//         const user = data.users.find(user => user.id === parseInt(userId, 10));
//         if (user) {
//             displayUserInModal(user, userId);
//         } else {
//             console.error("User not found.");
//         }
//     }
// });

const container = document.getElementById('users-container');
container.addEventListener('click', function(event) {
    const nameBox = event.target.closest('.name-box');
    if (nameBox) {
        const userId = nameBox.dataset.userId;
        // Instead of passing 'data', pass only the userId
        displayUserInModal(userId);
    }
});
const baseUrl = 'https://api.trendit3.com/api/admin';

// get access token
const accessToken = getCookie('accessToken');

async function fetchUserTransactionHistory(userId) {
    try {
        // Fetch user transaction history
        const transactionUrl = `${baseUrl}/user_transactions`;
        const transactionResponse = await fetch(transactionUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId })
        });
        if (!transactionResponse.ok) {
            throw new Error('Failed to fetch user transaction history');
        }
        const transactionData = await transactionResponse.json();

        // Calculate wallet balance based on transaction history
        const walletBalance = calculateWalletBalance(transactionData.transactions);

        // Update the user popup with transaction history and wallet balance
        updateTransactionHistory(transactionData, walletBalance);
    } catch (error) {
        console.error('Error fetching user transaction history:', error);
    }
}

// Function to calculate wallet balance based on transaction history
function calculateWalletBalance(transactions) {
    let balance = 0;
    transactions.forEach(transaction => {
        if (transaction.type === 'credit') {
            balance += parseFloat(transaction.amount);
        } else if (transaction.type === 'debit') {
            balance -= parseFloat(transaction.amount);
        }
    });
    return balance;
}

// Function to update transaction history and wallet balance in the user popup
function updateTransactionHistory(transactionData, walletBalance) {
    // Display wallet balance
    const balanceElement = document.querySelector('.user-info-wallet .balance p');
    balanceElement.textContent = `₦${walletBalance.toFixed(2)}`;

    // Display transaction history
    const transactionContainer = document.querySelector('.user-info-transaction .wallet-box');
    transactionContainer.innerHTML = '';

    transactionData.transactions.forEach(transaction => {
        const transactionBox = document.createElement('div');
        transactionBox.classList.add('wallet-box');

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left');

        const arrowImage = document.createElement('img');
        arrowImage.src = "./images/arrowleftdown.svg";
        arrowImage.alt = "Arrow Image";
        leftDiv.appendChild(arrowImage);

        const creditDateDiv = document.createElement('div');
        creditDateDiv.classList.add('credit-date');
        creditDateDiv.innerHTML = `<p id="highlight">${transaction.type}</p><p id="date">${transaction.date}</p>`;
        leftDiv.appendChild(creditDateDiv);

        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.textContent = transaction.description;
        leftDiv.appendChild(descriptionParagraph);

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right');
        rightDiv.innerHTML = `<p id="highlight">${transaction.amount}</p>`;

        transactionBox.appendChild(leftDiv);
        transactionBox.appendChild(rightDiv);

        transactionContainer.appendChild(transactionBox);
    });
}


function getAllUsers(page=1) {
  
  // const formData = new FormData();
  // formData.append('item_type', 'item_type');

  // Construct the full URL for the verification request
  const usersUrl = `${baseUrl}/users?page=${page}`;
  
  return fetch(usersUrl, {
    method:'POST',
    // body: formData,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response=> {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error', error);
  });
}


async function displayAllUsers(promise) {

    try {

        const response = await promise;
        console.log('API Response:', response); // Log the API response

        const users = response.users;

        // Check if the users array exists and is not empty
        if (!users || users.length === 0) {
            console.log("No users to display.");
            return; // Exit the function if there are no users
        }

        // Get the container where the user information will be displayed
        const container = document.getElementById('users-container');

        // Loop through each user in the response
        users.forEach(user => {
            // Create elements for the user information
            const nameBox = document.createElement('div');
            nameBox.classList.add('name-box');
            nameBox.dataset.userId = user.id; // Store user ID for easy access

            nameBox.addEventListener('click', function() {
                displayUserInModal(user, user.id);
            });

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');

            const userImage = document.createElement('img');
            userImage.src = user.profile_picture || "./images/default-user.png"; // Default profile picture if none provided
            userImage.classList.add('user-img');
            userImage.alt = "User Image";

            const nameEmailDiv = document.createElement('div');
            nameEmailDiv.classList.add('name-email');

            const nameParagraph = document.createElement('p');
            nameParagraph.id = "highlight";
            nameParagraph.textContent = user.firstname + ' ' + user.lastname;

            const emailParagraph = document.createElement('p');
            emailParagraph.textContent = user.email;

            nameEmailDiv.appendChild(nameParagraph);
            nameEmailDiv.appendChild(emailParagraph);

            nameDiv.appendChild(userImage);
            nameDiv.appendChild(nameEmailDiv);

            const rightDiv = document.createElement('div');
            rightDiv.classList.add('right');

            const earningDiv = document.createElement('div');
            earningDiv.classList.add('earning');

            const earningImage = document.createElement('img');
            earningImage.src = "./images/wallet.png";
            earningImage.alt = "Earning Image";

            const earningTitle = document.createElement('p');
            earningTitle.textContent = "Earning";

            const earningHighlight = document.createElement('p');
            earningHighlight.id = "highlight";
            earningHighlight.textContent = user.wallet.balance;

            earningDiv.appendChild(earningImage);
            earningDiv.appendChild(earningTitle);
            earningDiv.appendChild(earningHighlight);

            const advertiseDiv = document.createElement('div');
            advertiseDiv.classList.add('advertise');

            const advertiseImage = document.createElement('img');
            advertiseImage.src = "./images/wallet.png";
            advertiseImage.alt = "Advertise Image";

            const advertiseTitle = document.createElement('p');
            advertiseTitle.textContent = "Advertise";

            const advertiseHighlight = document.createElement('p');
            advertiseHighlight.id = "highlight";
            advertiseHighlight.textContent = "23"; // Assuming this value is constant for now

            advertiseDiv.appendChild(advertiseImage);
            advertiseDiv.appendChild(advertiseTitle);
            advertiseDiv.appendChild(advertiseHighlight);

            const dateParagraph = document.createElement('p');
            dateParagraph.id = "highlight";
            dateParagraph.textContent = new Date(user.date_joined).toDateString(); // Convert date string to Date object and format it

            rightDiv.appendChild(earningDiv);
            rightDiv.appendChild(advertiseDiv);
            rightDiv.appendChild(dateParagraph);

            nameBox.appendChild(nameDiv);
            nameBox.appendChild(rightDiv);

            container.appendChild(nameBox);
        });

    } catch (error) {
        console.error('Error displaying users:', error);
    }

}








// Intersection Observer setup
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 50% of the target is visible
};

let currentPage = 2;
let isLoading = false;

const observer = new IntersectionObserver(async (entries, observer) => {
    entries.forEach(async entry => {
        if (entry.isIntersecting && !isLoading) {
            isLoading = true;
            try {
                // getAllUsers is asynchronous and returns a Promise
                var data = await getAllUsers(currentPage);
                displayAllUsers(data);
                currentPage++;
            } catch (error) {
                console.error('Failed to load new users:', error);
            } finally {
                isLoading = false;
            }
        }
    });
}, options);

observer.observe(document.getElementById('load-more-trigger'));

