window.onload = function(){
	var canvas = document.getElementById("c1");
	var ctx = canvas.getContext("2d");
	var mas = [];
	var count = 0;
	var timer;

	canvas.onclick = function(event){
		var x =  event.offsetX;
		var y = event.offsetY;
		x = Math.floor(x/10);
		y = Math.floor(y/10);
		console.log(x);
		console.log(y);
		mas[x][y] = 1;
		drawField();
	}

	function goLife(){
		var row = 30,
				col = 30,
				i = 0, j = 0;
		for(i = 0; i < col; i++){
			mas[i] = [];
			for(j = 0; j < row; j++){
				mas[i][j] = 0;
			}
		}
	}

	goLife();

	function drawField(){
		ctx.clearRect(0, 0, 300, 300);
		for(i = 0; i < 30; i++){
			for(j = 0; j < 30; j++){
				if(mas[i][j] == 1){
					ctx.fillRect(i * 10, j * 10, 10, 10);
				}
			}
		}
	}

	function startLife(){
		//modelling life
		var mas2 = [];
		for(i = 0; i < 30; i++){
			mas2[i] = [];
			for(j = 0; j < 30; j++){
				var neighbors = 0;
				if(mas[fpm(i)-1][j] == 1) neighbors++;//upper neighbor
				if(mas[i][fpp(j) + 1] == 1) neighbors++;//right neighbor
				if(mas[fpp(i) + 1][j] == 1) neighbors++;//lower neighbors
				if(mas[i][fpm(j) - 1] == 1) neighbors++;//left neighbors
				if(mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;//up-right
				if(mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;//low-right
				if(mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;//up-left
				if(mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;//low-left
				// (neighbors==2 || neighbors==3) ? mas2[i][j] = 1 : mas2[i][j] = 0;//if 3 neighbors life begins in cell
				if((mas2[i][j] == 1) && (neighbors < 2) mas2[i][j] = 0)
				else if((mas2[i][j] == 1) && (neighbors > 3) mas2[i][j] = 0)
				else if((mas2[i][j] == 0) && (neighbors == 3) mas2[i][j] = 1)
				else 																				 mas2[i][j] = mas[i][j])
			}
		}
		mas = mas2;
		drawField();
		count++;
		document.getElementById("count").innerHTML = count;
		timer = setTimeout(startLife, 300);
	}

	function clearCanvas(){
		clearTimeout(timer);
		ctx.clearRect(0, 0, 300, 300);
		mas = [];
		console.log("Clear");
	}

	function fpm(i){ //border collision on Y
		if(i == 0) return 30;
		else return i;
	}
	function fpp(i){ //border collision on Y
		if(i == 29) return -1;
		else return i;
	}

	document.getElementById("start").onclick = startLife;
	document.getElementById("stop").onclick = clearCanvas;

}
