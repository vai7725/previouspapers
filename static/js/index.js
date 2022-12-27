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
let welcomeBtn = document.querySelector(".welcome-btn");
let welcomeBox = document.querySelector(".welcome-popup-box");
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

// ==========================
// handlign the welcome popup and user count

//handling welcome popup
welcomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  welcomeBox.style.display = "none";
  visitSetter();

  fetchUserCount().then(async (res) => {
    const updatedCount = res.userCount + 1;
    const updateReq = await fetch(`/usercount/${updatedCount}`, {
      method: "PUT",
    });
  });
});
const visitSetter = () => {
  const now = new Date();
  const expiryTime = now.getTime() + 432000000;
  const tokenObj = {
    visited: true,
    time: expiryTime,
  };
  localStorage.setItem("token", JSON.stringify(tokenObj));
};
let visitedToken = localStorage.getItem("token");

const tokenExpiry = () => {
  if (!visitedToken) {
    return null;
  }
  const token = JSON.parse(visitedToken);
  const now = new Date();

  if (now.getTime() >= token.time) {
    localStorage.removeItem("token");
    return null;
  }
};

tokenExpiry();

if (visitedToken != null) {
  welcomeBox.style.display = "none";
}

// getting user count
const fetchUserCount = async () => {
  try {
    // await fetch("/usercount")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data[0].userCount));
    const res = await fetch("/usercount");
    const count = await res.json();
    const data = count[0];
    return data;
  } catch (error) {
    console.error(error);
  }
};

// // updating user count
// const updatingUserCount = async () => {
//   const data = await fetchUserCount();
//   console.log(data);
// };

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
