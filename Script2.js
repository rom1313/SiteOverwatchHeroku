//TODO -------- Déclaration -------------
let bouttonjaime = document.querySelector('#jaimeboutton')
let valeurjaime = document.createElement("p")
let inputnom = document.querySelector('#inputnom')
let activite = document.querySelector('#activitereservation')
let inputdate = document.querySelector('#dateinput')
let codereservation = "OvewatchRES"
let nomreservation = document.createElement('p')
let nomreservationapercu = document.querySelector('#nomreservation')
let dateapercu = document.querySelector('#date')
let bouttonbody = document.querySelector('#ajoutbody')
let bouttonscpectacle = document.querySelector('#bouttonscpectacle')
let bouttonlaser = document.querySelector('#bouttonlaser')
let imgbody = document.querySelector("#img1")
let imgspect = document.querySelector("#img2")
let imglaser = document.querySelector("#img3")
let codefinal;
let bouttontele = document.querySelector('#telechargement')
bouttontele.style.display = "none"
let bouttonvalider = document.querySelector('#valider')
//TODO -------- Fonction nomreservation -------------
function input() {
  let nom = inputnom.value
  console.log(nom);
  nomreservationapercu.textContent = nom

}
function inputdateapercu(){
let date = inputdate.value
dateapercu.textContent = date
  

}
//TODO -------- AJOUT JAIME -------------
bouttonjaime.addEventListener('click', () => {
  incrementjaime()

})
const jaime = async () => {
  const data = await fetch('http://localhost:13000/mariaDBjaime');
  const datajson = await data.json();
  valeurjaime.className = "jaime"
  console.log(data)
  console.log(datajson)
  valeurjaime.textContent = datajson[0].valeur + " J'aime "
  document.querySelector("#jaime").appendChild(valeurjaime)

}
jaime()
async function incrementjaime() {
  const data = await fetch('http://localhost:13000/mariaDBjaime');
  const data2 = await data.json();
  let jaimesupp = data2[0].valeur
  fetch('http://localhost:13000/mariaDBjaimesupp', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valeur: jaimesupp
      })
    }).then(res => valeurjaime.textContent = jaimesupp)
    .then(res => console.log(res));

  jaime()
  return
}

//todo-------------------------------------
//TODO -------- écoute du boutton ajout bodypainting -------------
bouttonbody.addEventListener('click', () => {
  if (bouttonbody.textContent == "ajouter") {
    ajoutbodypainting()
  } else if (bouttonbody.textContent == "supprimer") {
    suppbodypainting()
  }
})
//TODO -------- écoute du boutton ajout spectacle -------------

bouttonscpectacle.addEventListener('click', () => {
  if (bouttonscpectacle.textContent == "ajouter") {
    ajoutspectacle()
  } else if (bouttonscpectacle.textContent == "supprimer") {
    suppspectacle()
  }
})

//TODO -------- écoute du boutton ajout laser -------------




bouttonlaser.addEventListener('click', () => {
  if (bouttonlaser.textContent == "ajouter") {
    ajoutlaser()
  } else if (bouttonlaser.textContent == "supprimer") {
    supplaser()
  }
})

//TODO ------------------------------------------------------------------------------- Fonction reservation --------------------------

//TODO -------- AJOUT ACTIVITEES -------------

function ajoutbodypainting() {
  bouttonbody.textContent = "supprimer"
  img1.style.filter = "grayscale(90%)"
  activite.textContent += " " + "Body-Painting"



}

function ajoutspectacle() {
  bouttonscpectacle.textContent = "supprimer"
  activite.textContent += " " + "Spectacle"
  img2.style.filter = "grayscale(90%)"
  console.log('Spectacle ajouté')

}

function ajoutlaser() {
  bouttonlaser.textContent = "supprimer"
  activite.textContent += " " + "Laser-Game"
  img3.style.filter = "grayscale(90%)"


}
//TODO -------- Telechargement de la reservation -------------

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

bouttontele.addEventListener("click", function tele() {
  if (inputnom.value == "") {
    let p = document.createElement("p")
    p.className = "alertecomm"
    p.textContent = "Le nom de réservation est vide"
    setTimeout(() => {
      refreshalert();
    }, 2000);
    document.querySelector("#error").append(p);
  } else if (activite.textContent == "") {
    let p = document.createElement("p")
    p.className = "alertecomm"
    p.textContent = "Vous n'avez pas choisis d'activitée"
    setTimeout(() => {
      refreshalert();
    }, 2000);
    document.querySelector("#error").prepend(p);

  } else {
    var text = `Nom de la réservation : ${nomreservationapercu.textContent}\nDate de réservation : ${inputdate.value}\nActivitées choisis : ${activite.textContent}\nCode : ${codefinal}  `;
    var filename = "Réservation.txt";
    download(filename, text);
  }
})

