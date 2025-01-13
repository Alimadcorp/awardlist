let initialhtm;
let generating = false;
let v = "1.1.1w";
function setversion(ver) {
  v = ver + "v";
  document.getElementById("logg").innerHTML = "&nbsp&nbsp" + v;
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logg").innerHTML = "&nbsp&nbsp" + v;
  history.pushState(null, null, location.href);
  window.addEventListener("popstate", () => {
    back();
    history.pushState(null, null, location.href);
  });
});
window.onload = () => {
  document.querySelector(
    `input[name="subject"][value="model"]`
  ).checked = true;
};

document.querySelectorAll('input[name="subject"]').forEach((radio) =>
  radio.addEventListener("change", function () {
    localStorage.setItem("selectedSubject", this.value);
  })
);

const delay = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

function back() {
  document.getElementById("log").style.display = "none";
  document.getElementById("scheduleTable").style.display = "none";
  document.getElementById("bb").style.display = "none";
  document.getElementById("rest").style.display = "inline";
  document.getElementById("time").innerHTML = "";
  document.getElementById("logg").style.display = "inline";
}
async function generateSchedule() {
    if (generating) return;
    generating = true;
    const table = document.getElementById("scheduleTable");
    const other = document.getElementById("rest");
    const bb = document.getElementById("bb");
    const log = document.getElementById("log");
    let logs = "&nbsp&nbsp" + v + "MS";
    bb.style.display = "inline";
    document.getElementById("logg").style.display = "none";
    document.getElementById("log").style.display = "inline";
    table.style.display = "table";
    other.style.display = "none";
    if (initialhtm == null) {
      initialhtm = table.innerHTML;
    }
    table.innerHTML = initialhtm;
    let selected =     document.querySelector('input[name="subject"]:checked').value;
    const myEvent = new CustomEvent('loadTable', {
    detail: { message: selected }
});
document.dispatchEvent(myEvent);
    generating = false;
}
// Listen for the event
document.addEventListener('showTable', (event) => {
    console.log('Custom event triggered:', event.detail.message);
    let lst = event.detail.message;
    for(let i = 0; i < lst.length; i++){
      let b = lst[i];
      addRow([i + 1, b.name, b.class, b.section, b.roll, b.department, b.contact]);
    }
});
function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [day, month] = inputDate.split("-");
  return `${day} ${months[parseInt(month) - 1]}`;
}
function addRow(data) {
  const tableBody = document.querySelector("#scheduleTable tbody");
  const newRow = document.createElement("tr");
for(let i = 0; i < data.length; i++){
  const newCell1 = document.createElement("td");
  newCell1.textContent = data[i];
  newRow.appendChild(newCell1);}
  
  newRow.classList.add("new-row"); // Initially invisible

  tableBody.appendChild(newRow);
  document
    .querySelectorAll("th")
    .forEach(
      (th) =>
        (th.style.background = "linear-gradient(135deg, #663522, #4a2c1b)")
    );
  setTimeout(() => {
    newRow.classList.add("visible");
  }, 10);
}
