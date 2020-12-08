var socket = io();



var theMap = new Map();
var tiles = [];

tileSize = 40;
tileGap = 0
xRes = theMap.getMaxX()//31
yRes = theMap.getMaxY()//16
WIDTH = (tileSize+tileGap)*(xRes)
HEIGHT = (tileSize+tileGap)*(yRes)
var state = {
  mouseInfo:{
	xOffset:0,
	yOffset:0,
	mouseX:0,
	mouseY:0,
	mouseDown:false
  },
  selectedPlayer:null,
  join:false
}




function startGame() {
    myGameArea.start();
	myGameArea.context.imageSmoothingEnabled = false;
	updateGameArea();
	canvas = $("canvas")
	canvasOffset = $("#canvas").offset();
    state.mouseInfo.offsetX = canvasOffset.left;
    state.mouseInfo.offsetY = canvasOffset.top;
	canvas.mousemove(handleMouseMove);
	canvas.mousedown(handleMouseDown);
	canvas.mouseup(handleMouseUp);

}



var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
		this.canvas.setAttribute('id',"canvas")
        this.context = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}









theSpriteLoader = new SpriteLoader([
	"/images/wallBACK.png",
	"/images/wallSIDE.png",
	"/images/woodFloorA.png",
	"/images/woodFloorB.png",
	"/images/stoneA.png",
	"/images/stoneB.png",
	"/images/waterC.png",
	"/images/waterD.png",
	"/images/selector.png",
	"/images/magnus1.png",
	"/images/magnusLeft.png",
	"/images/magnusRight.png",
	"/images/meera1.png",
	"/images/meeraLeft.png",
	"/images/meeraRight.png",
	"/images/diega1.png",
	"/images/diegaLeft.png",
	"/images/diegaRight.png",
	"/images/eadwynn1.png",
	"/images/eadwynnLeft.png",
	"/images/eadwynnRight.png",
	"/images/luciana1.png",
	"/images/lucianaLeft.png",
	"/images/lucianaRight.png",
	"/images/miguel1.png",
	"/images/miguelLeft.png",
	"/images/miguelRight.png"

]);
theSpriteLoader.load();



















window.addEventListener('scroll', function (event) {
	offsetDiffX = window.pageXoffset //- state.mouseInfo.offsetX
	offsetDiffY = window.pageYoffset - state.mouseInfo.offsetY

}, false);

updateScroll = function(){
	scrollX = $(window).scrollLeft()
	scrollY = $(window).scrollTop()
	state.mouseInfo.scrollX = scrollX;
	state.mouseInfo.scrollY = scrollY;
}







function handleMouseMove(e) {
	state.mouseInfo.mouseX = parseInt(e.clientX - state.mouseInfo.offsetX);
    state.mouseInfo.mouseY = parseInt(e.clientY - state.mouseInfo.offsetY);
}





function handleMouseDown(e) {
	result = playerInSquare(theSelector.x,theSelector.y);
	if (result[0] === true){
		state.selectedPlayer = result[1][0];
	}else{
		state.selectedPlayer = null;
	}

	state.mouseInfo.mouseDown = true;
}

function handleMouseUp(e) {
	state.mouseInfo.mouseDown = false;
	if (state.selectedPlayer !== null){
		thePlayers[state.selectedPlayer].path = thePlayers[state.selectedPlayer].buildingPath;
		thePlayers[state.selectedPlayer].buildingPath = [];
		thePlayers[state.selectedPlayer].destination = thePlayers[state.selectedPlayer].path[0];
		socket.emit('updatePosition', thePlayers[state.selectedPlayer].path,state.selectedPlayer);
	}
}











function playerInSquare(x,y){
	peeps = []
	isPlayer = false;
	for (var key in thePlayers){
		if(thePlayers[key].x === x && thePlayers[key].y === y){
			isPlayer = true;
			peeps.push(key)
		}
	}

	return [isPlayer,peeps]
}






createRoom = function(){
	socket.emit('createRoom');
}

