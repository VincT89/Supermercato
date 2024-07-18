class Prodotto {
	constructor(nome, categoria, prezzo) {
		this.nome = nome;
		this.categoria = categoria;
		this.prezzo = prezzo;
	}

	toString() {
		return `Prodotto: ${this.nome}, Categoria: ${this.categoria}, Prezzo: ${this.prezzo} euro`;
	}
}

class Offerta {
	constructor(prodotto, sconto, dataInizio, dataFine) {
		this.prodotto = prodotto;
		this.sconto = sconto;
		this.dataInizio = dataInizio;
		this.dataFine = dataFine;
	}

	toString() {
    //prezzo e sconto devono essere numeri
    const prezzoNumerico = Number(this.prodotto.prezzo);
    const scontoNumerico = Number(this.sconto);

    // Calcola il nuovo prezzo applicando lo sconto
    const nuovoPrezzo = prezzoNumerico - prezzoNumerico * scontoNumerico;

    return `Offerta su ${this.prodotto.nome}: Sconto del ${
        scontoNumerico * 100
    }%, da ${this.dataInizio} a ${this.dataFine}, nuovo prezzo ${nuovoPrezzo} euro`;
	}
}

class Supermercato {
	constructor() {
		this.offerte = [];
		this.prodotti = [];
	}

	aggiungiProdotto(prodotto) {
		this.prodotti.push(prodotto);
	}

	aggiungiOfferta(offerta) {
		this.offerte.push(offerta);
	}

	mostraOfferte() {
		return this.offerte.map(offerta => offerta.toString()).join("\n"); //join() unisce gli elementi di un array in una stringa separati da una virgola
}

mostraProdotto() {
		return this.prodotti.map(prodotto => prodotto.toString()).join("\n");
	} 
}

// Avvia l'interfaccia di gestione del supermercato al click del bottone
document.addEventListener("DOMContentLoaded", function () {
	let bottoneIniziaGioco = document.getElementById("gestisciSupermercatoBtn");
	let supermercato = new Supermercato();

	bottoneIniziaGioco.addEventListener("click", function () {
		alert("Benvenuto nel tuo Supermercato virtuale!");
		let continua = true;
//menu principale
		while (continua) {
			let azione = prompt(
				"Cosa vuoi fare? \n1. Mostra Offerte \n2. Mostra Prodotti \n3. Menu Gestione \n0. Esci"
			);

			switch (azione) {
				case "1":
					let offerte = supermercato.mostraOfferte();
					if (offerte) {
						alert("Ecco le offerte disponibili:\n" + offerte);
					} else {
						alert("Non ci sono offerte disponibili al momento.");
					}
					break;
				case "2":
					let prodotti = supermercato.mostraProdotto();
					if (prodotti) {
						alert("Ecco i prodotti disponibili:\n" + prodotti);
					} else {
						alert("Non ci sono prodotti disponibili al momento.");
					}
					break;
				case "3":
					let password = prompt(
						"Inserisci la password per accedere alla gestione:"
					);
					if (verificaPassword(password)) {
						gestioneSupermercato(supermercato);
					} else {
						alert("Password errata!");
					}
					break;
				case "0":
					continua = false;
					alert("Grazie per usato il nostro Gestionale!");
					break;
				default:
					alert("Scelta non valida");
					break;
			}
		}
	});
});

function verificaPassword(password) {
	if (password === null) {
		return false;
	} else if (password === "") {
		alert("Inserisci una password!");
		return false;
	} else if (password === "password") {
		return true;
	} else {
		alert("Password errata!");
		return false;
	}
}


// Funzione per gestire il supermercato che e' anche il sottomenu del supermercato
function gestioneSupermercato(supermercato) {
	let continua = true;
	while (continua) {
		let azione = prompt(
			"Menu Gestione: \n1. Aggiungi Prodotti \n2. Aggiungi Offerte \n3. Modifica Offerte \n4. Rimuovi Offerta \n0. Torna indietro"
		);

		switch (azione) {
			case "1":
				let nomeProdotto = prompt("Inserisci il nome del prodotto:");
				let categoriaProdotto = prompt("Inserisci la categoria del prodotto:");
				let prezzoProdotto = prompt("Inserisci il prezzo del prodotto (usare il punto per i decimali):");
				let prodotto = new Prodotto(
					nomeProdotto,
					categoriaProdotto,
					prezzoProdotto
				);
				supermercato.aggiungiProdotto(prodotto);
				alert("Prodotto aggiunto con successo!");
				break;
			case "2":
				let nomeProdottoOfferta = prompt("Inserisci il nome del prodotto in offerta:");
				let scontoOfferta = prompt("Inserisci lo sconto dell'offerta (es 0.20 uguale a 20%):");
				let dataInizioOfferta = prompt("Inserisci la data di inizio dell'offerta (dd/mm/yy):");
				let dataFineOfferta = prompt("Inserisci la data di fine dell'offerta (dd/mm/yy):");
				let prodottoOfferta = supermercato.prodotti.find(
					(prodotto) => prodotto.nome === nomeProdottoOfferta
				);
				if (prodottoOfferta) {
					let offerta = new Offerta(
						prodottoOfferta,
						scontoOfferta,
						dataInizioOfferta,
						dataFineOfferta
					);
					supermercato.aggiungiOfferta(offerta);
					alert("Offerta aggiunta con successo!");
				} else {
					alert("Prodotto non trovato!");
				}
				break;
			case "3":
				let nomeProdottoModifica = prompt("Inserisci il nome del prodotto in offerta da modificare:");
				let offertaDaModificare = supermercato.offerte.find(
					(offerta) => offerta.prodotto.nome === nomeProdottoModifica
				);
				if (offertaDaModificare) {
					let nuovoSconto = prompt("Inserisci il nuovo sconto dell'offerta:");
					let nuovaDataInizio = prompt("Inserisci la nuova data di inizio dell'offerta (dd/mm/yy):");
					let nuovaDataFine = prompt("Inserisci la nuova data di fine dell'offerta (dd/mm/yy)0:");
					offertaDaModificare.sconto = nuovoSconto;
					offertaDaModificare.dataInizio = nuovaDataInizio;
					offertaDaModificare.dataFine = nuovaDataFine;
					alert("Offerta modificata con successo!");
				} else {
					alert("Offerta non trovata!");
				}
				break;
			case "4":
				let nomeProdottoRimuovi = prompt("Inserisci il nome del prodotto in offerta da rimuovere:");
				let offertaDaRimuovere = supermercato.offerte.find(
					(offerta) => offerta.prodotto.nome === nomeProdottoRimuovi
				);
				if (offertaDaRimuovere) {
					let indiceOfferta = supermercato.offerte.indexOf(offertaDaRimuovere);
					supermercato.offerte.splice(indiceOfferta, 1);
					alert("Offerta rimossa con successo!");
				} else {
					alert("Offerta non trovata!");
				}
				break;
			case "0":
				continua = false;
				alert("Torno al menu principale");
				break;
			default:
				alert("Scelta non valida");
				break;
		}
	}
}
