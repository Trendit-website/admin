document.addEventListener("DOMContentLoaded", function() {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');

    hamburgerMenu.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });

    // Function to fetch and display user data
    var data = getDashboardData();
    // Display all users and execute the callback function once done
    displayDashboardData(data);
});



const baseUrl = 'https://api.trendit3.com/api/admin';

// get access token
const accessToken = getCookie('accessToken');


function getDashboardData() {
  
  // const formData = new FormData();
  // formData.append('item_type', 'item_type');

  // Construct the full URL for the verification request
  const usersUrl = `${baseUrl}/dashboard_data`;
  
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



async function displayDashboardData(promise) {

    try {

        const response = await promise;
        const totalPayouts = response.total_payouts;
        const totalReceivedPayments = response.total_received_payments
        const receivedPaymentsPerMonth = response.recieved_payments_per_month
        const payoutsPerMonth = response.payouts_per_month
        const paymentActivitiesPerMonth = response.payment_activities_per_month
        const totalEarners = response.total_earners
        const totalAdvertisers = response.total_advertisers
        const totalApprovedTasks = response.total_approved_tasks


        // Check if the respose array exists and is not empty
        if (!response || response.length === 0) {
            console.log("No data to display.");
            return; // Exit the function if there is no data
        }

        // Get the container where the user information will be displayed
        var total_payouts = document.getElementById('total_payouts');
        var total_received_payments = document.getElementById('total_received_payments');
        var total_advertisers = document.getElementById('total_advertisers');
        var total_earners = document.getElementById('total_earners');
        var total_approved_tasks = document.getElementById('total_approved_tasks');


        total_payouts.textContent = `₦${totalPayouts.toLocaleString()}`;
        total_received_payments.textContent =  `₦${totalReceivedPayments.toLocaleString()}`;
        total_earners.textContent = `${totalEarners.toLocaleString()}`;
        total_advertisers.textContent = `${totalAdvertisers.toLocaleString()}`;
        total_approved_tasks = `${totalApprovedTasks.toLocaleString()}`;

        console.log(response)

        
    } catch (error) {
        console.error('Error displaying data:', error);
    }

}
