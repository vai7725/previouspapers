let gtpBtn = document.querySelector(".gtpBtn");
let formBtn = document.querySelector(".form-btn");
let copyrightYear = document.querySelector(".copyright-year");
let cardBox = document.querySelector(".card-box");

// Utility functions
function reply_click(id) {
  document.querySelector(`#${id}`).scrollIntoView();
}

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

// ===================================================================
// Footer dynamic year.
let date = new Date();
copyrightYear.innerHTML = date.getFullYear();
