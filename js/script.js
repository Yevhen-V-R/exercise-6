// Практика. Используем события на странице проекта
// ======================

/* Задания на урок:
-------------------------
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

// Для начало давайте Устанавливаем прослушку события "DOMContentLoaded" на полною загрузку приложения т.е. DOM структуры, а после полной загрузке уже будем запускать и сам функционал
document.addEventListener("DOMContentLoaded", () => {
  // ниже код функционала который сработает тогда когда загрузится полностью DOM структура

  // create object with data values its kind of our database наша база данных
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  // select html elements & store them in variable containers
  const adv = document.querySelectorAll(".promo__adv img"),
    poster = document.querySelector(".promo__bg"),
    genre = poster.querySelector(".promo__genre"),
    movieList = document.querySelector(".promo__interactive-list"),
    // #1
    // ------------------
    addForm = document.querySelector("form.add"),
    // #1
    // ------------------
    addInput = addForm.querySelector(".adding__input"),
    // #1
    // ------------------
    checkbox = addForm.querySelector('[type="checkbox"]');

  // #1
  // ------------------
  // attach event listener to listen for browser event 'submit' чтоб отследить отправку формы
  addForm.addEventListener("submit", (event) => {
    // lets stop browser default behaviour
    event.preventDefault();
    // т.о. Страница не должна перезагружаться.

    // #1 create variable to store user's input value
    let newFilm = addInput.value;
    // т.о. получения доступа к значению input т.е. то что пользователь ввел в инпут поле

    // #1 create variable to store user's checkbox checked box
    const favorite = checkbox.checked;
    // т.о. узнаем поставил ли пользователь галочку

    // #1 проверка на пустое инпут поле т.е. пользователь ничего не ввел 
    if (newFilm) {

      // #2 Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
      // ----------------
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`;
      }

      // #4 Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: "Добавляем любимый фильм"
      // ----------------
      if (favorite) {
        console.log("Добавляем любимый фильм");
      }

      // #1 новый фильм добавляется в список базы данных
      movieDB.movies.push(newFilm);

      // #1 и #5 запускаем функцию котрая отсортирует фильмы по алфавиту
      sortArr(movieDB.movies);

      // #1 запускаем функцию по созданию новых 'li' элементов фильмов списка на странице 
      createMovieList(movieDB.movies, movieList);
    }

    // #1 очищаем старые данные
    event.target.reset();
  });

  // DECLARE FUNCTIONS - объявляем функции function expressions

  // #1 создаем функцию по уадлению элементов рекламы, которую потом можно будет использовать и запустить
  // --------------------
  const deleteAdv = (arr) => {
    arr.forEach((item) => {
      item.remove();
    });
  };

  //#1 создаем функцию которая будет делать какие-то изменения на странице, т.е. изменяем контент, и которую потом можно будет использовать и запустить
  // --------------------
  const makeChanges = () => {
    // изменяем жанр
    genre.textContent = "драма";

    // изменяем картинку
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  // #1 создаем функцию которая будет сортировать по алфавиту, которую потом можно будет использовать и запустить
  // --------------------
  const sortArr = (arr) => {
    arr.sort();
  };

  // #1 создаем функцию по созданию списка фильмов, которую потом можно будет использовать и запустить
  // --------------------
  function createMovieList(films, parent) {
    // очищаем родительский элемент
    parent.innerHTML = "";

    // #5 заупскаем функцию отсортировки фильмов по алфавиту
    sortArr(films);

    // помещаем новые фильмы в список
    films.forEach((film, i) => {
      parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
    `;
    });

    // #3 При клике на мусорную корзину - элемент будет удаляться из списка
    // ------------------
    // select all delete elements & loop through each element to attach event listener
    document.querySelectorAll(".delete").forEach((btn, i) => {
      // навешиваем обработчика событий на каждую элемент корзины to listen for 'click' event & run callback function ()=>{} with its functionality when click event happens
      btn.addEventListener("click", () => {
        // select the parent html element of the selected delete html element & remove parent element from page удаляем элемент списка со страницы
        btn.parentElement.remove();

        // удаляем с базы данных, а именно удаление 1 определенного элемента с массива данных 
        movieDB.movies.splice(i, 1);

        // рекурсия где запускаем функцию, которая перестраивает заново элементы по порядку 
        // ..............
        // createMovieList(movieDB.movies, movieList, parent);
        // OR
        createMovieList(films, parent);
      });
    });
    // т.о. мы выбрали все элементы корзины и перебрали их 
    // NOTE: #3 мы создали элементы корзины <div class="delete"></div> index.html и задали стилли '.delete' в style.css
  }

  // CALL DECLARED FUNCTIONS TO USE THEM

  // #1 запускаем функцию по удалению рекламы
  // --------------------
  deleteAdv(adv);

  // #1 запускаем функцию по изменению контента
  // --------------------
  makeChanges();

  // #1 запускаем функцию по создания списка из новых фильмов
  // --------------------
  createMovieList(movieDB.movies, movieList);
});
// NOTE: т.о. мы установили события загрузки приложения, и когда приложение полностью загрузится то тогда и запустим callback function with its functionality to do

// NOTE: т.о. все наши функции переиспользуются 

/*
'document' - is built-in js DOM object that contains other built-in js methods & properties to work with DOM html elements 

NOTE: также может быть и такой вариант 'window.addEventListener()' 

'.' - is js operator to access to the built-in js methods & properties

'addEventListener()' - is built-in js method that attaches Event Listeners on the selected DOM html elements or on the whole 'document' itself to listen for a built-in browser event that is done by users & when event happens to run callback function with its functionality 

'DOMContentLoaded' - is built-in js browser event означает когда DOM структура загружена 

'()=>{}' - колбек функция которая запустится когда DOM структура будет полностью загружена 

NOTE: внутри callback function мы поместили весь функционал нашего приложения, которое запустится после полной загрузки приложения т.е. DOM страницы 
*/

