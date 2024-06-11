const baseUrl = 'https://api-staging.trendit3.com/api/admin';
const accessToken = getCookie('accessToken'); 
const approveBtn = document.getElementById('approve-social');
const declineBtn = document.getElementById('decline-social');

// Fetch social verification requests and user data
async function fetchSocialVerificationRequests() {
    try {
        const response = await fetch(`${baseUrl}/social_verification_requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ page: 1, per_page: 20 })
        });
        const data = await response.json();
        if (data.status_code === 200) {
            console.log("Fetched social verification requests: ", data.social_verification_requests);
            // Fetch all user data
            const usersData = await getAllUsers();
            populateSocialVerificationRequests(data.social_verification_requests, usersData.users);
            populateSocialRequests(usersData.users);
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('Error fetching requests');
    }
}

// Populate social verification requests into the HTML
function populateSocialVerificationRequests(requests, users) {
    const socialRequestsContainer = document.getElementById('social-requests');
    socialRequestsContainer.innerHTML = ''; // Clear existing content

    requests.forEach(request => {
        const user = users.find(user => user.id === parseInt(request.sender_id, 10));
        if (user) {
            const userBox = document.createElement('div');
            userBox.classList.add('name-box');
            userBox.setAttribute('id', `user-${user.id}`);

            userBox.innerHTML = `
                <div class="name">
                    <img src="${user.profile_picture || './images/default-user.png'}" alt="">
                    <div class="name-email">
                        <p id="user${user.id}-name">${user.email}</p>
                        <p id="user${user.id}-email">${user.firstname} ${user.lastname}</p>
                    </div>
                    <div class="social-account">
                        <img style="width: 40px;" src="./images/new-green.svg">
                        ${generateSocialIcons(request.type)}
                        <img src="./images/tinyright.png" alt="">
                    </div>
                </div>
            `;
            userBox.addEventListener('click', () => {
                showApprovalBox(user, request);
            });
            socialRequestsContainer.appendChild(userBox);
        }
    });
}

// Generate social icons based on linked social accounts
function generateSocialIcons(type) {
    const socialPlatforms = {
        instagram: './images/insta.png',
        facebook: './images/facebook.png',
        twitter: './images/twitter.png',
        appstore: './images/appstore.png'
        // Add more social platforms as needed
    };

    let iconsHTML = '';
    if (socialPlatforms[type]) {
        iconsHTML += `<img src="${socialPlatforms[type]}" alt="${type} account">`;
    }

    return iconsHTML;
}

// Populate social requests in the user popup
function showApprovalBox(user, request) {
    const userNameElem = document.getElementById('user-name');
    const userEmailElem = document.getElementById('user-email');
    const profilePictureElem = document.getElementById('profile-picture');
    const socialAccountsElem = document.getElementById('accounts-connected');

    if (userNameElem && userEmailElem && profilePictureElem && socialAccountsElem) {
        userNameElem.textContent = `${user.firstname} ${user.lastname}`;
        userEmailElem.textContent = user.email;
        profilePictureElem.src = user.profile_picture || './images/default-user.png';

        // Set the social accounts images and count
        socialAccountsElem.innerHTML = ''; // Clear existing content

        const linkedAccounts = user.social_accounts || []; // Assuming user.social_accounts is an array of social account types

        const socialPlatforms = {
            instagram: './images/insta.png',
            facebook: './images/facebook.png',
            twitter: './images/twitter.png',
            appstore: './images/appstore.png'
            // Add more social platforms as needed
        };

        linkedAccounts.forEach(account => {
            if (socialPlatforms[account]) {
                const img = document.createElement('img');
                img.src = socialPlatforms[account];
                img.alt = `${account} account`;
                socialAccountsElem.appendChild(img);
            }
        });

        // If there are more than 5 accounts, display a '+ n others' message
        if (linkedAccounts.length > 5) {
            const span = document.createElement('span');
            span.textContent = ` + ${linkedAccounts.length - 5} others`;
            socialAccountsElem.appendChild(span);
        }
    } else {
        console.error('One or more elements not found in the DOM');
    }

    // Display the approval box
    approvalBox.style.display = 'block';

    // Set event listeners for approval and decline buttons
    approveBtn.onclick = () => handleRequestApproval(request, true);
    declineBtn.onclick = () => handleRequestApproval(request, false);
}

// Populate social requests in the general social requests section
function populateSocialRequests(users) {
    const socialRequestsContainer = document.getElementById('general-social-requests');
    socialRequestsContainer.innerHTML = ''; // Clear existing content

    users.forEach(user => {
        const userBox = document.createElement('div');
        userBox.classList.add('name-box');
        userBox.setAttribute('id', `user-${user.id}`);

        const socialAccounts = user.social_accounts || []; // Assuming user.social_accounts is an array of social account types

        userBox.innerHTML = `
            <div class="name">
                <img src="${user.profile_picture || './images/default-user.png'}" alt="">
                <div class="name-email">
                    <p class="user-name">${user.firstname} ${user.lastname}</p>
                    <p class="user-email">${user.email}</p>
                </div>
                <div class="social-account">
                    <img style="width: 40px;" src="./images/new-green.svg">
                    ${generateSocialIconsForUser(socialAccounts)}
                    <img src="./images/tinyright.png" alt="">
                </div>
            </div>
        `;
        socialRequestsContainer.appendChild(userBox);
    });
}

// Helper function to generate social icons for a user
function generateSocialIconsForUser(socialAccounts) {
    const socialPlatforms = {
        instagram: './images/insta.png',
        facebook: './images/facebook.png',
        twitter: './images/twitter.png',
        appstore: './images/appstore.png'
        // Add more social platforms as needed
    };

    let iconsHTML = '';
    socialAccounts.slice(0, 5).forEach(account => {
        if (socialPlatforms[account]) {
            iconsHTML += `<img src="${socialPlatforms[account]}" alt="${account} account">`;
        }
    });

    if (socialAccounts.length > 5) {
        iconsHTML += `<span> + ${socialAccounts.length - 5} others</span>`;
    }

    return iconsHTML;
}

// Function to handle request approval
function handleRequestApproval(request, isApproved) {
    const endpoint = isApproved ? '/approve_social_verification_request' : '/reject_social_verification_request';
    fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            userId: request.sender_id,
            type: request.type,
            link: request.body,
            socialVerificationId: request.id
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status_code === 200) {
            request.status = isApproved ? 'approved' : 'rejected';
            updateRequestStatus(request);
            approvalBox.style.display = 'none';
        } else {
            showError(data.message);
        }
    })
    .catch(error => {
        showError('Error processing request');
    });
}

// Function to update request status
function updateRequestStatus(request) {
    const userBox = document.getElementById(`user-${request.sender_id}`);
    if (userBox) {
        const statusElement = userBox.querySelector('.status');
        if (request.status === 'approved') {
            statusElement.textContent = 'Approved';
            statusElement.style.color = 'green';
        } else if (request.status === 'rejected') {
            statusElement.textContent = 'Rejected';
            statusElement.style.color = 'red';
        }
    }
}

// Function to fetch all users data
async function getAllUsers() {
    try {
        const response = await fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        if (data.status_code === 200) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error('Error fetching user data');
    }
}

function showError(message) {
    const errorBox = document.getElementById('error-box');
    errorBox.textContent = message;
}

// Initial fetch of social verification requests
fetchSocialVerificationRequests();

// const baseUrl = 'https://api-staging.trendit3.com/api/admin';
// const accessToken = getCookie('accessToken'); 
// const approveBtn = document.getElementById('approve-social');
// const declineBtn = document.getElementById('decline-social');

// // Fetch social verification requests and user data
// async function fetchSocialVerificationRequests() {
//     try {
//         const response = await fetch(`${baseUrl}/social_verification_requests`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${accessToken}`
//             },
//             body: JSON.stringify({ page: 1, per_page: 20 })
//         });
//         const data = await response.json();
//         if (data.status_code === 200) {
//             console.log("Fetched social verification requests: ", data.social_verification_requests);
//             // Fetch all user data
//             const usersData = await getAllUsers();
//             populateSocialVerificationRequests(data.social_verification_requests, usersData.users);
//             populateSocialRequests(usersData.users);
//         } else {
//             showError(data.message);
//         }
//     } catch (error) {
//         showError('Error fetching requests');
//     }
// }

// // Populate social verification requests into the HTML
// function populateSocialVerificationRequests(requests, users) {
//     const socialRequestsContainer = document.getElementById('social-requests');
//     socialRequestsContainer.innerHTML = ''; // Clear existing content

//     requests.forEach(request => {
//         const user = users.find(user => user.id === parseInt(request.sender_id, 10));
//         if (user) {
//             const userBox = document.createElement('div');
//             userBox.classList.add('name-box');
//             userBox.setAttribute('id', `user-${user.id}`);

//             userBox.innerHTML = `
//                 <div class="name">
//                     <img src="${user.profile_picture || './images/default-user.png'}" alt="">
//                     <div class="name-email">
//                         <p class="user-name">${user.firstname} ${user.lastname}</p>
//                         <p class="user-email">${user.email}</p>
//                     </div>
//                     <div class="social-account">
//                         <img style="width: 40px;" src="./images/new-green.svg">
//                         ${generateSocialIcons(request)}
//                         <img src="./images/tinyright.png" alt="">
//                     </div>
//                 </div>
//             `;
//             userBox.addEventListener('click', () => {
//                 showApprovalBox(user, request);
//             });
//             socialRequestsContainer.appendChild(userBox);
//         }
//     });
// }

// // Populate social requests in the user popup
// function showApprovalBox(user, request) {
//     const userNameElem = document.getElementById('user-name');
//     const userEmailElem = document.getElementById('user-email');
//     const profilePictureElem = document.getElementById('profile-picture');
//     const socialAccountsElem = document.getElementById('accounts-connected');

//     if (userNameElem && userEmailElem && profilePictureElem && socialAccountsElem) {
//         userNameElem.textContent = `${user.firstname} ${user.lastname}`;
//         userEmailElem.textContent = user.email;
//         profilePictureElem.src = user.profile_picture || './images/default-user.png';

//         // Set the social accounts images and count
//         socialAccountsElem.innerHTML = ''; // Clear existing content

//         const linkedAccounts = user.social_accounts || []; // Assuming user.social_accounts is an array of social account types

//         const socialPlatforms = {
//             instagram: './images/insta.png',
//             facebook: './images/facebook.png',
//             twitter: './images/twitter.png',
//             appstore: './images/appstore.png'
//             // Add more social platforms as needed
//         };

//         linkedAccounts.forEach(account => {
//             if (socialPlatforms[account]) {
//                 const img = document.createElement('img');
//                 img.src = socialPlatforms[account];
//                 img.alt = `${account} account`;
//                 socialAccountsElem.appendChild(img);
//             }
//         });

//         // If there are more than 5 accounts, display a '+ n others' message
//         if (linkedAccounts.length > 5) {
//             const span = document.createElement('span');
//             span.textContent = ` + ${linkedAccounts.length - 5} others`;
//             socialAccountsElem.appendChild(span);
//         }
//     } else {
//         console.error('One or more elements not found in the DOM');
//     }

//     // Display the approval box
//     approvalBox.style.display = 'block';

//     // Set event listeners for approval and decline buttons
//     approveBtn.onclick = () => handleRequestApproval(request, true);
//     declineBtn.onclick = () => handleRequestApproval(request, false);
// }

// // Populate social requests in the general social requests section
// function populateSocialRequests(users) {
//     const socialRequestsContainer = document.getElementById('general-social-requests');
//     socialRequestsContainer.innerHTML = ''; // Clear existing content

//     users.forEach(user => {
//         const userBox = document.createElement('div');
//         userBox.classList.add('name-box');
//         userBox.setAttribute('id', `user-${user.id}`);

//         const socialAccounts = user.social_accounts || []; // Assuming user.social_accounts is an array of social account types

//         userBox.innerHTML = `
//             <div class="name">
//                 <img src="${user.profile_picture || './images/default-user.png'}" alt="">
//                 <div class="name-email">
//                     <p class="user-name">${user.firstname} ${user.lastname}</p>
//                     <p class="user-email">${user.email}</p>
//                 </div>
//                 <div class="social-account">
//                     <img style="width: 40px;" src="./images/new-green.svg">
//                     ${generateSocialIconsForUser(socialAccounts)}
//                     <img src="./images/tinyright.png" alt="">
//                 </div>
//             </div>
//         `;
//         socialRequestsContainer.appendChild(userBox);
//     });
// }

// // Helper function to generate social icons for a user
// function generateSocialIconsForUser(socialAccounts) {
//     const socialPlatforms = {
//         instagram: './images/insta.png',
//         facebook: './images/facebook.png',
//         twitter: './images/twitter.png',
//         appstore: './images/appstore.png'
//         // Add more social platforms as needed
//     };

//     let iconsHTML = '';
//     socialAccounts.slice(0, 5).forEach(account => {
//         if (socialPlatforms[account]) {
//             iconsHTML += `<img src="${socialPlatforms[account]}" alt="${account} account">`;
//         }
//     });

//     if (socialAccounts.length > 5) {
//         iconsHTML += `<span> + ${socialAccounts.length - 5} others</span>`;
//     }

//     return iconsHTML;
// }

// // Function to handle request approval
// function handleRequestApproval(request, isApproved) {
//     const endpoint = isApproved ? '/approve_social_verification_request' : '/reject_social_verification_request';
//     fetch(`${baseUrl}${endpoint}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//         },
//         body: JSON.stringify({
//             userId: request.sender_id,
//             type: request.type,
//             link: request.body,
//             socialVerificationId: request.id
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.status_code === 200) {
//             request.status = isApproved ? 'approved' : 'rejected';
//             updateRequestStatus(request);
//             approvalBox.style.display = 'none';
//         } else {
//             showError(data.message);
//         }
//     })
//     .catch(error => {
//         showError('Error processing request');
//     });
// }

// // Function to update request status
// function updateRequestStatus(request) {
//     const userBox = document.getElementById(`user-${request.sender_id}`);
//     if (userBox) {
//         const statusElement = userBox.querySelector('.status');
//         if (request.status === 'approved') {
//             statusElement.textContent = 'Approved';
//             statusElement.style.color = 'green';
//         } else if (request.status === 'rejected') {
//             statusElement.textContent = 'Rejected';
//             statusElement.style.color = 'red';
//         }
//     }
// }

// // Function to fetch all users data
// async function getAllUsers() {
//     try {
//         const response = await fetch(`${baseUrl}/users`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         const data = await response.json();
//         if (data.status_code === 200) {
//             return data;
//         } else {
//             throw new Error(data.message);
//         }
//     } catch (error) {
//         throw new Error('Error fetching user data');
//     }
// }

// function showError(message) {
//     const errorBox = document.getElementById('error-box');
//     errorBox.textContent = message;
// }

// // Initial fetch of social verification requests
// fetchSocialVerificationRequests();
