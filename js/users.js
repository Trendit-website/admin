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



       // Fetch all social verification requests
       fetchSocialVerificationRequests(userId)
       .then(displaySocialVerificationRequests)
       .catch(function(error) {
           console.error('Error fetching social verification requests:', error);
       });

    // Event delegation to handle click events on user name boxes
    const container = document.getElementById('users-container');
    container.addEventListener('click', function(event) {
        const nameBox = event.target.closest('.name-box');
        if (nameBox) {
            const userId = nameBox.dataset.userId;
            // Ensure `data` is defined before accessing `data.users`
            if (data && data.users) {
                const user = data.users.find(user => user.id === parseInt(userId, 10));
                if (user) {
                    displayUserInModal(user, userId);
                } else {
                    console.error("User not found.");
                }
            } else {
                console.error("No user data available.");
            }
        }
    });
});


function displayUserInModal(user, userId) {
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
    profilePicture.src = user.profile_picture || "./images/default-user.png";

    fetchAndDisplayUserDetails(userId)
    .then(() => fetchAndDisplayUserTransactions(userId))
    .then(() => {
        const userPopup = document.querySelector('.user-popup');
        const overlay = document.querySelector(".overlay");
        userPopup.style.display = 'block';
        overlay.style.display = 'block';
    })
    .catch(error => {
        console.error('Error displaying user details:', error);
    });
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
// const container = document.getElementById('users-container');
// container.addEventListener('click', function(event) {
//     const nameBox = event.target.closest('.name-box');
//     if (nameBox) {
//         const userId = nameBox.dataset.userId;
//         // Ensure `data` is defined before accessing `data.users`
//         if (data && data.users) {
//             const user = data.users.find(user => user.id === parseInt(userId, 10));
//             if (user) {
//                 displayUserInModal(user, userId);
//             } else {
//                 console.error("User not found.");
//             }
//         } else {
//             console.error("No user data available.");
//         }
//     }
// });



function fetchAndDisplayUserDetails(userId) {
    return Promise.all([
        fetch(`${baseUrl}/user_task_metrics`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        }),
        fetch(`${baseUrl}/user_transaction_metrics`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
    ])
    .then(responses => Promise.all(responses.map(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })))
    .then(([taskMetrics, transactionMetrics]) => {
        document.getElementById('total-earned').textContent = `₦${taskMetrics.totalEarned.toFixed(2)}`;
        document.getElementById('total-advertised').textContent = `₦${taskMetrics.totalAdvertised.toFixed(2)}`;
        document.getElementById('total-commissioned').textContent = `₦${taskMetrics.totalCommissioned.toFixed(2)}`;
        document.getElementById('date-joined').textContent = new Date(taskMetrics.dateJoined).toDateString();

        document.getElementById('wallet-balance').textContent = `₦${transactionMetrics.walletBalance.toFixed(2)}`;
        document.getElementById('total-credit').textContent = `₦${transactionMetrics.totalCredit.toFixed(2)}`;
        document.getElementById('total-debit').textContent = `₦${transactionMetrics.totalDebit.toFixed(2)}`;
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });
}

