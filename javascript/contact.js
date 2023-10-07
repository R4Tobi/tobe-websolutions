
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
  let stateObj = { id: "100" }; 
  window.history.pushState(stateObj, "Contact", "/contact.html");
}
