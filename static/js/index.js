// getting the dom elements
let gtpBtn = document.querySelector(".gtpBtn");
let formBtn = document.querySelector(".form-btn");
let copyrightYear = document.querySelector(".copyright-year");
let cardBox = document.querySelector(".card-box");
let formName = document.getElementById("form-name");
let formEmail = document.getElementById("form-email");
let formUniversity = document.getElementById("form-university");
let formMsg = document.getElementById("form-msg");
let formInputArr = Array.from(document.querySelectorAll(".form-inp"));
let formSubmitResponseMsg = document.querySelector(".serverMsg");

// Utility functions
function reply_click(id) {
  document.querySelector(`#${id}`).scrollIntoView();
}

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  storeContactDetails();

  formInputArr.forEach((e) => {
    e.value = "";
  });
});

// ===================================================================
// contact form data handling.

const storeContactDetails = async () => {
  try {
    const contactData = {
      userName: formName.value,
      userEmail: formEmail.value,
      userUniversity: formUniversity.value,
      userMsg: formMsg.value,
    };
    const res = await axios.post("/contact", contactData);
    const dataStoredMessage = res.data.msg;
    formSubmitResponseMsg.textContent = dataStoredMessage;
    setTimeout(() => {
      formSubmitResponseMsg.textContent = "";
    }, 3000);
  } catch (error) {
    formSubmitResponseMsg.textContent = error.response.data.msg;
    formSubmitResponseMsg.classList.add("redTxt");
    setTimeout(() => {
      formSubmitResponseMsg.textContent = "";
      formSubmitResponseMsg.classList.remove("redTxt");
    }, 3000);
  }
};

// ===================================================================
// Footer dynamic year.
let date = new Date();
copyrightYear.innerHTML = date.getFullYear();
