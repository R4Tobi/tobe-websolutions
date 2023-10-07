function copyDiscordName(name, unhide, hide){
    navigator.clipboard.writeText(name);
    unhide.style.display = "block";

    for(var index = 0; index < hide.length; index++){
        hide[index].style.display = "none";
    }

    setTimeout(() => {
        unhide.style.display = "none";
        for (var index = 0; index < hide.length; index++) {
          hide[index].style.display = "block";
        }
    }, 3000)
}