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

function activeLink(){
  try{
    document.getElementsByClassName("active")[0].classList.remove("active");
  }
  catch(e){
    e;
  }
  let current = window.location.toString();
  if(window.location.pathname === "/" || window.location.pathname === ""){
    current = window.location.toString() + "index.html"
  }
  let elements = document.getElementsByClassName("nav-urls")[0].children;
  let index = 0;
  let length = elements.length;

  for(index; index < length; index++){
    if(elements[index].children[0].href === current){
      elements[index].classList.add("active")
    }
  }
}

activeLink();

function toggleNav(){
  let nav = document.getElementById("nav");
  nav.classList.toggle("mobile-open")
}

function init(){
  document.getElementById("nav").classList.remove("mobile-open");
}

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