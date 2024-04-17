document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'https://api.trendit3.com/api/admin';
    const successRedirectUrl = 'https://admin.trendit3.com';

    const verifyPopup = document.querySelector('.verify-popup');
    const invalidPopup = document.querySelector('.invalid');
    const overlay = document.querySelector('.overlay');
    const emailSpan = document.getElementById('popupEmail');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');

    // Show the initial popup when the page loads
    showVerifyPopup();

    // Function to show the initial popup
    function showVerifyPopup() {
        overlay.style.display = 'block';
        verifyPopup.style.display = 'block';

        const token = getQueryParam('token');
        const email = getEmailFromToken(token);

        if (token && isValidToken(token)) {
            emailSpan.textContent = email;
        } else {
            hideVerifyPopup();
            showInvalidPopup();
        }
    }

    // Handle continue button click for Valid Token
    const continueVerifyBtn = document.querySelector('.continue-verify');
    continueVerifyBtn.addEventListener('click', function() {
        hideOverlay();
        hideVerifyPopup();
    });

    // Handle continue button click for Invalid Token
    const continueInvalidBtn = document.querySelector('.continue-invalid');
    continueInvalidBtn.addEventListener('click', function() {
        hideOverlay();
        hideInvalidPopup();
    });

    // Handle cancel button click
    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', function() {
        hideOverlay();
        hideVerifyPopup();
        hideInvalidPopup();
    });

    // Function to verify token (dummy function for demo)
    function isValidToken(token) {
        // In a real application, this would involve server-side validation
        return true;
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

    // Function to hide overlay
    function hideOverlay() {
        overlay.style.display = 'none';
    }

    // Function to show the invalid token popup
    function showInvalidPopup() {
        overlay.style.display = 'block';
        invalidPopup.style.display = 'block';
    }

    // Function to hide the invalid token popup
    function hideInvalidPopup() {
        invalidPopup.style.display = 'none';
    }

    // Function to hide the initial popup
    function hideVerifyPopup() {
        verifyPopup.style.display = 'none';
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