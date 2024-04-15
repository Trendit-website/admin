document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'https://api.trendit3.com/api/admin';
    const successRedirectUrl = 'https://admin.trendit3.com';

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const token = getQueryParam('token');

    if (token) {
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
            const verifyPopup = document.querySelector('.verify-popup');
            const status = document.getElementById('status');
            const emailSpan = document.getElementById('email');

            if (data.access_token) {
                setCookie('accessToken', data.access_token, 1);
                window.location.href = successRedirectUrl;
            } else {
                status.textContent = data.message;
                if (data.message === 'Invalid token' || data.message === 'Token already used') {
                    verifyPopup.style.display = 'block';
                    status.style.display = 'none';
                    emailSpan.textContent = getEmailFromToken(token);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = 'An error occurred. Please try again or contact support.';
        });
    } else {
        document.getElementById('status').textContent = 'No verification token found. Please check your link and try again.';
    }

    function getEmailFromToken(token) {
        const startIndex = token.indexOf('email=') + 'email='.length;
        const endIndex = token.indexOf('&');
        return token.substring(startIndex, endIndex);
    }

    const verifyPopup = document.querySelector('.verify-popup');
    const continueBtns = document.querySelectorAll('.continue');
    const cancelBtn = document.querySelector('.cancel-btn');
    const overlay = document.querySelector('.overlay');

    continueBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            verifyPopup.style.display = 'none';
            overlay.style.display = 'none';
        });
    });

    cancelBtn.addEventListener('click', function() {
        verifyPopup.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Show overlay and verify popup if needed
    if (document.getElementById('status').textContent === 'Invalid Token' || 
        document.getElementById('status').textContent === 'Token already used') {
        verifyPopup.style.display = 'block';
        overlay.style.display = 'block';
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