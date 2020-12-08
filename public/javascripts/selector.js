function Selector(x,y,sprite,tileSize,tileGap) {
	this.x = x;
	this.y = y;
	this.sprite = new Image();
	this.sprite.src = sprite;
	this.tileSize = tileSize;
	this.tileGap = tileGap;

	this.setPosition = function(x,y){
		this.x = x
		this.y = y
	}


    this.update = function(state) {

		highlightX = Math.floor((state.mouseInfo.mouseX+state.mouseInfo.scrollX)/(this.tileSize+this.tileGap))
		highlightY = Math.floor((state.mouseInfo.mouseY+state.mouseInfo.scrollY)/(this.tileSize+this.tileGap))

		if (highlightX === -1){
			highlightX = 0 
		}   

		this.setPosition(highlightX,highlightY);

        ctx = myGameArea.context;
		ctx.drawImage(this.sprite, this.x *(tileSize +tileGap),(this.y)*(tileSize+tileGap),tileSize,tileSize);
		ctx.font = "30px Arial";
		//ctx.fillText("", this.x*(tileSize+tileGap), (this.y+1)*(tileSize+tileGap)-15);

    }
	
}

