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
       // Set up click event listeners for boxes
       Object.keys(boxIds).forEach(boxId => {
        const box = document.getElementById(boxId);
        box.addEventListener('click', async () => {
            const apiKey = boxIds[boxId];
            if (!dashboardData[apiKey]) {
                console.warn(`No data available for boxId: ${boxId}`);
                return;
            }
            const categories = await getChartIndices(dataPromise);
            const data = Object.values(dashboardData[apiKey]);
            if (categories && data) {
                barChart.updateSeries([{ data: data }]);
            }
        });
    });

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();


    document.getElementById('share').addEventListener('click', shareDashboard);
    document.getElementById('print').addEventListener('click', printDashboard);
    document.getElementById('export').addEventListener('click', exportDashboardAsPhoto);

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

            // Update the chart for the selected period
            await updateChart(period, dashboardData[selectedBoxId]);
        });
    });
    async function updateChart(period) {
        try {
            // Fetch data for the selected period and update the chart
            const dataPromise = getDashboardDataForPeriod(period);
            const dashboardData = await convertData(dataPromise);
            
            // Get the categories (month names)
            const categories = await getChartIndices(dataPromise);
    
            // Update the bar chart with the selected period data
            barChart.updateOptions({
                xaxis: {
                    categories: categories
                }
            });
    
            // Update the series data based on the selected period
            const seriesData = {
                data: Object.values(dashboardData.payment_activities_per_month || {})
            };
    
            barChart.updateSeries([seriesData]);
    
        } catch (error) {
            console.error('Error updating chart:', error);
        }
    }

     // Search functionality
     const searchInput = document.getElementById('search-box');
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();
        performSearch(searchText);
    });

    // Set up click event listener for bell icon
    const bellIcon = document.getElementById('bell-icon');
    bellIcon.addEventListener('click', function() {
        // Implement bell notification functionality here
        alert("Bell icon clicked. Show notifications.");
    });
 
     // Dropdown menu functionality
     const dropdownArrow = document.getElementById('dropdown-arrow');
     const dropdownMenu2 = document.getElementById('dropdown-menu2');
     dropdownArrow.addEventListener('click', function() {
         dropdownMenu.classList.toggle('active');
     });



});

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
    totalPayouts: 'payouts_per_month',
    noOfEarners: 'payment_activities_per_month',
    noOfAdvertisers: 'payouts_per_month',
    noOfApprovedAds: 'recieved_payments_per_month',
    noOfAffiliateResell: '', // Replace with actual API key
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
                'payouts_per_month': [],
                'payment_activities_per_month': [],
                'recieved_payments_per_month': []
            };
        }
        var boxData = {
            'payouts_per_month': fillMissingMonths(data.payouts_per_month || {}),
            'payment_activities_per_month': fillMissingMonths(data.payment_activities_per_month || {}),
            'recieved_payments_per_month': fillMissingMonths(data.recieved_payments_per_month || {})
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
        const totalReceivedPayments = response.total_received_payments;
        const totalEarners = response.total_earners;
        const totalAdvertisers = response.total_advertisers;
        const totalApprovedTasks = response.total_approved_tasks;

        // Check if the response exists and is not empty
        if (!response || Object.keys(response).length === 0) {
            console.log("No data to display.");
            return; // Exit the function if there is no data
        }

        // Get the container where the user information will be displayed
        var totalPayoutsElement = document.getElementById('total_payouts');
        var totalReceivedPaymentsElement = document.getElementById('total_received_payments');
        var totalAdvertisersElement = document.getElementById('total_advertisers');
        var totalEarnersElement = document.getElementById('total_earners');
        var totalApprovedTasksElement = document.getElementById('total_approved_tasks');

        totalPayoutsElement.textContent = `₦${totalPayouts.toLocaleString()}`;
        totalReceivedPaymentsElement.textContent = `₦${totalReceivedPayments.toLocaleString()}`;
        totalEarnersElement.textContent = `${totalEarners.toLocaleString()}`;
        totalAdvertisersElement.textContent = `${totalAdvertisers.toLocaleString()}`;
        totalApprovedTasksElement.textContent = `${totalApprovedTasks.toLocaleString()}`;

        console.log(response);
        
    } catch (error) {
        console.error('Error displaying data:', error);
    }
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
        data: []
    }],
    chart: {
        type: 'bar',
        height: 350,
        toolbar: {
            show: false
        },
    },
    colors: ['#FFD0FE'], // All bars black
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
            colors: ['#fff']
        }
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: [], // Will be updated dynamically
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
    grid: {
        show: false // Hide horizontal grid lines
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
    window.print();
}

// Function to export the dashboard as a photo
async function exportDashboardAsPhoto() {
    try {
        // Get the chart container and the chart instance
        const chartContainer = document.getElementById('bar-chart');
        const chartInstance = barChart;

        // Check if the chart instance exists and is fully initialized
        if (!chartInstance || !chartInstance.chart) {
            console.error('Chart instance not found or not initialized');
            return;
        }

        // Ensure the chart is fully rendered before continuing
        await chartInstance.rendered();

        // Create a canvas element to render the chart as an image
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas dimensions to chart dimensions
        canvas.width = chartContainer.offsetWidth;
        canvas.height = chartContainer.offsetHeight;

        // Render the chart onto the canvas
        chartInstance.chart.render({
            ctx: context,
            width: canvas.width,
            height: canvas.height
        });

        // Convert canvas to image and export
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dashboard.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

    } catch (error) {
        console.error('Error exporting dashboard as photo:', error);
    }
}


