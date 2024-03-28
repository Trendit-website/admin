//https://api.trendit3.com/
///
// endpoints



async function fetchUsers() {
  try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();

      const users = data.users;

      // Populate data for user 1
      document.getElementById('user1-name').innerText = users[0].name;
      document.getElementById('user1-email').innerText = users[0].email;
      document.getElementById('user1-earning').innerText = users[0].earning;
      document.getElementById('user1-advertise').innerText = users[0].advertise;
      document.getElementById('user1-date').innerText = users[0].date;

      // Populate data for user 2
      document.getElementById('user2-name').innerText = users[1].name;
      document.getElementById('user2-email').innerText = users[1].email;
      document.getElementById('user2-earning').innerText = users[1].earning;
      document.getElementById('user2-advertise').innerText = users[1].advertise;
      document.getElementById('user2-date').innerText = users[1].date;
  } catch (error) {
      console.error('Failed to fetch users:', error);
  }
}

fetchUsers();

// async function fetchDashboardData() {
//   try {
//       const response = await fetch('http://localhost:5000/dashboard_data', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       });
//       const data = await response.json();

//       // Populate dashboard data
//       document.getElementById('walletBalanceAmount').innerText = data.total_received_payments;
//       document.getElementById('totalPayoutsAmount').innerText = data.total_payouts;
//       document.getElementById('noOfEarners').querySelector('h6').innerText = Object.values(data.received_payments_per_month).reduce((acc, val) => acc + val, 0);
//       document.getElementById('noOfAdvertisers').querySelector('h6').innerText = Object.values(data.payouts_per_month).reduce((acc, val) => acc + val, 0);
//       document.getElementById('noOfApprovedAds').querySelector('h6').innerText = Object.values(data.payment_activities_per_month).reduce((acc, val) => acc + val, 0);
//       document.getElementById('noOfAffiliateResell').querySelector('h6').innerText = Object.values(data.payment_activities_per_month).reduce((acc, val) => acc + val, 0);

//   } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//   }
// }

// fetchDashboardData();

// Base URL: https://api.trendit3.com/


// Dashboard Data:

// Path: /dashboard_data
// Method: POST
// Sample response:

// response_data = {
//     "total_received_payments": 5000.0,
//     "total_payouts": 3000.0,
//     "received_payments_per_month": {
//         "2023-01": 2000.0,
//         "2023-02": 1500.0,
//         "2023-03": 1500.0
//     },
//     "payouts_per_month": {
//         "2023-01": 1000.0,
//         "2023-02": 1000.0,
//         "2023-03": 1000.0
//     },
//     "payment_activities_per_month": {
//         "2023-01": 3,
//         "2023-02": 2,
//         "2023-03": 2
//     }
// }



// Users - get all users:

// Path: /users
// Method: POST
// Sample response:

