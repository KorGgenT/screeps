var roleHarvester = require('role.harvester');
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
		let G_spawn = Game.spawns[spawn]
		let currentRoom = Game.spawns[spawn].room
		let controllerLevel = currentRoom.controller.level
		switch(controllerLevel) {
			case 2:
					buildExtensions.run(spawn)
			case 3:
				for (let spawn in Game.spawns)  {
					tower.run(G_spawn.room)
				}
		}
		
		if (currentRoom.energyAvailable < 550 && currentRoom.energyAvailable > 249)   {
			f_spawn.level1(spawn)
			f_spawn.defender1(spawn)
		} else if (currentRoom.energyAvailable > 549) {
			f_spawn.level2(spawn)
			f_spawn.defender2(spawn)
		}

		if(G_spawn.spawning) {
			let spawningCreep = Game.creeps[G_spawn.spawning.name];
			G_spawn.room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				G_spawn.pos.x + 1,
				G_spawn.pos.y,
				{align: 'left', opacity: 0.8});
		}
	}
	
	//spawn a 'manual' remote harvesting creep. note: need to reset this after respawning
	let harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester') && (creep.memory.roomname == 'W88S73'));
	if((harvesters.length < 1) && (Game.spawns['Spawn1'].room.energyAvailable > 549)) {
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
            roleHarvester.run(creep);
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
    }
    //roads.run()
    
}