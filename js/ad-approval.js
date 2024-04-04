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
});



// Function to show popup and overlay when a box is clicked
function showAdInfo() {
    popup.style.display = "block";
    overlay.style.display = "block";
}

// Function to close popup when "X" button is clicked
function closeAdPopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
}

// Function to show approve box when "Approve Ad" button is clicked
function showApproveBox() {
    earnAppealPopup.style.display = "block";
    overlay2.style.display = "block";
}

// Function to close approve box when "Cancel" button is clicked
function closeApproveBox() {
    earnAppealPopup.style.display = "none";
    overlay2.style.display = "none";
}


function getAllAds(page=1) {

    const baseUrl = 'https://api.trendit3.com/api/admin';

    // get access token
    const accessToken = getCookie('accessToken');
  // Construct the full URL for the verification request
  const usersUrl = `${baseUrl}/tasks?page=${page}`;
  
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
            adBox.addEventListener("click", function() {
                console.log("clicked");
                popup.style.display = "block";
                overlay.style.display = "block";
                showApproveBox();
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

