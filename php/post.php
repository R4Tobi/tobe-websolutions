<?php
//send_email.php
$email_from = "noreply@tobe-websolutions.de"; //Absender falls keiner angegeben wurde
$sendermail_antwort = true; //E-Mail Adresse des Besuchers als Absender. false= Nein ; true = Ja

$empfaenger = $_POST['email']; //Empfänger-Adresse
$mail_cc = ""; //CC-Adresse, diese E-Mail-Adresse bekommt einer weitere Kopie
$betreff = "Ihre Kontaktanfrage bei ToBe. WebSolutions"; //Betreff der Email

$url_ok = "https://www.tobe-websolutions.de/contact.html?success=true"; //Zielseite, wenn E-Mail erfolgreich versendet wurde
$url_fehler = "https://www.tobe-websolutions.de/contact.html?success=false"; //Zielseite, wenn E-Mail nicht gesendet werden konnte


//Diese Felder werden nicht in der Mail stehen
$ignore_fields = array('submit');

if ($_POST["message"] != "") {
  //Datum, wann die Mail erstellt wurde
  $name_tag = array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
  $num_tag = date("w");
  $tag = $name_tag[$num_tag];
  $jahr = date("Y");
  $n = date("d");
  $monat = date("m");
  $time = date("H:i");

  //Erste Zeile unserer Email
  $msg = "### Gesendet am $tag, den $n.$monat.$jahr - $time Uhr ###\n\n";

  //Hier werden alle Eingabefelder abgefragt
  foreach ($_POST as $name => $value) {
    if (in_array($name, $ignore_fields)) {
      continue; //Ignore Felder wird nicht in die Mail eingefügt
    }
    $msg .= "### $name ###\n$value\n\n";
  }
  $msg .= "Ihre Anfrage wird schnellstmöglich bearbeitet.\n Datenschutz: https://www.tobe-websolutions.de/privacy.html \n Impressum: https://www.tobe-websolutions.de/impressum.html";

  $header = "From: $email_from";

  if (!empty($mail_cc)) {
    $header .= "\n";
    $header .= "Cc: $mail_cc";
  }

  //Email als UTF-8 senden
  $header .= "\nContent-type: text/plain; charset=utf-8";

  $mail_senden = mail($empfaenger, $betreff, $msg, $header);
  $mail_admin = mail("tobias.baake@tobe-websolutions.de", "Neue Kontaktanfrage", $msg, $header);


  //Weiterleitung, hier konnte jetzt per echo auch Ausgaben stehen
  if ($mail_senden && $mail_admin) {
    header("Location: " . $url_ok); //Mail wurde gesendet
    exit();
  } else {
    header("Location: " . $url_fehler); //Fehler beim Senden
    exit();
  }
}else{
  header("Location: https://www.tobe-websolutions.de/contact.html");
}