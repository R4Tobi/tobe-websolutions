class Render {
  async projects(id) {
    var renderElem = document.getElementById(id);
    var response = await fetch("https://api.github.com/users/r4tobi/repos");
    var jsonData = await response.json();
    var elems = [];
    renderElem.innerHTML = `
    <div class="banter-loader">
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
      <div class="banter-loader__box"></div>
    </div>`;
    for (let index = 0; index < jsonData.length; index++) {
      var releases = await fetch(
        `https://api.github.com/repos/r4tobi/${jsonData[index].name}/releases`
      );
      var jsonReleases = await releases.json();
      let releaseName = "no releases published yet";
      if (jsonReleases.length > 0) {
        releaseName = `[${jsonReleases[0].name}]`;
      }
      var elemStr = `<div class="card" onclick="window.open('${jsonData[index].html_url}')">
                            <div class="card-content">
                                <h3>${jsonData[index].name}</h3>
                                <span>${releaseName}</span>
                                <hr>
                                <p>${jsonData[index].description}</p>
                            </div>
                        </div>`;
      elems.push(elemStr)
    }
    renderElem.innerHTML = "";
    elems.forEach((elem) => {
      renderElem.innerHTML += elem;
    });
  }
}

function init() {
  document.getElementById("nav").classList.remove("mobile-open");
  cardHoverEffect();
}

function progressBarScroll() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
    height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight,
    scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

window.onscroll = function () {
  progressBarScroll();
};

async function activeLink() {
  try {
    document.getElementsByClassName("active")[0].classList.remove("active");
  } catch (e) {
    e;
  }
  let current = window.location.toString();
  if (window.location.pathname === "/" || window.location.pathname === "") {
    current = window.location.toString() + "index.html";
  }
  //functions called on side switch
  if (window.location.pathname === "/projects.html") {
    console.log("hello")
    var render = new Render();
    await render.projects("cards");
    cardHoverEffect();
  }
  if(window.location.pathname === "/skills.html"){
    cardHoverEffect();
  }
  //
  let elements = document.getElementsByClassName("nav-urls")[0].children;
  let index = 0;
  let length = elements.length;

  for (index; index < length; index++) {
    if (elements[index].children[0].href === current) {
      elements[index].classList.add("active");
    }
  }
}

activeLink();

function toggleNav() {
  let nav = document.getElementById("nav");
  nav.classList.toggle("mobile-open");
}

function cardHoverEffect(){
  const cards = document.querySelectorAll(".card");
  const cardWrapper = document.querySelector(".cards");

  cardWrapper.addEventListener("mousemove", function ($event) {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = $event.clientX - rect.left;
      const y = $event.clientY - rect.top;

      card.style.setProperty("--xPos", `${x}px`);
      card.style.setProperty("--yPos", `${y}px`);
    });
  });
}
