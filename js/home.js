document.addEventListener("DOMContentLoaded", async function() {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');

    hamburgerMenu.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });

    var dataPromise = getDashboardData();
    // Wait for the data to be resolved before setting up the click event listeners
    displayDashboardData(dataPromise);

    var dashboardData = await convertData(dataPromise); 

    // Make sure boxIds is defined somewhere in your script
    Object.keys(boxIds).forEach(boxId => {
        const box = document.getElementById(boxId);
        box.addEventListener('click', () => {
            if (!dashboardData[boxId]) {
                console.warn(`No data available for boxId: ${boxId}`);
                return;
            }
            const categories = getChartIndices(dataPromise);
            const data = Object.values(dashboardData[boxId]);
            if (categories && data) {
                barChart.updateSeries([{data: data}]);
            }
        });
    });

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();


    document.getElementById('share').addEventListener('click', shareDashboard);
    document.getElementById('print').addEventListener('click', printDashboard);
    document.getElementById('export').addEventListener('click', exportDashboard);

    // Dropdown functionality
    const dropdownTrigger = document.getElementById('dropdown-trigger');
    const dropdownMenu = document.getElementById('dropdown-menu');

    dropdownTrigger.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', async (event) => {
            const period = event.target.getAttribute('data-period');
            dropdownTrigger.innerHTML = `${event.target.innerText} <img src="/images/arrowdown.png" alt="">`;
            dropdownMenu.style.display = 'none';
            await updateChart(period);
        });
    });

    async function updateChart(period) {
        // Fetch data for the selected period and update the chart
        var dataPromise = getDashboardDataForPeriod(period); // Modify this function to fetch data for the selected period
        var dashboardData = await convertData(dataPromise);
        barChart.updateSeries([{ data: dashboardData.totalPayouts }]); // Example: update with totalPayouts data
    }
});

// Example function to fetch data for the selected period
async function getDashboardDataForPeriod(period) {
    const url = `${baseUrl}/dashboard_data?period=${period}`; // Modify the API endpoint to accept period as a query parameter
    const response = await fetch(url, {
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
}

const boxIds = {
    selected: 0,
    totalPayouts: 1,
    noOfEarners: 2,
    noOfAdvertisers: 3,
    noOfApprovedAds: 4,
    noOfAffiliateResell: 5,
};


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

  // commented out this part to let any errors propagate

  // .catch((error) => {
  //   console.error('Error', error);
  // });
}


async function getChartIndices(promise) {
    try {
        const data = await promise;
        if (!data) { // Check if data is null or undefined
            console.error('Received no data');
            return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
        }
        var indices = Object.keys(data.payment_activities_per_month || {});
        console.log(indices);
        return indices;
    } catch (error) {
        console.error('Error converting data:', error);
    }
}


async function convertData(promise) {
    try {
        const data = await promise;
        if (!data) { // Check if data is null or undefined
            console.error('Received no data');
            return {
                'noOfEarners': [],
                'noOfAdvertisers': [],
                'noOfApprovedAds': []
            };
        }
        var boxData = {
            'totalPayouts':Object.values(data.payouts_per_month || {}),
            'noOfEarners': Object.values(data.payment_activities_per_month || {}),
            'noOfAdvertisers': Object.values(data.payouts_per_month || {}),
            'noOfApprovedAds': Object.values(data.recieved_payments_per_month || {})
        };
        console.log(boxData);
        return boxData;
    } catch (error) {
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


function generateRandomData() {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 200));
}


function getLast12Months() {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    const date = new Date();
    const currentMonth = date.getMonth(); // getMonth() returns a zero-based index, 0 for January, 11 for December

    let last12Months = [];
    for (let i = 1; i <= 12; i++) {
        // Calculate month index
        const monthIndex = (currentMonth + i) % 12;
        // Add the month to the list
        last12Months.push(months[monthIndex]);
    }
    
    return last12Months;
}


var barChartOptions = {
    series: [{
        data: generateRandomData()
    }],
    chart: {
        type: 'bar',
        height: 350,
        toolbar: {
            show: false
        },
    },
    colors: ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#FFD0FE'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '75%',
            distributed: true,
            dataLabels: {
                position: 'bottom',
            },
        }
    },
    dataLabels: {
        enabled: true,
        offsetY: 5,
        style: {
            fontSize: '12px',
            fontWeight: '100',
            colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#000']
        }
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: getLast12Months(),
        labels: {
            style: {
                colors: '#b1b1b1',
                fontSize: '14px',
                fontWeight: '500'
            },
        },
        axisBorder: {
            show: true,
            color: '#000',
            height: 0.5,
        },
        axisTicks: {
            show: false,
        }
    },
    yaxis: {
        min: 0,
        max: 250,
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: true,
            style: {
                colors: '#b1b1b1',
                fontSize: '12px',
                fontWeight: 500,
            },
            formatter: function(val) {
                return val.toFixed(0);
            }
        },
    },
    tooltip: {
        enabled: true,
        y: {
            formatter: function(val) {
                return "Value: " + val;
            },
        },
        style: {
            background: '#fff',
            color: '#000',
        },
    },
};

function shareDashboard() {
    if (navigator.share) {
        navigator.share({
            title: 'Dashboard Data',
            text: 'Check out this dashboard data!',
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(console.error);
    } else {
        alert('Web Share API is not supported in your browser.');
    }
}

function printDashboard() {
    var overviewSection = document.getElementById('overview');
    var barChartSection = document.getElementById('bar-chart');

    var printContents = overviewSection.innerHTML + barChartSection.innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
function exportDashboard() {
    // Convert data to CSV format
    const data = [
        ['Metric', 'Value'],
        ['Total Payouts', document.getElementById('total_payouts').textContent],
        ['Total Received Payments', document.getElementById('total_received_payments').textContent],
        ['Total Earners', document.getElementById('total_earners').textContent],
        ['Total Advertisers', document.getElementById('total_advertisers').textContent],
        ['Total Approved Tasks', document.getElementById('total_approved_tasks').textContent]
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(rowArray => {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_data.csv");
    document.body.appendChild(link);

    link.click();
}