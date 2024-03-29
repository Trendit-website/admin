const baseUrl = 'https://api.trendit3.com/api/admin';
const accessToken = localStorage.getItem('accessToken');


function getAllUsers() {
  
  // const formData = new FormData();
  // formData.append('item_type', 'item_type');

  // Construct the full URL for the verification request
  const usersUrl = `${baseUrl}/users`;
  
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

        // Get the container where the user information will be displayed
        const container = document.getElementById('users-container');

        // Loop through each user in the response
        users.forEach(user => {
            // Create elements for the user information
            const nameBox = document.createElement('div');
            nameBox.classList.add('name-box');

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

    } catch (error) {
        console.error('Error displaying users:', error);
    }

}


function createAdmin(email) {
  
  const formData = new FormData();
  formData.append('email', email);

  // Construct the full URL for the verification request
  const createAdminUrl = `${baseUrl}/create_junior_admin`;
  
  fetch(createAdminUrl, {
    method:'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response=> {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // subject to change
    return response.json();
    
  })
  .catch((error) => {
    console.error('Error', error);
  });
}





//------------------------------------------ NOT Ready ----------------------------------------------//





// Intersection Observer setup
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the target is visible
};

let currentPage = 1;
let isLoading = false;

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading) {
            // Load more data when intersection occurs
            isLoading = true;
            loadMoreUsers(currentPage);
        }
    });
}, options);

observer.observe(document.getElementById('load-more-trigger'));

// Function to load more users
function loadMoreUsers(page) {
    // Simulated asynchronous data loading
    setTimeout(() => {
        // Assuming you have a function to fetch more data, let's call it fetchMoreUsers
        fetchMoreUsers(page).then(response => {
            displayUsers(response); // Display the newly loaded users
            currentPage++; // Increment the current page counter
            isLoading = false; // Reset loading state
        }).catch(error => {
            console.error('Error loading more users:', error);
            isLoading = false; // Reset loading state even in case of error
        });
    }, 1000); // Simulated delay for loading
}

// Sample function to fetch more users (replace this with your actual function)
function fetchMoreUsers(page) {
    // Simulated asynchronous fetch
    return new Promise((resolve, reject) => {
        // Simulated JSON response
        const jsonResponse = {
            "message": "More users fetched successfully",
            "status": "success",
            "status_code": 200,
            "total": 2,
            "users": [
                {
                    // User data
                },
                {
                    // Another user data
                }
            ]
        };
        resolve(jsonResponse);
    });
}


//------------------------------------------ NOT Ready ----------------------------------------------//



//-------------------------- Export Functions ------------------------------------//

// module.exports = { getAllUsers, displayAllUsers };
