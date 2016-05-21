window.addEventListener("load", main, false);

var num_cuadros = 3;
var num_fichas = 10;	
var cuadros = Array(num_cuadros);
var contador = new ContadorMovimientos();

/* 
 * Fixed:
 * Relleno automatico color fondo fichas 
 * Error anchura automática de las cajas
 *
 * Done:
 * Metodo Cuadro.comprobarVictoria()
 * Constructor ContadorMovimientos();
 * Añadir contador funcional al body
 * Añadir mensaje de victoria al body
 * 
 * Todo:
 * Un cuadro que permita introducir el numero de fichas y cuadros que 
 * el usuario decida que aparezcan en el juego.
 * 
 * Fix:
 * El calculo automático de la anchura de las fichas falla cuando es un numero elevado de fichas.
 */

var ficha_seleccionada;


function main(){
	body = document.getElementsByTagName("body")[0];
 
	var cuadroInicial = true;
	
	for(var i = 0; i < num_cuadros; i++){
		cuadros[i] = new Cuadro(i,num_cuadros, num_fichas, cuadroInicial);
		cuadros[i].rellenarFichas();
		cuadros[i].repintarFichas();
		
		body.appendChild(cuadros[i].html);
		cuadroInicial = false;
	}
	
	body.appendChild(contador.html);
}

function Cuadro(id_cuadro,numero_cuadros,numero_fichas,cuadroInicial){
	this.html = document.createElement("div");
	this.html.setAttribute("id", id_cuadro);
	this.fichas = new Array(numero_fichas);
	
	//configurar estilos cuadro
	this.html.style.border = "2px solid black";
	this.html.style.height = "200px";
	this.html.style.width = (100/numero_cuadros - 2.5 *2 ) + "%";
	this.html.style.paddingTop = "20px";
	this.html.style.float = "left";
	this.html.style.marginLeft = "2%";
	this.html.style.marginRight = "2%";
	
	
	this.rellenarFichas = function(){ 
		for(var i = 0 ; i < numero_fichas; i++){
			if(cuadroInicial){
				val_fich = i + 1;
				this.fichas[i] = new Ficha(val_fich, numero_fichas);
			}else{
				this.fichas[i] = new Relleno(numero_fichas);
			}
		}
	};
	
	this.repintarFichas = function(){ 

		while(this.html.hasChildNodes())
			this.html.removeChild(this.html.firstChild);
		
		for(var i = 0 ; i < this.fichas.length; i++)
			this.html.appendChild(this.fichas[i].html);
		
		this.resetListeners();
	};
	
	this.verFichaSuperior = function(){
		for(var i = 0; i < this.fichas.length; i++){
			if(this.fichas[i] instanceof Ficha){
				var ficha_superior = this.fichas[i];
				return ficha_superior;
			}
		}
		
		return null;	
	};

	this.quitarFichaSuperior = function(){
		for(var i = 0; i < this.fichas.length; i++){
			if(this.fichas[i] instanceof Ficha){
				var ficha_superior = this.fichas[i];
				this.fichas[i] = new Relleno(numero_fichas);
				return ficha_superior;
			}
		}
		
	};
	
	this.ponerFichaSuperior = function(ficha){
		
		for(i = this.fichas.length - 1; i >= 0 ; i--){
			if(this.fichas[i] instanceof Relleno){
				this.fichas[i] = ficha;
				return true;
			}		
		}
		return false;
	};
	
	this.comprobarVictoria = function(){
		var fichas_en_caja = 0;
		if(id_cuadro == numero_cuadros - 1){
			for(var i = 0; i < this.fichas.length; i++){
				if(this.fichas[i] instanceof Ficha){
					fichas_en_caja++;
				}
			}
			
			if(numero_fichas == fichas_en_caja)
				return true;
		}
		
		return false;
	};
	
	this.resetListeners = function(){
		this.html.addEventListener("click",this.htmlClick,false);
		this.html.addEventListener("mouseover",this.htmlOver,false);
		this.html.addEventListener("mouseout",this.htmlOut,false);
		}
	
	this.htmlClick = function(){
		var id = this.getAttribute("id");

		if(ficha_seleccionada == undefined){
			id_origen = id;
			ficha_seleccionada = cuadros[id].quitarFichaSuperior();
			
		}else{
			if(cuadros[id].verFichaSuperior() == undefined || ficha_seleccionada.numero_ficha < cuadros[id].verFichaSuperior().numero_ficha){
				cuadros[id].ponerFichaSuperior(ficha_seleccionada);
				ficha_seleccionada = null;
				
				contador.incrementarMovimientos();
				contador.repintarContador();
				
				if(cuadros[id].comprobarVictoria()){
					var victoria = document.createElement("p");
					victoria.style.textAlign = "center";
					var texto_victoria = document.createTextNode("Enhorabuena!!! Has ganado Pulsa F5 para volver a jugar. Número total de movimientos :" +contador.movimientos );
					victoria.appendChild(texto_victoria);
					body.appendChild(victoria);
				}
			}
		}
		
		cuadros[id].repintarFichas();
		
	};
	
	this.htmlOver = function(){
		this.style.backgroundColor = "#1144DD";
	};
	
	this.htmlOut = function(){
		this.style.backgroundColor = "#FFFFFF";
	};
	
}

function Ficha(numero_ficha, total_fichas){
	this.html = document.createElement("div");	
	this.numero_ficha = numero_ficha;
	this.total_fichas = total_fichas;
	this.bg_color_hex_byte = (256 - Number.parseInt(numero_ficha/total_fichas * 255)).toString(16);

	//configuramos estilo de las fichas
	this.html.style.height = 200 / total_fichas + "px";
	this.html.style.width = 100* numero_ficha/total_fichas - 2 * 2 + "%";
	this.html.style.marginLeft = "2%";
	this.html.style.margin = "auto";
	this.html.style.backgroundColor = "#"+this.bg_color_hex_byte + this.bg_color_hex_byte + this.bg_color_hex_byte;

}

function Relleno(total_fichas){
	this.html = document.createElement("div");	
	this.html.style.height = 200 / total_fichas + "px";
	
}

function ContadorMovimientos(){
	this.movimientos = 0;
	this.html = document.createElement("div");
	this.htmlText = document.createElement("p");
	this.texto = document.createTextNode("Número de movimientos: " + this.movimientos);
	
	this.html.style.height = "50px";
	this.html.style.width = "100%";
	this.html.style.margin = "30px auto";
	this.html.style.border = "2px solid black";
	this.html.style.float = "left";
	this.html.style.clear = "both";
	
	this.htmlText.style.textAlign = "center";
	
	this.htmlText.appendChild(this.texto);
	this.html.appendChild(this.htmlText);
	
	this.incrementarMovimientos = function(){
		this.movimientos++;
		this.texto = document.createTextNode("Número de movimientos: " + this.movimientos);
	}
	
	this.repintarContador = function(){
		this.html.removeChild(this.html.firstChild);
		this.html.appendChild(this.texto);

	};
	
	
	
}
