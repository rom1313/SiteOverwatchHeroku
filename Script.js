//TODO ------------------------------------------------------------------------------- App and variables --------------------------





affichercomm()

let input1 = document.querySelector("#pseudoinput")
let input2 = document.querySelector("#comminput")
let donnes;
let data

function affichercomm() {


  fetch('https://apiildaa.herokuapp.com/commsfilerouge')
    .then((res) => res.json())
    .then((json) => {
      donnes = json
      donnes.forEach(element => {
        
        let p = document.createElement("p")
        let commss = document.querySelector("#espacecomm");
        let pseudo;
        let commentaire;
        pseudo = element.pseudo
        commentaire = element.commentaire
        p.className = "comms"
        p.innerHTML = pseudo + " " + ":  " + "  " + commentaire;
        document.querySelector("#espacecomm").appendChild(p)
      });

      
    });


  /*  ref = firebase.database().ref('Commentaires/')
   ref.on("value", function (snapshot) {

     snapshot.forEach(function (childSnapshot) {
       let p = document.createElement("p")
       let commss = document.querySelector("#espacecomm");
       let data = childSnapshot.val();
       let pseudo;
       let commentaire;
       pseudo = data.pseudo
       commentaire = data.commentaire
       console.log(pseudo)
       console.log(commentaire)
       p.className = "comms"
       p.innerHTML = pseudo + " " + ":  " + "  " + commentaire;
       document.querySelector("#espacecomm").appendChild(p)
     })


     return
   }) */

}
//TODO --------------------------  Constructeur commentaire firebase --------------------------

function ajoutcommentaire(pseudo, commentaire) {

  /* firebase.database().ref('Commentaires/' + pseudo).set({
    pseudo: pseudo,
    commentaire: commentaire,

  }); */

  fetch('https://apiildaa.herokuapp.com/commsfilerougeajout', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pseudo: pseudo,
        comm: commentaire
      })
    }).then((res) => res.json())
    .then((json) => {
      console.log(json)

      affichercomm()
    })

}

//TODO ------------------------------------------------------------------------------- Ajout de commentaire firebase --------------------------

document.querySelector("#poster").addEventListener("click", function () {
  if (input1.value == "") {
    console.log("error")
    input1.value = ""
    input2.value = ""
    let p = document.createElement("p")
    p.className = "alertecomm"
    p.textContent = "Remplissez tous les champs pour poster"
    setTimeout(() => {
      refreshalert();
    }, 2000);
    document.querySelector("#error").prepend(p);
  } else if (input2.value == "") {
    console.log("error2")
    input1.value = ""
    input2.value = ""
    let p = document.createElement("p")
    p.className = "alertecomm"
    p.textContent = "Remplissez tous les champs pour poster"
    setTimeout(() => {
      refreshalert();
    }, 2000);
    document.querySelector("#error").prepend(p);
  } else if (input1.value != "" && input2.value != "") {
    console.log("ok");


    ajoutcommentaire(input1.value, input2.value)
    setTimeout(() => {
      refreshcomm();
    }, 2000);






  }
});

//Refresh espace commentaire

function refreshcomm() {
  document.querySelector("#espacecomm").remove(".comms")
  window.location.href = 'index.html#espacecomm';
  window.location.reload(true);
  affichercomm()

}

//Refresh alerte ajout comm

function refreshalert() {

  document.querySelector(".alertecomm ").remove()

  return
}

//Fonction affichage tarif

function infotarif1() {
  tarif = 1;
  creationinfotarif()
}

function infotarif2() {
  tarif = 2;
  creationinfotarif()
}

function infotarif3() {
  tarif = 3;
  creationinfotarif()
}

function infotarif4() {
  tarif = 4;
  creationinfotarif()
}

function creationinfotarif() {
  document.querySelector('#zenya').className = "actif"
  let textinfo = document.querySelector("#textinfo")
  textinfo.className = "actif2"
  let text = document.createElement('h2')

  if (tarif == 1) {
    textinfo.textContent = "Tarif standard + 16 ans"
  } else if (tarif == 2) {
    textinfo.textContent = "Tarif Junior - 16 ans"
  } else if (tarif == 3) {
    textinfo.textContent = "Pass 48H adulte + 16 ans "
  } else if (tarif == 4) {
    textinfo.textContent = "Pass 48H Junior - 16 ans "
  }
}


function infotarifdelete() {

  document.querySelector("#zenya").className = "";
  document.querySelector("#textinfo").className = "";

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


let obsever = new IntersectionObserver((entries) => {
  entries.forEach(element => {
    // console.log(entries[0].target.id)
    // console.log(element.isIntersecting)
    // console.log(element.intersectionRatio)
    let carousel = document.querySelector('.carousel')
    let firebase = document.querySelector('#commentairefirebase')
   
      if (element.isIntersecting === true&&entries[0].target.id==='carousel') {
      
       carousel.classList.add('carouselobserver')
        

    }
    else if (element.isIntersecting === true && entries[0].target.id === 'commentairefirebase') {
     
     
      firebase.classList.add('firebasemoove')
       

   }
    
      
    
    
      
      
      


    
  })
}, {
  threshold: [0.1]
});



obsever.observe(carousel)
obsever.observe(document.querySelector('#commentairefirebase'))
