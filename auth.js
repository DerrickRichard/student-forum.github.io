const AUTH_URL = "https://script.google.com/a/macros/pothisd.us/s/AKfycbzSvo5n0ELksg-xVljMX8xyDrY2JrWtXgVqZ1BSC0Mkg4snFWappX3A-CZShfVCM3wekQ/exec"; // Replace with your deployed Apps Script URL

function registerUser() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!username || !password) {
    showMessage("Please enter both username and password.");
    return;
  }

  const payload = {
    action: "register",
    username,
    password
  };

  fetch(AUTH_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(response => {
      showMessage(response);
    });
}

function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    showMessage("Please enter both username and password.");
    return;
  }

  const payload = {
    action: "login",
    username,
    password
  };

  fetch(AUTH_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(response => {
      if (response === "Login successful") {
        localStorage.setItem("forumUser", username);
        window.location.href = "index.html"; // Redirect to forum
      } else {
        showMessage(response);
      }
    });
}

function showMessage(msg) {
  document.getElementById("auth-message").textContent = msg;
}
