// // Получаем элементы со страницы
// const mySelect = document.getElementById("mySelect");
// const taskManagers = document.querySelectorAll(".task__manager");

// // Функция для изменения стиля display
// function setDisplay(element, displayValue) {
//   element.style.display = displayValue;
// }

// // Функция для обновления отображения на странице
// function updateDisplay() {
//   // Получаем выбранный option
//   const selectedOption = mySelect.options[mySelect.selectedIndex];

//   // Перебираем все ul списки
//   for (const taskManager of taskManagers) {
//     // Получаем id текущего ul списка
//     const id = taskManager.getAttribute("id");

//     // Если id соответствует value выбранного option
//     if (id === selectedOption.value) {
//       // Показываем текущий ul список
//       setDisplay(taskManager, "block");
//     } else {
//       // Скрываем все остальные ul списки
//       setDisplay(taskManager, "none");
//     }
//   }
// }

// // Обновляем отображение на странице при изменении выбранного option
// mySelect.addEventListener("change", updateDisplay);

// // Обновляем отображение на странице при загрузке страницы
// updateDisplay();


const select = document.getElementById("mySelect");

select.addEventListener("change", function () {
  const selectedValue = this.value;
  const tasks = document.querySelectorAll(".task");
  
  tasks.forEach((task) => {
    if (task.id === selectedValue || selectedValue === "All-tasks") {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
});

