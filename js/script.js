//const { getAllUsers, displayAllUsers } = require('./backend.js');

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

// Function to fetch and display user data

    
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

// Event listeners for cancel buttons
document.getElementById("earn-appeal-cancel-btn").addEventListener("click", function() {
  closeEarnAppealPopup();
});

document.getElementById("ad-approval-cancel-btn").addEventListener("click", function() {
  closeAdApprovalPopup();
});

  
  
  