joinRoom = function(){
	roomNumber = document.getElementById("roomNumber").value
	socket.emit('joinRoom', roomNumber);

}

sendAddSprite = function(){
	var e = document.getElementById("ddlViewBy");
	var spriteImg = e.options[e.selectedIndex].value;
	socket.emit('addSprite', {"spriteImg":spriteImg});
}

sendRemoveSprite = function(){
	socket.emit('removeSprite', state.selectedPlayer);
}



socket.on('addSprite', function(incoming){
	imgName = incoming.spriteImg
	player = new Player(incoming.id,10,2,theSpriteLoader.sprites[imgName+"1"],theSpriteLoader.sprites[imgName+"Left"],theSpriteLoader.sprites[imgName+"Right"]);
	thePlayers[player.id] = player;
});

socket.on('removeSprite', function(incoming){
	delete thePlayers[incoming.playerId]
	state.selectedPlayer = null;
});


socket.on('roomCode', function(incoming){
	document.getElementById("roomCodeDisplay").innerHTML = "Room code is: " +incoming.roomCode

});

socket.on('newPath', function(incoming){
      thePlayers[incoming.playerId].path = incoming.path
});

socket.on('join', function(incoming){
	for (var key in incoming){
		if (key in thePlayers){
			thePlayers[key].x = incoming[key].x
			thePlayers[key].y = incoming[key].y
			thePlayers[key].destination[0] = incoming[key].x
			thePlayers[key].destination[1] = incoming[key].y
		}else{
			spriteImg = incoming[key].spriteImg
			player = new Player(key,10,2,theSpriteLoader.sprites[spriteImg+"1"],theSpriteLoader.sprites[spriteImg+"Left"],theSpriteLoader.sprites[spriteImg + "Right"]);
			thePlayers[player.id] = player;
			thePlayers[key].x = incoming[key].x
			thePlayers[key].y = incoming[key].y
			thePlayers[key].destination[0] = incoming[key].x
			thePlayers[key].destination[1] = incoming[key].y
		}


	}



	document.getElementById("joiningControls").style.display = "none";
	document.getElementById("spriteControls").style.display = "";

	document.getElementById("canvas").style.display = "";
	canvasOffset = $("#canvas").offset();
    state.mouseInfo.offsetX = canvasOffset.left;
    state.mouseInfo.offsetY = canvasOffset.top;
	state.join = true;
});





pathMaker = function(){
	highlightX = Math.floor((state.mouseInfo.mouseX+state.mouseInfo.scrollX)/(tileSize+tileGap))
	highlightY = Math.floor((state.mouseInfo.mouseY+state.mouseInfo.scrollY)/(tileSize+tileGap))

	if (highlightX === -1){
		highlightX = 0
	}

	  if (state.mouseInfo.mouseDown && state.selectedPlayer !== null){
		  if (thePlayers[state.selectedPlayer].buildingPath.length === 0){
				thePlayers[state.selectedPlayer].buildingPath.push([highlightX,highlightY])
		  }else{
			lastEntry = thePlayers[state.selectedPlayer].buildingPath[thePlayers[state.selectedPlayer].buildingPath.length-1]
			if (lastEntry[0] !== highlightX || lastEntry[1] !== highlightY){
				thePlayers[state.selectedPlayer].buildingPath.push([highlightX,highlightY])
			}
		  }
	  }
}









setup = false
function updateGameArea() {
	window.requestAnimationFrame(updateGameArea);
	updateScroll();
	if (setup === false && theSpriteLoader.checkAllLoaded()){
		theCamera = new TileContainer(xRes,yRes,0,0);
		thePlayers = {}
		theSelector = new Selector(5,5,"/images/selector.png",tileSize,tileGap);
		theCamera.setTiles(theCamera.generateTiles());
		setup = true;

	}
	if (setup===true && state.join === true){

		pathMaker();
		theCamera.drawTiles();
		theSelector.update(state);
		
		for (var key in thePlayers){
			thePlayers[key].update()
			if(thePlayers[key].moving === false){
				thePlayers[key].moveToDestination();
			}
		}
	}
}

