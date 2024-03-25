
//https://api.trendit3.com/

// endpoints
async function fetchUsers() {
    try {
      const response = await fetch('https://api.trendit3.com/api/admin/users', {
        method: 'GET',
      });
      const responseData = await response.json();
  
      console.log('API Response:', responseData);
  
      if (responseData.status === 'success') {
        const users = responseData.users;
  
        // Loop through each user and update HTML elements
        users.forEach((user, index) => {
          const userBox = document.getElementById(`user${index + 1}`);
          if (!userBox) return;
  
          userBox.querySelector('.name-email #user-name').textContent = `${user.firstname} ${user.lastname}`;
          userBox.querySelector('.name-email #user-email').textContent = user.email;
          userBox.querySelector('.earning #user-earning').textContent = user.wallet.balance;
          userBox.querySelector('.advertise #user-advertise').textContent = user.wallet.balance; // Adjust as needed
          userBox.querySelector('.right #user-date').textContent = new Date(user.date_joined).toDateString(); // Adjust as needed
        });
      } else {
        console.error('Error fetching users:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchUsers);
  
  //dashboard

  async function fetchDashboardData() {
    try {
      const response = await fetch('https://api.trendit3.com/dashboard_data', {
        method: 'POST'
      });
      const responseData = await response.json();
  
      console.log('Dashboard Data:', responseData);
  
      // Check if request was successful
      if (responseData.status === 'success') {
        // Update Wallet Balance Box
        const walletBalanceBox = document.getElementById('selected');
        walletBalanceBox.querySelector('h6').textContent = `NGN ${responseData.total_received_payments}`;
        
        // Update Total Payouts Box
        const totalPayoutsBox = document.getElementById('totalPayouts');
        totalPayoutsBox.querySelector('h6').textContent = `NGN ${responseData.total_payouts}`;
        
        // Update No of Earners Box
        const noOfEarnersBox = document.getElementById('noOfEarners');
        noOfEarnersBox.querySelector('h6').textContent = responseData.payment_activities_per_month["2023-01"];
        
        // Update No of Advertisers Box
        const noOfAdvertisersBox = document.getElementById('noOfAdvertisers');
        noOfAdvertisersBox.querySelector('h6').textContent = responseData.payment_activities_per_month["2023-02"];
        
        // Update No of Approved Ads Box
        const noOfApprovedAdsBox = document.getElementById('noOfApprovedAds');
        noOfApprovedAdsBox.querySelector('h6').textContent = responseData.payment_activities_per_month["2023-03"];
        
        // Update No of Affiliate Resell Box
        const noOfAffiliateResellBox = document.getElementById('noOfAffiliateResell');
        noOfAffiliateResellBox.querySelector('h6').textContent = responseData.received_payments_per_month["2023-01"];
      } else {
        console.error('Error fetching dashboard data:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }
  
  // Call the fetchDashboardData function when the page loads
  document.addEventListener('DOMContentLoaded', fetchDashboardData);
  








// The admin endpoints

// Base URL: https://api.trendit3.com/


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







  