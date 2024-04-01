// Function to check if the user is logged in
function checkLoginStatus() {
    // Check if the user is logged in (you can customize this based on your login system)
    const accessToken = getCookie('accessToken'); // Assuming you have a function to get cookies

    if (!accessToken) {
        // If not logged in, redirect to the login page
        window.location.href = 'login.html';
    }
}

// Function to get cookies by name
function getCookie(name) {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

// Call the checkLoginStatus function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});
