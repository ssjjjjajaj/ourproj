const portBtns =
  document.querySelectorAll(".port-btn");

const panels =
  document.querySelectorAll(".panel");

const marqueeTitle =
  document.getElementById("marqueeTitle");


const portLabels = {

  learningPanel:
    "LEARNING PORT",

  gamingPanel:
    "GAMING PORT",

  songPanel:
    "SONG PORT"

};


function setPortHeader(panelId) {

  const label =
    portLabels[panelId] ||
    "GROUP 7 HUB";


  const words =
    label.split(" ");

  const accent =
    words.pop();

  const main =
    words.join(" ");


  marqueeTitle.innerHTML =
    `${main} <span>${accent}</span>`;


  document.title =
    `GROUP 7 HUB — ${label}`;

}


portBtns.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      portBtns.forEach(btn =>
        btn.classList.remove("active")
      );

      panels.forEach(panel =>
        panel.classList.remove("active")
      );


      button.classList.add("active");


      const panel =
        document.getElementById(
          button.dataset.panel
        );


      panel.classList.add("active");


      setPortHeader(
        button.dataset.panel
      );

    }
  );

});


setPortHeader(
  "learningPanel"
);
