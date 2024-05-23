document.addEventListener("DOMContentLoaded", async function() {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');

    hamburgerMenu.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });

    const boxIds = {
        selected: 0,
        totalPayouts: 1,
        noOfEarners: 2,
        noOfAdvertisers: 3,
        noOfApprovedAds: 4,
        noOfAffiliateResell: 5,
    };

    const baseUrl = 'https://api.trendit3.com/api/admin';
    const accessToken = getCookie('accessToken');

    var dataPromise = getDashboardData();
    displayDashboardData(dataPromise);

    var dashboardData = await convertData(dataPromise);

    Object.keys(boxIds).forEach(boxId => {
        const box = document.getElementById(boxId);
        box.addEventListener('click', async () => {
            if (!dashboardData[boxId]) {
                console.warn(`No data available for boxId: ${boxId}`);
                return;
            }
            const categories = await getChartIndices(dataPromise);
            const data = Object.values(dashboardData[boxId]);
            if (categories && data) {
                barChart.updateSeries([{ data: data }]);
            }
        });
    });

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();

    document.getElementById('share').addEventListener('click', shareDashboard);
    document.getElementById('print').addEventListener('click', printDashboard);
    document.getElementById('export').addEventListener('click', exportDashboard);

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
        var dataPromise = getDashboardDataForPeriod(period);
        var dashboardData = await convertData(dataPromise);
        barChart.updateSeries([{ data: dashboardData.totalPayouts }]);
    }

    async function getDashboardDataForPeriod(period) {
        const url = `${baseUrl}/dashboard_data?period=${period}`;
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

    function getDashboardData() {
        const usersUrl = `${baseUrl}/dashboard_data`;
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
        });
    }

    async function getChartIndices(promise) {
        try {
            const data = await promise;
            if (!data) {
                console.error('Received no data');
                return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
            }
            var indices = Object.keys(data.payment_activities_per_month || {});
            return indices;
        } catch (error) {
            console.error('Error converting data:', error);
        }
    }

    async function convertData(promise) {
        try {
            const data = await promise;
            if (!data) {
                console.error('Received no data');
                return {
                    'noOfEarners': [],
                    'noOfAdvertisers': [],
                    'noOfApprovedAds': []
                };
            }
            var boxData = {
                'totalPayouts': Object.values(data.payouts_per_month || {}),
                'noOfEarners': Object.values(data.payment_activities_per_month || {}),
                'noOfAdvertisers': Object.values(data.payouts_per_month || {}),
                'noOfApprovedAds': Object.values(data.recieved_payments_per_month || {})
            };
            return boxData;
        } catch (error) {
            console.error('Error converting data:', error);
        }
    }

    async function displayDashboardData(promise) {
        try {
            const response = await promise;
            const {
                total_payouts: totalPayouts,
                total_received_payments: totalReceivedPayments,
                total_earners: totalEarners,
                total_advertisers: totalAdvertisers,
                total_approved_tasks: totalApprovedTasks
            } = response;

            if (!response) {
                console.log("No data to display.");
                return;
            }

            document.getElementById('total_payouts').textContent = `₦${totalPayouts.toLocaleString()}`;
            document.getElementById('total_received_payments').textContent = `₦${totalReceivedPayments.toLocaleString()}`;
            document.getElementById('total_earners').textContent = `${totalEarners.toLocaleString()}`;
            document.getElementById('total_advertisers').textContent = `${totalAdvertisers.toLocaleString()}`;
            document.getElementById('total_approved_tasks').textContent = `${totalApprovedTasks.toLocaleString()}`;

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
        const currentMonth = date.getMonth();

        let last12Months = [];
        for (let i = 1; i <= 12; i++) {
            const monthIndex = (currentMonth + i) % 12;
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
    colors: ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#FFD0FE'], // All bars black
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
});