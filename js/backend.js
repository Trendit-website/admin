const baseUrl = 'https://api-staging.trendit3.com/api/admin';

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
    threshold: 0.2 // Trigger when 50% of the target is visible
};

let currentPage = 2;
let isLoading = false;

const observer = new IntersectionObserver(async (entries, observer) => {
    entries.forEach(async entry => {
        if (entry.isIntersecting && !isLoading) {
            isLoading = true;
            try {
                // Assuming getAllUsers is asynchronous and returns a Promise
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

