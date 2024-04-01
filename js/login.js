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
      // If response is successful, display a message to the user
      document.getElementById("status").textContent = "Verification email sent.";
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