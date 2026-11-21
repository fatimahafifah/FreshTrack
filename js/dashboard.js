
// FRESHTRACK - DASHBOARD

// Get current user
const currentUser = JSON.parse(
    localStorage.getItem("freshTrackCurrentUser")
);

// Display User Name
if (currentUser) {
    document.getElementById("userName").textContent =
        currentUser.name;
}


// Get saved food items
const foodItems = JSON.parse(
    localStorage.getItem("freshTrackFoods")
) || [];


// Get dashboard elements
const totalCount = document.getElementById("totalCount");
const freshCount = document.getElementById("freshCount");
const soonCount = document.getElementById("soonCount");
const expiredCount = document.getElementById("expiredCount");

const expiryAlerts = document.getElementById("expiryAlerts");
const recentFoodTable = document.getElementById("recentFoodTable");


// Count food expiry status
let fresh = 0;
let soon = 0;
let expired = 0;

const today = new Date();
today.setHours(0, 0, 0, 0);


// Check each food item
foodItems.forEach(function(food) {

    const expiryDate = new Date(food.expiry + "T00:00:00");

    const difference = Math.ceil(
        (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) {
        expired++;
    }
    else if (difference <= 3) {
        soon++;
    }
    else {
        fresh++;
    }

});


// Update summary cards
totalCount.textContent = foodItems.length;
freshCount.textContent = fresh;
soonCount.textContent = soon;
expiredCount.textContent = expired;


// Create Food Expiry Chart
const chartElement = document.getElementById("expiryChart");

if (chartElement) {

    new Chart(chartElement, {

        type: "bar",

        data: {

            labels: ["Fresh", "Expiring Soon", "Expired"],

            datasets: [{

                label: "Food Items",

                data: [fresh, soon, expired],

                backgroundColor: [
                    "#7FA68A",
                    "#E8C66A",
                    "#D97970"
                ],

                borderRadius: 6

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }

                }

            }

        }

    });

}


// Display Expiry Alerts
function displayExpiryAlerts() {

    expiryAlerts.innerHTML = "";

    const alertFoods = foodItems.filter(function(food) {

        const expiryDate = new Date(food.expiry + "T00:00:00");

        return expiryDate <= new Date(
            today.getTime() + (3 * 24 * 60 * 60 * 1000)
        );

    });

    if (alertFoods.length === 0) {

        expiryAlerts.innerHTML = `
            <p class="text-muted">
                No expiry alerts at the moment.
            </p>
        `;

        return;
    }

    alertFoods.forEach(function(food) {

        const expiryDate = new Date(food.expiry + "T00:00:00");

        const difference = Math.ceil(
            (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        let alertClass = "alert-warning";
        let message = "";

        if (difference < 0) {
            alertClass = "alert-danger";
            message = "Expired " + Math.abs(difference) + " day(s) ago";
        }
        else if (difference === 0) {
            message = "Expires today";
        }
        else {
            message = "Expires in " + difference + " day(s)";
        }

        expiryAlerts.innerHTML += `
            <div class="alert ${alertClass}">
                <strong>${food.name}</strong>
                <br>
                <small>${message}</small>
            </div>
        `;

    });

}


// Display Recent Food Items
function displayRecentFoods() {

    recentFoodTable.innerHTML = "";

    if (foodItems.length === 0) {

        recentFoodTable.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted">
                    No food items found.
                </td>
            </tr>
        `;

        return;
    }

    const recentFoods = foodItems.slice(-5).reverse();

    recentFoods.forEach(function(food) {

        const expiryDate = new Date(food.expiry + "T00:00:00");

        const difference = Math.ceil(
            (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        let status = "Fresh";
        let badge = "bg-success";

        if (difference < 0) {
            status = "Expired";
            badge = "bg-danger";
        }
        else if (difference <= 3) {
            status = "Expiring Soon";
            badge = "bg-warning text-dark";
        }

        recentFoodTable.innerHTML += `
            <tr>
                <td>${food.name}</td>
                <td>${food.category}</td>
                <td>${food.expiry}</td>
                <td>
                    <span class="badge ${badge}">
                        ${status}
                    </span>
                </td>
            </tr>
        `;

    });

}


// Run dashboard functions
displayExpiryAlerts();
displayRecentFoods();
