document.addEventListener("DOMContentLoaded", function () {
	let prodotti = [];
	let formProdotto = document.getElementById("formProdotto");
	let formOfferta = document.getElementById("formOfferta");
	let selezionaProdotto = document.getElementById("selezionaProdotto");


	formProdotto.addEventListener("submit", function (e) {
		e.preventDefault();
		let nomeInput = document.getElementById("nomeProdotto");
		let categoriaInput = document.getElementById("categoriaProdotto");
		let prezzoInput = document.getElementById("prezzoProdotto");
		let prodotto = {
			nome: nomeInput.value,
			categoria: categoriaInput.value,
			prezzo: parseFloat(prezzoInput.value.replace(',', '.')),
			offerte: [],
		};
		prodotti.push(prodotto);
		aggiornaSelezionaProdotto();
		visualizzaProdotti();
		nomeInput.value = "";
		categoriaInput.value = "";
		prezzoInput.value = "";
	});

	formOfferta.addEventListener("submit", function (e) {
		e.preventDefault();
		let prodottoId = parseInt(selezionaProdotto.value, 10);
		if (prodottoId >= 0 && prodottoId < prodotti.length) {
			let scontoInput = document.getElementById("scontoOfferta");
			let inizioInput = document.getElementById("inizioOfferta");
			let fineInput = document.getElementById("fineOfferta");
			let offerta = {
				sconto: scontoInput.value,
				inizio: inizioInput.value,
				fine: fineInput.value,
			};
			prodotti[prodottoId].offerte.push(offerta);
			visualizzaProdotti();
			scontoInput.value = "";
			inizioInput.value = "";
			fineInput.value = "";
		} else {
			console.error("ID prodotto non valido.");
		}
	});

	function aggiornaSelezionaProdotto() {
		selezionaProdotto.innerHTML = prodotti
			.map(
				(prodotto, index) =>
					`<option value="${index}">${prodotto.nome}</option>`
			)
			.join("");
	}

	function formattaData(dataISO) {
		const data = new Date(dataISO);
		return `${data
			.getDate()
			.toString()
			.padStart(
				2,
				"0"
			)}/${(data.getMonth() + 1).toString().padStart(2, "0")}/${data.getFullYear()}`;
	}

	function visualizzaProdotti() {
		const elencoProdottiElement = document.getElementById(
			"visualizzazioneProdotti"
		); 
		elencoProdottiElement.innerHTML = ""; // Svuota l'elenco 
		prodotti.forEach((prodotto, indexProdotto) => {
			let prodottoElement = document.createElement("div");
			prodottoElement.innerHTML = `
        <h3>${prodotto.nome}</h3>
        <p>Categoria: ${prodotto.categoria}</p>
        <p>Prezzo: ${prodotto.prezzo} €</p>
        <h4>Offerte</h4>
        <ul>
          ${prodotto.offerte
						.map(
							(offerta, indexOfferta) => `
            <li style ="list-style:none">
              <p>Sconto: ${offerta.sconto}%</p>
              <p>Inizio: ${formattaData(offerta.inizio)}</p>
            <p>Fine: ${formattaData(offerta.fine)}</p>
               <button class="rimuovi-offerta" data-prodotto="${indexProdotto}" data-offerta="${indexOfferta}">Rimuovi offerta</button>
            </li>
          `
						)
						.join("")}
        </ul>
      `;
			let modificaOffertaBtn = document.createElement("button");
			modificaOffertaBtn.textContent = "Modifica offerta";
			modificaOffertaBtn.addEventListener("click", () =>
				modificaOfferta(indexProdotto)
			);
			modificaOffertaBtn.style.marginLeft = "32px";
			prodottoElement.appendChild(modificaOffertaBtn);
			elencoProdottiElement.appendChild(prodottoElement);
			prodottoElement.style.marginTop = "20px";
			prodottoElement.style.padding = "10px";
			prodottoElement.style.border = "1px solid #000";
			prodottoElement.style.borderRadius = "5px";

			document.querySelectorAll(".rimuovi-offerta").forEach((button) => {
				button.addEventListener("click", function () {
					let indexProdotto = this.getAttribute("data-prodotto");
					let indexOfferta = this.getAttribute("data-offerta");
					rimuoviOfferta(indexProdotto, indexOfferta);
				});
			});
		});

		// Rimuovi offerta
		function rimuoviOfferta(indexProdotto, indexOfferta) {
			prodotti[indexProdotto].offerte.splice(indexOfferta, 1);
			visualizzaProdotti();
		}

		//modifica offerta
		function modificaOfferta(index) {
			let scontoInput = document.getElementById("scontoOfferta");
			let inizioInput = document.getElementById("inizioOfferta");
			let fineInput = document.getElementById("fineOfferta");
			let offerta = {
				sconto: scontoInput.value,
				inizio: inizioInput.value,
				fine: fineInput.value,
			};
			prodotti[index].offerte.push(offerta);
			visualizzaProdotti();
			scontoInput.value = "";
			inizioInput.value = "";
			fineInput.value 
		}

		document.getElementById("pulsanteRicerca").addEventListener("click", function(event) {
			event.preventDefault(); // Impedisce il comportamento predefinito del browser
		
			let termineRicerca = document.getElementById("campoRicerca").value.toLowerCase();
			let tipoRicerca = document.getElementById("tipoRicerca").value;
		
			let prodottiFiltrati = prodotti.filter(prodotto => {
				let corrispondenzaNome = tipoRicerca === "nome" && prodotto.nome.toLowerCase().includes(termineRicerca);
				let corrispondenzaCategoria = tipoRicerca === "categoria" && prodotto.categoria.toLowerCase().includes(termineRicerca);
				return corrispondenzaNome || corrispondenzaCategoria;
			});
		
			let visualizzazioneRicerca = document.getElementById("visualizzazioneRicerca");
			visualizzazioneRicerca.innerHTML = ""; // Pulisce i risultati precedenti
			prodottiFiltrati.forEach(prodotto => {
				let div = document.createElement("div");
				let h3 = document.createElement("h3");
				h3.textContent = `${prodotto.nome} (${prodotto.categoria})`;
				div.appendChild(h3);
		
				let p = document.createElement("p");
				p.innerHTML = prodotto.offerte.map(offerta => `Sconto: ${offerta.sconto}%, Inizio: ${offerta.inizio}, Fine: ${offerta.fine}`).join("<br>");
				div.appendChild(p);
		
				visualizzazioneRicerca.appendChild(div);
			});
		});
	}
});


