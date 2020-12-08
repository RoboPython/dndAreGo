function SpriteLoader(listOfFiles){
	this.sprites = []
	this.allLoaded = false;

	this.load = function(){
		for (var i =0;i<listOfFiles.length;i++){
			sprite = new Image;
			sprite.src = listOfFiles[i]
			spriteName = (sprite.src).split("/")[4].split(".")[0]
			
			sprite.onload = function(){
								sprite.loaded = true;
							}
			this.sprites[spriteName] = sprite;
		}
	}

	this.checkAllLoaded = function (){
		this.allLoaded = true;
		for (key in this.sprites){
		  if (this.sprites[key].loaded === false){
			this.loaded = false;
		  }
		}

	  return this.allLoaded;
	  
	}
}
