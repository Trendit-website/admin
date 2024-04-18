document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Define the base URL for the fetch request
  const baseUrl = 'https://api.trendit3.com/api/admin';

  var email = document.getElementById("email").value;
  // Construct the full URL for the verification request
  const verifyUrl = `${baseUrl}/admin-login`;

  // Sending POST request to the endpoint
  fetch(verifyUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
  })
  .then(response => {
      if (response.ok) {
          // If response is successful, display the verification popup
          document.querySelector(".verify-popup").style.display = "flex";
          document.getElementById("verifyEmail").textContent = email;
          document.querySelector(".overlay").style.display = "block"; // Show overlay
      } else {
          // If response is not successful, display an error message
          document.getElementById("status").textContent = "Error sending verification email. Please try again later.";
      }
  })
  .catch(error => {
      console.error("Error:", error);
      document.getElementById("status").textContent = "An unexpected error occurred. Please try again later.";
  });
});

// Event listener for the cancel button
document.querySelector(".cancel-btn").addEventListener("click", function() {
  document.querySelector(".verify-popup").style.display = "none"; // Hide the popup
  document.querySelector(".overlay").style.display = "none"; // Hide overlay
});

// Event listener for the continue button
document.querySelector(".continue").addEventListener("click", function() {
  document.querySelector(".verify-popup").style.display = "none"; // Hide the popup
  document.querySelector(".overlay").style.display = "none";
});
