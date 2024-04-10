//HEAD
//const { getAllUsers, displayAllUsers } = require('./backend.js');


// const { getAllUsers, displayAllUsers } = require('./backend.js');
// import { getAllUsers, displayAllUsers } from './backend.js';
    
//34a54bd75ca4415993cf00f7de1873ff7acb54a8


document.addEventListener("DOMContentLoaded", function() {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');

    hamburgerMenu.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });

    // Function to fetch and display user data
    var data = getAllAds();
    // Display all users and execute the callback function once done
    displayAllAds(data);

    // Add click event listeners to box1 elements
    const box1Elements = document.querySelectorAll('.box1');
    box1Elements.forEach(box => {
        box.addEventListener('click', function() {
            const taskId = box.getAttribute('data-task-id');
            getTaskById(taskId)
                .then(task => showTaskPopup(task))
                .catch(error => console.error('Error getting task by ID:', error));
        });
    });

    // Add click event listener to approve button in the popup
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('save-btn')) {
            const taskId = event.target.getAttribute('data-task-id');
            approveTask(taskId)
                .then(response => {
                    console.log(response.message);
                    showApproveBox();
                    closeAdPopup();
                })
                .catch(error => console.error('Error approving task:', error));
        }
    });

    // Add click event listener to cancel buttons in the popup
    const cancelPopupButtons = document.querySelectorAll('.cancel-btn');
    cancelPopupButtons.forEach(cancelBtn => {
        cancelBtn.addEventListener('click', function() {
            closeAdPopup();
        });
    });

    // Add click event listeners to cancel buttons in approve box
    const cancelApproveButtons = document.querySelectorAll('.approve-cancel');
    cancelApproveButtons.forEach(cancelBtn => {
        cancelBtn.addEventListener('click', function() {
            closeApproveBox();
        });
    });
    

    // Add click event listener to "Yes, Approve" button in the approve box
    const yesApproveButton = document.querySelector('.approve-yes');
    yesApproveButton.addEventListener('click', function() {
        const taskId = document.querySelector('.approve-box').getAttribute('data-task-id');
        approveTask(taskId)
            .then(response => {
                console.log(response.message);
                closeApproveBox();
            })
            .catch(error => console.error('Error approving task:', error));
    });
});

function showTaskPopup(task) {
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('.overlay');

    // Populate popup with task details
    const taskDate = new Date(task.date_created).toLocaleString('en-US', { timeZone: 'GMT' });
    const taskDescription = task.caption ? task.caption : `Like and follow ${task.platform} business pages`;
    const taskEarning = `${task.total_allocated} per ${task.goal}`;

    const popupContent = `
        <button class="cancel-btn">&#10006;</button>
        <div class="popup-box">
            <div class="left">
                <span>${taskDate}</span>
                <p style="font-size: 20px;">${taskDescription}</p>
                <div class="earning">
                    <img src="./images/wallet.png" width="9px">
                    <span>Earning:</span>
                    <p>${taskEarning}</p>
                </div>
            </div>
            <img src="./images/${task.platform}.png" width="300px">
        </div>
        <div class="info">
            <!-- Populate with task details as needed -->
        </div>
        <!-- Save and Cancel buttons -->
        <div class="checkout">
            <span>Total Paid</span>
            <p>${task.total_allocated}</p>
            <button class="save-btn" data-task-id="${task.id}">Approve Ad &#x1F5F8;</button>
        </div>
    `;

    popup.innerHTML = popupContent;
    popup.style.display = "block";
    overlay.style.display = "block";

    // Add click event listener to close button in the popup
    const closeButton = document.querySelector('.cancel-btn');
    closeButton.addEventListener('click', function() {
        closeAdPopup();
    });
}

function closeAdPopup() {
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('.overlay');
    popup.style.display = "none";
    overlay.style.display = "none";
}

