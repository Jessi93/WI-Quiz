function init() {
	alert("Init wurde aufgerufen!");
	fetchLocalStorageData();
	
	setSpieler1();
	setSpieler2();
	setSpielstand();
	setownName();
	setenemyName();
}

var SpielstandSpieler1 = 0;
var SpielstandSpieler2 = 0;

// XXX XXXXXXXXXX
var tmpServerData = 
       {
           "spielID": 1,
           "spieltypName":
           {
               "name": "M"
           },
           "spieler1":
           {
               "benutzername": "Kevin02"
           },
           "spieler2":
           {
               "benutzername": "Kevin01"
           },
           "sieger": null,
           "verlierer": null,
           "wartenAuf":
           {
               "benutzername": "Kevin01"
           },
           "aktuelleRunde": 1,
           "spielstatusName":
           {
               "name": "P"
           },
           "letzteAktivitaet": 1392739847000
       }
    ;
	
var randomData = [{
		"categoryName" : "Logik und Algebra",
		"questions" : [{
				"fragenID" : 1,
				"kategorie_name" : "Logik und Algebra",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 1",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 2,
				"kategorie_name" : "Logik und Algebra",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 2",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 3,
				"kategorie_name" : "Logik und Algebra",
				"unterkategorie_name" : "uk2",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 3",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}
		]
	}, {
		"categoryName" : "Methoden der Wirtschaftsinformatik",
		"questions" : [{
				"fragenID" : 4,
				"kategorie_name" : "Methoden der Wirtschaftsinformatik",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 4",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 5,
				"kategorie_name" : "Methoden der Wirtschaftsinformatik",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 5",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 6,
				"kategorie_name" : "Methoden der Wirtschaftsinformatik",
				"unterkategorie_name" : "uk2",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 6",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}
		]
	}, {
		"categoryName" : "Verteilte Systeme",
		"questions" : [{
				"fragenID" : 7,
				"kategorie_name" : "Verteilte Systeme",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 7",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 8,
				"kategorie_name" : "Verteilte Systeme",
				"unterkategorie_name" : "uk",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 8",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}, {
				"fragenID" : 9,
				"kategorie_name" : "Verteilte Systeme",
				"unterkategorie_name" : "uk2",
				"flag_fragenTyp_mult" : false,
				"frage" : "Frage 9",
				"antwortmoeglichkeit1" : "A",
				"antwortmoeglichkeit2" : "B",
				"antwortmoeglichkeit3" : "C",
				"antwortmoeglichkeit4" : "D",
				"wahrheitAntwortmoeglichkeit1" : false,
				"wahrheitAntwortmoeglichkeit2" : false,
				"wahrheitAntwortmoeglichkeit3" : false,
				"wahrheitAntwortmoeglichkeit4" : true,
				"flag_frageValidiert" : true
			}
		]
	}
];

var continueData = {
 "questions" : [{
   "fragenID" : 7,
   "kategorie_name" : "Verteilte Systeme",
   "unterkategorie_name" : "uk",
   "flag_fragenTyp_mult" : false,
   "frage" : "Frage 7",
   "antwortmoeglichkeit1" : "A",
   "antwortmoeglichkeit2" : "B",
   "antwortmoeglichkeit3" : "C",
   "antwortmoeglichkeit4" : "D",
   "wahrheitAntwortmoeglichkeit1" : false,
   "wahrheitAntwortmoeglichkeit2" : false,
   "wahrheitAntwortmoeglichkeit3" : false,
   "wahrheitAntwortmoeglichkeit4" : true,
   "flag_frageValidiert" : true
  }, {
   "fragenID" : 8,
   "kategorie_name" : "Verteilte Systeme",
   "unterkategorie_name" : "uk",
   "flag_fragenTyp_mult" : false,
   "frage" : "Frage 8",
   "antwortmoeglichkeit1" : "A",
   "antwortmoeglichkeit2" : "B",
   "antwortmoeglichkeit3" : "C",
   "antwortmoeglichkeit4" : "D",
   "wahrheitAntwortmoeglichkeit1" : false,
   "wahrheitAntwortmoeglichkeit2" : false,
   "wahrheitAntwortmoeglichkeit3" : false,
   "wahrheitAntwortmoeglichkeit4" : true,
   "flag_frageValidiert" : true
  }, {
   "fragenID" : 9,
   "kategorie_name" : "Verteilte Systeme",
   "unterkategorie_name" : "uk2",
   "flag_fragenTyp_mult" : false,
   "frage" : "Frage 9",
   "antwortmoeglichkeit1" : "A",
   "antwortmoeglichkeit2" : "B",
   "antwortmoeglichkeit3" : "C",
   "antwortmoeglichkeit4" : "D",
   "wahrheitAntwortmoeglichkeit1" : false,
   "wahrheitAntwortmoeglichkeit2" : false,
   "wahrheitAntwortmoeglichkeit3" : false,
   "wahrheitAntwortmoeglichkeit4" : true,
   "flag_frageValidiert" : true
  }
 ],
 "answers" : [{
   "fragenID" : 7,
   "rundenID" : 21,
   "benutzername" : "Kevin",
   "antwortmoeglichkeit1_check" : false,
   "antwortmoeglichkeit2_check" : false,
   "antwortmoeglichkeit3_check" : false,
   "antwortmoeglichkeit4_check" : true,
   "flagFrageAngezeigt" : true,
   "ergebnis_check" : true
  }, {
   "fragenID" : 8,
   "rundenID" : 21,
   "benutzername" : "Kevin",
   "antwortmoeglichkeit1_check" : false,
   "antwortmoeglichkeit2_check" : false,
   "antwortmoeglichkeit3_check" : false,
   "antwortmoeglichkeit4_check" : true,
   "flagFrageAngezeigt" : true,
   "ergebnis_check" : true
  }, {
   "fragenID" : 9,
   "rundenID" : 21,
   "benutzername" : "Kevin",
   "antwortmoeglichkeit1_check" : false,
   "antwortmoeglichkeit2_check" : false,
   "antwortmoeglichkeit3_check" : false,
   "antwortmoeglichkeit4_check" : true,
   "flagFrageAngezeigt" : true,
   "ergebnis_check" : true
  }
 ]
};
//XXX XXXXXXXXXXXXXXXXXXXXXXX

var GameOverviewData = {
       "rounds":
       [
           {
               "rundenID": 1,
               "rundenNr": 1,
               "answers":
               [
                   {
                       "frage":
                       {
                           "fragenID": 1,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Welche Gase wurden behandelt?",
                           "antwortmoeglichkeit1": "Exert",
                           "antwortmoeglichkeit2": "Inert",
                           "antwortmoeglichkeit3": "Exposé",
                           "antwortmoeglichkeit4": "Imposé",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 1,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Welche Gase wurden behandelt?",
                           "antwortmoeglichkeit1": "Exert",
                           "antwortmoeglichkeit2": "Inert",
                           "antwortmoeglichkeit3": "Exposé",
                           "antwortmoeglichkeit4": "Imposé",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 2,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 2 zu IT-Management",
                           "flagFragenTypMult": true,
                           "frage": "Was heißt/hieß RAID?",
                           "antwortmoeglichkeit1": "Redundant Array of Independent Devices",
                           "antwortmoeglichkeit2": "Redundant Array of Inexpensive Disks",
                           "antwortmoeglichkeit3": "Redundant Array of Independent Disks",
                           "antwortmoeglichkeit4": "Redundant Array of Inhuman Disks",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": true,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 2,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 2 zu IT-Management",
                           "flagFragenTypMult": true,
                           "frage": "Was heißt/hieß RAID?",
                           "antwortmoeglichkeit1": "Redundant Array of Independent Devices",
                           "antwortmoeglichkeit2": "Redundant Array of Inexpensive Disks",
                           "antwortmoeglichkeit3": "Redundant Array of Independent Disks",
                           "antwortmoeglichkeit4": "Redundant Array of Inhuman Disks",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 3,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Wie ist Datenschutz anzuwenden?",
                           "antwortmoeglichkeit1": "Erst dann, wenn es zu spät ist.",
                           "antwortmoeglichkeit2": "Nach dem ersten Datenschutzbruch",
                           "antwortmoeglichkeit3": "Präventiv",
                           "antwortmoeglichkeit4": "Gar nicht",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": true,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 3,
                           "kategorieName": "IT-Management",
                           "unterkategorieName": "UK 1 zu IT-Management",
                           "flagFragenTypMult": false,
                           "frage": "Wie ist Datenschutz anzuwenden?",
                           "antwortmoeglichkeit1": "Erst dann, wenn es zu spät ist.",
                           "antwortmoeglichkeit2": "Nach dem ersten Datenschutzbruch",
                           "antwortmoeglichkeit3": "Präventiv",
                           "antwortmoeglichkeit4": "Gar nicht",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": true,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   }
               ]
           },
           {
               "rundenID": 2,
               "rundenNr": 2,
               "answers":
               [
                   {
                       "frage":
                       {
                           "fragenID": 4,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Was ist ein natives Sprachmittel in C",
                           "antwortmoeglichkeit1": "Listen",
                           "antwortmoeglichkeit2": "Queues",
                           "antwortmoeglichkeit3": "LinkedLists",
                           "antwortmoeglichkeit4": "Arrays",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": true
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": true,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 4,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Was ist ein natives Sprachmittel in C",
                           "antwortmoeglichkeit1": "Listen",
                           "antwortmoeglichkeit2": "Queues",
                           "antwortmoeglichkeit3": "LinkedLists",
                           "antwortmoeglichkeit4": "Arrays",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": true
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": true,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 5,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 2 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welche Schleifen-Art gibt es in C++ nicht?",
                           "antwortmoeglichkeit1": "For",
                           "antwortmoeglichkeit2": "Do-Until",
                           "antwortmoeglichkeit3": "While",
                           "antwortmoeglichkeit4": "Do-While",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": false,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 5,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 2 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welche Schleifen-Art gibt es in C++ nicht?",
                           "antwortmoeglichkeit1": "For",
                           "antwortmoeglichkeit2": "Do-Until",
                           "antwortmoeglichkeit3": "While",
                           "antwortmoeglichkeit4": "Do-While",
                           "wahrheitAntwortmoeglichkeit1": false,
                           "wahrheitAntwortmoeglichkeit2": true,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": true,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": false
                   },
                   {
                       "frage":
                       {
                           "fragenID": 6,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welcher Assembly-Befehl kopiert register ax nach bx (Intel-Syntax)?",
                           "antwortmoeglichkeit1": "mov bx,ax",
                           "antwortmoeglichkeit2": "cpy bx,ax",
                           "antwortmoeglichkeit3": "dup bx,ax",
                           "antwortmoeglichkeit4": "copy bx,ax",
                           "wahrheitAntwortmoeglichkeit1": true,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin01"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   },
                   {
                       "frage":
                       {
                           "fragenID": 6,
                           "kategorieName": "Programmierung",
                           "unterkategorieName": "UK 1 zu Programmierung",
                           "flagFragenTypMult": false,
                           "frage": "Welcher Assembly-Befehl kopiert register ax nach bx (Intel-Syntax)?",
                           "antwortmoeglichkeit1": "mov bx,ax",
                           "antwortmoeglichkeit2": "cpy bx,ax",
                           "antwortmoeglichkeit3": "dup bx,ax",
                           "antwortmoeglichkeit4": "copy bx,ax",
                           "wahrheitAntwortmoeglichkeit1": true,
                           "wahrheitAntwortmoeglichkeit2": false,
                           "wahrheitAntwortmoeglichkeit3": false,
                           "wahrheitAntwortmoeglichkeit4": false
                       },
                       "benutzer":
                       {
                           "benutzername": "Kevin02"
                       },
                       "antwortmoeglichkeit1Check": true,
                       "antwortmoeglichkeit2Check": false,
                       "antwortmoeglichkeit3Check": false,
                       "antwortmoeglichkeit4Check": false,
                       "flagFrageAngezeigt": true,
                       "ergebnisCheck": true
                   }
               ]
           },
           {
               "rundenID": 3,
               "rundenNr": 3,
               "answers":
               [
               ]
           },
           {
               "rundenID": 4,
               "rundenNr": 4,
               "answers":
               [
               ]
           },
           {
               "rundenID": 5,
               "rundenNr": 5,
               "answers":
               [
               ]
           },
           {
               "rundenID": 6,
               "rundenNr": 6,
               "answers":
               [
               ]
           }
       ]
};

function fetchLocalStorageData() {
alert("fetchLocalStorageData wurde aufgerufen! gameOverview:"+JSON.stringify(localStorage.getItem("gameOverview")));
// hole Serverdaten und schreibe Sie in GameOverviewData!
GameOverviewData = localStorage.getItem("gameOverview");
}

function setSpielstand() {
var Spielstand = (SpielstandSpieler1+":"+SpielstandSpieler2);
//alert("Spielstand: "+Spielstand);
 $('#scoreDiv').append(Spielstand);
}
function setSpieler1()
{
//alert("setSpieler1 wurde aufgerufen, username ist:"+localStorage.getItem("username"));

var username = localStorage.getItem("username");
// encolourSquare(viereck_id, rundenNummer, nrFrageInRunde, username, zugehoerigerSpieler)
//Erste Runde
encolourSquare("runde1frage1spieler1", 1, 1, username, 1);	
encolourSquare("runde1frage2spieler1", 1, 2, username, 1);	
encolourSquare("runde1frage3spieler1", 1, 3, username, 1);	
//Zweite Runde
encolourSquare("runde2frage1spieler1", 2, 1, username, 1);	
encolourSquare("runde2frage2spieler1", 2, 2, username, 1);	
encolourSquare("runde2frage3spieler1", 2, 3, username, 1);	
//Dritte Runde
encolourSquare("runde3frage1spieler1", 3, 1, username, 1);	
encolourSquare("runde3frage2spieler1", 3, 2, username, 1);	
encolourSquare("runde3frage3spieler1", 3, 3, username, 1);	
//Vierte Runde
encolourSquare("runde4frage1spieler1", 4, 1, username, 1);	
encolourSquare("runde4frage2spieler1", 4, 2, username, 1);	
encolourSquare("runde4frage3spieler1", 4, 3, username, 1);	
//Fünfte Runde
encolourSquare("runde5frage1spieler1", 5, 1, username, 1);	
encolourSquare("runde5frage2spieler1", 5, 2, username, 1);	
encolourSquare("runde5frage3spieler1", 5, 3, username, 1);	
//Sechste Runde
encolourSquare("runde6frage1spieler1", 6, 1, username, 1);	
encolourSquare("runde6frage2spieler1", 6, 2, username, 1);	
encolourSquare("runde6frage3spieler1", 6, 3, username, 1);	

	 						
}	

function setSpieler2(){
//alert("setSpieler2 wurde aufgerufen"));
//TODO: ermittle enemy username
var enemy_username = localStorage.getItem("enemyUsername"); //TESTDATEN: "Kevin02"
// encolourSquare(viereck_id, rundenNummer, nrFrageInRunde, username, zugehoerigerSpieler)
//Erste Runde
encolourSquare("runde1frage1spieler2", 1, 1, enemy_username, 2);	
encolourSquare("runde1frage2spieler2", 1, 2, enemy_username, 2);	
encolourSquare("runde1frage3spieler2", 1, 3, enemy_username, 2);	
//Zweite Runde
encolourSquare("runde2frage1spieler2", 2, 1, enemy_username, 2);	
encolourSquare("runde2frage2spieler2", 2, 2, enemy_username, 2);	
encolourSquare("runde2frage3spieler2", 2, 3, enemy_username, 2);	
//Dritte Runde
encolourSquare("runde3frage1spieler2", 3, 1, enemy_username, 2);	
encolourSquare("runde3frage2spieler2", 3, 2, enemy_username, 2);	
encolourSquare("runde3frage3spieler2", 3, 3, enemy_username, 2);	
//Vierte Runde
encolourSquare("runde4frage1spieler2", 4, 1, enemy_username, 2);	
encolourSquare("runde4frage2spieler2", 4, 2, enemy_username, 2);	
encolourSquare("runde4frage3spieler2", 4, 3, enemy_username, 2);	
//Fünfte Runde
encolourSquare("runde5frage1spieler2", 5, 1, enemy_username, 2);	
encolourSquare("runde5frage2spieler2", 5, 2, enemy_username, 2);	
encolourSquare("runde5frage3spieler2", 5, 3, enemy_username, 2);	
//Sechste Runde
encolourSquare("runde6frage1spieler2", 6, 1, enemy_username, 2);	
encolourSquare("runde6frage2spieler2", 6, 2, enemy_username, 2);	
encolourSquare("runde6frage3spieler2", 6, 3, enemy_username, 2);	

	 				
}

//Logik zum setzen/ einblenden eines Quadrats
function encolourSquare(viereck_id, rundenNummer, nrFrageInRunde, username, zugehoerigerSpieler) {
	//alert("encolourSquare wurde aufgerufen!");
//prüfe rundenNummer === rundenNr
var fragenergebnis;
var myUsername = localStorage.getItem("username");

for (var i=0;i<GameOverviewData.rounds.length;i++){
	//alert("Position in for schleife:"+i);
	if (GameOverviewData.rounds[i].rundenNr == rundenNummer)
		{
		//prüfe: gibt es 6 antworten für diese Runde?
		if(GameOverviewData.rounds[i].answers.length == 6){
			//prüfe benutzername === username an erster möglicher stelle
			if (GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-2].benutzer.benutzername === username){
				//lese aus: ergebnisCheck 
				fragenergebnis = GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-2].ergebnisCheck;
				break;
				}
			//prüfe benutzername === username an zweiter möglicher stelle
			else if (GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-1].benutzer.benutzername === username){
				//lese aus: ergebnisCheck 
				fragenergebnis = GameOverviewData.rounds[i].answers[(nrFrageInRunde * 2)-1].ergebnisCheck;
				break;
				}
			} else if(GameOverviewData.rounds[i].answers.length == 3){ 
		//Logik für drei Antworten pro Runde in Serverdaten!
		if(GameOverviewData.rounds[i].answers[nrFrageInRunde-1].benutzer.benutzername === myUsername){
		//es sollen nur Vierecke angezeigt, wenn man selbst gespielt hat!
		fragenergebnis = GameOverviewData.rounds[i].answers[nrFrageInRunde-1].ergebnisCheck;
		break;		}
			}
		}
	} 
//Wenn Frage Richtig beantwortet (ergebnisCheck = true)
if (fragenergebnis == true){
	//alert(viereck_id+" wurde auf grün gesetzt!");
	$("#"+viereck_id).addClass("greenBackground");
	
	//Logik zum Berechnen des Spielstandes
	//Prüfen, ob Frage zu Spieler 1 oder 2 gehört
		if (zugehoerigerSpieler == 1)
			{
			//alert("Spielstand von Spieler1 um 1 erhöht: Spielstand jetzt"+SpielstandSpieler1+":"+SpielstandSpieler2);
			SpielstandSpieler1 = SpielstandSpieler1+1;
			}
		else 
			{
			//alert("Spielstand von Spieler2 um 1 erhöht: Spielstand jetzt"+SpielstandSpieler1+":"+SpielstandSpieler2);
			SpielstandSpieler2=SpielstandSpieler2+1;
			}
	
	}else if(fragenergebnis == false){
	//Wenn Frage Falsche beantwortet (ergebnisCheck = false)
	$("#"+viereck_id).addClass('redBackground');
	}	
}

function setownName(){
var ownName;
ownName = localStorage.getItem("username");
 $('#spielerADiv').append(ownName);
}

function setenemyName(){
var enemyUsername;
var enemyUsername = localStorage.getItem("enemyUsername");
$('#spielerBDiv').append(enemyUsername);
}




function openFrage() {
	//TODO disable button if not waiting for me!
	prepareQuestion();
	
	//var newView = new steroids.views.WebView("html/kategorieAuswaehlen.html");
	//steroids.layers.push(newView);
	
}

function prepareQuestion() {
	alert("prepareQuestion wurde aufgerufen!");
	if(isRoundStarter()) {
		fetchQuestionsRoundStart();
	} else {
		fetchQuestionsRoundContinue();
	}
}

function fetchQuestionsRoundStart() {
alert("start"); //XXX
	var data = randomData;
	localStorage.setItem("gameQuestionStart", JSON.stringify(data));
	
	var newView = new steroids.views.WebView("html/kategorieAuswaehlen.html");
	steroids.layers.push(newView);
}

function fetchQuestionsRoundContinue() {
alert("continue"); //XXX
	var data = continueData;
	localStorage.setItem("gameQuestionContinue", JSON.stringify(data));
	
	var newView = new steroids.views.WebView("html/frage.html");
	steroids.layers.push(newView);
}

function openQuestions() {
	//TODO
}

//Füge gegner als Freund hinzu
function addAsFriendWrapper(){
addAsFriend(localStorage.getItem("enemyUsername"));
}

function giveUp(){
alert("give up wurde aufgerufen!");
//TODO hole gameID!

// $.ajax( {
		// url:serverURL + "game/abandon/" + gameID,
		// type:"POST",
		// success:function(obj){alert(JSON.stringify(obj));}
		// error:function(obj){alert(JSON.stringify(obj));}
		// });
		
}



document.addEventListener("deviceready", init, false);