// response_data = {
//     "message": "All users fetched successfully",
//     "status": "success",
//     "status_code": 200,
//     "total": 2,
//     "users": [
//         {
//             "birthday": "Mon, 02 Jan 1989 00:00:00 GMT",
//             "country": "South Africa",
//             "date_joined": "Wed, 20 Mar 2024 13:22:53 GMT",
//             "email": "osomhe.aleogho+444@gmail.com",
//             "firstname": "james",
//             "gender": "male",
//             "id": 4,
//             "lastname": "james",
//             "local_government": "",
//             "membership_fee": true,
//             "phone": null,
//             "primary_bank": {},
//             "profile_picture": "http://res.cloudinary.com/dcozguaw3/image/upload/v1710975710/2024/03/banner-y4rw.png",
//             "referral_link": "https://www.trendit3.com/signup/james",
//             "roles": [
//                 "RoleNames.CUSTOMER"
//             ],
//             "social_ids": {
//                 "facebook_id": null,
//                 "google_id": null,
//                 "instagram_id": null,
//                 "tiktok_id": null,
//                 "x_id": null
//             },
//             "state": "South Africa",
//             "username": "james",
//             "wallet": {
//                 "balance": 2650.0,
//                 "currency_code": "ZAR",
//                 "currency_name": "South African rand"
//             }
//         },
//         {
//             "birthday": "Mon, 10 Mar 1997 00:00:00 GMT",
//             "country": "Nigeria",
//             "date_joined": "Thu, 21 Mar 2024 01:22:44 GMT",
//             "email": "zeddyemy@gmail.com",
//             "firstname": "Emma",
//             "gender": "male",
//             "id": 6,
//             "lastname": "Kent",
//             "local_government": "Alimosho",
//             "membership_fee": false,
//             "phone": null,
//             "primary_bank": {},
//             "profile_picture": "",
//             "referral_link": "https://www.trendit3.com/signup/emma",
//             "roles": [
//                 "RoleNames.CUSTOMER"
//             ],
//             "social_ids": {
//                 "facebook_id": null,
//                 "google_id": null,
//                 "instagram_id": null,
//                 "tiktok_id": null,
//                 "x_id": null
//             },
//             "state": "Nigeria",
//             "username": "emma",
//             "wallet": {
//                 "balance": 50.0,
//                 "currency_code": "NGN",
//                 "currency_name": "Nigerian naira"
//             }
//         }
//     ]
// }



// User - get a single users:

// Path: /users/{id}
// Method: POST
// Sample response:

// response_data = 
// {
//     "message": "User fetched successfully",
//     "status": "success",
//     "status_code": 200,
//     "user": {
//         "birthday": null,
//         "country": null,
//         "date_joined": "Wed, 20 Mar 2024 16:38:29 GMT",
//         "email": "chrisdev0000@gmail.com",
//         "firstname": "chris",
//         "gender": null,
//         "id": 5,
//         "lastname": "dev",
//         "local_government": null,
//         "membership_fee": false,
//         "phone": null,
//         "primary_bank": {},
//         "profile_picture": "",
//         "referral_link": "https://www.trendit3.com/signup/chris",
//         "roles": [
//             "RoleNames.CUSTOMER"
//         ],
//         "social_ids": {
//             "facebook_id": null,
//             "google_id": null,
//             "instagram_id": null,
//             "tiktok_id": null,
//             "x_id": null
//         },
//         "state": null,
//         "username": "chris",
//         "wallet": {
//             "balance": 0.0,
//             "currency_code": "USD",
//             "currency_name": "Dollars"
//         }
//     }
// }



// Tasks - get all tasks:

// Path: /tasks
// Method: POST
// Sample response:

// response_data = 
// {
//     "message": "All tasks fetched successfully",
//     "status": "success",
//     "status_code": 200,
//     "tasks": [
//         {
//             "account_link": "https://github.com/osomhe1",
//             "creator": {
//                 "email": "osomhe.aleogho+444@gmail.com",
//                 "id": 4,
//                 "username": "james"
//             },
//             "date_created": "Wed, 20 Mar 2024 21:53:53 GMT",
//             "engagements_count": 10,
//             "goal": "join group",
//             "id": 20,
//             "media_path": null,
//             "payment_status": "complete",
//             "platform": "facebook",
//             "status": "pending",
//             "task_key": "lqhr4wky6ja1dg4l10sf",
//             "task_type": "engagement",
//             "total_allocated": 0,
//             "total_success": 0,
//             "updated_at": "Wed, 20 Mar 2024 21:54:10 GMT"
//         }
//     ],
//     "total": 1
// }



// Approve Task:

// Path: /approve-task/{id}
// Method: POST
// Sample response:

// response_data = 
// {
//     "message": "Task approved successfully",
//     "status": "success",
//     "status_code": 200
// }

// Reject Task:

// Path: /reject-task/{id}
// Method: POST
// Sample response:

// response_data = 
// {
//     "message": "Task rejected successfully",
//     "status": "success",
//     "status_code": 200
// }

//<div id="tasks-container"></div>
// function getAllTasks() {
//   const tasksUrl = `${baseUrl}/tasks`;

