const addFavor = document.querySelector('.fav__btn-add');
const divFavor = document.getElementById('fav-btn');
const loggedInUser = localStorage.getItem('loggedInUser');
const userFavors = JSON.parse(localStorage.getItem('userFavors')) || {};
const randomColor = ['#E47701', '#6743D3', '#e0477d']
const favor = [];




if(!localStorage.getItem("isLoggedIn")){
    addFavor.style.display = 'none';
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * randomColor.length);
    return randomColor[randomIndex];
}

addFavor.addEventListener("click", function(){
    if(favor.length < 6){
        const text = prompt('Введите текст для элемента');
        if (text === null || !text || /^\s*$/.test(text)) {
          alert('Ошибка: текст не может быть пустым или состоять только из пробелов. Или вы нажали отмена');
          return; // прерываем выполнение функции
      }
        const newFavor = divFavor.cloneNode(true);
        newFavor.style.backgroundColor = getRandomColor();

        // Создаем новый элемент p и добавляем текст пользователя
        const newParagraph = document.createElement('p');
        newParagraph.innerText = text;

        // Добавляем новый элемент на страницу и в массив
        newFavor.appendChild(newParagraph);
        divFavor.parentNode.appendChild(newFavor);
        favor.push(newFavor);

        // Добавляем созданный элемент к текущему пользователю
        if (loggedInUser) {
            if (!userFavors[loggedInUser]) {
            userFavors[loggedInUser] = [];
            }
            userFavors[loggedInUser].push(newFavor.outerHTML);
            localStorage.setItem('userFavors', JSON.stringify(userFavors));
        }

        // Обновляем страницу
        location.reload();

    }
    else{
        alert('Добавлено максимум')
    }
});






// Проверяем, есть ли сохраненные элементы для текущего пользователя
if (loggedInUser && userFavors[loggedInUser]) {
  // Создаем новый фрагмент
  const fragment = document.createDocumentFragment();
  // Проходимся по сохраненным элементам и добавляем их в фрагмент
  userFavors[loggedInUser].forEach((favorHTML) => {
      const favorEl = document.createElement('div');

      // Получаем значение из p элемента
      const idValue = favorHTML.match(/<p>(.*)<\/p>/i)[1].trim();

      // Присваиваем id новому элементу div
      favorEl.id = idValue;favor

      // Заполняем элемент HTML содержимым из строки HTML
      favorEl.innerHTML = favorHTML;
      favorEl.classList.add('reload-btn');

      fragment.appendChild(favorEl);
      favor.push(favorEl);

      favorEl.addEventListener('click', () => {
        const confirmed = confirm('Вы действительно хотите удалить этот элемент? Ваши задачи не удалятся');
        if (confirmed) {
            const userFavorInLocalStorage = JSON.parse(localStorage.getItem('userFavors')); // получаем массив из localStorage
            const userFavorForCurrentUser = userFavorInLocalStorage[loggedInUser]; // получаем массив задач для текущего пользователя
            const favorIndex = userFavorForCurrentUser.indexOf(favorHTML); // находим индекс задачи в массиве
            if (favorIndex > -1) { // если задача найдена в массиве
                userFavorForCurrentUser.splice(favorIndex, 1); // удаляем задачу из массива
                localStorage.setItem('userFavors', JSON.stringify(userFavorInLocalStorage)); // сохраняем массив обратно в localStorage
            }
    
            // Удаляем элемент из DOM
            favorEl.remove();
        }
    });
    
  });
  // Добавляем фрагмент на страницу
  divFavor.parentNode.appendChild(fragment);
}





// Находим все селекты и создаем новый фрагмент для каждого из них
const projectSelects = document.querySelectorAll('.project__name');
projectSelects.forEach((projectSelect) => {
  const fragment = document.createDocumentFragment();

  // Проходимся по массиву favor и создаем опции для каждого элемента
  favor.forEach((el, index) => {
    // Создаем новую опцию
    const pEl = el.querySelector('p');
    const optionEl = document.createElement('option');
    optionEl.value = `${pEl.textContent}`;

    // Находим элемент p и добавляем его содержимое в опцию
    optionEl.textContent = pEl.textContent;

    // Добавляем опцию в фрагмент
    fragment.appendChild(optionEl);
  });

  // Добавляем фрагмент с опциями в текущий селект
  projectSelect.appendChild(fragment);
});

