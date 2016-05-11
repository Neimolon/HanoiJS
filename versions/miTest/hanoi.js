window.addEventListener("load", start, false);

function start(){
	body = document.getElementsByTagName("body")[0];
 
	num_cuadros = 3;
	num_fichas = 4;
	
	cuadros = new Array(num_cuadros);
	
	for(var i=0;i<num_cuadros;i++){
		cuadro = new Cuadro(num_cuadros);
		cuadro.id = i;
		
		cuadro.numFichas = num_fichas;
		cuadro.posFichas = new Array(num_fichas);
		for(var z=0 ; z < cuadro.posFichas.length; z++){
			if(i == 0){
				cuadro.posFichas[z] = z + 1;
			}else{
				cuadro.posFichas[z] = 0;
			}		
		}
		
		cuadro.width = 85 / num_cuadros+"%";
		cuadro.marginLeft = 5 / num_cuadros+"%";
		cuadro.marginRight = 5 / num_cuadros+"%";
		
		cuadro.pintarCuadro(body);
		
		cuadros[i] = cuadro; 
		
	}
	

}
function click(id){
	console.log(id);
}

function Cuadro(id){
	this.id = id;
	this.width="30%";
	this.height="200px";
	this.marginLeft ="1.5%";
	this.marginRight ="1.5%";
	this.background="#EDEADE";
	this.border="2px solid black";
	this.borderHover = "2px solid blue";
	this.float = "left";
	this.numFichas= 4;
	this.posFichas = new Array();
	this.selected = false;

	this.content = document.createElement("div");
	this.content.setAttribute("id", "cuadro"+this.id);
	
	this.content.addEventListener("mouseover", function(){this.style.border = "2px solid blue";}, false);
	this.content.addEventListener("mouseout", function(){this.style.border = "2px solid black";}, false);
	this.content.addEventListener("click", click,false);
	
	
	this.pintarCuadro = function(container){
		this.content.style.width = this.width;
		this.content.style.height = this.height;
		this.content.style.marginLeft = this.marginLeft;
		this.content.style.marginRight = this.marginRight;
		this.content.style.marginTop = parseInt(this.height) / (this.numFichas + 1) + "px";
		this.content.style.border = this.border;
		this.content.style.float = this.float;
		this.content.style.backgroundColor= this.background;
		this.pintarFichas();
		container.appendChild(this.content);
	}
	
	this.pintarFichas = function(container){
		var ficha_relleno = document.createElement("div");
		ficha_relleno.style.height= parseInt(this.height) / (this.numFichas + 1) + "px";
		this.content.appendChild(ficha_relleno);
		
		for(var i = 0; i < this.posFichas.length; i++){
			ficha = document.createElement("div");
			ficha.style.width = 90 * this.posFichas[i] /num_fichas+"%" ;
			ficha.style.height = parseInt(this.height) / (this.numFichas + 1) + "px";
			ficha.style.marginLeft = (100 - parseInt(ficha.style.width)) /2 + "%";
			ficha.style.marginRight = ficha.style.marginLeft;
			ficha.style.border = "0px solid white";
			ficha.style.backgroundColor = "#"+this.posFichas[i]*2+""+this.posFichas[i]*2+""+this.posFichas[i]*2;
			this.content.appendChild(ficha);
		}				
	}

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