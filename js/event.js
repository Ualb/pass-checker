var input = document.getElementById("password");

input.addEventListener("keyup", function(event) {
  var key = event.keyCode || event.key;
  if (key === 13) {
    event.preventDefault();
    document.getElementById("passwordSubmit").click();
  }
}); 

class TitleButton {
  hide() {
    cardMain.style.display = "none";
  }
  show() {
    cardMain.style.display = "block";
  }
}
 