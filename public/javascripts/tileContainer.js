function TileContainer(xWidth,yWidth,xOffset,yOffset) {
	this.xWidth = xWidth
	this.yWidth = yWidth
	this.xOffset = xOffset
	this.yOffset = yOffset
	this.speed = 0.5
	this.allLoaded = false;


	this.generateTiles = function(){
		tempTiles = []
		for (var j=0;j<this.yWidth;j++){
			for (var i=0;i<this.xWidth;i++){
				if (i===0 ){
					tempTiles.push([])
				}
				x = i
				y = j

				mapValue = theMap.getMapTile(i,j)
				if (mapValue != undefined){
					sprite = theSpriteLoader.sprites[mapValue]
				}else{
					sprite = theSpriteLoader.sprites["selector"]
				}

				tile = new Tile(tileSize, tileSize, sprite, (x)*(tileSize+tileGap), (y)*(tileSize + tileGap));
				tempTiles[j].push(tile);
			}
		}
		return tempTiles
	}

	this.setTiles = function(){
		this.tiles = this.generateTiles();
	}


	this.drawTiles = function(){
		for (var j = 0; j < this.tiles.length; j++) {
			for (var i = 0; i < this.tiles[j].length; i++) {
				this.tiles[j][i].draw()
			}
		}
	}

	this.update = function(){
		this.drawTiles();
	}
}