function fetchAndDisplayUserTransactions(userId) {
    const endpoints = [
        '/user_credit_transactions',
        '/user_debit_transactions',
        '/user_payment_transactions',
        '/user_withdrawal_transactions'
    ];

    const transactionHistoryContainer = document.getElementById('transaction-history');
    transactionHistoryContainer.innerHTML = ''; // Clear existing content

    const transactionPromises = endpoints.map(endpoint =>
        fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
    );

    return Promise.all(transactionPromises)
        .then(transactions => {
            transactions.forEach(transactionList => {
                transactionList.forEach(transaction => {
                    const transactionElement = document.createElement('div');
                    transactionElement.classList.add('wallet-box');

                    const transactionType = transaction.type || 'Transaction';
                    const transactionDate = new Date(transaction.date).toDateString();
                    const transactionAmount = `₦${transaction.amount.toFixed(2)}`;
                    const transactionDescription = transaction.description || 'No Description';

                    transactionElement.innerHTML = `
                        <div class="left">
                            <img src="./images/arrowleftdown.svg" alt="">
                            <div class="credit-date">
                                <p id="highlight">${transactionType}</p>
                                <p id="date">${transactionDate}</p>
                            </div>
                            <p>${transactionDescription}</p>
                        </div>
                        <div class="right">
                            <p id="highlight">${transactionAmount}</p>
                        </div>
                    `;

                    transactionHistoryContainer.appendChild(transactionElement);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching user transactions:', error);
        });
}



// const container = document.getElementById('users-container');
// container.addEventListener('click', function(event) {
//     const nameBox = event.target.closest('.name-box');
//     if (nameBox) {
//         const userId = nameBox.dataset.userId;
//         // Instead of passing 'data', pass only the userId
//         displayUserInModal(userId);
//     }
// });

const baseUrl = 'https://api.trendit3.com/api/admin';

// get access token
const accessToken = getCookie('accessToken');





function getAllUsers(page=1) {
    const usersUrl = `${baseUrl}/users?page=${page}`;

    return fetch(usersUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch((error) => {
        console.error('Error', error);
    });
}
//     return response.json();
//   })
//   .catch((error) => {
//     console.error('Error', error);
//   });
// }

async function displayAllUsers(promise) {
    try {
        const response = await promise;
        console.log('API Response:', response);

        if (response && response.users) {
            const users = response.users;

            if (!users.length) {
                console.log("No users to display.");
                return;
            }

            const container = document.getElementById('users-container');

            users.forEach(user => {
                const nameBox = document.createElement('div');
                nameBox.classList.add('name-box');
                nameBox.dataset.userId = user.id;

                nameBox.addEventListener('click', function() {
                    displayUserInModal(user, user.id);
                });

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('name');

                const userImage = document.createElement('img');
                userImage.src = user.profile_picture || "./images/default-user.png";
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
                advertiseHighlight.textContent = "0";

                advertiseDiv.appendChild(advertiseImage);
                advertiseDiv.appendChild(advertiseTitle);
                advertiseDiv.appendChild(advertiseHighlight);

                const dateParagraph = document.createElement('p');
                dateParagraph.id = "highlight";
                dateParagraph.textContent = new Date(user.date_joined).toDateString();

                rightDiv.appendChild(earningDiv);
                rightDiv.appendChild(advertiseDiv);
                rightDiv.appendChild(dateParagraph);

                nameBox.appendChild(nameDiv);
                nameBox.appendChild(rightDiv);

                container.appendChild(nameBox);
            });
        } else {
            throw new Error('Users data is undefined');
        }
    } catch (error) {
        console.error('Error displaying users:', error);
    }
}

// async function displayAllUsers(promise) {

//     try {

//         const response = await promise;
//         console.log('API Response:', response); // Log the API response

//         const users = response.users;

//         // Check if the users array exists and is not empty
//         if (!users || users.length === 0) {
//             console.log("No users to display.");
//             return; // Exit the function if there are no users
//         }

//         // Get the container where the user information will be displayed
//         const container = document.getElementById('users-container');

//         // Loop through each user in the response
//         users.forEach(user => {
//             // Create elements for the user information
//             const nameBox = document.createElement('div');
//             nameBox.classList.add('name-box');
//             nameBox.dataset.userId = user.id; // Store user ID for easy access

//             nameBox.addEventListener('click', function() {
//                 displayUserInModal(user, user.id);
//             });

//             const nameDiv = document.createElement('div');
//             nameDiv.classList.add('name');

//             const userImage = document.createElement('img');
//             userImage.src = user.profile_picture || "./images/default-user.png"; // Default profile picture if none provided
//             userImage.classList.add('user-img');
//             userImage.alt = "User Image";

//             const nameEmailDiv = document.createElement('div');
//             nameEmailDiv.classList.add('name-email');

//             const nameParagraph = document.createElement('p');
//             nameParagraph.id = "highlight";
//             nameParagraph.textContent = user.firstname + ' ' + user.lastname;

//             const emailParagraph = document.createElement('p');
//             emailParagraph.textContent = user.email;

//             nameEmailDiv.appendChild(nameParagraph);
//             nameEmailDiv.appendChild(emailParagraph);

//             nameDiv.appendChild(userImage);
//             nameDiv.appendChild(nameEmailDiv);

//             const rightDiv = document.createElement('div');
//             rightDiv.classList.add('right');

//             const earningDiv = document.createElement('div');
//             earningDiv.classList.add('earning');

//             const earningImage = document.createElement('img');
//             earningImage.src = "./images/wallet.png";
//             earningImage.alt = "Earning Image";

//             const earningTitle = document.createElement('p');
//             earningTitle.textContent = "Earning";

//             const earningHighlight = document.createElement('p');
//             earningHighlight.id = "highlight";
//             earningHighlight.textContent = user.wallet.balance;

//             earningDiv.appendChild(earningImage);
//             earningDiv.appendChild(earningTitle);
//             earningDiv.appendChild(earningHighlight);

//             const advertiseDiv = document.createElement('div');
//             advertiseDiv.classList.add('advertise');

//             const advertiseImage = document.createElement('img');
//             advertiseImage.src = "./images/wallet.png";
//             advertiseImage.alt = "Advertise Image";

//             const advertiseTitle = document.createElement('p');
//             advertiseTitle.textContent = "Advertise";

//             const advertiseHighlight = document.createElement('p');
//             advertiseHighlight.id = "highlight";
//             advertiseHighlight.textContent = "0"; // Assuming this value is constant for now

//             advertiseDiv.appendChild(advertiseImage);
//             advertiseDiv.appendChild(advertiseTitle);
//             advertiseDiv.appendChild(advertiseHighlight);

//             const dateParagraph = document.createElement('p');
//             dateParagraph.id = "highlight";
//             dateParagraph.textContent = new Date(user.date_joined).toDateString(); // Convert date string to Date object and format it

//             rightDiv.appendChild(earningDiv);
//             rightDiv.appendChild(advertiseDiv);
//             rightDiv.appendChild(dateParagraph);

//             nameBox.appendChild(nameDiv);
//             nameBox.appendChild(rightDiv);

//             container.appendChild(nameBox);
//         });

//     } catch (error) {
//         console.error('Error displaying users:', error);
//     }

// }




async function fetchSocialVerificationRequests(page = 1, perPage = 20) {
    try {
        const response = await fetch(`${baseUrl}/social_verification_requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ page, per_page: perPage })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const text = await response.text();
        if (!text) {
            throw new Error('Empty response');
        }

        const data = JSON.parse(text); // Parse the JSON response
        
        if (data.data && data.data.social_verification_requests) {
            displaySocialVerificationRequests(data.data.social_verification_requests);
            displaySocialAccounts(data.data.social_verification_requests);
        } else {
            throw new Error('social_verification_requests is undefined');
        }
    } catch (error) {
        console.error('Error fetching social verification requests:', error);
    }
}



async function approveSocialVerificationRequest(userId, type, link, socialVerificationId) {
    try {
        const response = await fetch(`${baseUrl}/approve_social_verification_request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ userId, type, link, socialVerificationId })
        });

        if (response.ok) {
            const text = await response.text();
            if (!text) {
                throw new Error('Empty response');
            }
            const data = JSON.parse(text);
            displayMessage(data.message);
            fetchAllSocialVerificationRequests(); // Refresh the list
        } else {
            throw new Error('Error approving social verification request');
        }
    } catch (error) {
        displayError(error.message);
    }
}

async function rejectSocialVerificationRequest(userId, type, link, socialVerificationId) {
    try {
        const response = await fetch(`${baseUrl}/reject_social_verification_request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ userId, type, link, socialVerificationId })
        });

        if (response.ok) {
            const text = await response.text();
            if (!text) {
                throw new Error('Empty response');
            }
            const data = JSON.parse(text);
            displayMessage(data.message);
            fetchAllSocialVerificationRequests(); // Refresh the list
        } else {
            throw new Error('Error rejecting social verification request');
        }
    } catch (error) {
        displayError(error.message);
    }
}

function displaySocialVerificationRequests(requests) {
    const container = document.getElementById('social-requests');
    container.innerHTML = ''; // Clear the container
    requests.forEach(request => {
        const requestBox = document.createElement('div');
        requestBox.className = 'social-approve-box';
        requestBox.innerHTML = `
            <div class="social-link">
                <img src="./images/${request.type}.png" alt="">
                <a href="${request.link}" target="_blank">${request.link}</a>
            </div>
            <div class="buttons">
                <button onclick="approveRequest(${request.userId}, '${request.type}', '${request.link}', ${request.id})">Accept</button>
                <button onclick="rejectRequest(${request.userId}, '${request.type}', '${request.link}', ${request.id})">Decline</button>
            </div>
        `;
        container.appendChild(requestBox);
    });
}

function displaySocialAccounts(accounts) {
    const container = document.getElementById('accounts-connected');
    container.innerHTML = ''; // Clear the container
    accounts.forEach(account => {
        const accountIcon = document.createElement('img');
        accountIcon.src = `./images/${account.type}.png`;
        accountIcon.alt = account.type;
        container.appendChild(accountIcon);
    });
}

function displayMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = message;
    messageBox.style.display = 'block';
    setTimeout(() => { messageBox.style.display = 'none'; }, 3000);
}

function displayError(error) {
    const errorBox = document.getElementById('error-box');
    errorBox.innerText = error;
    errorBox.style.display = 'block';
    setTimeout(() => { errorBox.style.display = 'none'; }, 3000);
}

function approveRequest(userId, type, link, id) {
    approveSocialVerificationRequest(userId, type, link, id);
}

function rejectRequest(userId, type, link, id) {
    rejectSocialVerificationRequest(userId, type, link, id);
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

