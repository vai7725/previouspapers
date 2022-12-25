const unCardGenerator = () => {
  let cardbody = document.createElement("div");
  cardbody.classList.add("card");

  // card image
  let cardImg = document.createElement("img");
  cardImg.src = "imgs/mdsu.jpg";

  // card heading
  let cardheading = document.createElement("h4");
  cardheading.innerText = `Maharshi Dayananda Saraswati University`;

  //card desc
  let cardDesc = document.createElement("p");
  cardDesc.innerText = `Maharshi Dayanand Saraswati University Ajmer is a prominent
    affiliating university in the state of Rajasthan. Established on
    August 1, 1987...`;

  // card button
  let cardBtn = document.createElement("a");
  cardBtn.href = "/courses";
  cardBtn.innerText = "Select";

  cardbody.appendChild(cardImg);
  cardbody.appendChild(cardheading);
  cardbody.appendChild(cardDesc);
  cardbody.appendChild(cardBtn);
  console.log(cardbody);
  cardBox.appendChild(cardbody);
};
unCardGenerator();
