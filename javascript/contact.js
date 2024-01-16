
function validateEmail(email) {
  if (!document.getElementById("validMail").classList.contains("hidden")) {
    document.getElementById("validMail").classList.add("hidden");
  }

  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (re.test(email)) {
    return true;
  } else {
    document.getElementById("validMail").classList.remove("hidden");
    return false;
  }
}

function validateNumber(number) {
  if (!document.getElementById("validPhone").classList.contains("hidden")) {
    document.getElementById("validPhone").classList.add("hidden");
  }

  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;

  if(String(number).length > 0){
      if (re.test(number.replaceAll(" ", ""))) {
        return true;
      } else {
        document.getElementById("validPhone").classList.remove("hidden");
        return false;
      }
  }
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
    if (!document.getElementById("validText").classList.contains("hidden")) {
      document.getElementById("validText").classList.add("hidden");
    }
    if (!document.getElementById("validName").classList.contains("hidden")) {
      document.getElementById("validName").classList.add("hidden");
    }

  //check E-Mail
  if (!validateEmail(document.getElementById("email").value)) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
  }
  //check name
  else if (
    document.getElementById("name").value.replaceAll(" ", "").length <= 2
  ) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
    document.getElementById("validName").classList.remove("hidden");
  }
  //check the phone number
  else if (
    !(
      validateNumber(document.getElementById("phone").value) ||
      document.getElementById("phone").value.length >= 0
    )
  ) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
  }
  //check the message
  else if (
    document.getElementById("message").value.replaceAll(" ", "").length <= 50
  ) {
    document.getElementById("contactForm").style.animation =
      "horizontal-shaking  0.2s 3";
    setTimeout(() => {
      document.getElementById("contactForm").style.animation = "";
    }, 600);
    showSnackbar("Die Nachricht darf nicht leer sein.");
    document.getElementById("validText").classList.remove("hidden");
  } else {
    document.getElementById("contactForm").submit();
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

snackBoxList = [];
function showSnackbar(message) {
  console.log(message)
}