function getAllAds(page=1) {
    const baseUrl = 'https://api.trendit3.com/api/admin';
    const accessToken = getCookie('accessToken');
    const tasksUrl = `${baseUrl}/tasks?page=${page}`;
  
    return fetch(tasksUrl, {
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

async function displayAllAds(promise) {

    try {
        const response = await promise;
        const data = response.tasks;

        // Check if the data array exists and is not empty
        if (!data || data.length === 0) {
            console.log("No ads to display.");
            return; // Exit the function if there are no ads
        }

        const adsContainer = document.getElementById('earn-container');

        data.forEach(task => {
            const adBox = document.createElement('div');
            adBox.classList.add('box1');
            adBox.setAttribute('data-task-id', task.id); // Set task ID as attribute

            adBox.addEventListener("click", function() {
                console.log("clicked");
                showTaskPopup(task);
            });

            const statusDiv = document.createElement('div');
            statusDiv.classList.add('pending');

            const platformImage = document.createElement('img');
            platformImage.src = `./images/${task.platform}.png`;
            platformImage.alt = task.platform;

            const statusParagraph = document.createElement('p');
            statusParagraph.textContent = task.status.charAt(0).toUpperCase() + task.status.slice(1); // Capitalize first letter

            statusDiv.appendChild(platformImage);
            statusDiv.appendChild(statusParagraph);

            const descriptionParagraph = document.createElement('p');
            if (task.caption) {
                descriptionParagraph.textContent = task.caption;
            } else {
                descriptionParagraph.textContent = `Like and follow ${task.platform} business pages`;
            }

            const dateSpan = document.createElement('span');
            dateSpan.textContent = new Date(task.date_created).toLocaleString('en-US', { timeZone: 'GMT' }); // Convert to local time

            const earningDiv = document.createElement('div');
            earningDiv.classList.add('earning');

            const earningImage = document.createElement('img');
            earningImage.src = "./images/wallet.png";
            earningImage.width = "9";

            const earningSpan = document.createElement('span');
            earningSpan.textContent = 'Earning:';

            const earningParagraph = document.createElement('p');
            earningParagraph.textContent = task.total_allocated + ' per ' + task.goal;

            earningDiv.appendChild(earningImage);
            earningDiv.appendChild(earningSpan);
            earningDiv.appendChild(earningParagraph);

            adBox.appendChild(statusDiv);
            adBox.appendChild(descriptionParagraph);
            adBox.appendChild(dateSpan);
            adBox.appendChild(earningDiv);

            adsContainer.appendChild(adBox);
        });
    } catch (error) {
        console.error('Error displaying ads:', error);
    }
}

function getTaskById(taskId) {
    const baseUrl = 'https://api.trendit3.com/api/admin';
    const accessToken = getCookie('accessToken');
    const taskUrl = `${baseUrl}/tasks/${taskId}`;
  
    return fetch(taskUrl, {
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

function approveTask(taskId) {
    const baseUrl = 'https://api.trendit3.com/api/admin';
    const accessToken = getCookie('accessToken');
    const approveUrl = `${baseUrl}/approve-task/${taskId}`;
  
    return fetch(approveUrl, {
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

function showApproveBox() {
    const approveBox = document.querySelector('.approve-box');
    const overlay2 = document.querySelector('.overlay2');

    approveBox.style.display = "block";
    overlay2.style.display = "block";
}

function closeApproveBox() {
    const approveBox = document.querySelector('.approve-box');
    const overlay2 = document.querySelector('.overlay2');

    approveBox.style.display = "none";
    overlay2.style.display = "none";
}




// document.addEventListener("DOMContentLoaded", function() {
//     var hamburgerMenu = document.querySelector('.hamburger');
//     var navBar = document.querySelector('.nav-bar');

//     hamburgerMenu.addEventListener('click', function() {
//         navBar.classList.toggle('active');
//     });

//     // Function to fetch and display user data
//     var data = getAllAds();
//     // Display all users and execute the callback function once done
//     displayAllAds(data);
// });


// function showAdInfo() {

// }


// function closeAdPopup(){

// }



// function getAllAds(page=1) {

//     const baseUrl = 'https://api.trendit3.com/api/admin';

//     // get access token
//     const accessToken = getCookie('accessToken');
//   // Construct the full URL for the verification request
//   const usersUrl = `${baseUrl}/tasks?page=${page}`;
  
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



// async function displayAllAds(promise) {

//     try {
//         const response = await promise;
//         const data = response.tasks;

//         // Check if the data array exists and is not empty
//         if (!data || data.length === 0) {
//             console.log("No ads to display.");
//             return; // Exit the function if there are no ads
//         }

//         const adsContainer = document.getElementById('earn-container');

//         data.forEach(task => {
//             const adBox = document.createElement('div');
//             adBox.classList.add('box1');
//             adBox.addEventListener("click", function() {
//                 console.log("clicked");
//                 popup.style.display = "block";
//                 overlay.style.display = "block";
//                 showApproveBox();
//             });

//             const statusDiv = document.createElement('div');
//             statusDiv.classList.add('pending');

//             const platformImage = document.createElement('img');
//             platformImage.src = `./images/${task.platform}.png`;
//             platformImage.alt = task.platform;

//             const statusParagraph = document.createElement('p');
//             statusParagraph.textContent = task.status.charAt(0).toUpperCase() + task.status.slice(1); // Capitalize first letter

//             statusDiv.appendChild(platformImage);
//             statusDiv.appendChild(statusParagraph);

//             const descriptionParagraph = document.createElement('p');
//             if (task.caption) {
//                 descriptionParagraph.textContent = task.caption;
//             } else {
//                 descriptionParagraph.textContent = `Like and follow ${task.platform} business pages`;
//             }

//             const dateSpan = document.createElement('span');
//             dateSpan.textContent = new Date(task.date_created).toLocaleString('en-US', { timeZone: 'GMT' }); // Convert to local time

//             const earningDiv = document.createElement('div');
//             earningDiv.classList.add('earning');

//             const earningImage = document.createElement('img');
//             earningImage.src = "./images/wallet.png";
//             earningImage.width = "9";

//             const earningSpan = document.createElement('span');
//             earningSpan.textContent = 'Earning:';

//             const earningParagraph = document.createElement('p');
//             earningParagraph.textContent = task.total_allocated + ' per ' + task.goal;

//             earningDiv.appendChild(earningImage);
//             earningDiv.appendChild(earningSpan);
//             earningDiv.appendChild(earningParagraph);

//             adBox.appendChild(statusDiv);
//             adBox.appendChild(descriptionParagraph);
//             adBox.appendChild(dateSpan);
//             adBox.appendChild(earningDiv);

//             adsContainer.appendChild(adBox);
//         });
//     } catch (error) {
//         console.error('Error displaying ads:', error);
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
                // getAllAds is asynchronous and returns a Promise
                var data = await getAllAds(currentPage);
                displayAllAds(data);
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