//   fetch(tasksUrl, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     displayAllTasks(data);
//   })
//   .catch(error => {
//     console.error('Error fetching tasks:', error);
//   });
// }

// function displayAllTasks(data) {
//   const tasks = data.tasks;
//   const container = document.getElementById('tasks-container');

//   tasks.forEach(task => {
//     const taskBox = document.createElement('div');
//     taskBox.classList.add('box1');

//     // Task Information
//     const taskInfo = document.createElement('div');
//     taskInfo.classList.add('pending');

//     const taskImage = document.createElement('img');
//     taskImage.src = `./images/${task.platform}.png`; // Assuming platform images are named accordingly
//     taskImage.alt = task.platform;

//     const taskTitle = document.createElement('p');
//     taskTitle.textContent = task.status.charAt(0).toUpperCase() + task.status.slice(1);

//     taskInfo.appendChild(taskImage);
//     taskInfo.appendChild(taskTitle);

//     // Task Description
//     const taskDescription = document.createElement('p');
//     taskDescription.textContent = task.goal;

//     // Task Date
//     const taskDate = document.createElement('span');
//     taskDate.textContent = new Date(task.date_created).toLocaleString();

//     // Earning
//     const earningDiv = document.createElement('div');
//     earningDiv.classList.add('earning');

//     const earningImage = document.createElement('img');
//     earningImage.src = "./images/wallet.png";
//     earningImage.width = "9px";
//     earningImage.alt = "Earning Image";

//     const earningSpan = document.createElement('span');
//     earningSpan.textContent = 'Earning:';

//     const earningValue = document.createElement('p');
//     earningValue.textContent = `₦${task.engagements_count * 3} per ${task.task_type}`;

//     earningDiv.appendChild(earningImage);
//     earningDiv.appendChild(earningSpan);
//     earningDiv.appendChild(earningValue);

//     // Append all elements to taskBox
//     taskBox.appendChild(taskInfo);
//     taskBox.appendChild(taskDescription);
//     taskBox.appendChild(taskDate);
//     taskBox.appendChild(earningDiv);

//     // Add event listeners for approval and rejection
//     const approveButton = document.createElement('button');
//     approveButton.textContent = 'Approve Task';
//     approveButton.addEventListener('click', () => {
//       approveTask(task.id);
//     });

//     const rejectButton = document.createElement('button');
//     rejectButton.textContent = 'Reject Task';
//     rejectButton.addEventListener('click', () => {
//       rejectTask(task.id);
//     });

//     taskBox.appendChild(approveButton);
//     taskBox.appendChild(rejectButton);

//     container.appendChild(taskBox);
//   });
// }

// // Function to approve a task
// function approveTask(taskId) {
//   const url = `${baseUrl}/approve-task/${taskId}`;

//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to approve task');
//     }
//     return response.json();
//   })
//   .then(data => {
//     displayNotification('Task Approved Successfully', 'success');
//   })
//   .catch(error => {
//     console.error('Error approving task:', error);
//     displayNotification('Error Approving Task', 'error');
//   });
// }

// // Function to reject a task
// function rejectTask(taskId) {
//   const url = `${baseUrl}/reject-task/${taskId}`;

//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to reject task');
//     }
//     return response.json();
//   })
//   .then(data => {
//     displayNotification('Task Rejected Successfully', 'success');
//   })
//   .catch(error => {
//     console.error('Error rejecting task:', error);
//     displayNotification('Error Rejecting Task', 'error');
//   });
// }

// function displayNotification(message, status) {
//   const notificationBox = document.createElement('div');
//   notificationBox.classList.add('notification-box');
//   notificationBox.classList.add(status);

//   const messageParagraph = document.createElement('p');
//   messageParagraph.textContent = message;

//   notificationBox.appendChild(messageParagraph);

//   document.body.insertBefore(notificationBox, document.body.firstChild);

//   setTimeout(() => {
//     notificationBox.remove();
//   }, 3000);


// }

  