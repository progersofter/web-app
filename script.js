var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

$(window).on("load",function(){
     Math.seedrandom('AAaBbCc');

     var canvas = document.getElementById("view");
     var ctx = canvas.getContext("2d");

    window.view = new View(canvas, ctx);
    window.verbose = false;

    window.arrLocals = [];

    window.arrTrucks = [];

    window.p  = null;

    $("#bt-play").click( function(){
        var numgeneration = parseInt($("#text-generation").val());
        if(isNaN( numgeneration)){
            alert("Insira um número de gerações válido!");
            return;
        }

        var selc = $("#select-selection option:selected").val();
        var selc2 = $("#select-validation option:selected").val();

        if ((p == null) || (p.generationNumber < numgeneration)){
            numMemberInPopulation = 40;
            p = new Population(arrLocals, arrTrucks, numMemberInPopulation);
            if(selc == 0)
                p.setSeletionMode(MODE_SEL_ELITIST);
            else if(selc ==1)
                p.setSeletionMode(MODE_SEL_ROULETTE);
            if(selc2 ==0)
                p.setVariationMode(MODE_VAR_CHANGEROUTE);
            else if(selc2 == 1)
                p.setVariationMode(MODE_VAR_CHANGEORDERROUTE);

            if(p.error != true){
                p.generation( function(param, mode){
                    view.drawOnlyRoute(param[0].locals, mode);
                }, numgeneration);
            }
        }
    });
