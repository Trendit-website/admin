document.addEventListener('DOMContentLoaded', function() {
    // Define the base URL for the fetch request
    const baseUrl = 'https://api.trendit3.com/api/admin';
    // Define the URL to redirect to upon successful verification
    const successRedirectUrl = 'https://admin.trendit3.com';

    // Function to parse query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Extract the token from the URL
    const token = getQueryParam('token');

    if(token) {
        // Construct the full URL for the verification request
        const verifyUrl = `${baseUrl}/verify-admin-login`;

        // Perform the verification request
        fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                // Save the access token to localStorage
                // localStorage.setItem('accessToken', data.access_token);
                setCookie('accessToken', data.access_token, 1);

                // Redirect to the predefined URL upon successful verification
                window.location.href = successRedirectUrl;
            } else {
                // Display the invalid token popup
                document.querySelector(".verify-popup").style.display = "block";
                document.querySelector(".verify-popup .invalid").style.display = "block";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = 'An error occurred. Please try again or contact support.';
        });
    } else {
        document.getElementById('status').textContent = 'No verification token found. Please check your link and try again.';
    }

    // Event listener for the cancel button
    document.querySelector(".cancel-btn").addEventListener("click", function() {
        document.querySelector(".verify-popup").style.display = "none"; // Hide the popup
        document.querySelector(".overlay").style.display = "none"; // Hide overlay
    });

    // Event listener for the continue button
    document.querySelector(".continue").addEventListener("click", function() {
        document.querySelector(".verify-popup").style.display = "none"; // Hide the popup
        document.querySelector(".overlay").style.display = "none"; // Hide overlay
    });
});
