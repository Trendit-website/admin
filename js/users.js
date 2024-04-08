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
                displayUserInModal(user.id);
            });

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');

            const userImage = document.createElement('img');
            userImage.src = user.profile_picture || "./images/default_profile_img.jpg";
            userImage.alt = "User Image";

            const nameEmailDiv = document.createElement('div');
            nameEmailDiv.classList.add('name-email');

            const nameParagraph = document.createElement('h6');
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

async function displayUserInModal(userId) {
    const userUrl = `${baseUrl}/users/${userId}`;

    try {
        const response = await fetch(userUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const userData = await response.json();

        // Populate the user info in the popup
        const userInfoPopup = document.querySelector('.user-popup');
        userInfoPopup.classList.add('active');

        const name = document.querySelector('.user-popup .name h6');
        const email = document.querySelector('.user-popup .name span');
        const username = document.querySelector('.user-popup .username p');
        const gender = document.querySelector('.user-popup .gender p');
        const location = document.querySelector('.user-popup .location p');
        const phone = document.querySelector('.user-popup .phone p');
        const birthday = document.querySelector('.user-popup .bday p');
        const balance = document.querySelector('.user-popup .balance p');
        const totalEarned = document.querySelector('.user-popup .total-earned h6');
        const transactionsContainer = document.querySelector('.user-popup .user-info-transaction');

        name.textContent = userData.firstname + ' ' + userData.lastname;
        email.textContent = userData.email;
        username.textContent = '@' + userData.username;
        gender.textContent = userData.gender;
        location.textContent = userData.location;
        phone.textContent = '+234 ' + userData.phone;
        birthday.textContent = userData.birthday;
        balance.textContent = '₦' + userData.wallet.balance;
        totalEarned.textContent = 'N ' + userData.wallet.total_earned;

        // Clear previous transaction history
        transactionsContainer.innerHTML = '';

        // Populate transaction history
        userData.transactions.forEach(transaction => {
            const walletBox = document.createElement('div');
            walletBox.classList.add('wallet-box');

            const leftDiv = document.createElement('div');
            leftDiv.classList.add('left');

            const arrowImage = document.createElement('img');
            arrowImage.src = transaction.type === 'credit' ? "./images/arrowleftdown.svg" : "./images/arrowleftup.svg";
            arrowImage.alt = "Transaction Image";

            const creditDateDiv = document.createElement('div');
            creditDateDiv.classList.add('credit-date');

            const transactionType = document.createElement('p');
            transactionType.id = "highlight";
            transactionType.textContent = transaction.type === 'credit' ? 'Credit' : 'Debit';

            const transactionDate = document.createElement('p');
            transactionDate.id = "date";
            transactionDate.textContent = new Date(transaction.created_at).toDateString();

            creditDateDiv.appendChild(transactionType);
            creditDateDiv.appendChild(transactionDate);

            const transactionDescription = document.createElement('p');
            transactionDescription.textContent = transaction.description;

            leftDiv.appendChild(arrowImage);
            leftDiv.appendChild(creditDateDiv);
            leftDiv.appendChild(transactionDescription);

            const rightDiv = document.createElement('div');
            rightDiv.classList.add('right');

            const amount = document.createElement('p');
            amount.id = "highlight";
            amount.textContent = (transaction.type === 'credit' ? '+ ' : '- ') + '₦' + transaction.amount;

            rightDiv.appendChild(amount);

            walletBox.appendChild(leftDiv);
            walletBox.appendChild(rightDiv);

            transactionsContainer.appendChild(walletBox);
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Close user popup
const closeUserPopup = document.querySelector('.user-popup .back');
closeUserPopup.addEventListener('click', function() {
    const userInfoPopup = document.querySelector('.user-popup');
    userInfoPopup.classList.remove('active');
});


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