// // Находим все блоки с классом reload-btn
// const reloadBtns = document.querySelectorAll('.reload-btn');

// // Проходимся по всем блокам и добавляем обработчик события на нажатие
// reloadBtns.forEach((btn) => {
//   btn.addEventListener('click', () => {
//     // Находим элемент p внутри блока и его содержимое
//     const pEl = btn.querySelector('p');
//     const pText = pEl.textContent;

//     // Находим все селекты и проходимся по их опциям
//     const projectSelects = document.querySelectorAll('.project__name');
//     projectSelects.forEach((projectSelect) => {
//       const projectOptions = projectSelect.querySelectorAll('option');
//       projectOptions.forEach((option) => {
//         // Если текст опции равен содержимому p, то делаем эту опцию выбранной
//         if (option.textContent === pText) {
//           option.selected = true;
//         }
//       });
//     });
//   });
// });


//созданние списков


// const taskMan = document.querySelector('.task__manager')
// const taskinMan = document.querySelector('.task')

// if (loggedInUser && userFavors[loggedInUser]) {
//   const fragmentUL = document.createDocumentFragment();
//   userFavors[loggedInUser].forEach((favorHTML) => {
//     const idValue = favorHTML.match(/<p>(.*)<\/p>/i)[1].trim();
//     const favorUL = document.createElement('ul');
//     favorUL.innerHTML
//     favorUL.id = idValue;
//     favorUL.classList.add('task__manager');
//     favorUL.classList.add('newUL');
//     fragmentUL.appendChild(favorUL);
//     localStorage.setItem(`${loggedInUser}-${idValue}`, favorUL.outerHTML);
//   });
//   taskMan.parentNode.appendChild(fragmentUL);
// }





















// function generateTaskList(selectedValue) {
//     const tasksContainer = document.querySelector('.task__manager');
//     tasksContainer.innerHTML = ''; // очищаем контейнер перед генерацией нового списка задач
  
//     // Фильтруем элементы массива favor на основе выбранного значения из селекта
//     const filteredFavor = selectedValue === 'All tasks'
//       ? favor // если выбрано "All tasks", то показываем все элементы
//       : favor.filter(el => el.querySelector('p').textContent === selectedValue);
  
//     // Создаем новый список задач
//     const tasksList = document.createElement('ul');
//     tasksList.classList.add('task__manager');
  
//     filteredFavor.forEach(favorItem => {
//       const task = document.createElement('div');
//       task.classList.add('task');
//       task.innerHTML = `
//         <div class="container">
//           <div class="task__data">
//             <svg class="task__accept" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//               <path d="M510.52,118.16,449.81,57.48a5,5,0,0,0-7.13,0L181.15,318.9a5,5,0,0,1-7.13,0L69.32,214.24a5,5,0,0,0-7.13,0L1.48,274.93a5,5,0,0,0,0,7.12L174,454.52a5,5,0,0,0,7.13,0L510.52,125.29A5,5,0,0,0,510.52,118.16Z"/>
//             </svg>   
//             <ul>
//               <li><h2 class="task__name">${favorItem.querySelector('p').textContent}</h2></li>
//               <li><h4 class="task__time">${favorItem.querySelector('h4').textContent}</h4></li>
//             </ul>
//           </div>
//         </div>
//       `;
//       tasksList.appendChild(task);
//     });
  
//     tasksContainer.appendChild(tasksList);
//   }
  
//   const select = document.querySelector('.project__name');
  
//   select.addEventListener('change', (event) => {
//     const selectedValue = event.target.value;
//     generateTaskList(selectedValue);
//   });
  
//   generateTaskList('All tasks');
  








