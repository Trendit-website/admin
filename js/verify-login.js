document.addEventListener('DOMContentLoaded', function() {
    const baseUrl = 'https://api.trendit35.com/api/admin';
    const successRedirectUrl = 'https://admin.trendit35.com';

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
            const statusElement = document.getElementById('status');
            if (data.access_token) {
                setCookie('accessToken', data.access_token, 1);
                window.location.href = successRedirectUrl;
            } else {
                statusElement.textContent = data.message;
                statusElement.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = 'An error occurred. Please try again or contact support.';
        });
    } else {
        document.getElementById('status').textContent = 'No verification token found. Please check your link and try again.';
        document.getElementById('status').style.display = 'block';
    }

    const emailForm = document.getElementById('emailForm');
    const verifyPopup = document.querySelector('.verify-popup');
    const verifyEmailSpan = document.getElementById('verifyEmail');

    emailForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;

        // Here you would send the email with the link
        // For demo, let's pretend email was sent successfully

        // Show the verify popup
        verifyEmailSpan.textContent = email;
        verifyPopup.style.display = 'flex';
    });

    const continueButtons = document.querySelectorAll('.continue');
    const cancelBtn = document.querySelector('.cancel-btn');

    continueButtons.forEach(button => {
        button.addEventListener('click', function() {
            verifyPopup.style.display = 'none';
        });
    });

    cancelBtn.addEventListener('click', function() {
        verifyPopup.style.display = 'none';
    });
});

// Your setCookie function here, if not already defined



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