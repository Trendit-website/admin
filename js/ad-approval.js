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
    displayAllAds(data, function() {
        // Callback function to execute after users have been displayed
        const boxes = document.querySelectorAll(".box1");
        const earnBoxes = document.querySelectorAll(".earn-container .box1");
        const popup = document.querySelector(".popup");
        const popup2 = document.querySelector(".popup2");
        const overlay = document.querySelector(".overlay");
        const overlay2 = document.querySelector(".overlay2");
        const cancelBtn = document.querySelector(".cancel-btn");
        const saveBtn = document.querySelectorAll(".save-btn");
        const approveBox = document.querySelector(".approve-box");
        const approveYesBtn = document.querySelector(".approve-box .approve-yes");
        const approveCancelBtns = document.querySelectorAll(".approve-box .cancel-btn");
        const earnInfo = document.querySelector(".earn-info");
        const goBackBtn = document.querySelector(".back");
        const inviteBtn = document.getElementById('inviteBtn');
        const inviteCancel = document.querySelectorAll('.invite-cancel');

        boxes.forEach(box => {
            box.addEventListener("click", function() {
                console.log("clicked");
                popup.style.display = "block";
                overlay.style.display = "block";
            });
        });

        earnBoxes.forEach(earnBox => {
            earnBox.addEventListener("click", function() {
                showearnInfo();
            });
        });

        cancelBtn.addEventListener("click", function() {
            popup.style.display = "none";
            overlay.style.display = "none";
        });

        saveBtn.forEach(btn => {
            btn.addEventListener("click", function() {
                showApproveBox();
            });
        });

        inviteBtn.addEventListener("click", function() {
            showApproveBox();
        });

        goBackBtn.addEventListener("click", function() {
            hideearnInfo();
        });

        approveYesBtn.addEventListener("click", function() {
            hideApproveBox();
            alert("Ad Approved!");
        });

        approveCancelBtns.forEach(cancel => {
            cancel.addEventListener("click", function() {
                hideApproveBox();
            });
        });

        
        // Event listeners for cancel buttons
        document.getElementById("earn-appeal-cancel-btn").addEventListener("click", function() {
            closeEarnAppealPopup();
        });

        document.getElementById("ad-approval-cancel-btn").addEventListener("click", function() {
            closeAdApprovalPopup();
        });

        // Event listener for the "Invite" button to show the popup
        inviteBtn.addEventListener('click', showPopup);

        // Event listener for the cancel button to hide the popup
        cancelButton.addEventListener('click', hidePopup);
    });
});


  // Function to close Earn Appeal Popup
function closeEarnAppealPopup() {
  var earnAppealPopup = document.getElementById("earn-appeal-popup");
  var overlay2 = document.querySelector(".overlay2");
  earnAppealPopup.style.display = "none";
  overlay2.style.display = "none";
}

// Function to close Ad Approval Popup
function closeAdApprovalPopup() {
  var adApprovalPopup = document.getElementById("ad-approval-popup");
  var overlay2 = document.querySelector(".overlay2");
  adApprovalPopup.style.display = "none";
  overlay2.style.display = "none";
}



  
// Function to show the popup
function showPopup() {
  overlay.style.display = 'block';
  popup.style.display = 'block';
}

// Function to hide the popup
function hidePopup() {
  overlay.style.display = 'none';
  popup.style.display = 'none';
}
  


function showearnInfo() {
    earnInfo.style.display = "block";
    overlay.style.display = "block";
}

function hideearnInfo() {
    earnInfo.style.display = "none";
    overlay2.style.display = "none";
    overlay.style.display="none";
}

function showApproveBox() {
    approveBox.style.display = "block";
    overlay2.style.display = "block";
}

function hideApproveBox() {
    approveBox.style.display = "none";
    overlay2.style.display = "none";
}


const baseUrl = 'https://api.trendit3.com/api/admin';

// get access token
const accessToken = getCookie('accessToken');


function getAllAds(page=1) {

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
                showearnInfo();
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