
function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (re.test(email)) {
    document.getElementById("email").style.background = "rgba(0, 120, 60, 0.5)";
    return true;
  } else {
    document.getElementById("email").style.background = "rgba(116, 0, 0, 0.5)";
    return false;
  }
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateEmail(document.getElementById("email").value)) {
    document.getElementById("contactForm").submit();
  } else {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
    return;
  }
});

function checkState() {
  var query = window.location.search();
  console.log(query);
}
