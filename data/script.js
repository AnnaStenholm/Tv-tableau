

/*Side-Menu*/


function toggleMenu() {
  const menu = document.querySelector("ul.menu");
  const icon = document.querySelector('.fas.fa-bars');
  console.log(menu);
  menu.classList.toggle("menu--show");
  icon.classList.toggle('fa-times');
}

/* Ladda titel på vald kanal*/

window.addEventListener("load", () => {
  setChannel("SVT2");

});


function setChannel(chanel) {
  document.querySelector("#js-loading").classList.remove("hidden");
  fetch("/data/" + chanel + ".json")
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      programData = data;
      render(data);
      document.querySelector("#js-loading").classList.add("hidden");
    });
  document.getElementById("js-title").innerHTML = chanel;
}

/* Map-funktion*/
function render(data) {
  tidSorterare(data);
  if (!previousItems) {
    data = filterTid(data);
  }
  let html = `<ul class="list-group list-group-flush">`
  if (!previousItems) {
    html += `<li class="list-group-item show-previous" "onclick"=showRecent()>Visa tidigare program</li>`
  }


  html += data.map((programData) => {
    return `<li class="list-group-item">
                  <strong>${moment(programData.start).format('HH:mm')} </strong>
 <div>${programData.name} </div></li>`;

  })
    .join("");
  html += '</ul>';
  document.getElementById("js-schedule").innerHTML = html;

}

/*Sortera på tid */
function tidSorterare() {

  data.sort((a, b) => {
    if (a.start < b.start) {
      return -1;
    }
    if (a.start > b.start) {
      return 1;
    }
    return 0;
  });
}

let previousItems = false;
let data = [];
function showRecent() {
  previousItems = true;
  render(programData);

  function filterTid(data) {
    return data.filter(function (program) {
      const startTime = new Date(program.start);
      const currentTime = new Date();
      return startTime.getHours() > currentTime.getHours();
    })
  }
}