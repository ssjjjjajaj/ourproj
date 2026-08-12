const loginGate = document.getElementById("loginGate");
const site = document.getElementById("site");
const siteFooter = document.getElementById("siteFooter");

const userBar = document.getElementById("userBar");

const loginError = document.getElementById("loginError");
const loginStatus = document.getElementById("loginStatus");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const registerSubmit =
  document.getElementById("registerSubmit");

const loginSubmit =
  document.getElementById("loginSubmit");

const skipBtn =
  document.getElementById("skipBtn");

const authTabs =
  document.querySelectorAll(".auth-tab");


/* ================= TABS ================= */

authTabs.forEach(tab => {

  tab.addEventListener("click", () => {

    authTabs.forEach(t =>
      t.classList.remove("active")
    );

    tab.classList.add("active");

    registerForm.classList.toggle(
      "active",
      tab.dataset.form === "registerForm"
    );

    loginForm.classList.toggle(
      "active",
      tab.dataset.form === "loginForm"
    );

    loginError.textContent = "";
    loginStatus.textContent = "";

  });

});


/* ================= REGISTER ================= */

registerForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    loginError.textContent = "";
    loginStatus.textContent = "";

    const name =
      document.getElementById("regName")
        .value.trim();

    const email =
      document.getElementById("regEmail")
        .value.trim();

    const password =
      document.getElementById("regPassword")
        .value;

    const confirm =
      document.getElementById("regConfirm")
        .value;


    if (password !== confirm) {

      loginError.textContent =
        "Passwords do not match.";

      return;
    }


    if (password.length < 6) {

      loginError.textContent =
        "Password must be at least 6 characters.";

      return;
    }


    registerSubmit.disabled = true;

    loginStatus.textContent =
      "Creating your account...";


    try {

      const response =
        await fetch("/api/register", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })

        });


      const data =
        await response.json();


      if (!response.ok) {

        loginError.textContent =
          data.message ||
          "Registration failed.";

        loginStatus.textContent = "";

        return;
      }


      loginStatus.textContent =
        "Account created!";


      enterSite(
        data.user.name,
        data.user.email
      );


    } catch (error) {

      console.error(error);

      loginError.textContent =
        "Cannot connect to the server.";

    } finally {

      registerSubmit.disabled = false;

    }

  }
);


/* ================= LOGIN ================= */

loginForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    loginError.textContent = "";
    loginStatus.textContent = "";

    const email =
      document.getElementById("loginEmail")
        .value.trim();

    const password =
      document.getElementById("loginPassword")
        .value;


    loginSubmit.disabled = true;

    loginStatus.textContent =
      "Checking your account...";


    try {

      const response =
        await fetch("/api/login", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })

        });


      const data =
        await response.json();


      if (!response.ok) {

        loginError.textContent =
          data.message ||
          "Login failed.";

        loginStatus.textContent = "";

        return;
      }


      enterSite(
        data.user.name,
        data.user.email
      );


    } catch (error) {

      console.error(error);

      loginError.textContent =
        "Cannot connect to the server.";

    } finally {

      loginSubmit.disabled = false;

    }

  }
);


/* ================= ENTER SITE ================= */

function enterSite(name, email) {

  loginGate.classList.add("hidden");

  site.classList.add("revealed");

  siteFooter.style.display = "block";


  if (name) {

    userBar.innerHTML = `
      <span class="user-chip">
        Signed in as
        <strong>${escapeHTML(name)}</strong>
      </span>

      <button
        class="logout-btn"
        id="logoutBtn"
      >
        Log Out
      </button>
    `;

    document
      .getElementById("logoutBtn")
      .addEventListener(
        "click",
        logOut
      );

  } else {

    userBar.innerHTML = `
      <span class="user-chip">
        Playing as
        <strong>Guest</strong>
      </span>
    `;

  }

}


/* ================= LOGOUT ================= */

async function logOut() {

  try {

    await fetch(
      "/api/logout",
      {
        method: "POST"
      }
    );

  } catch (error) {

    console.error(error);

  }


  site.classList.remove("revealed");

  siteFooter.style.display = "none";

  loginGate.classList.remove("hidden");

  registerForm.reset();
  loginForm.reset();

  loginError.textContent = "";
  loginStatus.textContent = "";

}


/* ================= GUEST ================= */

skipBtn.addEventListener(
  "click",
  () => {

    enterSite(
      null,
      null
    );

  }
);


/* ================= SESSION CHECK ================= */

async function checkSession() {

  try {

    const response =
      await fetch("/api/me");

    const data =
      await response.json();


    if (data.loggedIn) {

      enterSite(
        data.user.name,
        data.user.email
      );

    }

  } catch (error) {

    console.error(
      "Session check failed:",
      error
    );

  }

}


checkSession();


/* ================= SECURITY ================= */

function escapeHTML(value) {

  const div =
    document.createElement("div");

  div.textContent = value;

  return div.innerHTML;

}