//TODO -------- SUPPRIMER ACTIVITEES-------------

// Fonction supprimer body-painting
function suppbodypainting() {
  activite.textContent = activite.textContent.replace("Body-Painting", "")
  bouttonbody.textContent = "ajouter"
  imgbody.style.filter = "none"
}

function suppspectacle() {
  activite.textContent = activite.textContent.replace("Spectacle", "")
  bouttonscpectacle.textContent = "ajouter"
  img2.style.filter = "none"
}

function supplaser() {
  activite.textContent = activite.textContent.replace("Laser-Game", "")
  bouttonlaser.textContent = "ajouter"
  img3.style.filter = "none"
}






//todo--------------------------  Affichage des commentaires de la base mariadb projetfilerouge ------------------------------------
function nombrealeatoire(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function refreshalert() {

  document.querySelector(".alertecomm ").remove()

  return
}

let text = document.createElement("p")
const reponseJson2 = async () => {
 
  text.innerHTML = ""
  const data = await fetch('http://localhost:13000/mariaDBcomms');

  const data2 = await data.json();
 let nb = nombrealeatoire(data2.length)
  text.className = "commmaria"
  text.textContent = data2[nb].pseudo + " : " + data2[nb].commentaire
  document.querySelector("#commmaria").appendChild(text)

}
reponseJson2()
setInterval(() => {
  reponseJson2()
}, 5000)
//todo--------------------------  Réservations POST mariaDB FETCH ------------------------------------


function postreservation() {

  if (inputnom.value == "") {
    let p = document.createElement("h5")
    p.className = "alertecomm"
    p.textContent = "Le nom de réservation est vide"
    setTimeout(() => {
      refreshalert();
    }, 2000);
    document.querySelector("#error").prepend(p);
  } else if (activite.textContent == "") {
    let p = document.createElement("h5")
    p.className = "alertecomm"
    p.textContent = "Vous n'avez pas choisis d'activitée"
    setTimeout(() => {
      refreshalert();
    }, 2000);
    document.querySelector("#error").prepend(p);

  }
  else if (inputdate.value == "") {
    let p = document.createElement("h5")
    p.className = "alertecomm"
    p.textContent = "Vous n'avez pas choisis de date"
    setTimeout(() => {
      refreshalert();
    }, 2000);
    document.querySelector("#error").prepend(p);

  }else {
    bouttonbody.disabled = "true"
    bouttonbody.style.color = "grey"
    bouttonscpectacle.disabled = "true"
    bouttonscpectacle.style.color = "grey"
    bouttonlaser.disabled = "true"
    bouttonlaser.style.color = "grey"
    bouttonvalider.style.color = "grey"
    bouttonvalider.disabled = "true"
    inputnom.disabled = "true"
    inputdate.disabled = "true"
    bouttontele.style.display = "initial"
    let resnom = nomreservationapercu.textContent
    let resdate = inputdate.value
    let resactivitees = activite.textContent
    let code = nombrealeatoire(344)
    let rescode = codereservation + code
    codefinal = rescode
    fetch('http://localhost:13000/mariaDBreservation', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: resnom,
          date: resdate,
          activitees: resactivitees,
          code: rescode
        })
      }).then(res => res.json())
      .then(res => console.log(res))



  }

}

function cleanreservation() {
  window.location.reload()


}





//TODO ------------------------------------------------------------------------------- Social pop up button--------------------------
//Facebook
function facebook_pop_up() {
  window.open('https://fr-fr.facebook.com/PlayOverwatch', 'Facebook', 'menubar=no, scrollbars=no, top=0, left=100, width=500, height=900');
}
//Twitter
function twitter_pop_up() {
  window.open('https://twitter.com/OverwatchFR?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor', 'Twitter', 'menubar=no, scrollbars=no, top=0, left=100, width=500, height=900');

}
//Youtube
function youtube_pop_up() {
  window.open('https://www.youtube.com/channel/UClOf1XXinvZsy4wKPAkro2A', 'Youtube', 'menubar=no, scrollbars=no, top=0, left=100, width=500, height=900');

}
