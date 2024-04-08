document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and display user data
    async function getAllUsers(page = 1) {
        const baseUrl = 'https://api.trendit35.com/api/admin';
        const accessToken = getCookie('accessToken');

        const usersUrl = `${baseUrl}/users?page=${page}`;

        try {
            const response = await fetch(usersUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async function displayAllUsers() {
        try {
            const response = await getAllUsers();
            const users = response.users;

            if (!users || users.length === 0) {
                console.log("No users to display.");
                return;
            }

            const container = document.getElementById('users-container');

            users.forEach(user => {
                const nameBox = document.createElement('div');
                nameBox.classList.add('name-box');
                nameBox.dataset.userId = user.id;
                nameBox.addEventListener('click', function() {
                    displayUserInModal(user);
                });

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('name');

                const userImage = document.createElement('img');
                userImage.src = user.profile_image_url || './images/default_profile_img.jpg';
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

                nameBox.appendChild(nameDiv);
                container.appendChild(nameBox);
            });

        } catch (error) {
            console.error('Error displaying users:', error);
        }
    }

    async function displayUserInModal(user) {
        try {
            const userPopup = document.querySelector('.user-popup');
            userPopup.innerHTML = ''; // Clear previous content

            const backDiv = document.createElement('div');
            backDiv.classList.add('back');
            backDiv.innerHTML = `
                <img src="./images/left.png" width="15px">
                <p>Go back</p>
            `;
            backDiv.addEventListener('click', function() {
                userPopup.classList.remove('active');
            });

            const userInfoDiv = document.createElement('div');
            userInfoDiv.classList.add('user-info1');

            const nameControlsDiv = document.createElement('div');
            nameControlsDiv.classList.add('name-controls');

            const nameProfileDiv = document.createElement('div');
            nameProfileDiv.classList.add('name-profile');

            const profileImgDiv = document.createElement('div');
            profileImgDiv.classList.add('profile-img');

            const profileImage = document.createElement('img');
            profileImage.src = user.profile_image_url || './images/default_profile_img.jpg';
            profileImage.alt = 'Profile Image';

            profileImgDiv.appendChild(profileImage);

            const nameInfoDiv = document.createElement('div');
            nameInfoDiv.classList.add('name');

            const nameHeader = document.createElement('h6');
            nameHeader.textContent = `${user.firstname} ${user.lastname}`;

            const emailSpan = document.createElement('span');
            emailSpan.textContent = user.email;

            nameInfoDiv.appendChild(nameHeader);
            nameInfoDiv.appendChild(emailSpan);

            nameProfileDiv.appendChild(profileImgDiv);
            nameProfileDiv.appendChild(nameInfoDiv);

            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons');

            const sendMessageBtn = document.createElement('button');
            sendMessageBtn.id = 'send-message';
            sendMessageBtn.textContent = 'Send message';

            const suspendUserBtn = document.createElement('button');
            suspendUserBtn.id = 'suspend-user';
            suspendUserBtn.textContent = 'Suspend User';

            buttonsDiv.appendChild(sendMessageBtn);
            buttonsDiv.appendChild(suspendUserBtn);

            nameControlsDiv.appendChild(nameProfileDiv);
            nameControlsDiv.appendChild(buttonsDiv);

            const userInputDiv = document.createElement('div');
            userInputDiv.classList.add('user-input');

            const usernameDiv = document.createElement('div');
            usernameDiv.classList.add('username');
            usernameDiv.innerHTML = `
                <span>Username</span>
                <p>@${user.username}</p>
            `;

            const genderDiv = document.createElement('div');
            genderDiv.classList.add('gender');
            genderDiv.innerHTML = `
                <span>Gender</span>
                <p>${user.gender}</p>
            `;

            const locationDiv = document.createElement('div');
            locationDiv.classList.add('location');
            locationDiv.innerHTML = `
                <span>Location</span>
                <p>${user.location}</p>
            `;

            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('phone');
            phoneDiv.innerHTML = `
                <span>Phone Number</span>
                <p><span>+${user.phone_code}</span>${user.phone}</p>
            `;

            const bdayDiv = document.createElement('div');
            bdayDiv.classList.add('bday');
            bdayDiv.innerHTML = `
                <span>Birthday</span>
                <p>${user.birthday}</p>
            `;

            userInputDiv.appendChild(usernameDiv);
            userInputDiv.appendChild(genderDiv);
            userInputDiv.appendChild(locationDiv);
            userInputDiv.appendChild(phoneDiv);
            userInputDiv.appendChild(bdayDiv);

            userInfoDiv.appendChild(nameControlsDiv);
            userInfoDiv.appendChild(userInputDiv);

            userPopup.appendChild(backDiv);
            userPopup.appendChild(userInfoDiv);

            userPopup.classList.add('active');

        } catch (error) {
            console.error('Error displaying user info:', error);
        }
    }

    // Initial display of all users
    displayAllUsers();
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

