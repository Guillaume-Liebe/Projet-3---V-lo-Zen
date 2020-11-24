boutonValider.addEventListener("click", function () {
  timerActive = true
    
    // Apparition du message avec le compte à rebours
    titre.style.display = "block";
    titreExpiration.style.display = "none";

    let time = new Date().getTime();
    let minutes = document.getElementById("minutes");
    let secondes = document.getElementById("secondes");

    minutes.textContent = 20;
    secondes.textContent = 00;
    let tempsInitial = 1200;
    let tempsRestant = tempsInitial;

    let Interval = setInterval(function () {
    let nouveauTemps = new Date().getTime();
    let timeQuiPasse = Math.round((nouveauTemps - time) / 1000);
    tempsRestant = tempsInitial - timeQuiPasse;
    let minutesRestant = Math.floor(tempsRestant / 60);
    let secondesRestantes = tempsRestant - minutesRestant * 60;
    secondes.textContent = secondesRestantes;
    minutes.textContent = minutesRestant;

    // Enregistrer des données dans sessionStorage
    sessionStorage.setItem('minutes', this.minutes);
    sessionStorage.setItem('secondes', this.secondes);

    boutonValider.addEventListener("change", function() {
    // Sauvegarde du timer
    sessionStorage.setItem(minutes, 20);
    sessionStorage.setItem(secondes, 0); 
    });
  
  }, 1000);

    stationDisponible.addEventListener('click', function(){ ;
    {document.getElementById('boutonReserver');
    ReservationEnCours.style.marginTop= "95px";
    containerValider.style.visibility="visible";
    containerValider.style.marginTop="270px";
    containerCanvas.style.visibility="hidden";}                                 
  });
    
    // Apparition du message d'expiration
    setTimeout(function () {
    timerActive = false; 
    titre.style.display = "none";
    titreExpiration.style.display = "block";
    ReservationEnCours.style.visibility="hidden";
    stationDisponible.addEventListener('click', function() {
    document.getElementById('containerCanvas').style.visibility="visible";
    containerValider.style.visibility="hidden"; 
    });
  }, 1200000);

    // Arrêt du compte à rebours 
    boutonAnnuler.addEventListener('click', function() {
      document.getElementById('containerValider').style.visibility="hidden";
      ReservationEnCours.style.visibility="hidden";
    clearInterval(Interval);

    // Supprimer toutes les données de sessionStorage
    sessionStorage.clear();
    timerActive = false

      stationDisponible.addEventListener('click', function(){ ;
      {document.getElementById('containerCanvas');
      containerCanvas.style.visibility="visible"
      containerValider.style.visibility="hidden";
      }
      });
   });

    boutonValider.addEventListener('click', function() {
    ReservationEnCours.style.visibility="hidden";

    clearInterval(Interval); 

    sessionStorage.removeItem(this.minutes);
    sessionStorage.removeItem(this.secondes);

    sessionStorage.clear();

      boutonAnnuler.addEventListener('click', function()
      {document.getElementById('Annulation').style.visibility="visible";       
    });
  });  
});

