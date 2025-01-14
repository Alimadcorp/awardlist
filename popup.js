function cleanup() {
  showPopup("Upload Entry", "Enter Details");
}

function showPopup(title, description) {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-description").innerText = description;
  document.getElementById("popup-overlay").style.display = "flex";

  document.getElementById("cleanerr").textContent = "";
  document.getElementById("iname").value =
    localStorage.getItem("cin") || "";
}

function hidePopup() {
  document.getElementById("popup-overlay").style.display = "none";
}

document.getElementById("popup-ok").addEventListener("click", () => {
  try {
  let datta = new dota();
  throwError("");
  datta.rank = Math.floor(Math.random() * 10000);
  let selected =     document.querySelector('input[name="tv"]:checked').value;
  datta.cat = selected;
  if(document.getElementById("iname").value.length < 2){
    throwError("Enter full name");
    return;
  }else{
    datta.name = document.getElementById("iname").value;
    localStorage.setItem("cin", datta.name);
  }
  if(isNaN(parseInt(document.getElementById("iclass").value))){
    throwError("Enter correct class");
    return;
  }else{
    datta.Class = parseInt(document.getElementById("iclass").value);
  }
  if(isNaN(parseInt(document.getElementById("iphone").value)) || parseInt(document.getElementById("iphone").value) < 100000){
    throwError("Enter correct phone number");
    return;
  }else{
    datta.phone = parseInt(document.getElementById("iphone").value);
  }
  if(document.getElementById("isection").value.length < 1){
    datta.section = "";
  }else{
    datta.section = document.getElementById("isection").value;
  }
  if(document.getElementById("iroll").value.length < 2){
    datta.roll = "";
  }else{
    datta.roll = document.getElementById("iroll").value;
  }
  if(document.getElementById("imajor").value.length < 1){
    datta.major = "";
  }else{
    datta.major = document.getElementById("imajor").value;
  }
  upload(datta);
  } catch (error) {
    throwError(error);
  }
});

function upload(data){
  const myNEvent = new CustomEvent('uploadData', {
    detail: { message: data }
});
document.dispatchEvent(myNEvent);
}

class dota{
   dota(){
    this.name = "";
    this.Class = 0;
    this.section = "";
    this.roll = "";
    this.major = "";
    this.phone = 0;
    this.cat = "";
     this.rank = 0;
  }
}

function throwError(err) {
  document.getElementById("cleanerr").textContent = err;
}

document.getElementById("popup-cancel").addEventListener("click", hidePopup);
