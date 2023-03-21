// // получаем все элементы select на странице
// const selects = document.querySelectorAll('select');

// // для каждого select элемента добавляем обработчик события click
// selects.forEach(select => {
//   select.addEventListener('click', () => {
//     // добавляем класс 'open' для открытия списка опций
//     select.classList.add('open');
//   });

//   // добавляем обработчик события blur, чтобы закрыть список опций
//   select.addEventListener('blur', () => {
//     // удаляем класс 'open' для закрытия списка опций
//     select.classList.remove('open');
//   });
// });

// Получаем элементы со страницы
const taskCompleteItems = document.querySelectorAll('.task__complete-item');


// Создаем функцию-обработчик событий
function loadHandler() {
  // Получаем значение из localStorage
  const compNumber = localStorage.getItem(`compNumber-${loggedInUser}`);

  // Если значение не пустое
  if (compNumber !== null) {
    // Проходимся по всем элементам с классом task__complete-item
    taskCompleteItems.forEach(item => {
      // Находим элемент p внутри текущего элемента li
      const pElement = item.querySelector('.compl');

      // Заменяем содержимое элемента p на значение из localStorage
      pElement.textContent = compNumber;
    });
  }
}

// Вызываем функцию-обработчик при загрузке страницы
window.addEventListener('load', loadHandler);
