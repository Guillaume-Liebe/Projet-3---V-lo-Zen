let timerActive = false;

window.onload = function() {
    // Affiche la phrase "Page chargée" dans la console
    console.log("Page chargée");


 // Mise en place du calque de la map
var layer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
    });
    
    var map = L.map("mapid", {
        center: new L.LatLng(45.750000, 4.850000),
        zoom: 14
    });
    map.addLayer(layer);
    
    
    // Mise en place des marqueurs en temps réel
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=746d04c3ae0f2e003a41949542a95a4569f1336c",
        function (reponse) {
            var localisation = JSON.parse(reponse);
            var marker = undefined;

            localisation.forEach(function (station) {
                    
                if (station.status === 'CLOSED') {
                    marker = L.marker([station.position.lat, station.position.lng],
                        {icon: orangeIcon, station: station}).addTo(map); 
                        marker.on("click", function(e){
                            document.getElementById('stationDisponible').style.visibility="hidden"; 
                            if (timerActive) {
                                document.getElementById('containerValider').style.visibility="visible"; style.display="none";
                            }
                            stationOrange.textContent = e.target.options.station.address;
                            });
                    } 
                    else if (station.status === 'OPEN') {
                        if (station.available_bikes > 0) {
                    marker = L.marker([station.position.lat, station.position.lng],
                        {icon: greenIcon, station: station}).addTo(map);                        
                        marker.on("click", function(e){                            
                            if (timerActive) {
                                document.getElementById('ReservationEnCours').style.visibility="visible"; style.display="none"; 
                                        
                            }                                                                        
                            stationGreen.textContent = e.target.options.station.address;
                            });
                    } 
                    else if (station.available_bikes <= 0) {
                    marker = L.marker([station.position.lat, station.position.lng],
                        {icon: redIcon, station: station}).addTo(map);                    
                        marker.on("click", function(e){
                            document.getElementById('stationDisponible').style.visibility="hidden"; 
                            if (timerActive) {
                                document.getElementById('containerValider').style.visibility="visible"; style.display="none";  
                            }
                            stationRed.textContent = e.target.options.station.address;
                            });
                    }
                }

                // Déclenchement du style 
                function clearAll(){
                    stationDisponible.removeAttribute("style");
                    VeloStationIndisponible.removeAttribute("style");
                    stationNonDisponible.removeAttribute("style");
                    containerCanvas.removeAttribute("style");
                    containerValider.removeAttribute("style"); 
                    ReservationEnCours.removeAttribute("style");               
                    Annulation.removeAttribute("style");
                  }
                  
                  // Déclenchement de la superposition
                  function switchZIndex(id){
                    clearAll();
                    stationDisponible.style.zIndex = 0;
                    VeloStationIndisponible.style.zIndex = 0;
                    stationNonDisponible.style.zIndex = 0;   
                    containerValider.style.zIndex = 0;
                    ReservationEnCours.style.zIndex = 0;
                    Annulation.style.zIndex = 0;
                    id.style.zIndex = 1;
                  }
                  
                  //Clic sur un des marqueurs de couleurs avec le choix de fenêtre
                  marker.addEventListener('click', function(){ switchZIndex(stationDisponible) })
                  marker.addEventListener('click', function(){ switchZIndex(VeloStationIndisponible) })
                  marker.addEventListener('click', function(){ switchZIndex(stationNonDisponible) })
                  boutonReserver.addEventListener('click', function(){ switchZIndex(containerCanvas) })
                  boutonValider.addEventListener('click', function(){ switchZIndex(containerCanvas) })
                  boutonAnnuler.addEventListener('click', function(){ switchZIndex(containerValider) })


                  //Rendu visible lors du clic
                  boutonReserver.addEventListener('click', function()
                  {document.getElementById('containerCanvas').style.visibility="visible"; 
                  boutonValider.disabled = 'disabled';
                });

                //Quand on signe le bouton valider est accessible 
                Signature.canvas.addEventListener('mousedown', function() 
                { boutonValider.disabled = '';
                
                  boutonValider.addEventListener('click', function(){ ;
                  {document.getElementById('containerValider').style.visibility="visible";
                  }          
                  });
                });

                boutonAnnuler.addEventListener('click', function()
                {document.getElementById('Annulation').style.visibility="visible"; 
              });

                  // Clic sur le marker un défilement accède directement aux blocs de textes                 
                  var target = document.getElementById('stationDisponible','VeloStationIndisponible','stationNonDisponible');                            

                  marker.addEventListener("click", function() {
                     
                    target.scrollIntoView({
                        block: 'start',
                        behavior: 'smooth',
                        inline: 'nearest'
                    });

                    if(station.status ==='OPEN' && station.available_bikes > 0)
                    {
                    document.getElementById('stationDisponible').style.visibility="visible"; style.display="none";                
                    } else if (station.status === 'CLOSED') 
                    {
                    document.getElementById('VeloStationIndisponible').style.visibility="visible"; style.display="none"; 
                    } else (station.available_bikes <= 0) 
                    document.getElementById('stationNonDisponible').style.visibility="visible"; style.display="none"; 
                });
            });
        });

    // génère une map 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreemap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    
    var LeafIcon = L.Icon.extend({
      options: {
        // shadowUrl: 'leaf-shadow.png',
        iconSize:     [15, 30],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4,  62],
        popupAnchor:  [-3,-76]
      }
    });
    
    
    // Insertion des 3 marqueurs 
    var greenIcon = new LeafIcon({iconUrl: 'img/marqueur_vert.png'}),
        redIcon = new LeafIcon({iconUrl: 'img/marqueur_rouge.png'}),
        orangeIcon = new LeafIcon({iconUrl: 'img/marqueur_orange.png'});

        // Coordonnées qui s'affichent lors d'un click sur la carte
    var popup = L.popup();

    function map(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
}

