let nameSign = document.getElementById("name-sign");
let passwordSign = document.getElementById("pass-sign");
let emailSign = document.getElementById("email-sign");
let btnSign = document.getElementById("btn-sign");

let arrSign = JSON.parse(localStorage.getItem("sign")) || [];

// Validation Regex
const regixEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const regixName = /^[A-Z].*/;
const regixPassword = /[a-zA-Z]/;

// Function to handle all validations
function validateInputs(dataSign) {
  let errorName = document.querySelector(".name-err");
  let erroremail = document.querySelector(".email-err");
  let errorpass = document.querySelector(".pass-err");

  const errorElement = document.querySelector(".empaty");
  if (errorElement) errorElement.innerHTML = "";

  if (errorName) errorElement.innerHTML = "";
  if (erroremail) errorElement.innerHTML = "";
  if (errorpass) errorElement.innerHTML = "";

  if (emptySign(dataSign.name, dataSign.password, dataSign.email)) {
    errorElement.classList.add("text-danger");
    errorElement.innerHTML = "All inputs are required.";
    return false;
  }

  // Validate name
  if (!regixName.test(dataSign.name)) {
    errorName.innerHTML = "Name must start with an uppercase letter.";
    return false;
  } else {
    errorName.innerHTML = "";
  }

  // Validate email
  if (!regixEmail.test(dataSign.email)) {
    erroremail.innerHTML = "Email must be a valid Gmail address.";
    return false;
  } else {
    erroremail.innerHTML = "";
  }

  // Validate password
  if (!regixPassword.test(dataSign.password)) {
    errorpass.innerHTML = "Password must contain at least one letter.";
    return false;
  } else {
    errorpass.innerHTML = "";
  }

  // Check if email already exists
  if (foundEmailSign(dataSign.email)) {
    errorElement.classList.add("text-danger");
    errorElement.innerHTML = "Email already exists.";
    return false;
  }

  // If all validations pass
  if (errorName) errorElement.innerHTML = "";
  if (erroremail) errorElement.innerHTML = "";
  if (errorpass) errorElement.innerHTML = "";
  errorElement.classList.add("text-success");
  errorElement.classList.remove("text-danger");
  errorElement.innerHTML = "Success!";
  return true;
}

function emptySign(name, password, email) {
  return name.trim() === "" || password.trim() === "" || email.trim() === "";
}

// Check if email is already registered
function foundEmailSign(email) {
  return arrSign.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
}

// Handle form submission
btnSign?.addEventListener("click", function (e) {
  e.preventDefault();

  let dataSign = {
    name: nameSign.value.trim(),
    password: passwordSign.value.trim(),
    email: emailSign.value.trim(),
  };

  if (validateInputs(dataSign)) {
    arrSign.push(dataSign);
    localStorage.setItem("sign", JSON.stringify(arrSign));

    nameSign.value = "";
    passwordSign.value = "";
    emailSign.value = "";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 50);
  }

  console.log(arrSign);
});

// login

let passwordLogin = document.getElementById("pass-login");
let emailLogin = document.getElementById("email-login");
let btnLogun = document.getElementById("btn-login");
let arrlogin = [];

arrlogin = JSON.parse(localStorage.getItem("login")) || [];

console.log(passwordLogin, emailLogin, btnLogun); // Debug

function validatelogin(dataLogin) {
  let erroremail = document.querySelector(".login-err-email");
  let errorpass = document.querySelector(".login-err-pass");
  const errorElement = document.querySelector(".empaty");
  if (errorElement) errorElement.innerHTML = "";
  if (erroremail) errorElement.innerHTML = "";
  if (errorpass) errorElement.innerHTML = "";
  if (emptyLogin(dataLogin.email, dataLogin.password)) {
    errorElement.classList.add("text-danger");
    errorElement.innerHTML = "All inputs are required.";
    return false;
  }

  if (!regixEmail.test(dataLogin.email)) {
    erroremail.innerHTML = "Email must be a valid Gmail address.";
    return false;
  } else {
    erroremail.innerHTML = "";
  }

  if (!regixPassword.test(dataLogin.password)) {
    errorpass.innerHTML = "Password must contain at least one letter.";
    return false;
  } else {
    errorpass.innerHTML = "";
  }
  if (errorElement) errorElement.innerHTML = "";
  if (erroremail) errorElement.innerHTML = "";
  if (errorpass) errorElement.innerHTML = "";

  return true;
}

function emptyLogin(email, password) {
  return email.trim() === "" || password.trim() === "";
}

btnLogun?.addEventListener("click", function (e) {
  e.preventDefault();
  let dataLogin = {
    email: emailLogin.value,
    password: passwordLogin.value,
  };

  if (validatelogin(dataLogin)) {
    let user = arrSign.find(
      (user) =>
        user.email.toLowerCase() === dataLogin.email.toLowerCase() &&
        user.password === dataLogin.password
    );
    console.log(user);

    if (user) {
      window.location.href = "home.html";
      arrlogin.push(dataLogin);
      localStorage.setItem("login", JSON.stringify(arrlogin));

      const errorElement = document.querySelector(".empaty");
      errorElement.innerHTML = "";
      emailLogin.value = "";
      passwordLogin.value = "";
    } else {
      const errorElement = document.querySelector(".empaty");
      errorElement.innerHTML = "incorrect email or password";
    }
  }
});
//home

let nameHome = document.querySelector(".name-home");
let number = arrSign.length;
let logOut = document.querySelector(".out");
console.log(logOut);
console.log(number);
nameHome.textContent = `Welcome  ${arrSign[number - 1].name}`;
console.log(nameHome);

logOut.addEventListener("click", function () {
  setTimeout(() => {
    window.location.href = "sign up.html";
  }, 50);
});
let menu = document.querySelector(".navbar-toggler-icon");
console.log(menu);

menu.addEventListener("click", function () {
  logOut.classList.replace("d-none", "d-flex");
});
