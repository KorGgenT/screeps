var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var buildExtensions = require('build.extension');
//var roads = require('roads');
var tower = require('tower');
var f_spawn = require('spawn');

module.exports.loop = function () {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
	
	for (let spawn in Game.spawns) {
		let G_spawn = Game.spawns[spawn];
		let currentRoom = Game.spawns[spawn].room;
		let controllerLevel = currentRoom.controller.level;
		switch(controllerLevel) {
			case 3:
				tower.run(G_spawn.room)
			case 2:
				buildExtensions.run(spawn)
		}
		
        

		if(G_spawn.spawning) {
			let spawningCreep = Game.creeps[G_spawn.spawning.name];
			G_spawn.room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				G_spawn.pos.x + 1,
				G_spawn.pos.y,
				{align: 'left', opacity: 0.8});
		} else {
			
			let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
			let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && !(creep.memory.roomname));
			let haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
			let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
			let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
			
			let parts = f_spawn.bodyParts(currentRoom.energyAvailable);
			
			/* if there is not a harvseter for each source in memory,
				finds out which don't have one and spawns one for it. */
			//console.log(JSON.stringify(harvesters));
			if (haulers.length < (2 * harvesters.length)) {
				f_spawn.worker(spawn, 'hauler', parts.hauler);
			} else if (Memory.sources && (harvesters.length < Memory.sources.length)) {
				for (let sc_mem in Memory.sources) {
					let found = false;
					for (let i = 0;  i < harvesters.length; i++) {
					    let sc_hl = harvesters[i]
						if (Memory.sources[sc_mem].id == sc_hl.memory.source_id) {
							found = true;
						}
					}
					if (!(found)) {
						f_spawn.dropHarvester(spawn, parts.dropHarvester, Memory.sources[sc_mem]);
					}
				}
			} else if (upgraders.length < 1) {
				f_spawn.worker(spawn, 'upgrader', parts.worker);
			} else if (builders.length < 1) {
				f_spawn.worker(spawn, 'builder', parts.worker);
			} else if (defenders.length < 4) {
				f_spawn.worker(spawn, 'defender', parts.defender);
			}
		}
	}
	
	//spawn a 'manual' remote harvesting creep. note: need to reset this after respawning
	let remote_harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.roomname);
    if((remote_harvesters.length < 1) && (Game.spawns['Spawn1'].room.energyAvailable > 549)) {
		let newName = 'Harvester' + Game.time;
		console.log("Spawn1 spawning new remote harvester: " + newName);
		Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,WORK,CARRY,WORK,MOVE,MOVE,MOVE], newName,
			{
				memory: {role: 'harvester', x: 44, y: 5, roomname: 'W88S73', home: "Spawn1"}
			}
		);
	}
		
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.dropHarvest(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.atk(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep)
        }
    }
    //roads.run()
    
}