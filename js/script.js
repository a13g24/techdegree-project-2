/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/** 
 * Create the `showPage` function
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * @param {Object[]} list - The student data 
 * @param {Number} page - The desired page number 
 */
function showPage(list, page) {
   const ITEMS_PER_PAGE = 9;
   let startDex = (page * ITEMS_PER_PAGE) - ITEMS_PER_PAGE;
   let endDex = page * ITEMS_PER_PAGE;
   let ul = document.querySelector('.student-list');
   
   ul.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      // create student cards 
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

         // convert template literal to DOM fragment
         let fragment = document.createRange().createContextualFragment(card);

         // insert card into DOM
         ul.appendChild(fragment);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data, 1);