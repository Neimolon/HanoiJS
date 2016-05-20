window.addEventListener("load", main, false);

var num_cuadros = 3;
var num_fichas = 10;	
var cuadros = Array(num_cuadros);

/* 
 * Ok, voy a valerme del array que guarda los objetos y meter en una variable la ficha que se esta seleccionando en cada click 
 * para poder controlar desde los eventos del objeto el movimiento del juego, sin metodos globales extras. Esta es la forma en 
 * la que me lo habia propuesto hacer originalmente, pero no me acaba de hacer tilin. 
 *
 * Añadidas en el click del raton las restricciones de movimientos prohibidos.
 * 
 *  Todo:
 *  contador de movimientos
 *  control de si se ha ganado
 *  borde rojo fichas seleccionadas
 *  
 *  Fix:
 *  la generacion automatica de color al crear de 10 fichas deja el background en blanco
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
}

function Cuadro(id_cuadro,numero_cuadros,numero_fichas,cuadroInicial){
	this.html = document.createElement("div");
	this.html.setAttribute("id", id_cuadro);
	this.fichas = new Array(numero_fichas);
	
	//configurar estilos cuadro
	this.html.style.border = "2px solid black";
	this.html.style.height = "200px";
	this.html.style.width = (100/numero_fichas - 2*2) + "%";
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
	
	this.resetListeners = function(){
		this.html.addEventListener("click",this.htmlClick,false);
		this.html.addEventListener("mouseover",this.htmlOver,false);
		this.html.addEventListener("mouseout",this.htmlOut,false);
		}
	
	this.htmlClick = function(){
		var id = this.getAttribute("id");
		
		if(ficha_seleccionada == undefined){
			console.log("quitar");
			ficha_seleccionada = cuadros[id].quitarFichaSuperior();
		}else{
			console.log("poner");
			console.log(ficha_seleccionada.numero_ficha +" - "+ cuadros[id].numero_ficha);
			
			if(cuadros[id].verFichaSuperior() == undefined || ficha_seleccionada.numero_ficha < cuadros[id].verFichaSuperior().numero_ficha){
				cuadros[id].ponerFichaSuperior(ficha_seleccionada);
				ficha_seleccionada = null;
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

	//configuramos estilo de las fichas
	this.html.style.height = 200 / total_fichas + "px";
	this.html.style.width = 100* numero_ficha/total_fichas - 2 * 2 + "%";
	this.html.style.marginLeft = "2%";
	this.html.style.margin = "auto";
	//this.html.style.backgroundColor = Number(255 - (numero_ficha/total_fichas * 255)).toString(16);
	this.html.style.backgroundColor = "#" + ((numero_ficha + 1) * 111111);
}

function Relleno(total_fichas){
	this.html = document.createElement("div");	
	this.html.style.height = 200 / total_fichas + "px";
	
}

























/*

window.addEventListener("load",init,false);

function init(){
	hanoiGame = new Hanoi();
	hanoiGame.start();
}

function crearDiv(){
	return document.createElement("div");
}

function Hanoi(){
	this.num_cajas = 3;
	this.num_fichas = 4;
	this.layout = new Layout().layout;
	
	this.start = function(){
		body = document.getElementsByTagName("body")[0];
		body.appendChild(this.layout);
	};

	//Config
	this.checkConfig = function(){

	};
	
	this.setConfigurations= function(cajas,fichas){
		this.num_cajas = cajas;
		this.num_fichas= fichas;
	};
	
}

function Layout(){
	this.configArea = document.createElement("div");
	this.configArea.setAttribute("id", "configuracion");
	this.statsArea = document.createElement("div");
	this.statsArea.setAttribute("id", "stats");
	this.gameArea = document.createElement("div");
	this.gameArea.setAttribute("id", "hanoi");

	this.layout = document.createElement("div");
	this.layout.setAttribute("id", "layout");
	
	this.layout.appendChild(this.configArea);
	this.layout.appendChild(this.statsArea);
	this.layout.appendChild(this.gameArea);
	
	this.setStyles = function(){
		this.configArea.style.width = "40%";
		this.configArea.style.height = "150px";
		this.configArea.style.marginLeft = "3%";
		this.configArea.style.marginRight = "3%";
		this.configArea.style.marginBottom = "40px";
		this.configArea.style.border = "solid black";
		this.configArea.style.borderWidth = "2%";
		//this.configArea.style.backgroundColor("#EDEADE");	
	};
	
	this.setStyles();
	 
}





*/