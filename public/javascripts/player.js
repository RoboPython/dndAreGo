function Player(id,x,y,sprite1,sprite2,sprite3) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.sprite = sprite1;
	this.spriteStill = sprite1;
	this.moving = false
	this.maxFrames = 16;
	this.frameCounter = 0
	this.direction = [0,0]
	this.speed = 0.0625
	this.spriteLeft = sprite2
	this.spriteRight = sprite3
	this.left = true;
	this.offset = 0.3
	this.destination = [x,y]
	this.path = []
	this.buildingPath = [];


	this.updatePosition = function(x,y){
		if (this.moving === false){
			this.moving = true;
		}
		this.direction[0] = x;
		this.direction[1] = y;
	}

	this.moveToDestination = function(){
		if (this.x !== this.destination[0] || this.y !== this.destination[1]){
			distanceToDestX = this.destination[0]-this.x
			distanceToDestY = this.destination[1]-this.y
			directionToDestX = Math.sign(distanceToDestX)
			directionToDestY = Math.sign(distanceToDestY)
			this.updatePosition(directionToDestX,directionToDestY);
		}else{
			if (this.path.length > 1){
				this.destination = this.path[1]
				this.path.shift();
			}
		}
	}


    this.update = function(camX,camY) {
		if (this.moving){
			if (this.frameCounter !== this.maxFrames){
				this.x += this.direction[0] * this.speed
				this.y += this.direction[1] * this.speed
				this.frameCounter +=1
				if (this.left){
					this.sprite = this.spriteLeft
				}else{
					this.sprite = this.spriteRight
				}
				

			}else{
				this.sprite =  this.spriteStill;
				this.moving = false
				this.left = !this.left
				this.frameCounter = 0

			}
		}



        ctx = myGameArea.context;
		ctx.drawImage(this.sprite, this.x *(tileSize +tileGap),(this.y-this.offset)*(tileSize+tileGap),tileSize,tileSize);
    }
	
}
