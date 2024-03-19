document.addEventListener("DOMContentLoaded", function() {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navBar = document.querySelector('.nav-bar');

    hamburgerMenu.addEventListener('click', function() {
        navBar.classList.toggle('active');
    });
});


document.addEventListener("DOMContentLoaded", function() {
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
  
    boxes.forEach(box => {
      box.addEventListener("click", function() {
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
  
    function showearnInfo() {
      earnInfo.style.display = "block";
      overlay2.style.display = "block";
    }
  
    function hideearnInfo() {
      earnInfo.style.display = "none";
      overlay2.style.display = "none";
    }
  
    function showApproveBox() {
      approveBox.style.display = "block";
      overlay2.style.display = "block";
    }
  
    function hideApproveBox() {
      approveBox.style.display = "none";
      overlay2.style.display = "none";
    }
  });
  
  


// bar chart
// Function to generate random data for the chart
function generateRandomData() {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 200));
}

// IDs of the boxes and corresponding chart series indices
const boxIds = {
    selected: 0,
    totalPayouts: 1,
    noOfEarners: 2,
    noOfAdvertisers: 3,
    noOfApprovedAds: 4,
    noOfAffiliateResell: 5,
};

// Event listeners for each box
Object.keys(boxIds).forEach(boxId => {
    const box = document.getElementById(boxId);
    box.addEventListener('click', () => {
        const seriesIndex = boxIds[boxId];
        const newData = generateRandomData();
        barChart.updateSeries([{ data: newData }], seriesIndex);
    });
});

// ApexCharts configuration
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
        categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'],
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

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();
