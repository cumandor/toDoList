// modalak

const addTaskBtn = document.querySelector(".add-task__btn");
const modal = document.querySelector(".modal-overlay");

if(!localStorage.getItem("isLoggedIn")){
  addTaskBtn.style.display = 'none';
}

addTaskBtn.addEventListener("click", function() {
  modal.style.display = "block";
});
const closeModalBtn = document.querySelector(".close-modal");

closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// modalak-end


// add tasks



const form = document.getElementById("add-task-form");
const taskList = document.querySelector(".task__manager");
const titleInput = document.getElementById("title");
const tasks = [];
const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
const selectModal = document.getElementById('modal__select');

form.addEventListener("submit", function(event) {
  event.preventDefault(); 
  const title = titleInput.value;
  const data = document.getElementById("data").value;
  const dateInput = document.getElementById('data');
  const dateValue = new Date(dateInput.value);
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDate = dateValue.toLocaleDateString('de-DE', options);
  const projectModal = selectModal.value;

  const li = document.createElement("li");
  li.classList.add("task");
  li.innerHTML = `
       <div class="container"">
        <div class="task__data" id="${projectModal}">
        <svg class="task__accept" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M510.52,118.16,449.81,57.48a5,5,0,0,0-7.13,0L181.15,318.9a5,5,0,0,1-7.13,0L69.32,214.24a5,5,0,0,0-7.13,0L1.48,274.93a5,5,0,0,0,0,7.12L174,454.52a5,5,0,0,0,7.13,0L510.52,125.29A5,5,0,0,0,510.52,118.16Z"/></svg>   
          <ul>
            <li><h2 class="task__name">${title}</h2></li>
            <li><h4 class="task__time">${new Date().toLocaleDateString()}</h4></li>
           
            <li><p class="task__category">${formattedDate}</p></li>
          </ul>
        </div>
      </div>
    `;

    if (loggedInUser) {
      if (!userTasks[loggedInUser]) {
        userTasks[loggedInUser] = [];
      }
      li.id = projectModal;
      userTasks[loggedInUser].push(li.innerHTML);
      localStorage.setItem('userTasks', JSON.stringify(userTasks));
  }

  taskList.appendChild(li);
  tasks.push(li); 

  modal.style.display = "none";
  form.reset();
});


let compTasks = [];

// window.addEventListener('load', function() {
//   if (loggedInUser && userTasks[loggedInUser]) {
//     const fragment = document.createDocumentFragment();
//     userTasks[loggedInUser].forEach((taskHTML) => {
//       const taskEl = document.createElement('div');
//       taskEl.innerHTML = taskHTML;
//       taskEl.classList.add('task');
//       const projectModal = taskEl.querySelector('.task__data').getAttribute('id');
//       taskEl.id = projectModal;
//       fragment.appendChild(taskEl);
//       tasks.push(taskEl);
//       taskEl.addEventListener('click', function() {
//         console.log(taskEl);
//       });
//     });
//     taskList.appendChild(fragment);
//   }
// });
const taskCompleteItem = document.querySelector('.task__complete-item');
const compl = taskCompleteItem.querySelector('.compl');




window.addEventListener('load', function() {
  if (loggedInUser && userTasks[loggedInUser]) {
    const fragment = document.createDocumentFragment();
    userTasks[loggedInUser].forEach((taskHTML, index) => { // добавляем второй аргумент index для получения индекса элемента в массиве
      const taskEl = document.createElement('div');
      taskEl.innerHTML = taskHTML;
      taskEl.classList.add('task');
      const projectModal = taskEl.querySelector('.task__data').getAttribute('id');
      taskEl.id = projectModal;
      fragment.appendChild(taskEl);
      tasks.push(taskEl);
      
      taskEl.addEventListener('click', function() {
        location.reload();
        const currentValue = parseInt(compl.textContent);
        // увеличиваем его на 1
        const newValue = currentValue + 1;
        // обновляем значение числа внутри элемента
        compl.textContent = newValue;
        localStorage.setItem(`compNumber-${loggedInUser}`, JSON.stringify(newValue))
        const userTasksInLocalStorage = JSON.parse(localStorage.getItem('userTasks')); // получаем массив из localStorage
        const userTasksForCurrentUser = userTasksInLocalStorage[loggedInUser]; // получаем массив задач для текущего пользователя
        const taskIndex = userTasksForCurrentUser.indexOf(taskHTML); // находим индекс задачи в массиве
        if (taskIndex > -1) { // если задача найдена в массиве
          userTasksForCurrentUser.splice(taskIndex, 1); // удаляем задачу из массива
          localStorage.setItem('userTasks', JSON.stringify(userTasksInLocalStorage)); // сохраняем массив обратно в localStorage
        }
      });
    });
    taskList.appendChild(fragment);
  }
});




const allTasks = document.querySelector(".all-tasks");

// Функция для обновления количества задач на странице
function updateTasksCount() {
  const count = tasks.length;
  allTasks.textContent = count;
}

// Добавляем задачу в список и обновляем количество задач
form.addEventListener("submit", function(event) {
  event.preventDefault(); 
  // ...код для создания и добавления новой задачи...
  tasks.push(li); 
  updateTasksCount(); // Обновляем количество задач
});

// Загружаем задачи из localStorage и обновляем количество задач
window.addEventListener('load', function() {
  // ...код для загрузки задач из localStorage...

  updateTasksCount(); // Обновляем количество задач
});

const addButton = document.querySelector(".add-btn");

addButton.addEventListener("click", function(event) {
  location.reload();
});

const complTask = document.getElementById('compl__task')

const selectElement = document.querySelector('.project__name');

selectElement.addEventListener('change', function() {
  const selectedOption = document.querySelector('#compl__task');
  if (selectedOption.selected) {
    addTaskBtn.style.display = 'none';
  } else {
    addTaskBtn.style.display = 'block';
  }
});

