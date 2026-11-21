
// FRESHTRACK - SETTINGS

// Get profile elements
const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileMessage = document.getElementById("profileMessage");

// Get current user
let currentUser = JSON.parse(localStorage.getItem("freshTrackCurrentUser"));

// Display current profile information
if (currentUser) {
    profileName.value = currentUser.name;
    profileEmail.value = currentUser.email;
}

// Save profile changes
if (profileForm) {

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const newName = profileName.value.trim();
        const newEmail = profileEmail.value.trim().toLowerCase();

        let users = JSON.parse(localStorage.getItem("freshTrackUsers")) || [];

        // Find current user
        const userIndex = users.findIndex(function(user) {
            return user.email === currentUser.email;
        });

        if (userIndex === -1) {
            profileMessage.innerHTML = '<div class="alert alert-danger">User account not found.</div>';
            return;
        }

        // Check whether email is already used
        const emailExists = users.some(function(user, index) {
            return user.email === newEmail && index !== userIndex;
        });

        if (emailExists) {
            profileMessage.innerHTML = '<div class="alert alert-danger">Email already registered.</div>';
            return;
        }

        // Update user information
        users[userIndex].name = newName;
        users[userIndex].email = newEmail;

        localStorage.setItem("freshTrackUsers", JSON.stringify(users));

        currentUser.name = newName;
        currentUser.email = newEmail;

        localStorage.setItem("freshTrackCurrentUser", JSON.stringify(currentUser));

        profileMessage.innerHTML = '<div class="alert alert-success">Profile updated successfully!</div>';

    });

}
