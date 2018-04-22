var f_spawn = {
	bodyParts: function(NRG) {
		let parts = [];
		if (NRG >= 100) {
			parts['hauler'] = [CARRY,MOVE]
		}
		if (NRG >= 200) {
			parts.hauler = [CARRY,CARRY,MOVE,MOVE]
		}
		if (NRG >= 250) {
			parts.worker = [WORK,CARRY,MOVE,MOVE]
			parts.defender = [TOUGH,TOUGH,ATTACK,MOVE,MOVE,MOVE]
			parts.dropHarvester = [WORK,WORK,MOVE]
		}
		if (NRG >= 300) {
			parts.hauler = [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
		}
		if (NRG >= 350) {
			parts.dropHarvester = [WORK,WORK,WORK,MOVE]
		}
		if (NRG >= 450) {
			parts.dropHarvester = [WORK,WORK,WORK,WORK,MOVE]
		}
		if (NRG >= 550) {
			parts.dropHarvester = [WORK,WORK,WORK,WORK,WORK,MOVE]
			parts.worker = [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
		}
		return parts;
	},
    worker: function(spawn, type, bodyparts) {
		if (!(bodyparts)) {
			return -1; // ERROR NO BODYPARTS
		}
        let newName = type + Game.time;
        console.log(spawn + ' spawning new ' + type + ": " + newName + " with " + bodyparts);
        Game.spawns[spawn].spawnCreep(bodyparts, newName,
            {memory: {role: type, home: spawn}});
    },
    hauler: function(spawn, bodyparts, sc_mem) {
        
    },
	dropHarvester: function(spawn, bodyparts, sc_mem_id, sc_mem_pos) {
		console.log(sc_mem_id)
		Game.spawns[spawn].spawnCreep(bodyparts, ('harvester' + Game.time),
			{memory: {
				role: 'harvester', 
				home:spawn, 
				source_id: sc_mem_id, 
				source_pos: sc_mem_pos
			}});
	}
}

module.exports = f_spawn;