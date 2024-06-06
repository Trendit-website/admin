document.addEventListener("DOMContentLoaded", function () {
    const socialOverlay = document.querySelector(".social-overlay");
    const approvalBox = document.querySelector(".approval-box");
    const cancelBtn = document.querySelector(".cancel-btn");
    const accountsConnected = document.querySelector("#accounts-connected");
    const socialRequestsContainer = document.getElementById("social-requests");

    // Function to fetch social verification requests
    function fetchSocialVerificationRequests(page = 1, perPage = 20) {
        const baseUrl = 'https://api-staging.trendit3.com/api/admin';
        const accessToken = getCookie('accessToken');
        fetch(`${baseUrl}/social_verification_requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ page, per_page: perPage })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status_code === 200) {
                renderSocialVerificationRequests(data.social_verification_requests);
                approvalBox.style.display = "block";
                socialOverlay.style.display = "block";
            } else {
                alert("Error fetching social verification requests: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error fetching social verification requests:", error);
            alert("Error fetching social verification requests: " + error.message);
        });
    }

    // Function to render social verification requests
    function renderSocialVerificationRequests(requests) {
        socialRequestsContainer.innerHTML = "";
        requests.forEach(request => {
            const requestElement = document.createElement("div");
            requestElement.className = "social-approve-box";
            requestElement.innerHTML = `
                <div class="social-link">
                    <img src="./images/${request.type}.png" alt="">
                    <a href="${request.body}" target="_blank">${request.body}</a>
                </div>
                <div class="buttons">
                    ${request.status === "pending" ? `
                        <button class="approve-social" data-id="${request.id}" data-type="${request.type}" data-link="${request.body}" data-user-id="${request.sender_id}">Accept</button>
                        <button class="decline-social" data-id="${request.id}" data-type="${request.type}" data-link="${request.body}" data-user-id="${request.sender_id}">Decline</button>
                    ` : `<p class="status">${request.status}</p>`}
                </div>
            `;
            socialRequestsContainer.appendChild(requestElement);
        });

        document.querySelectorAll(".approve-social").forEach(button => {
            button.addEventListener("click", () => handleApproval(button.dataset.id, button.dataset.userId, button.dataset.type, button.dataset.link, 'approve'));
        });

        document.querySelectorAll(".decline-social").forEach(button => {
            button.addEventListener("click", () => handleApproval(button.dataset.id, button.dataset.userId, button.dataset.type, button.dataset.link, 'decline'));
        });
    }

    // Function to handle approval or rejection
    function handleApproval(id, userId, type, link, action) {
        const baseUrl = 'https://api-staging.trendit3.com/api/admin';
        const endpoint = action === 'approve' ? '/approve_social_verification_request' : '/reject_social_verification_request';
        const accessToken = getCookie('accessToken');
        fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                userId: userId,
                type: type,
                link: link,
                socialVerificationId: id
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status_code === 200) {
                alert(`Social verification request ${action}d successfully`);
                fetchSocialVerificationRequests();
            } else {
                alert(`Error ${action}ing social verification request: ${data.message}`);
            }
        })
        .catch(error => {
            console.error(`Error ${action}ing social verification request:`, error);
            alert(`Error ${action}ing social verification request: ${error.message}`);
        });
    }

    // Show approval box when "Social Accounts" is clicked
    accountsConnected.addEventListener("click", () => {
        fetchSocialVerificationRequests();
    });

    // Hide approval box when "Cancel" button is clicked
    cancelBtn.addEventListener("click", () => {
        approvalBox.style.display = "none";
        socialOverlay.style.display = "none";
    });

    socialOverlay.addEventListener("click", () => {
        approvalBox.style.display = "none";
        socialOverlay.style.display = "none";
    });
});


