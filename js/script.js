/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Global variables
const ITEMS_PER_PAGE = 9;  // num students per page

/** 
 * Create the `showPage` function
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * @param {Object[]} list - The student data 
 * @param {Number} page - The desired page number 
 */
function showPage(list, page) {
   let startDex = (page * ITEMS_PER_PAGE) - ITEMS_PER_PAGE;
   let endDex = page * ITEMS_PER_PAGE;
   let ul = document.querySelector('.student-list');
   
   ul.innerHTML = '';

   // create student cards 
   for (let i = 0; i < list.length; i++) {
      if (i >= startDex && i < endDex) {
         // current student
         let datum = list[i];

         // student card
         let card = 
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${datum.picture.large}" alt="Profile Picture">
               <h3>${datum.name.first} ${datum.name.last}</h3>
               <span class="email">${datum.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${datum.registered.date}</span>
            </div>
         </li>`;

         // insert card into DOM
         ul.insertAdjacentHTML('beforeend', card);
      }
   }
}


/**
 * Create the `addPagination` function
 * This function will create and insert/append the elements needed for the pagination buttons
 * @param {Object[]} list - The student data
 */
function addPagination(list) {
   let numPages = Math.ceil(list.length / ITEMS_PER_PAGE);
   let ul = document.querySelector('.link-list');

   // remove existing pagination buttons
   ul.innerHTML = '';

   // create pagination buttons
   for (let page = 0; page < numPages; page++) {
      // new button
      let pageBtn = 
      `<li>
         <button type="button">${page + 1}</button>
      </li>`;

      ul.insertAdjacentHTML('beforeend', pageBtn);
   }

   // make first page button active
   ul.firstElementChild.firstElementChild.className = 'active';

   // listen for clicks on parent of links
   ul.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         // select all active class buttons
         let actives = document.getElementsByClassName('active');

         // remove class active from them
         for (const btn of actives) {
            btn.className = '';
         }

         // add active class to target button
         e.target.className = 'active';

         // call showPage with data and target page number
         showPage(list, e.target.textContent);
      }
   });
}

/**
 * Creates a search bar and a dynamic search feature.
 */
function createSearchBar() {
   // the search bar to insert
   let searchBar = 
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

   // place the search bar in the DOM
   document.querySelector('.header').insertAdjacentHTML('beforeend', searchBar);

   // select the search bar
   let search = document.querySelector('#search');

   // listen for keyups
   search.addEventListener('keyup', (e) => {
      // only log alphanumeric keys and backspace
      if (e.key.length === 1 || e.key === 'Backspace') {
         // get current value of text field
         let value = search.value;

         // create regex based on value
         let regex = new RegExp(value, 'gi');

         // callback function to filter by full name
         function filterByFullName(el) {
            let firstName = el.name.first;
            let lastName = el.name.last;
            let fullName = firstName + ' ' + lastName;

            return fullName.match(regex);
         }

         // filter data in array based on regex
         let allMatches = data.filter(filterByFullName);

         // change page to display only filtered names
         showPage(allMatches, 1);
         addPagination(allMatches);
      }
   });
}

// Call functions
showPage(data, 1);
createSearchBar();  
addPagination(data);