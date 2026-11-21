# FreshTrack – Food Expiry & Waste Management System

## 1. Project Overview

FreshTrack is a simple web-based Food Expiry and Waste Management System designed to help users manage their food items, monitor expiry dates, and reduce food waste.

The system allows users to keep track of food stored at home and identify food items that are fresh, expiring soon, or already expired.

## 2. Project Objectives

- To help users organise and manage their food inventory.
- To monitor food expiry dates.
- To reduce food waste by reminding users about food items that are expiring soon.
- To provide a simple and user-friendly interface for food management.

## 3. Main Features

- **Login and Registration:** Allows users to register and log in to the system.
- **Dashboard:** Displays food summaries, expiry alerts, and a chart.
- **Food Inventory:** Allows users to add, edit, delete, search, and filter food items.
- **Expiry Tracker:** Displays food items based on their expiry status.
- **Reports:** Provides summaries and charts about food inventory.
- **Settings:** Allows users to update their profile information.

## 4. Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Chart.js
- Local Storage

## 5. Project Structure

```text
FreshTrack/
│
├── css/
│   └── style.css
│
├── js/
│   ├── auth.js
│   ├── data.js
│   ├── dashboard.js
│   ├── app.js
│   ├── expiry.js
│   ├── reports.js
│   └── settings.js
│
├── index.html
├── register.html
├── dashboard.html
├── inventory.html
├── expiry.html
├── reports.html
├── settings.html
└── README.md
```

## 6. How to Run the System

1. Download or extract the FreshTrack project folder.
2. Open the folder using Visual Studio Code.
3. Open `index.html` using a web browser or Visual Studio Code Live Server.
4. Register a new account.
5. Log in to access the FreshTrack dashboard.

## 7. Data Storage

FreshTrack uses browser Local Storage to store user account information, food inventory data, and profile details.

The system does not require a database because it is developed as a small-scale web application prototype.

## 8. Conclusion

FreshTrack provides a simple way for users to manage their food inventory and monitor expiry dates. By helping users identify food items that are expiring soon, the system aims to encourage better food management practices and reduce unnecessary food waste.