document.addEventListener('DOMContentLoaded', function() {
  const emailForm = document.getElementById("emailForm");
  if (!emailForm) {
      console.error('Element with ID "emailForm" not found');
  } else {
      emailForm.addEventListener("submit", function(event) {
          event.preventDefault();

          const baseUrl = 'https://api.trendit3.com/api/admin';
          const emailInput = document.getElementById("email");
          if (!emailInput) {
              console.error('Element with ID "email" not found');
              return;
          }

          const email = emailInput.value;
          const verifyUrl = `${baseUrl}/admin-login`;

          fetch(verifyUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ email: email })
          })
          .then(response => {
              console.log('Response status:', response.status); // Log response status
              return response.json().then(data => ({status: response.status, body: data})); // Log response body
          })
          .then(({status, body}) => {
              if (status >= 200 && status < 300) {
                  const verifyPopup = document.querySelector(".verify-popup");
                  const verifyEmail = document.getElementById("verifyEmail");
                  const overlay = document.querySelector(".overlay");

                  if (!verifyPopup) {
                      console.error('Element with class "verify-popup" not found');
                      return;
                  }
                  if (!verifyEmail) {
                      console.error('Element with ID "verifyEmail" not found');
                      return;
                  }
                  if (!overlay) {
                      console.error('Element with class "overlay" not found');
                      return;
                  }

                  verifyPopup.style.display = "flex";
                  verifyEmail.textContent = email;
                  overlay.style.display = "block";
              } else {
                  console.error("Error sending verification email. Please try again later.", body);
              }
          })
          .catch(error => {
              console.error("Error:", error);
          });
      });

      const cancelButton = document.querySelector(".cancel-btn");
      const continueButton = document.querySelector(".continue");

      if (!cancelButton) {
          console.error('Cancel button with class "cancel-btn" not found');
      } else {
          cancelButton.addEventListener("click", function() {
              const verifyPopup = document.querySelector(".verify-popup");
              const overlay = document.querySelector(".overlay");

              if (!verifyPopup) {
                  console.error('Element with class "verify-popup" not found');
                  return;
              }
              if (!overlay) {
                  console.error('Element with class "overlay" not found');
                  return;
              }

              verifyPopup.style.display = "none";
              overlay.style.display = "none";
          });
      }

      if (!continueButton) {
          console.error('Continue button with class "continue" not found');
      } else {
          continueButton.addEventListener("click", function() {
              const verifyPopup = document.querySelector(".verify-popup");
              const overlay = document.querySelector(".overlay");

              if (!verifyPopup) {
                  console.error('Element with class "verify-popup" not found');
                  return;
              }
              if (!overlay) {
                  console.error('Element with class "overlay" not found');
                  return;
              }

              verifyPopup.style.display = "none";
              overlay.style.display = "none";
          });
      }
  }
});
