

var distanceParTour =  Math.floor(Math.random() * 1000) + 1000;  
var nbTours =  Math.floor(Math.random() * 6) + 2;  
var gagnant=-1;
var listeVoitures = [];
var VoituresEnAttente = null;
var voitureActuelle = null;


var conditionSecteur1;
var conditionSecteur2;
var conditionSecteur3;
var conditionSecteur4;




function* voiture(n)
{	var distanceParcouruParTour = 0;
	var tours = 1;
	var vitesemax = Math.floor(Math.random() * 10) + 10;
	var accident = 0;
	while(true)
		{
			var vitesse =  Math.floor(Math.random() * vitesemax) + 1;

			if (distanceParcouruParTour/distanceParTour < 0.25){ // si la voiture est dans le secteur 1
				if (conditionSecteur1=="pluie"){ // si le secteur contient de la pluie , la vitesse diminue
					vitesse -= vitesemax/4;
				}
				else if(conditionSecteur1=="huile"){ // si le secteur contient de l'huile , ilya une possibilte d'accident
					var probaAccident  = Math.random();
					if (probaAccident < 0.10){
						accident = 10; // si un accident occure voiture reste imobile pour 10 boucles
					}
				}
			}
			else if (distanceParcouruParTour/distanceParTour < 0.5){ // si la voiture est dans le secteur 2
				if (conditionSecteur2=="pluie"){
					vitesse -= vitesemax/4;
				}
				else if(conditionSecteur2=="huile"){
					var probaAccident  = Math.random();
					if (probaAccident < 0.10){
						accident = 10; 
					}
				}
			}
			else if (distanceParcouruParTour/distanceParTour < 0.75){// si la voiture est dans le secteur 3
				if (conditionSecteur3=="pluie"){
					vitesse -= vitesemax/4;
				}
				else if(conditionSecteur3=="huile"){
					var probaAccident  = Math.random();
					if (probaAccident < 0.10){
						accident = 10; 
					}
				}
			}
			else { // si la voiture est dans le secteur 4
				if (conditionSecteur4=="pluie"){
					vitesse -= vitesemax/4;
				}
				else if(conditionSecteur4=="huile"){
					var probaAccident  = Math.random();
					if (probaAccident < 0.10){
						accident = 10; 
					}
				}
			}
			if(accident == 0){// si y'a pas d'accident
				distanceParcouruParTour+=vitesse;
				if (distanceParcouruParTour >distanceParTour ){
					distanceParcouruParTour=distanceParcouruParTour-distanceParTour;
					tours++;
				}
				if(tours > nbTours){
					gagnant = n;
					tours--;
					distanceParcouruParTour=distanceParcouruParTour+distanceParTour;
				}
				console.log("voiture : "+n+" a parcouru "+distanceParcouruParTour+"/"+distanceParTour+" metres dans le tour "+tours+"/"+nbTours);
			}
			else {
				console.log("voiture : "+n+" est accidente pour "+accident+" autres boucles");
				accident --;
			}

			yield null;

		}
}

function generer_evenements(){

		var randomValue = Math.floor(Math.random() * 3);
		if (randomValue == 0)
			conditionSecteur1="normal";
		if (randomValue == 1)
			conditionSecteur1="pluie";
		if (randomValue == 2)
			conditionSecteur1="huile";

		var randomValue = Math.floor(Math.random() * 3);
		if (randomValue == 0)
			conditionSecteur2="normal";
		if (randomValue == 1)
			conditionSecteur2="pluie";
		if (randomValue == 2)
			conditionSecteur2="huile";

		var randomValue = Math.floor(Math.random() * 3);
		if (randomValue == 0)
			conditionSecteur3="normal";
		if (randomValue == 1)
			conditionSecteur3="pluie";
		if (randomValue == 2)
			conditionSecteur3="huile";

		var randomValue = Math.floor(Math.random() * 3);
		if (randomValue == 0)
			conditionSecteur4="normal";
		if (randomValue == 1)
			conditionSecteur4="pluie";
		if (randomValue == 2)
			conditionSecteur4="huile";

}

for(i=0; i<5; i++)
	listeVoitures.push(voiture(i));

VoituresEnAttente = listeVoitures.slice(0);

var loops = 0;
function scheduler()
{
	if (loops==10){
		generer_evenements();
		loops=0;
	}
	loops++;
	if(gagnant !=-1){
		console.log("la voiture : "+gagnant+" est gagnate !");
		return;
	}
	var numeroVoiture = Math.floor(Math.random() * VoituresEnAttente.length);
	voitureActuelle = VoituresEnAttente[numeroVoiture];
	VoituresEnAttente.splice(numeroVoiture, 1);
	if (VoituresEnAttente.length == 0)
	{
		VoituresEnAttente = listeVoitures.slice(0);
	}
	voitureActuelle.next();
	setTimeout(scheduler,0);
}

scheduler();