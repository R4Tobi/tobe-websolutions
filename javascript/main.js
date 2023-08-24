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