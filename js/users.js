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


function displayUserPopup(user) {
    const overlay = document.querySelector('.overlay');
    const userPopup = document.querySelector('.user-popup');
  
    // Populate the user info in the popup
    const profileImg = userPopup.querySelector('.profile-img img');
    const name = userPopup.querySelector('.name h6');
    const email = userPopup.querySelector('.name span');
    const username = userPopup.querySelector('.username p');
    const gender = userPopup.querySelector('.gender p');
    const location = userPopup.querySelector('.location p');
    const phoneNumber = userPopup.querySelector('.phone p');
    const birthday = userPopup.querySelector('.bday p');
  
    profileImg.src = user.profile_image_url;
    name.textContent = `${user.firstname} ${user.lastname}`;
    email.textContent = user.email;
    username.textContent = `@${user.username}`;
    gender.textContent = user.gender;
    location.textContent = user.location;
    phoneNumber.textContent = `+${user.phone_country_code}${user.phone_number}`;
    birthday.textContent = user.birthday;
  
    // Show the overlay and user popup
    overlay.style.display = 'block';
    userPopup.style.display = 'block';
  
    // Back button functionality
    const goBackBtn = userPopup.querySelector('.back');
    goBackBtn.addEventListener('click', function() {
      overlay.style.display = 'none';
      userPopup.style.display = 'none';
    });
  }
  
  function getAllUsers(page = 1) {
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
    .catch(error => {
      console.error('Error', error);
    });
  }
  
  async function displayAllUsers(promise) {
    try {
      const response = await promise;
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
          getUserDetails(user.id);
        });
  
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
  
        const userImage = document.createElement('img');
        userImage.src = user.profile_image_url;
        userImage.alt = "User Image";
  
        const nameEmailDiv = document.createElement('div');
        nameEmailDiv.classList.add('name-email');
  
        const nameParagraph = document.createElement('p');
        nameParagraph.id = "highlight";
        nameParagraph.textContent = `${user.firstname} ${user.lastname}`;
  
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
        dateParagraph.textContent = new Date(user.date_joined).toDateString();
  
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
  
  async function getUserDetails(userId) {
    const userDetailsUrl = `${baseUrl}/user/${userId}`;
  
    try {
      const response = await fetch(userDetailsUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const userDetails = await response.json();
  
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  
  // Intersection Observer setup
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  let currentPage = 2;
  let isLoading = false;
  
  const observer = new IntersectionObserver(async (entries, observer) => {
    entries.forEach(async entry => {
      if (entry.isIntersecting && !isLoading) {
        isLoading = true;
        try {
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








// // Intersection Observer setup
// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.2 // Trigger when 50% of the target is visible
// };

// let currentPage = 2;
// let isLoading = false;

// const observer = new IntersectionObserver(async (entries, observer) => {
//     entries.forEach(async entry => {
//         if (entry.isIntersecting && !isLoading) {
//             isLoading = true;
//             try {
//                 // getAllUsers is asynchronous and returns a Promise
//                 var data = await getAllUsers(currentPage);
//                 displayAllUsers(data);
//                 currentPage++;
//             } catch (error) {
//                 console.error('Failed to load new users:', error);
//             } finally {
//                 isLoading = false;
//             }
//         }
//     });
// }, options);

// observer.observe(document.getElementById('load-more-trigger'));

