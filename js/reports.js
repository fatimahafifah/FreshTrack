
// FRESHTRACK - REPORTS

// Get saved food items
let foodItems = JSON.parse(localStorage.getItem("freshTrackFoods")) || [];

// Get summary elements
const totalCount = document.getElementById("totalCount");
const freshCount = document.getElementById("freshCount");
const soonCount = document.getElementById("soonCount");
const expiredCount = document.getElementById("expiredCount");

// Count food expiry status
function updateReports() {

    let fresh = 0;
    let soon = 0;
    let expired = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

}

// Create food category chart
function createCategoryChart() {

    const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Others"];

    const categoryTotals = categories.map(function(category) {

        return foodItems.filter(function(food) {
            return food.category === category;
        }).length;

    });

    const ctx = document.getElementById("categoryChart");

    new Chart(ctx, {
        type: "bar",

        data: {
            labels: categories,

            datasets: [{
                label: "Number of Food Items",
                data: categoryTotals,
                backgroundColor: [
                    "#7FA68A",
                    "#A8C69F",
                    "#D6B56D",
                    "#C98B7A",
                    "#A5A5A5"
                ]
            }]
        },

        options: {
            responsive: true,

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

// Run functions
updateReports();
createCategoryChart();
