
// FRESHTRACK - FOOD INVENTORY

const foodForm = document.getElementById("foodForm");
const foodTable = document.getElementById("foodTable");
const foodMessage = document.getElementById("foodMessage");
const searchFood = document.getElementById("searchFood");
const filterCategory = document.getElementById("filterCategory");

// Get saved food items
let foodItems = JSON.parse(localStorage.getItem("freshTrackFoods")) || [];


// Display food items
function displayFoods(items = foodItems) {

    foodTable.innerHTML = "";

    if (items.length === 0) {
        foodTable.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No food items found.
                </td>
            </tr>
        `;
        return;
    }

    items.forEach(function(food) {

        const index = foodItems.indexOf(food);

        foodTable.innerHTML += `
            <tr>
                <td>${food.name}</td>
                <td>${food.category}</td>
                <td>${food.quantity}</td>
                <td>${food.expiry}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editFood(${index})">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="deleteFood(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}


// Add new food
if (foodForm) {

    foodForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const newFood = {
            name: document.getElementById("foodName").value.trim(),
            category: document.getElementById("foodCategory").value,
            quantity: document.getElementById("foodQuantity").value,
            expiry: document.getElementById("foodExpiry").value
        };

        foodItems.push(newFood);

        localStorage.setItem("freshTrackFoods", JSON.stringify(foodItems));

        foodMessage.innerHTML = `
            <div class="alert alert-success">
                Food added successfully!
            </div>
        `;

        foodForm.reset();

        displayFoods();
    });

}


// Edit food
function editFood(index) {

    const food = foodItems[index];

    document.getElementById("foodName").value = food.name;
    document.getElementById("foodCategory").value = food.category;
    document.getElementById("foodQuantity").value = food.quantity;
    document.getElementById("foodExpiry").value = food.expiry;

    foodItems.splice(index, 1);

    localStorage.setItem("freshTrackFoods", JSON.stringify(foodItems));

    displayFoods();

    document.getElementById("foodName").focus();
}


// Delete food
function deleteFood(index) {

    foodItems.splice(index, 1);

    localStorage.setItem("freshTrackFoods", JSON.stringify(foodItems));

    displayFoods();
}


// Search and filter food
function searchAndFilterFoods() {

    const searchValue = searchFood ? searchFood.value.toLowerCase() : "";
    const categoryValue = filterCategory ? filterCategory.value : "";

    const filteredFoods = foodItems.filter(function(food) {

        const matchesName = food.name.toLowerCase().includes(searchValue);

        const matchesCategory = categoryValue === "" || food.category === categoryValue;

        return matchesName && matchesCategory;

    });

    displayFoods(filteredFoods);
}


// Search food by name
if (searchFood) {
    searchFood.addEventListener("input", searchAndFilterFoods);
}


// Filter food by category
if (filterCategory) {
    filterCategory.addEventListener("change", searchAndFilterFoods);
}

// Show saved food items
displayFoods();
