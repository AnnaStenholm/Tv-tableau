
/*Side-Menu*/


function toggleMenu() {
  const menu = document.querySelector("ul.menu");
  const icon = document.querySelector('.fas.fa-bars');
  console.log(menu);
  menu.classList.toggle("menu--show");
  icon.classList.toggle('fa-times');
}





/*
newUl.classList.contains('.ul-menu');
const newLi = document.createElement('li');
newUl.appendChild('newLi');
const textNode = document.createTextNode('SVT 1')
newLi.appendChild('textNode');*/


/*hämta program från kanal*/



window.addEventListener("load", () => {
  loadData()
});


let programData = []; //spara ner i array.

function loadData() {
  fetch("/data/SVT2.json")
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      programData = data;
      render()
    });
}



var timeStart=start.slice(11,16);


/* Map-funktion*/
function render() {
  let html = programData
    .map((dataPoint) => {
      return` 
      <li class="list-group-item">
                  <div class="tid"><strong>${moment(dataPoint.start).format('LT')} </strong></div>
 <div class="namn">${dataPoint.name} </div></li>`;
 
    })
    .join("");
    document.getElementById("js-schedule").innerHTML = html;
        
}
render();


function setChannel(chanel){
  let chanel = "./data/"+chanel+".json";
  fetch(chanel)
  .then(res => res.json())
  .then((data) => {
    console.log(data)
    let kanalInfo = programData
    .map((dataPoint) => {
    return `        
      <ul class="list-group list-group-flush">
        <li  class="list-group-item show-previous" onclick="setChannel2('${dataPoint.chanel}')">Visa tidigre program</li>`;

      })
{
var name=data[i].name;
var start=data[i].start;

var startTime=start.slice(11,16);

  
} 
document.getElementById("js-title").innerHTML = chanel;
  
    
  });
}







 /*Sortera på tid */
function tidSorterare() {
programData.sort((a,b) =>{
  if (a.start > "2021-02-10T15:00:00+01:00") {
    return 1;
  }
  if (b.start < a.start) {
    return -1;
  }
  return 0;
});
render();
}



/* Filtrera bort program innan 15:00 */
const filtered = programData.filter(function (p) {
  if (p.start > "2021-02-10T15:00:00+01:00") {
    return true;
  }

});

console.log(filtered);






/*
    function setChannel1(){
        fetch('/data/SVT1.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data)
      => { program = data.value{
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
    }
    */