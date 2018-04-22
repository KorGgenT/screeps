var buildExtensions = {
    run: function(spawn) {
        
        let G_spawn = Game.spawns[spawn]
		let currentRoom = G_spawn.room.name;
		let xPos = G_spawn.pos.x;
		let yPos = G_spawn.pos.y;
		let extPos = [0,2];
		let extArray = [2,3];
		let ERROR;
		
		Game.rooms[currentRoom].createConstructionSite(xPos, yPos - 3, STRUCTURE_TOWER)
		for (let i = 0; i < extArray[0]; i++)   {
			for (let j = 0; j < extArray[1]; j++)   {
				if((ERROR = Game.rooms[currentRoom].createConstructionSite(xPos + extPos[0] + i, yPos + extPos[1] + j, STRUCTURE_EXTENSION)) == 0) {
					console.log("Building Extension at: " + (xPos + extPos[0] + i) + ", " + (yPos + extPos[1] + j))
				}
				else {
					//console.log("ERROR " + ERROR)
				}
			}
		}
	
    }
};

module.exports = buildExtensions;