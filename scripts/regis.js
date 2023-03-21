// получаем кнопки и формы
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const doneResult = document.querySelector('.done-container');
const usernameHeader = document.querySelector('.profile__data h2');

// проверяем, сохранено ли имя пользователя в localStorage
const savedUsername = localStorage.getItem("loggedInUser");

document.getElementById("register-btn").addEventListener("click", function(){
    // Скрываем форму логина, если она открыта
    document.getElementById("login-form").style.display = "none";
    registerBtn.style.display = "none";
    loginBtn.style.display = "block";
  
    // Открываем форму регистрации
    document.getElementById("register-form").style.display = "block";
  });
  
  document.getElementById("login-btn").addEventListener("click", function(){
    // Скрываем форму регистрации, если она открыта
    document.getElementById("register-form").style.display = "none";
    loginBtn.style.display = "none";
    registerBtn.style.display = "block";
  
    // Открываем форму логина
    document.getElementById("login-form").style.display = "block";
});

logoutBtn.addEventListener("click", function(){
  location.reload();
});

if (isLoggedIn) {
    usernameHeader.textContent = savedUsername;
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    doneResult.style.display = 'block';
  }
  else {
    // если пользователь не залогинен, то скрываем элемент h2
    usernameHeader.style.display = "none";
    logoutBtn.style.display = "none";
  }

// добавляем обработчики событий для кнопок
registerBtn.addEventListener("click", () => {
  registerForm.style.display = "block";
  loginForm.style.display = "none";
});

loginBtn.addEventListener("click", () => {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
    // registerBtn.style.display = "block";
    doneResult.style.display = 'none';
    localStorage.setItem("isLoggedIn", "false");
    usernameHeader.textContent = '';
    usernameHeader.style.display = "none";
});

// добавляем обработчики событий для форм
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;

     // проверяем, есть ли уже такой пользователь
  if (localStorage.getItem(username) !== null) {
    alert("Имя пользователя уже занято!");
    return;
  }

  localStorage.setItem(username, password);
  alert("Вы успешно зарегистрировались!");
  event.target.reset();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const storedPassword = localStorage.getItem(username);
  
    if (password === storedPassword) {
      alert("Вы успешно вошли!");
      event.target.reset();
      localStorage.setItem("loggedInUser", username);
    //   savedUsername = username;
      usernameHeader.textContent = username;
      loginForm.style.display = "none";
      loginBtn.style.display = "none";
      registerBtn.style.display = "none";
      registerForm.style.display = "none";
      logoutBtn.style.display = "block";
      doneResult.style.display = 'block';
      localStorage.setItem("isLoggedIn", "true");
      location.reload();
    } else {
      alert("Неверное имя пользователя или пароль!");
    }
  });
  
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    logoutBtn.style.display = "none";
  });