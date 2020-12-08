function Map() {
	this.grid = [
				["wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK"],
				["wallBACK","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","stoneB","stoneA","stoneB","wallBACK"],
				["wallBACK","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","stoneA","stoneB","stoneA","wallBACK"],
				["wallBACK","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","stoneB","stoneA","stoneB","wallBACK"],
				["wallBACK","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","woodFloorA","woodFloorB","waterD","waterC","waterD","waterC","stoneA","stoneB","stoneA","wallBACK"],
				["stoneA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","waterC","waterD","waterC","waterD","stoneB","stoneA","stoneB","stoneA"],
				["stoneB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","woodFloorA","woodFloorB","waterD","waterC","waterD","waterC","stoneB","stoneA","stoneB","stoneA"],

				["wallBACK","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","woodFloorA","woodFloorB","waterC","waterD","waterC","waterD","stoneB","stoneA","stoneB","wallBACK"],
				["wallBACK","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","stoneA","stoneB","stoneA","wallBACK"],
				["wallBACK","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","stoneB","stoneA","stoneB","wallBACK"],
				["wallBACK","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","waterD","waterC","stoneA","stoneB","stoneA","wallBACK"],
				["wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK","wallBACK"]

				]



	this.getMaxX = function(x,y){
		return this.grid[0].length
	}

	this.getMaxY = function(x,y){
		return this.grid.length
	}

	this.getMapTile =function(x,y){
	  if (y < this.grid.length && x < this.grid[y].length && y >= 0 && x >= 0){
			return this.grid[y][x]
		}else{
			return undefined
		}
	}
}
