const AUTH_URL = "https://script.google.com/a/macros/pothisd.us/s/AKfycbzSvo5n0ELksg-xVljMX8xyDrY2JrWtXgVqZ1BSC0Mkg4snFWappX3A-CZShfVCM3wekQ/exec";

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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      return res.text();
    })
    .then(response => {
      showMessage(response);
    })
    .catch(err => {
      console.error("Registration error:", err);
      showMessage("Registration failed. Make sure you're signed in with your school account.");
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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      return res.text();
    })
    .then(response => {
      if (response === "Login successful") {
        localStorage.setItem("forumUser", username);
        window.location.href = "index.html";
      } else {
        showMessage(response);
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      showMessage("Login failed. Make sure you're signed in with your school account.");
    });
}

function showMessage(msg) {
  document.getElementById("auth-message").textContent = msg;
}
