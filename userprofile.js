// Get the input field and the user profile panel
const usernameInput = document.getElementById("username-input");
const userProfilePanel = document.getElementById("user-profile-panel");

// Add an event listener to the input field to detect when the user presses the Enter key
usernameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const username = usernameInput.value.trim(); // Get the username from the input field

    // Send an AJAX request to the backend to get the user profile data
    fetch(`http://localhost:8080/userprofile/${username}`)
      .then(response => response.json())
      .then(data => {
        // Create a new HTML element to display the user profile panel
        const userProfileDiv = document.createElement("div");
        userProfileDiv.classList.add("user-profile");

        // Add the user profile information to the HTML element
        userProfileDiv.innerHTML = `
          <h2>${data.name}</h2>
          <p>Username: ${data.username}</p>
          <p>Email: ${data.email}</p>
          <p>Bio: ${data.bio}</p>
        `;

        // Add the HTML element to the user profile panel
        userProfilePanel.innerHTML = "";
        userProfilePanel.appendChild(userProfileDiv);
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
      });
  }
});
