// import "../styles/index.scss";

(function () {
  const wheel = document.querySelector(".wheel");
  const startBtn = document.querySelector(".button");
  const marker = document.querySelector(".marker");
  const giftName = document.querySelector(".popup__text");
  const giftImage = document.querySelector(".popup__image");
  const popup = document.getElementById("popup");
  const restartBtn = document.querySelector(".popup__btn");
  const body = document.querySelector(".popup__body");

  let deg = 0;
  let zoneSize = 60; //deg
  const giftZones = {
    1: "Controller",
    2: "Laptop",
    3: "Powerbank",
    4: "Loudspeaker",
    5: "Tablet",
    6: "Smartphone",
  };

  const handleWin = (actualDeg) => {
    const winningSymbolNr =
      actualDeg > 331
        ? Math.ceil(actualDeg - 30 / zoneSize)
        : Math.ceil((actualDeg + 30) / zoneSize);
    giftName.innerHTML = giftZones[winningSymbolNr];

    switch (giftZones[winningSymbolNr]) {
      case "Controller":
        giftName.setAttribute("src", "./img/ct.png");
        giftImage.setAttribute(
          "src",
          "./img/pngkit_ps4-controller-png_125338.png"
        );
        break;
      case "Laptop":
        giftName.setAttribute("src", "./img/lt.png");
        giftImage.setAttribute("src", "./img/pngkit_mac-laptop-png_748892.png");
        break;
      case "Powerbank":
        giftName.setAttribute("src", "./img/pb.png");
        giftImage.setAttribute(
          "src",
          "./img/pngkit_samsung-mobile-charger-png_8300053.png"
        );
        break;
      case "Loudspeaker":
        giftName.setAttribute("src", "./img/sr.png");
        giftImage.setAttribute(
          "src",
          "./img/pngkit_pill-shape-png_3456258.png"
        );
        break;
      case "Tablet":
        giftName.setAttribute("src", "./img/tb.png");
        giftImage.setAttribute("src", "./img/pngkit_tablet-png_111537.png");
        break;
      case "Smartphone":
        giftName.setAttribute("src", "./img/s.png");
        giftImage.setAttribute(
          "src",
          "./img/pngkit_mobile-transparent-png_3669988.png"
        );
        break;
    }
  };

  let getSpin = () => {
    startBtn.setAttribute("src", "./img/spin_pressed.png");
    setTimeout(() => {
      startBtn.setAttribute("src", "./img/spin_disabled.png");
      // disable button during spin
      startBtn.style.pointerEvents = "none";
    }, 1000);
    // calculate new rotation between 5000 and 10000
    deg = Math.floor(5000 + Math.random() * 5000);
    wheel.style.transition = "all 4s ease-out";
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add("blur");
  };

  startBtn.addEventListener("click", getSpin);

  wheel.addEventListener("transitionend", () => {
    startBtn.setAttribute("src", "./img/spin_normal.png");
    wheel.classList.remove("blur");
    // enable button when spin is over
    startBtn.style.pointerEvents = "auto";
    wheel.style.transition = "none";
    //calculate degree on  360 degree basis to get start point;
    let actualDeg = deg % 360 >= 331 ? (deg % 360) - 30 : deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    handleWin(actualDeg);
    setTimeout(() => {
      marker.style.visibility = "hidden";
      popup.classList.add("open");
    }, 400);
  });

  restartBtn.addEventListener("click", () => {
    popup.classList.remove("open");
    marker.style.visibility = "visible";
    getSpin();
  });

  body.addEventListener("click", () => {
    popup.classList.remove("open");
    marker.style.visibility = "visible";
  });
})();
