
// ------------------- hamburger menu -----------------------
const bar = document.querySelector('.navbar');
const p = document.querySelector('.nav p');
const list = document.querySelector('.search-list');


bar.addEventListener('click', () => {
  list.classList.toggle('list-active');
  bar.classList.toggle('toggle');
  p.classList.toggle('none');
});


// ------------------ localStorage ------------------------
