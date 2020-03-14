	const titulo = document.querySelector("#efeito");
	 typeWriter(titulo);
	
	function typeWriter(elemento) {
	const textoArray = elemento.innerHTML.split('');
		elemento.innerHTML = '';
		for(let i = 0; i < textoArray.length; i++) {
		  setTimeout(() => elemento.innerHTML += textoArray[i], 75* i);
		}
	}
