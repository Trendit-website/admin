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

    var dashboardData = convertData(data);
    console.log(dashboardData);

    Object.keys(boxIds).forEach(boxId => {
        const box = document.getElementById(boxId);
        box.addEventListener('click', () => {
            // Assume the boxId matches the key in the dashboardData
            const { categories, data } = getDataForChart(boxId, dashboardData);
            barChart.updateOptions({
                xaxis: { categories: categories },
                series: [{ data: data }]
            }, true, true);
        });
    });

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();
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


async function convertData(promise){
    try {
        const data = await promise;
        const boxData = {
            'noOfEarners': fillMissingMonths(data.payment_activities_per_month),
            'noOfAdvertisers': fillMissingMonths(data.payouts_per_month),
            'noOfApprovedAds': fillMissingMonths(data.recieved_payments_per_month)
        };
        console.log(boxData);
        return boxData;
    } catch(error) {
        console.error('Error converting data:', error);        
    }
}

function fillMissingMonths(data) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based index

    // Create an object to store the data for 12 months
    const filledData = {};
    
    // Start filling from the current month backward
    for (let i = currentMonth; i > 0; i--) {
        const month = `${currentYear}-${i.toString().padStart(2, '0')}`; // Format the month as YYYY-MM
        filledData[month] = data && data[month] ? data[month] : 0; // If data for the month is available, use it; otherwise, set to 0
    }

    // Fill in the remaining months from the previous year if necessary
    for (let i = 12; i > currentMonth; i--) {
        const month = `${currentYear - 1}-${i.toString().padStart(2, '0')}`; // Format the month as YYYY-MM
        filledData[month] = data && data[month] ? data[month] : 0; // If data for the month is available, use it; otherwise, set to 0
    }

    return filledData;
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
        total_approved_tasks.textContent = `${totalApprovedTasks.toLocaleString()}`;

        console.log(response)

        
    } catch (error) {
        console.error('Error displaying data:', error);
    }

}
