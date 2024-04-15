document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'https://api.trendit3.com/api/admin';
    const successRedirectUrl = 'https://admin.trendit3.com';

    const verifyPopup = document.querySelector('.verify-popup');
    const overlay = document.querySelector('.overlay');
    const emailSpan = document.getElementById('popupEmail');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');

    // Show the popup when the page loads
    showPopup();

    // Function to show the popup
    function showPopup() {
        overlay.style.display = 'block';
        verifyPopup.style.display = 'block';

        const token = getQueryParam('token');
        const email = getEmailFromToken(token);

        if (token && isValidToken(token)) {
            emailSpan.textContent = email;
        } else {
            emailSpan.textContent = "Unknown Email";
            popupTitle.textContent = "Invalid Token";
            popupMessage.textContent = "This token is invalid or has been used";
        }
    }

    // Handle continue button click
    const continueBtn = document.querySelector('.continue');
    continueBtn.addEventListener('click', function() {
        const token = getQueryParam('token');
        if (token) {
            verifyToken(token);
        }
    });

    // Function to verify token
    function verifyToken(token) {
        const verifyUrl = `${baseUrl}/verify-admin-login`;

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
                setCookie('accessToken', data.access_token, 1);
                window.location.href = successRedirectUrl;
            } else {
                popupTitle.textContent = "Invalid Token";
                popupMessage.textContent = "This token is invalid or has been used";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            popupTitle.textContent = "Error";
            popupMessage.textContent = "An error occurred. Please try again or contact support.";
        });
    }

    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Function to extract email from token (for demo purposes)
    function getEmailFromToken(token) {
        // Example logic to extract email from a token
        const startIndex = token.indexOf('email=') + 'email='.length;
        const endIndex = token.indexOf('&');
        return token.substring(startIndex, endIndex);
    }

    // Dummy function to check if token is valid (for demo purposes)
    function isValidToken(token) {
        // Example: check if the token is valid
        // In a real application, this would involve server-side validation
        return true;
    }

    // Function to set a cookie (for demo purposes)
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
});



// document.addEventListener('DOMContentLoaded', function() {
//             // Define the base URL for the fetch request
//             const baseUrl = 'https://api.trendit3.com/api/admin';
//             // Define the URL to redirect to upon successful verification
//             const successRedirectUrl = 'https://admin.trendit3.com';

//             // Function to parse query parameters
//             function getQueryParam(param) {
//                 const urlParams = new URLSearchParams(window.location.search);
//                 return urlParams.get(param);
//             }

//             // Extract the token from the URL
//             const token = getQueryParam('token');

//             if(token) {
//                 // Construct the full URL for the verification request
//                 const verifyUrl = `${baseUrl}/verify-admin-login`;

//                 // Perform the verification request
//                 fetch(verifyUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ token: token })
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.access_token) {
//                         // Save the access token to localStorage
//                         // localStorage.setItem('accessToken', data.access_token);
//                         setCookie('accessToken', data.access_token, 1);

//                         // Redirect to the predefined URL upon successful verification
//                         window.location.href = successRedirectUrl;
//                     } else {
//                         document.getElementById('status').textContent = data.message;
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                     document.getElementById('status').textContent = 'An error occurred. Please try again or contact support.';
//                 });
//             } else {
//                 document.getElementById('status').textContent = 'No verification token found. Please check your link and try again.';
//             }
//         });