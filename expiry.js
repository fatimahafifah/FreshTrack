
// FRESHTRACK - EXPIRY TRACKER

// Get saved food items
let foodItems = JSON.parse(localStorage.getItem("freshTrackFoods")) || [];

// Get table and summary elements
const expiryTable = document.getElementById("expiryTable");
const freshCount = document.getElementById("freshCount");
const soonCount = document.getElementById("soonCount");
const expiredCount = document.getElementById("expiredCount");

// Display food expiry status
function displayExpiry() {

    expiryTable.innerHTML = "";

    let fresh = 0;
    let soon = 0;
    let expired = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (foodItems.length === 0) {
        expiryTable.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No food items found.
                </td>
            </tr>
        `;
    }

    foodItems.forEach(function(food) {

        const expiryDate = new Date(food.expiry + "T00:00:00");

        const difference = Math.ceil(
            (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        let status = "";
        let badge = "";

        if (difference < 0) {
            status = "Expired";
            badge = "bg-danger";
            expired++;
        }
        else if (difference <= 3) {
            status = "Expiring Soon";
            badge = "bg-warning text-dark";
            soon++;
        }
        else {
            status = "Fresh";
            badge = "bg-success";
            fresh++;
        }

        expiryTable.innerHTML += `
            <tr>
                <td>${food.name}</td>
                <td>${food.category}</td>
                <td>${food.quantity}</td>
                <td>${food.expiry}</td>
                <td>
                    <span class="badge ${badge}">
                        ${status}
                    </span>
                </td>
            </tr>
        `;

    });

    // Update summary cards
    freshCount.textContent = fresh;
    soonCount.textContent = soon;
    expiredCount.textContent = expired;

}

// Run function
displayExpiry();
