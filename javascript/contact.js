
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

function validateNumber(number) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;

  if (re.test(number.replaceAll(" ",""))) {
    document.getElementById("phone").style.background = "rgba(0, 120, 60, 0.5)";
    return true;
  } else {
    document.getElementById("phone").style.background = "rgba(116, 0, 0, 0.5)";
    return false;
  }
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  //check E-Mail
  if (!validateEmail(document.getElementById("email").value)) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
    showSnackbar("Die E-Mail ist im falschen Format.");
  }
  //check the message
  else if (document.getElementById("message").value.replaceAll(" ", "").length === 0) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
    showSnackbar("Die Nachricht darf nicht leer sein.");
  }
  //check name
  else if (document.getElementById("name").value.replaceAll(" ", "").length === 0) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
    showSnackbar("Der Name darf nicht leer sein.");
  }
  //check the phone number
  else if (!(validateNumber(document.getElementById("phone").value) || document.getElementById("phone").value.length == 0)) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
    showSnackbar("Die Telefonnummer ist im falschen Format.");
  } else {
    document.getElementById("contactForm").submit();
    //
    
  }
});

function checkState() {
  var query = url => [...new URLSearchParams(url.split("?")[1])].reduce(
    (a, [k, v]) => ((a[k] = v), a),
    {}
  );
  queryObject = query(String(window.location));

  if(queryObject.success === "true"){
    document.getElementById("formContainer").innerHTML = `<p>Nachricht wurde erfolgreich versendet!</p>`;
  }else if(queryObject.success === "false"){
    document.getElementById(
      "formContainer"
    ).innerHTML = `<p>Nachricht konnte nicht gesendet werden. Versuchen sie es bitte zu einem späteren Zeitpunkt erneut.</p>`;
  }
  let stateObj = { id: "1" }; 
  window.history.pushState(stateObj, "Contact", "/contact.html");
}

function showSnackbar(message) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.innerHTML = message;
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}