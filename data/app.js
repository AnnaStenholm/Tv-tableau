/*Side-Menu*/
function toggleMenu() {
    const menu = document.querySelector("ul.menu");
    const icon = document.querySelector('.fas.fa-bars');
    console.log(menu);
    menu.classList.toggle("menu--show");
    icon.classList.toggle('fa-times');
  }


//Loading function
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
});
  
  /* Ladda titel på vald kanal*/
  
  window.addEventListener("load", () => {
    setChannel("SVT2");
  
  });

  function setChannel(chanel) {
   
    document.querySelector("#js-loading");
    showEarlierPrograms = false;
    fetch("/data/" + chanel + ".json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            //Sorterar date
            data.sort(function (a, b) {
                return new Date(a.start) - new Date(b.start);
            });

            //APPEND PREPARING
            Output = '';


            //Callback function, foreach start here
            data.forEach(function (post) {


                //GET date och time från Json
                let myDate = new Date(post.start);
                let chanelDate = myDate;
                let chanelDay = chanelDate.getDay();
                let hoursLeft = chanelDate.getHours();
                let minMin = chanelDate.getHours();

                //Konvertera Json date till string-format
                hours = chanelDate.getHours().toString().replace(/^(\d)$/, '0$1');
                min = chanelDate.getMinutes().toString().replace(/^(\d)$/, '0$1');

                //GET Current time
                let b = new Date();
                let h = b.getHours();
                let m = b.getMinutes();
               
               
                document.getElementById('js-title').innerHTML = chanel;

           
                if (hoursLeft  > h && m && chanelDay) {
                    Output += `<li class="list-group-item"><strong>${hours}:${min}</strong>` + `<div>${post.name}</div></li>`;
                }

            
            }); //End Foreach

            document.getElementById('tv-program').innerHTML = Output;
        })

        //Catch errors
        .catch(function (err) {
            console.log(err);
        });

}; //End set channel
