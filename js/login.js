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
              if (response.ok) {
                  const verifyPopup = document.querySelector(".verify-popup");
                  const verifyEmail = document.getElementById("verifyEmail");
                  const overlay = document.querySelector(".overlay");

                  if (!verifyPopup || !verifyEmail || !overlay) {
                      console.error('One or more elements (".verify-popup", "#verifyEmail", ".overlay") not found');
                      return;
                  }

                  verifyPopup.style.display = "flex";
                  verifyEmail.textContent = email;
                  overlay.style.display = "block";
              } else {
                  console.error("Error sending verification email. Please try again later.");
              }
          })
          .catch(error => {
              console.error("Error:", error);
          });
      });

      const cancelButton = document.querySelector(".cancel-btn");
      const continueButton = document.querySelector(".continue");

      if (!cancelButton || !continueButton) {
          console.error('Cancel or continue buttons not found');
      } else {
          cancelButton.addEventListener("click", function() {
              const verifyPopup = document.querySelector(".verify-popup");
              const overlay = document.querySelector(".overlay");

              if (!verifyPopup || !overlay) {
                  console.error('One or more elements (".verify-popup", ".overlay") not found');
                  return;
              }

              verifyPopup.style.display = "none";
              overlay.style.display = "none";
          });

          continueButton.addEventListener("click", function() {
              const verifyPopup = document.querySelector(".verify-popup");
              const overlay = document.querySelector(".overlay");

              if (!verifyPopup || !overlay) {
                  console.error('One or more elements (".verify-popup", ".overlay") not found');
                  return;
              }

              verifyPopup.style.display = "none";
              overlay.style.display = "none";
          });
      }
  }
});
