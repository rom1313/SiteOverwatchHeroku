//TODO ------------------------------------------------------------------------------- Firebase project reference --------------------------
var firebaseConfig = {
  apiKey: "AIzaSyCjt7oH7dSZLpdVDC8Uc0h3YzSOiiqQYqQ",
  authDomain: "file-rouge-4a901.firebaseapp.com",
  databaseURL: "https://file-rouge-4a901-default-rtdb.firebaseio.com",
  projectId: "file-rouge-4a901",
  storageBucket: "file-rouge-4a901.appspot.com",
  messagingSenderId: "1052502489361",
  appId: "1:1052502489361:web:d5b6f0f47dbc0f2bb934b0",
  measurementId: "G-3JHZM4ZMZQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//TODO ------------------------------------------------------------------------------- App and variables --------------------------

affichercomm()
let input1 = document.querySelector("#pseudoinput")
let input2 = document.querySelector("#comminput")

function affichercomm() {

  ref = firebase.database().ref('Commentaires/')
  ref.on("value", function (snapshot) {
      
      snapshot.forEach(function (childSnapshot) {
          let p = document.createElement("p")
          let commss = document.querySelector("#espacecomm");
          let data = childSnapshot.val();
          let pseudo;
          let commentaire;
          pseudo = data.pseudo
          commentaire = data.commentaire
          
          p.className = "comms"
          p.innerHTML = pseudo + " " + ":  " + "  " + commentaire;
          document.querySelector("#espacecomm").appendChild(p)
      })


      return
  })
}
//TODO -------------------------------------------------------------------------------  Constructeur commentaire firebase --------------------------

function ajoutcommentaire(pseudo, commentaire) {
  firebase.database().ref('Commentaires/' + pseudo).set({
      pseudo: pseudo,
      commentaire: commentaire,

  });
  affichercomm()
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
      refreshcomm()
      document.location.reload();
  }
});

//Refresh espace commentaire

function refreshcomm() {
  document.querySelector("#espacecomm").remove(".comms")
  affichercomm()
  return
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
  let info = "Prix Adulte standard"
  let h1 = document.createElement("h2")
  let img = document.createElement("img")
  img.setAttribute("id", "zenyainfo");
  img.src = "img/zenya.png";
  img.style.width = "340px";
  img.style.animation = "fadein 1s forwards";
  img.style.color = "white";
  img.style.display ="absolute"
  h1.style.animation = "fadein 1s forwards";
  h1.className = "infotarifp";
  h1.setAttribute("id", "textinfo");
  document.querySelector("#infotarif").appendChild(img);
  document.querySelector("#infotarif2").appendChild(h1);

  if (tarif == 1) {
      h1.textContent = "Tarif standard + 16 ans"
  } else if (tarif == 2) {
      h1.textContent = "Tarif Junior - 16 ans"
  } else if (tarif == 3) {
      h1.textContent = "Pass 48H adulte + 16 ans "

  } else if (tarif == 4) {
      h1.textContent = "Pass 48H Junior - 16 ans "
  }

}

function infotarifdelete() {
  
  document.querySelector("#zenyainfo").remove();
  document.querySelector("#textinfo").remove();

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



























































//TODO ------------------------------------------------------------------------------- Particles --------------------------

// particlesJS("particles-js", {
//     "particles": {
//       "number": {
//         "value": 200,
//         "density": {
//           "enable": true,
//           "value_area": 5000
//         }
//       },
//       "color": {
//         "value": "#ffffff"
//       },
//       "shape": {
//         "type": "image",
//         "stroke": {
//           "width": 1,
//           "color": "#000000"
//         },
//         "polygon": {
//           "nb_sides": 2
//         },
//         "image": {
//           "src": "img/glitter2.png",
//           "width": 50,
//           "height": 50
//         }
//       },
//       "opacity": {
//         "value": 1,
//         "random": false,
//         "anim": {
//           "enable": false,
//           "speed": 1,
//           "opacity_min": 0.1,
//           "sync": false
//         }
//       },
//       "size": {
//         "value": 5,
//         "random": true,
//         "anim": {
//           "enable": false,
//           "speed": 17,
//           "size_min": 42.23,
//           "sync": false
//         }
//       },
//       "line_linked": {
//         "enable": false,
//         "distance": 150,
//         "color": "#ffffff",
//         "opacity": 0.4,
//         "width": 1
//       },
//       "move": {
//         "enable": true,
//         "speed": 8,
//         "direction": "none",
//         "random": false,
//         "straight": false,
//         "out_mode": "out",
//         "bounce": false,
//         "attract": {
//           "enable": false,
//           "rotateX": 600,
//           "rotateY": 1200
//         }
//       }
//     },
//     "interactivity": {
//       "detect_on": "",
//       "events": {
//         "onhover": {
//           "enable": false,
//           "mode": "repulse"
//         },
//         "onclick": {
//           "enable": false,
//           "mode": "push"
//         },
//         "resize": true
//       },
//       "modes": {
//         "grab": {
//           "distance": 400,
//           "line_linked": {
//             "opacity": 1
//           }
//         },
//         "bubble": {
//           "distance": 400,
//           "size": 40,
//           "duration": 2,
//           "opacity": 8,
//           "speed": 3
//         },
//         "repulse": {
//           "distance": 200,
//           "duration": 0.4
//         },
//         "push": {
//           "particles_nb": 4
//         },
//         "remove": {
//           "particles_nb": 2
//         }
//       }
//     },
//     "retina_detect": true
//   });
  