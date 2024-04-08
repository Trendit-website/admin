document.addEventListener("DOMContentLoaded", function() {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');

    hamburgerMenu.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });

    // Function to fetch and display user data
    var data = getAllUsers();
    // Display all users and execute the callback function once done
    displayAllUsers(data);
});

const baseUrl = 'https://api.trendit3.com/api/admin';
// get access token
const accessToken = getCookie('accessToken');

function getAllUsers(page=1) {
  
  const usersUrl = `${baseUrl}/users?page=${page}`;
  
  return fetch(usersUrl, {
    method:'POST',
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
        const users = response.users;

        // Check if the users array exists and is not empty
        if (!users || users.length === 0) {
            console.log("No users to display.");
            return; // Exit the function if there are no users
        }

        // Get the container where the user information will be displayed
        const container = document.getElementById('users-container');

        // Clear any existing content in the container
        container.innerHTML = '';

        // Loop through each user in the response
        users.forEach(user => {
            // Create elements for the user information
            const nameBox = document.createElement('div');
            nameBox.classList.add('name-box');
            nameBox.dataset.userId = user.id; // Store user ID for easy access

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');

            const userImage = document.createElement('img');
            userImage.src = "./images/js.svg";
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

        // Add event listener to the parent container for event delegation
        container.addEventListener('click', function(event) {
            const clickedElement = event.target;
            if (clickedElement.classList.contains('name-box')) {
                const userId = clickedElement.dataset.userId;
                displayUserInModal(userId);
            }
        });

    } catch (error) {
        console.error('Error displaying users:', error);
    }
}


function displayUserInModal(userId) {
    const popup = document.querySelector('.user-popup');
    const overlay = document.querySelector('.overlay');

    // Fetch user details based on userId
    getUserDetails(userId)
        .then(user => {
            const userPopupContent = `
                <div class="back">
                    <img src="./images/left.png" width="15px">
                    <p>Go back</p>
                </div>
                <div class="user-info1">
                    <div class="name-controls">
                        <div class="name-profile">
                            <div class="profile-img">
                                <img src="./images/Rectangle 1.png" alt="">
                            </div>
                            <div class="name">
                                <h6>${user.firstname} ${user.lastname}</h6>
                                <span>${user.email}</span>
                            </div>
                        </div>
                        <div class="buttons">
                            <button id="send-message">Send message</button>
                            <button id="suspend-user">Suspend User</button>
                        </div>
                    </div>
                    <div class="user-input">
                        <div class="username">
                            <span>Username</span>
                            <p>@${user.username}</p>
                        </div>
                        <div class="gender">
                            <span>Gender</span>
                            <p>${user.gender}</p>
                        </div>
                        <div class="location">
                            <span>Location</span>
                            <p>${user.location}</p>
                        </div>
                        <div class="phone">
                            <span>Phone Number</span>
                            <p><span>+234</span>${user.phone}</p>
                        </div>
                        <div class="bday">
                            <span>Birthday</span>
                            <p>${new Date(user.birthday).toDateString()}</p>
                        </div>
                    </div>
                </div>
                <div class="user-info-wallet">
                    <div class="date">
                        <p><img src="./images/calendar.png" alt=""> ${user.date_joined}</p>
                        <div class="left">
                            <p><img src="./images/download.png" alt=""> Export</p>
                            <div class="period">
                                <p>period</p>
                                <p>All time</p>
                                <img src="./images/arrowdown.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="balance">
                        <p>₦${user.wallet.balance}</p>
                    </div>
                    <div class="earn-infos">
                        <div class="total-earned">
                            <p>Total Earned</p>
                            <div class="rate">
                                <h6 id="total_payouts">N ${user.wallet.total_payouts}</h6>
                                <img src="./images/mdi_arrow-down.png" alt="">
                                <span>${user.wallet.earning_percentage}%</span>
                            </div>
                        </div>
                        <div class="total-earned">
                            <p>Total Earned <img src="./images/info.png" alt=""></p>
                            <div class="rate">
                                <h6 id="total_payouts">N ${user.wallet.total_payouts}</h6>
                                <img src="./images/mdi_arrow-down.png" alt="">
                                <span>${user.wallet.earning_percentage}%</span>
                            </div>
                        </div>
                        <div class="total-earned">
                            <p>Total Earned</p>
                            <div class="rate">
                                <h6>${user.wallet.total_earned}</h6>
                            </div>
                        </div>
                        <div class="total-earned">
                            <p>Total Earned</p>
                            <div class="rate">
                                <h6 id="total_payouts">N ${user.wallet.total_payouts}</h6>
                                <img src="./images/mdi_arrow-up.png" alt="">
                                <span style="color: green;">${user.wallet.earning_percentage}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="user-info-transaction">
                        <h4>Transaction History</h4>
                        <div class="top-nav">
                            <div class="left">
                                <p id="selected">All</span></p>
                                <p>Earners</p>
                                <p>Orders</p>
                            </div>
                            <div class="right"style="align-self: center;" >
                                <p ><img src="./images/funnel.png" alt=""> Filter </p>
                                <p ><img src="./images/sort.png" alt=""> Sort </p>
                            </div>
                        </div>
                        <div class="navigation">
                            <div class="left">
                                <p>Type</p>
                                <p>Description</p>
                            </div>
                            <p>Amount</p>
                        </div>
                        ${generateTransactionHistory(user.transactions)}
                    </div>
                </div>
            `;

            popup.innerHTML = userPopupContent;
            popup.style.display = "block";
            overlay.style.display = "block";

            // Add click event listener to go back button in the popup
            const backButton = document.querySelector('.back');
            backButton.addEventListener('click', function() {
                closeUserPopup();
            });

        })
        .catch(error => console.error('Error fetching user details:', error));
}

function getUserDetails(userId) {
    const userDetailsUrl = `${baseUrl}/users/${userId}`;

    return fetch(userDetailsUrl, {
        method: 'GET',
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
    .catch(error => {
        console.error('Error', error);
    });
}

function generateTransactionHistory(transactions) {
    let transactionHistory = '';
    transactions.forEach(transaction => {
        transactionHistory += `
            <div class="wallet-box">
                <div class="left">
                    <img src="./images/arrowleftdown.svg" alt="">
                    <div class="credit-date">
                        <p id="highlight">${transaction.type}</p>
                        <p id="date">${transaction.created_at}</p>
                    </div>
                    <p>${transaction.description}</p>
                </div>
                <div class="right">
                    <p id="highlight">${transaction.amount}</p>
                </div>
            </div>
        `;
    });

    return transactionHistory;
}

function closeUserPopup() {
    const popup = document.querySelector('.user-popup');
    const overlay = document.querySelector('.overlay');
    popup.style.display = "none";
    overlay.style.display = "none";
}





// document.addEventListener("DOMContentLoaded", function() {
//     var hamburgerMenu = document.querySelector('.hamburger');
//     var navBar = document.querySelector('.nav-bar');

//     hamburgerMenu.addEventListener('click', function() {
//         navBar.classList.toggle('active');
//     });

//     // Function to fetch and display user data
//     var data = getAllUsers();
//     // Display all users and execute the callback function once done
//     displayAllUsers(data);
// });



// const baseUrl = 'https://api.trendit3.com/api/admin';

// // get access token
// const accessToken = getCookie('accessToken');




// function getAllUsers(page=1) {
  
//   // const formData = new FormData();
//   // formData.append('item_type', 'item_type');

//   // Construct the full URL for the verification request
//   const usersUrl = `${baseUrl}/users?page=${page}`;
  
//   return fetch(usersUrl, {
//     method:'POST',
//     // body: formData,
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response=> {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .catch((error) => {
//     console.error('Error', error);
//   });
// }


// async function displayAllUsers(promise) {

//     try {

//         const response = await promise;
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
//                 displayUserInModal(user.id);
//             });

//             const nameDiv = document.createElement('div');
//             nameDiv.classList.add('name');

//             const userImage = document.createElement('img');
//             userImage.src = "./images/js.svg";
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
//             advertiseHighlight.textContent = "23"; // Assuming this value is constant for now

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

