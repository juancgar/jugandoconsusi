

function sendData(id){
    const XHR = new XMLHttpRequest();

}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit").addEventListener("click", function() {
        name = document.getElementById("resNombre").value
        cancha = document.getElementById("resCancha").value
        personas = document.getElementById("resNumP").value
        fecha = document.getElementById("resFecha").value
        tiempo = document.getElementById("resDur").value
        hora = document.getElementById("resHora").value
        
        let newEvent = {
            "title" : "evento en cancha " + cancha + " por: " + name,
            "start": fecha +"T" + hora,
            "owner": name,
            "numPersonas": personas,
            "time":  tiempo,
          };
          var id;
          if(cancha == "Calzada"){
            id = "5fb9fded03d98039246be2e9";
          }
          else{
              id = "5fba0a3c1f0e0c08e44424c8";
          }

          console.log(id);
          let postReq = new XMLHttpRequest();
          postReq.open("PUT",`/reserva/add-event/${id}`,true);
          console.log(newEvent);
          postReq.setRequestHeader('Content-type', 'application/json');
          postReq.send(JSON.stringify(newEvent));
          alert("Evento Creado")
    });
});