/*
'document' - is built-in js object that contains all the built-in js properties & methods to work with DOM html elements

'querySelectorAll(".delete")' - select all html elements with class 'delete' which are shopping cart elements получаем все кнопки корзинки

'.' - is access js operator to access to the built-in js methods & properties

'querySelectorAll()' - is built-in js method to select all the same htlm elements from the DOM tree

'(".delete")' - is name of the selected html element

'forEach()' - is built-in js loop method to iterate each element & to apply functionality to each iterated html element т.е. перебираем каждую выбранную полученную корзину 

т.о. если мы хотим навесить на каждый выбранный элемент одно и тоже событие то мы используем forEach()

'()=>{}' - is arrow function & is callback function of the forEach() method 

'(btn, i)' - are the parameters of the callback function 

'btn' - каждая отдельная кнопка т.е. корзинка 

'i' - это индекс т.е. нумерация каждой отдельной корзины 

т.о. нумерация нужна чтоб знать номер по порядку элемента который мы удаляем 

МАССИВ содержит элементы строго по порядку начиная от индекса 0 

'=>' - is arrow function syntax ES6

'{}' - is block code for functionality to do 

'btn' - обращаемся к каждой кнопке корзине

'.' используем оператор доступа к встроенным метода или свойствам 

'addEventListener()' - обработчик событий is built-in js method of Event Listener, where 1st parameter is an event & 2nd parameter is callback function that runs when event happens 

"click" - is built-in browser clicking event 

',' - is js separator operator to separate paramters, arguments & etc.

'()=>{}' - is arrow callback function that will run when event 'click' happens 

'btn' - is selected html element of shopping cart 

'.' - is access to the built-in js methods & js properties 

'parentElement' - is built-in js property to select parent of the child element 

'.' - is access to the built-in js methods & js properties 

'remove()' - is built-in js method to remove & delete html element from the page 

';' - is closing js operator to close js statements 

'movieDB' - is custom name of variable that stores data values which is our database

'.' - is access to the data values & also access to the built-in js methods & js properties 

'movies' - is custom name of array 

'splice()' - is built-in js method to cut splice a certain element from array  

'(i, 1)' - parameters of splice method

'i' - is starting point to splice out the current item that is looped with forEach(, i) loop method

'1' - is 2nd argument that says number of how many elements to remove from the page & we want to delete 1 element 

';'

'createMovieList()'

'(films, parent)'

';'

*/
