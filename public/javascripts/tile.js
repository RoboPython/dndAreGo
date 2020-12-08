function Tile(width, height, sprite, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
	this.sprite = sprite


	this.draw = function(){
       ctx = myGameArea.context;
		ctx.drawImage(this.sprite, this.x, this.y,width=this.width,height=this.height);
	}


    this.update = function() {
        ctx = myGameArea.context;
		ctx.drawImage(this.sprite, this.x, this.y,width=this.width,height=this.height);

    }
}

