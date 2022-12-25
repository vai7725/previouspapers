const dropdownContent = Array.from(
  document.querySelectorAll(".dropdown-content")
);
const dropdownBtn = Array.from(document.querySelectorAll(".dropbtn"));
const courseCardOpts = document.querySelector(".courseCardOpts");
const courseYrCardOpts = document.querySelector("#courseYrOpts");
const subjectOptBox = document.querySelector("#subOpts");
const paperYearOptBox = document.querySelector("#paperYearOpt");
const courseOpt = document.getElementById("courseOptions");
const downloadBtn = document.getElementById("downloadBtn");
const paperYrBtn = document.querySelector(".paperYrBtn");
const subOptBtn = document.querySelector(".subjectOptBtn");
const courseYearOptBtn = document.querySelector(".courseYearOptBtn");
const courseYearOptBtnContent = `\n  <span>4th-year</span>\n  <i class="fa-solid fa-angle-down"></i>\n  `;

const urlLastValFinder = (url) => {
  let urlArr = url.split("/");
  let lastVal = urlArr[urlArr.length - 1];
  return lastVal;
};

const strToArr = (subjects) => {
  const subArr = subjects.split(";");
  return subArr;
};

const btnTextManipulator = (target) => {
  let text = target.textContent;
  let finalTxt = text.substring(0, 37);
  let tripleDot = "";
  if (text.length >= 37) {
    tripleDot = "...";
  }

  const btn = target.parentElement.previousElementSibling;
  btn.innerHTML = `
  <span>${finalTxt}${tripleDot}</span>
  <i class="fa-solid fa-angle-down"></i>
  `;
};

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let opts = btn.nextElementSibling;
    opts.classList.toggle("showOptions");
  });
  btn.addEventListener("blur", () => {
    setTimeout(() => {
      let opts = btn.nextElementSibling;
      if (opts.classList.contains("showOptions")) {
        opts.classList.remove("showOptions");
      }
    }, 250);
  });
});

//==========================
// working on dynamic options
//============================

// function to fetch data from data base.
const fetchOptions = async (fetchUrl) => {
  try {
    const res = await axios.get(`${fetchUrl}`);
    const courseOptions = res.data;
    return courseOptions;
  } catch (error) {
    console.log(error);
  }
};

courseCardOpts.childNodes.forEach((e) => {
  // course year options making algorithm ----------------------------
  e.addEventListener("click", async (event) => {
    btnTextManipulator(e);
    event.preventDefault();
    const data = await fetchOptions(e.href);
    const dataObj = data.data[0];

    const {
      courseName,
      courseYear,
      paper,
      paperYear,
      subjectFirstYear,
      subjectSecondYear,
      subjectThirdYear,
      subjectFourthYear,
    } = dataObj;

    let courseYearArr = courseYear.split(";");

    const courseYearOptionsBox = document.getElementById("courseYrOpts");
    if (courseYearOptionsBox.innerHTML != "") {
      courseYearOptionsBox.innerHTML = "";
    }

    const courseYearOptions = courseYearArr
      .map((value) => {
        const optValues = value.trim();
        return `<a href="/courses/options/api/${courseName}/${optValues}">${optValues}</a>`;
      })
      .join("");
    courseYearOptionsBox.innerHTML = courseYearOptions;

    courseYrCardOpts.childNodes.forEach((e) => {
      // subject options making algorithm ------------------------
      e.addEventListener("click", async (event) => {
        const selectedCourseYear = e;
        console.log(selectedCourseYear.textContent);
        event.preventDefault();
        await btnTextManipulator(e);
        const courseYearVals = [
          subjectFirstYear,
          subjectSecondYear,
          subjectThirdYear,
          subjectFourthYear,
        ];
        let nextOptVal = urlLastValFinder(e.href);
        const subOptArr = strToArr(courseYearVals[nextOptVal[0] - 1]);
        const subjectOptions = subOptArr
          .map((value) => {
            const optValues = value.trim();
            return `<a href="#">${optValues}</a>`;
          })
          .join("");
        subjectOptBox.innerHTML = subjectOptions;

        if (subjectOptBox.childNodes.length > 8) {
          subjectOptBox.classList.add("limited-content");
        }
        subjectOptBox.childNodes.forEach((e) => {
          e.addEventListener("click", async (event) => {
            // paper year option making algorithm -------------------------
            event.preventDefault();
            btnTextManipulator(e);
            const paperYearOpts = strToArr(paperYear);
            console.log(paperYearOpts);
            if (selectedCourseYear.textContent.trim() == "4th-year") {
              for (let i = 0; i < paperYearOpts.length; i++) {
                if (paperYearOpts[i] == 2019) {
                  console.log("fount");
                  const year2019 = paperYearOpts[i];
                  paperYearOpts.splice(year2019, 0, "2020");
                }
              }
            }
            const paperYearOptions = paperYearOpts
              .map((value) => {
                const optValues = value.trim();

                return `<a href="/courses/options/api/paper/">${optValues}</a>`;
              })
              .join("");
            paperYearOptBox.innerHTML = paperYearOptions;
            let DefaultPaperYrBtnOption = `
            <span>Select Paper Year</span>
            <i class="fa-solid fa-angle-down"></i>
            `;
            paperYrBtn.innerHTML = DefaultPaperYrBtnOption;
            downloadBtn.href = "";

            paperYearOptBox.childNodes.forEach((e) => {
              // download button algorithm ----------------------------
              e.addEventListener("click", async (event) => {
                event.preventDefault();
                btnTextManipulator(e);

                let valArr = [];
                dropdownBtn.forEach((e) => {
                  valArr.push(e.textContent.trim());
                });
                let finalStr = "";
                for (let i = 0; i < valArr.length; i++) {
                  finalStr += valArr[i];
                }
                let strForUrl = finalStr.split(" ").join("");
                const data = await fetchOptions(`${e.href}${strForUrl}`);
                const { paperLink } = data.paperDetails;

                downloadBtn.href = paperLink;
              });
            });
          });
        });
      });
    });
  });
});
